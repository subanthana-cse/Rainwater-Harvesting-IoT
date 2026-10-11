// RainSense dashboard: public ThingSpeak channel reader.
// Keep your ThingSpeak WRITE API key in ESP32 firmware only, never in this file.
const CHANNEL_ID = "3531232"; // Verify this is your channel ID.
const READ_API_KEY = "";      // Leave blank for a public channel; use read key only if channel is private.
const REFRESH_MS = 16000;
const MAX_POINTS = 20;

const el = (id) => document.getElementById(id);
let chart;
let readings = [];
let lastStatus = null;

function feedUrl(results = MAX_POINTS) {
  const base = `https://api.thingspeak.com/channels/${CHANNEL_ID}/feeds.json?results=${results}`;
  return READ_API_KEY ? `${base}&api_key=${encodeURIComponent(READ_API_KEY)}` : base;
}
function numeric(value) {
  const n = Number(value);
  return value !== null && value !== "" && Number.isFinite(n) ? n : null;
}
function getStatus(percent, statusCode) {
  if (statusCode !== null) {
    if (statusCode >= 2) return "FULL";
    if (statusCode >= 1) return "MEDIUM";
    return "LOW";
  }
  if (percent >= 80) return "FULL";
  if (percent >= 30) return "MEDIUM";
  return "LOW";
}
function setConnection(ok, message) {
  el("connectionDot").classList.toggle("online", ok);
  el("connectionText").textContent = message;
  el("deviceStatus").textContent = ok ? "ONLINE" : "OFFLINE";
  el("espStatus").textContent = ok ? "ONLINE" : "OFFLINE";
  el("espStatus").className = `component-status ${ok ? "ok" : ""}`;
  el("sensorStatus").textContent = ok ? "ACTIVE" : "WAITING";
  el("sensorStatus").className = `component-status ${ok ? "ok" : ""}`;
}
function initChart() {
  const ctx = el("levelChart");
  if (!ctx || typeof Chart === "undefined") return;
  chart = new Chart(ctx, {
    type: "line",
    data: { labels: [], datasets: [{
      label: "Water level (%)", data: [], borderColor: "#39e8ff",
      backgroundColor: "rgba(57,232,255,0.10)", fill: true, tension: 0.38,
      pointRadius: 3, pointHoverRadius: 5, pointBackgroundColor: "#39e8ff",
      borderWidth: 2
    }]},
    options: {
      responsive: true, maintainAspectRatio: false, animation: { duration: 350 },
      plugins: { legend: { display: false }, tooltip: {
        backgroundColor: "#101a30", titleColor: "#edf5ff", bodyColor: "#39e8ff",
        borderColor: "#334765", borderWidth: 1,
        callbacks: { label: (context) => ` Water level: ${context.parsed.y}%` }
      }},
      scales: {
        x: { grid: { color: "rgba(130,145,177,0.08)" }, ticks: { color: "#8291b1", maxTicksLimit: 6, font: { size: 10 } } },
        y: { min: 0, max: 100, grid: { color: "rgba(130,145,177,0.12)" }, ticks: { color: "#8291b1", callback: value => `${value}%`, font: { size: 10 } } }
      }
    }
  });
}
function addAlert(status, percent, time) {
  const list = el("alertsList");
  const title = status === "FULL" ? "Tank is full — buzzer should be ON"
    : status === "MEDIUM" ? "Water level is at a medium level"
    : "Water level is low";
  const description = `${percent.toFixed(1)}% water level · ${time}`;
  const type = status === "FULL" ? "danger" : status === "LOW" ? "warning" : "";
  const icon = status === "FULL" ? "!" : status === "LOW" ? "↓" : "✓";
  if (list.querySelector(".empty-state")) list.innerHTML = "";
  const item = document.createElement("div");
  item.className = `alert-item ${type}`;
  const iconEl = document.createElement("span");
  iconEl.className = "alert-icon";
  iconEl.textContent = icon;
  const body = document.createElement("div");
  const strong = document.createElement("strong");
  strong.textContent = title;
  const small = document.createElement("small");
  small.textContent = description;
  body.append(strong, small);
  item.append(iconEl, body);
  list.prepend(item);
  while (list.children.length > 4) list.lastElementChild.remove();
  el("alertCount").textContent = list.children.length;
}
function updateDashboard(feed, channel) {
  const distance = numeric(feed.field1);
  const waterHeight = numeric(feed.field2);
  let percent = numeric(feed.field3);
  const statusCode = numeric(feed.field4);
  if (percent === null && waterHeight !== null) percent = Math.max(0, Math.min(100, waterHeight / 95 * 100));
  if (percent === null && distance !== null) percent = Math.max(0, Math.min(100, (100 - distance) / 95 * 100));
  if (percent === null) throw new Error("No usable readings in fields 1–3.");
  percent = Math.max(0, Math.min(100, percent));
  const level = waterHeight !== null ? waterHeight : percent / 100 * 95;
  const status = getStatus(percent, statusCode);
  const time = feed.created_at ? new Date(feed.created_at) : new Date();
  const timeText = time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  el("waterPercent").textContent = percent.toFixed(1);
  el("waterHeight").textContent = level.toFixed(1);
  el("distance").textContent = distance === null ? "—" : distance.toFixed(1);
  el("percentBar").style.width = `${percent}%`;
  el("tankWater").style.height = `${percent}%`;
  el("tankPercent").innerHTML = `${percent.toFixed(1)}<span>%</span>`;
  el("lastUpdated").textContent = timeText;

  const banner = el("statusBanner");
  banner.classList.remove("status-low", "status-medium", "status-full");
  banner.classList.add(`status-${status.toLowerCase()}`);
  el("statusTitle").textContent = status === "FULL" ? "Tank is FULL"
    : status === "MEDIUM" ? "Water level is MEDIUM" : "Water level is LOW";
  el("statusDescription").textContent = status === "FULL"
    ? "Tank reached the full threshold. Check the red LED and buzzer."
    : status === "MEDIUM" ? "Water storage is at a moderate level."
    : "Water is low. Consider collecting or conserving water.";
  el("statusPill").textContent = status;
  el("statusSymbol").textContent = status === "FULL" ? "!" : status === "MEDIUM" ? "◉" : "↓";
  el("buzzerText").textContent = status === "FULL" ? "Buzzer status: ON (expected)" : "Buzzer status: OFF (expected)";
  el("buzzerDot").className = `tiny-dot ${status === "FULL" ? "" : "online"}`;
  el("buzzerComponent").textContent = status === "FULL" ? "ALERT" : "READY";
  el("buzzerComponent").className = `component-status ${status === "FULL" ? "alert" : "ok"}`;

  if (status !== lastStatus) {
    addAlert(status, percent, timeText);
    lastStatus = status;
  }
  readings = (channel?.feeds || []).map(item => {
    const p = numeric(item.field3);
    const h = numeric(item.field2);
    const d = numeric(item.field1);
    const value = p !== null ? p : h !== null ? h / 95 * 100 : d !== null ? (100 - d) / 95 * 100 : null;
    return { time: new Date(item.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), value };
  }).filter(item => item.value !== null).slice(-MAX_POINTS);
  if (chart) {
    chart.data.labels = readings.map(r => r.time);
    chart.data.datasets[0].data = readings.map(r => Math.max(0, Math.min(100, r.value)));
    chart.update();
  }
  el("chartSummary").textContent = readings.length ? `${readings.length} readings loaded` : "No history yet";
}
async function loadData() {
  el("refreshBtn").classList.add("loading");
  try {
    const response = await fetch(feedUrl(MAX_POINTS), { cache: "no-store" });
    if (!response.ok) throw new Error(`ThingSpeak request failed (${response.status})`);
    const data = await response.json();
    const feeds = data.feeds || [];
    const latest = feeds[feeds.length - 1];
    if (!latest) throw new Error("No data found. Check the channel ID and ensure ESP32 has uploaded readings.");
    updateDashboard(latest, data);
    setConnection(true, "ThingSpeak connected");
  } catch (error) {
    setConnection(false, "Connection/data error");
    el("statusTitle").textContent = "Unable to load readings";
    el("statusDescription").textContent = error.message || "Check internet and ThingSpeak settings.";
    el("chartSummary").textContent = "Data unavailable";
    console.error("Dashboard error:", error);
  } finally {
    el("refreshBtn").classList.remove("loading");
  }
}
document.addEventListener("DOMContentLoaded", () => {
  initChart();
  el("refreshBtn").addEventListener("click", loadData);
  loadData();
  window.setInterval(loadData, REFRESH_MS);
});

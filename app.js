// RainSense dashboard - matches sketch.ino (Arduino Uno + HC-SR04)
const CFG = { EMPTY: 100, FULL: 5, LOW: 30, HIGH: 80 }; // same values as the sketch
const $ = (id) => document.getElementById(id);
const history = [];

// Same calculation as the Arduino code
function fromDistance(d) {
  const usable = CFG.EMPTY - CFG.FULL;
  const cm = Math.min(Math.max(CFG.EMPTY - d, 0), usable);
  const pct = Math.round((cm / usable) * 100);
  const st = pct < CFG.LOW ? "LOW" : pct < CFG.HIGH ? "MEDIUM" : "FULL";
  return { d, cm, pct, st, g: st === "LOW", y: st === "MEDIUM", r: st === "FULL", b: st === "FULL" };
}

const ADVICE = {
  LOW: "Tank is low. Conserve water until the next rain.",
  MEDIUM: "Tank level is healthy.",
  FULL: "Tank is full. Buzzer on, stop the inlet.",
};

function render(x) {
  $("pct").textContent = x.pct;
  $("dist").textContent = Number(x.d).toFixed(1);
  $("cm").textContent = Number(x.cm).toFixed(1);
  $("status").textContent = x.st;
  $("advice").textContent = ADVICE[x.st] || "";
  $("water").style.height = x.pct + "%";
  document.body.dataset.status = x.st;
  $("led-g").classList.toggle("on", x.g);
  $("led-y").classList.toggle("on", x.y);
  $("led-r").classList.toggle("on", x.r);
  $("led-b").classList.toggle("on", x.b);
  history.push(x.pct);
  if (history.length > 60) history.shift();
  drawChart();
}

// Level history chart
function drawChart() {
  const c = $("chart"), dpr = window.devicePixelRatio || 1;
  const w = c.clientWidth, h = 180;
  c.width = w * dpr; c.height = h * dpr;
  const g = c.getContext("2d");
  g.scale(dpr, dpr);
  g.clearRect(0, 0, w, h);
  const y = (p) => h - 10 - (p / 100) * (h - 20);

  g.font = "11px Sora, sans-serif";
  g.setLineDash([4, 4]); g.lineWidth = 1;
  [[CFG.HIGH, "FULL"], [CFG.LOW, "LOW"]].forEach(([p, t]) => {
    g.strokeStyle = "rgba(165,166,216,.4)";
    g.beginPath(); g.moveTo(0, y(p)); g.lineTo(w, y(p)); g.stroke();
    g.fillStyle = "#a5a6d8"; g.fillText(t + " " + p + "%", 6, y(p) - 4);
  });
  g.setLineDash([]);
  if (history.length < 2) return;

  const step = w / 59;
  const grad = g.createLinearGradient(0, 0, w, 0);
  grad.addColorStop(0, "#4f9dff"); grad.addColorStop(1, "#8b5cf6");
  g.strokeStyle = grad; g.lineWidth = 3; g.lineJoin = "round";
  g.beginPath();
  history.forEach((p, i) => {
    const px = w - (history.length - 1 - i) * step;
    i ? g.lineTo(px, y(p)) : g.moveTo(px, y(p));
  });
  g.stroke();
}

// One JSON line from the Arduino / Wokwi Serial Monitor
function handleLine(line) {
  line = line.trim();
  if (line[0] !== "{") return false; // ignore the human-readable lines
  try {
    const j = JSON.parse(line);
    render({ d: j.d, cm: j.cm, pct: j.pct, st: j.st, g: !!j.g, y: !!j.y, r: !!j.r, b: !!j.b });
    return true;
  } catch { return false; }
}

// Tabs
function showTab(name) {
  document.querySelectorAll(".pane").forEach((p) => (p.hidden = p.id !== "pane-" + name));
  document.querySelectorAll(".tabs .btn").forEach((b) => b.classList.toggle("active", b.dataset.tab === name));
  $("msg").textContent = { demo: "Demo mode", serial: "Not connected", paste: "Waiting for pasted data" }[name];
}
document.querySelectorAll(".tabs .btn").forEach((b) => b.addEventListener("click", () => showTab(b.dataset.tab)));

// Demo slider
$("slider").addEventListener("input", (e) => {
  $("sv").textContent = e.target.value;
  render(fromDistance(Number(e.target.value)));
});

// Paste output from Wokwi Serial Monitor
$("apply").addEventListener("click", () => {
  history.length = 0;
  const n = $("paste").value.split("\n").filter(handleLine).length;
  $("msg").textContent = n ? n + " reading(s) loaded" : "No JSON lines found. Copy lines that start with {";
});

// Real Arduino over USB (Chrome / Edge)
$("connect").addEventListener("click", async () => {
  if (!("serial" in navigator)) { $("msg").textContent = "Web Serial needs Chrome or Edge on a computer."; return; }
  try {
    const port = await navigator.serial.requestPort();
    await port.open({ baudRate: 9600 });
    $("msg").textContent = "Live from Arduino";
    const dec = new TextDecoderStream();
    port.readable.pipeTo(dec.writable);
    const reader = dec.readable.getReader();
    let buf = "";
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      buf += value;
      const lines = buf.split("\n");
      buf = lines.pop();
      lines.forEach(handleLine);
    }
  } catch (err) { $("msg").textContent = "Connection failed: " + err.message; }
});

window.addEventListener("resize", drawChart);
showTab("demo");
render(fromDistance(50));

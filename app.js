
/* ========================================
   RAINWATER HARVESTING - LIVE DATA
   ======================================== */

// Replace with your real ThingSpeak Channel ID.
const CHANNEL_ID = "YOUR_CHANNEL_ID";

// Public channel: leave empty.
// Private channel: enter the READ API KEY only.
const READ_API_KEY = "";

// ESP32 sends readings every 16 seconds.
const REFRESH_INTERVAL = 16000;

let historyChart = null;

const getElement = (id) => document.getElementById(id);

function setConnection(connected) {
  const dot = getElement("connectionDot");
  const text = getElement("connectionText");

  if (dot) {
    dot.style.backgroundColor = connected ? "#22c55e" : "#ef4444";
  }

  if (text) {
    text.textContent = connected ? "Connected" : "Disconnected";
  }
}

function showError(message) {
  setConnection(false);

  const status = getElement("statusMessage");
  const alert = getElement("alertBox");

  if (status) status.textContent = message;

  if (alert) {
    alert.textContent = message;
    alert.style.backgroundColor = "#fef2f2";
    alert.style.color = "#b91c1c";
  }
}

function updateTankStatus(level, statusCode) {
  let status;
  let message;
  let color;

  // Use field4 when it contains a valid status code.
  if ([0, 1, 2].includes(statusCode)) {
    status = ["LOW", "MEDIUM", "FULL"][statusCode];
  } else {
    status = level < 30 ? "LOW" :
             level < 80 ? "MEDIUM" : "FULL";
  }

  if (status === "LOW") {
    message = "Water level is low. Please monitor the tank.";
    color = "#dc2626";
  } else if (status === "MEDIUM") {
    message = "Water level is moderate.";
    color = "#b45309";
  } else {
    message = "Tank is nearly full or full.";
    color = "#15803d";
  }

  const statusElement = getElement("tankStatus");
  const messageElement = getElement("statusMessage");
  const alertElement = getElement("alertBox");

  if (statusElement) {
    statusElement.textContent = status;
    statusElement.style.color = color;
  }

  if (messageElement) {
    messageElement.textContent = message;
  }

  if (alertElement) {
    alertElement.textContent = message;
    alertElement.style.color = color;
    alertElement.style.backgroundColor =
      status === "LOW" ? "#fef2f2" :
      status === "MEDIUM" ? "#fffbeb" : "#f0fdf4";
  }
}

function createOrUpdateChart(feeds) {
  const canvas = getElement("historyChart");

  if (!canvas || typeof Chart === "undefined") return;

  const labels = feeds.map(feed =>
    new Date(feed.created_at).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    })
  );

  const values = feeds.map(feed => Number(feed.field3));

  if (!historyChart) {
    historyChart = new Chart(canvas, {
      type: "line",
      data: {
        labels,
        datasets: [{
          label: "Water Level (%)",
          data: values,
          borderColor: "#0284c7",
          backgroundColor: "rgba(2, 132, 199, 0.12)",
          fill: true,
          tension: 0.3,
          pointRadius: 3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            min: 0,
            max: 100,
            title: {
              display: true,
              text: "Water Level (%)"
            }
          }
        }
      }
    });
  } else {
    historyChart.data.labels = labels;
    historyChart.data.datasets[0].data = values;
    historyChart.update();
  }
}

async function loadThingSpeakData() {
  if (CHANNEL_ID === "YOUR_CHANNEL_ID" || !CHANNEL_ID.trim()) {
    showError("Please enter your ThingSpeak Channel ID in app.js.");
    return;
  }

  const refreshButton = getElement("refreshButton");

  if (refreshButton) {
    refreshButton.disabled = true;
    refreshButton.textContent = "Refreshing...";
  }

  try {
    let url =
      `https://api.thingspeak.com/channels/${encodeURIComponent(CHANNEL_ID)}/feeds.json?results=20`;

    if (READ_API_KEY.trim()) {
      url += `&api_key=${encodeURIComponent(READ_API_KEY.trim())}`;
    }

    const response = await fetch(url, { cache: "no-store" });

    if (!response.ok) {
      throw new Error("ThingSpeak HTTP error: " + response.status);
    }

    const data = await response.json();

    if (!Array.isArray(data.feeds) || data.feeds.length === 0) {
      throw new Error("No readings found. Check ThingSpeak channel data.");
    }

    // Field 3 is the water percentage.
    const feeds = data.feeds.filter(feed =>
      feed.field3 !== null &&
      feed.field3 !== undefined &&
      feed.field3 !== "" &&
      Number.isFinite(Number(feed.field3)) &&
      Number(feed.field3) >= 0 &&
      Number(feed.field3) <= 100
    );

    if (feeds.length === 0) {
      throw new Error("Field 3 does not contain valid water percentages.");
    }

    const latest = feeds[feeds.length - 1];

    const level = Number(latest.field3);
    const height = Number(latest.field2);
    const distance = Number(latest.field1);

    const statusCode =
      latest.field4 === null ||
      latest.field4 === undefined ||
      latest.field4 === ""
        ? null
        : Number(latest.field4);

    const levelValue = getElement("levelValue");
    const levelBar = getElement("levelBar");
    const tankWater = getElement("tankWater");
    const tankPercent = getElement("tankPercent");
    const heightValue = getElement("heightValue");
    const distanceValue = getElement("distanceValue");
    const updatedValue = getElement("updatedValue");

    if (levelValue) levelValue.textContent = level.toFixed(1);
    if (levelBar) levelBar.style.width = level + "%";
    if (tankWater) tankWater.style.height = level + "%";
    if (tankPercent) tankPercent.textContent = level.toFixed(1);

    if (heightValue) {
      heightValue.textContent =
        Number.isFinite(height) ? height.toFixed(1) : "--";
    }

    if (distanceValue) {
      distanceValue.textContent =
        Number.isFinite(distance) ? distance.toFixed(1) : "--";
    }

    if (updatedValue) {
      updatedValue.textContent =
        new Date(latest.created_at).toLocaleTimeString();
    }

    updateTankStatus(level, statusCode);
    createOrUpdateChart(feeds);
    setConnection(true);

  } catch (error) {
    console.error("ThingSpeak error:", error);
    showError(error.message || "Unable to fetch sensor readings.");
  } finally {
    if (refreshButton) {
      refreshButton.disabled = false;
      refreshButton.textContent = "Refresh readings";
    }
  }
}

// Manual refresh button.
const refreshButton = getElement("refreshButton");

if (refreshButton) {
  refreshButton.addEventListener("click", loadThingSpeakData);
}

// Initial data load and automatic updates.
loadThingSpeakData();
setInterval(loadThingSpeakData, REFRESH_INTERVAL);

```javascript
// ==========================================
// RAINWATER HARVESTING IoT DASHBOARD
// Neon Theme + ThingSpeak Live Data
// ==========================================

// ThingSpeak channel settings
const CHANNEL_ID = "3531232";

// Public channel என்றால் empty-ஆக விடலாம்.
// Private channel என்றால் Read API Key சேர்க்கவும்.
const READ_API_KEY = "";

// Auto refresh interval: 16 seconds
const REFRESH_INTERVAL = 16000;

// Tank measurements
const EMPTY_DISTANCE = 100;
const FULL_DISTANCE = 5;
const MAX_WATER_HEIGHT = EMPTY_DISTANCE - FULL_DISTANCE;

let waterChart = null;

// Get HTML element
function getElement(id) {
    return document.getElementById(id);
}

// Fetch latest ThingSpeak data
async function fetchWaterData() {
    try {
        let url =
            `https://api.thingspeak.com/channels/${CHANNEL_ID}/feeds/last.json`;

        if (READ_API_KEY.trim() !== "") {
            url += `?api_key=${encodeURIComponent(READ_API_KEY)}`;
        }

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("ThingSpeak connection failed");
        }

        const data = await response.json();

        const distance = Number(data.field1);
        const waterHeightFromChannel = Number(data.field2);
        const percentageFromChannel = Number(data.field3);
        const statusCode = Number(data.field4);

        if (
            data.field1 == null ||
            data.field1 === "" ||
            !Number.isFinite(distance)
        ) {
            throw new Error("No valid sensor data received");
        }

        // Calculate values if optional fields are missing
        const waterHeight = Number.isFinite(waterHeightFromChannel)
            ? waterHeightFromChannel
            : Math.max(0, Math.min(MAX_WATER_HEIGHT,
                EMPTY_DISTANCE - distance));

        const percentage = Number.isFinite(percentageFromChannel)
            ? Math.max(0, Math.min(100, percentageFromChannel))
            : Math.max(0, Math.min(100,
                (waterHeight / MAX_WATER_HEIGHT) * 100));

        let status;

        if (Number.isFinite(statusCode) && data.field4 !== "") {
            status = statusCode === 2
                ? "FULL"
                : statusCode === 1
                    ? "MEDIUM"
                    : statusCode === 0
                        ? "LOW"
                        : getStatus(percentage);
        } else {
            status = getStatus(percentage);
        }

        updateDashboard({
            distance,
            waterHeight,
            percentage,
            status,
            updatedAt: data.created_at
        });

    } catch (error) {
        console.error("Dashboard error:", error);

        showAlert(
            "Connection Error",
            "ThingSpeak data unavailable. Check channel ID, privacy settings and ESP32 connection."
        );
    }
}

// Determine tank status
function getStatus(percentage) {
    if (percentage < 30) return "LOW";
    if (percentage < 80) return "MEDIUM";
    return "FULL";
}

// Update dashboard cards and tank visualization
function updateDashboard(data) {
    const {
        distance,
        waterHeight,
        percentage,
        status,
        updatedAt
    } = data;

    if (getElement("waterPercentage")) {
        getElement("waterPercentage").textContent =
            percentage.toFixed(1);
    }

    if (getElement("waterHeight")) {
        getElement("waterHeight").textContent =
            waterHeight.toFixed(1);
    }

    if (getElement("sensorDistance")) {
        getElement("sensorDistance").textContent =
            distance.toFixed(1);
    }

    if (getElement("waterProgress")) {
        getElement("waterProgress").style.width =
            `${percentage}%`;
    }

    if (getElement("tankWater")) {
        getElement("tankWater").style.height =
            `${percentage}%`;
    }

    if (getElement("tankLabel")) {
        getElement("tankLabel").textContent =
            `${percentage.toFixed(1)}%`;
    }

    if (getElement("tankStatus")) {
        getElement("tankStatus").textContent = status;
    }

    if (getElement("statusIcon")) {
        getElement("statusIcon").textContent =
            status === "FULL" ? "🚨" :
            status === "MEDIUM" ? "💧" : "🪣";
    }

    if (getElement("statusMessage")) {
        getElement("statusMessage").textContent =
            status === "FULL"
                ? "Tank is full! Buzzer should be ON."
                : status === "MEDIUM"
                    ? "Water level is moderate. Monitoring continues."
                    : "Water level is low. More water is needed.";
    }

    if (getElement("buzzerStatus")) {
        getElement("buzzerStatus").textContent =
            status === "FULL" ? "ON" : "OFF";

        getElement("buzzerStatus").style.color =
            status === "FULL" ? "#ff5263" : "#39ff88";
    }

    if (getElement("lastUpdated")) {
        const date = updatedAt ? new Date(updatedAt) : new Date();

        getElement("lastUpdated").textContent =
            date.toLocaleString();
    }

    // Status banner colour
    const banner = getElement("statusBanner");

    if (banner) {
        banner.style.borderColor =
            status === "FULL" ? "#ff5263" :
            status === "MEDIUM" ? "#ffb454" : "#39ff88";
    }

    // Update system alert
    if (status === "FULL") {
        showAlert(
            "FULL TANK ALERT",
            "Tank reached the FULL threshold. The ESP32 should activate the buzzer."
        );
    } else if (status === "MEDIUM") {
        showAlert(
            "MEDIUM WATER LEVEL",
            "Water level is moderate. Buzzer should remain OFF."
        );
    } else {
        showAlert(
            "LOW WATER LEVEL",
            "Tank water level is low. Buzzer should remain OFF."
        );
    }

    updateChart();
}

// Show alert information
function showAlert(title, description) {
    if (getElement("alertTitle")) {
        getElement("alertTitle").textContent = title;
    }

    if (getElement("alertDescription")) {
        getElement("alertDescription").textContent = description;
    }

    const indicator = document.querySelector(".alert-indicator");

    if (indicator) {
        indicator.style.background =
            title.includes("FULL") ? "#ff5263" :
            title.includes("Error") ? "#ffb454" : "#39ff88";

        indicator.style.boxShadow =
            title.includes("FULL")
                ? "0 0 12px #ff5263"
                : "0 0 12px #39ff88";
    }
}

// Load historical data from ThingSpeak
async function updateChart() {
    try {
        let url =
            `https://api.thingspeak.com/channels/${CHANNEL_ID}/feeds.json?results=20`;

        if (READ_API_KEY.trim() !== "") {
            url += `&api_key=${encodeURIComponent(READ_API_KEY)}`;
        }

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Unable to load chart data");
        }

        const result = await response.json();

        const feeds = (result.feeds || []).filter(feed =>
            feed.field3 !== null &&
            feed.field3 !== "" &&
            Number.isFinite(Number(feed.field3))
        );

        const labels = feeds.map(feed =>
            new Date(feed.created_at).toLocaleTimeString()
        );

        const values = feeds.map(feed =>
            Number(feed.field3)
        );

        drawChart(labels, values);

    } catch (error) {
        console.error("Chart error:", error);
    }
}

// Create neon line chart
function drawChart(labels, values) {
    const canvas = getElement("waterChart");

    if (!canvas || typeof Chart === "undefined") {
        return;
    }

    if (waterChart) {
        waterChart.data.labels = labels;
        waterChart.data.datasets[0].data = values;
        waterChart.update();
        return;
    }

    waterChart = new Chart(canvas, {
        type: "line",

        data: {
            labels: labels,

            datasets: [{
                label: "Water Level (%)",
                data: values,

                borderColor: "#00e5ff",
                backgroundColor: "rgba(0, 229, 255, 0.12)",

                borderWidth: 3,
                fill: true,
                tension: 0.4,

                pointRadius: 3,
                pointBackgroundColor: "#39ff88",
                pointBorderColor: "#00e5ff"
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
                legend: {
                    labels: {
                        color: "#eef6ff"
                    }
                }
            },

            scales: {
                x: {
                    ticks: {
                        color: "#8ca2bd",
                        maxTicksLimit: 6
                    },

                    grid: {
                        color: "rgba(140, 162, 189, 0.10)"
                    }
                },

                y: {
                    min: 0,
                    max: 100,

                    ticks: {
                        color: "#8ca2bd",
                        callback: value => value + "%"
                    },

                    grid: {
                        color: "rgba(140, 162, 189, 0.12)"
                    }
                }
            }
        }
    });
}

// Start dashboard
document.addEventListener("DOMContentLoaded", () => {
    fetchWaterData();

    // Refresh readings every 16 seconds
    setInterval(fetchWaterData, REFRESH_INTERVAL);
});
```

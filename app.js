// Tank capacity in cm
const TANK_HEIGHT = 95;


// Update Dashboard
function updateDashboard(distance) {

    // Calculate water level
    let waterLevel = TANK_HEIGHT - distance;


    // Prevent negative values
    if (waterLevel < 0) {
        waterLevel = 0;
    }


    // Prevent values above tank height
    if (waterLevel > TANK_HEIGHT) {
        waterLevel = TANK_HEIGHT;
    }


    // Calculate percentage
    let percentage = (waterLevel / TANK_HEIGHT) * 100;

    percentage = Math.round(percentage);


    // Determine status
    let status;


    if (percentage <= 20) {

        status = "LOW";

    }
    else if (percentage <= 70) {

        status = "MEDIUM";

    }
    else {

        status = "FULL";

    }


    // Status indicator
    const indicator =
        document.getElementById("statusIndicator");


    if (status === "LOW") {

        indicator.style.backgroundColor = "#ef4444";
        indicator.style.color = "#ef4444";

    }
    else if (status === "MEDIUM") {

        indicator.style.backgroundColor = "#f59e0b";
        indicator.style.color = "#f59e0b";

    }
    else {

        indicator.style.backgroundColor = "#10b981";
        indicator.style.color = "#10b981";

    }


    // Water tank color
    const water =
        document.getElementById("water");


    if (status === "LOW") {

        water.style.backgroundColor = "#ef4444";

    }
    else if (status === "MEDIUM") {

        water.style.backgroundColor = "#f59e0b";

    }
    else {

        water.style.backgroundColor = "#2196f3";

    }


    // Display water level
    document.getElementById("waterLevel").innerText =
        waterLevel.toFixed(1) + " cm";


    // Display percentage
    document.getElementById("percentage").innerText =
        percentage + "%";


    // Display sensor distance
    document.getElementById("distance").innerText =
        distance.toFixed(1) + " cm";


    // Display status
    document.getElementById("status").innerText =
        status;


    // Update tank water height
    water.style.height =
        percentage + "%";


    // Display tank percentage
    document.getElementById("tankPercentage").innerText =
        percentage + "%";


    // System Alert
    const alertBox =
        document.getElementById("alert");


    if (status === "LOW") {

        alertBox.innerText =
            "⚠️ Water level is LOW. More rainwater is required.";

        alertBox.style.color = "#dc2626";

    }
    else if (status === "MEDIUM") {

        alertBox.innerText =
            "🌊 Water level is MEDIUM. Monitoring continues.";

        alertBox.style.color = "#d97706";

    }
    else {

        alertBox.innerText =
            "✓ Tank is FULL. Water level is sufficient.";

        alertBox.style.color = "#059669";

    }


    // Simulated rainfall
    const rainfall =
        Math.round(Math.random() * 100);


    document.getElementById("rainfall").innerText =
        rainfall + " mm";


    // Rainwater collection status
    const collectionStatus =
        document.getElementById("collectionStatus");


    if (rainfall > 50) {

        collectionStatus.innerText =
            "🌧️ Collection Active";

        collectionStatus.style.color =
            "#059669";

    }
    else if (rainfall > 0) {

        collectionStatus.innerText =
            "🌦️ Rain Detected";

        collectionStatus.style.color =
            "#0284c7";

    }
    else {

        collectionStatus.innerText =
            "☀️ No Rain";

        collectionStatus.style.color =
            "#64748b";

    }


    // Last updated time
    const currentTime =
        new Date().toLocaleTimeString();


    document.getElementById("lastUpdated").innerText =
        currentTime;

}


// Initial sensor value
updateDashboard(22);


// Automatic sensor simulation every 5 seconds
setInterval(() => {

    const simulatedDistance =
        Math.random() * 80 + 10;

    updateDashboard(simulatedDistance);

}, 5000);
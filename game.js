// Time Incremental Game

let currentTime = 1e-43;
let timePerSecond = 1e-43;
let currentUpgrade = 0;

const upgrades = [
    { name: "Big Banged", cost: 0, timePerSecond: 1e-43 },
    { name: "Time is so peaceful", cost: 3e-43, timePerSecond: 1e-44 }
];

const timeDisplay = document.getElementById('time-display');
const timePerSecondDisplay = document.getElementById('time-per-second');
const upgradeDisplay = document.getElementById('upgrade-display');
const applyUpgradeButton = document.getElementById('apply-upgrade');

// Function to update the display
function updateDisplay() {
    timeDisplay.textContent = `Current Time: ${currentTime.toExponential(2)}`;
    timePerSecondDisplay.textContent = `Time per second: ${timePerSecond.toExponential(2)}`;
    upgradeDisplay.textContent = `Current Upgrade: ${upgrades[currentUpgrade].name}`;
    applyUpgradeButton.disabled = currentTime < upgrades[currentUpgrade + 1]?.cost;
}

// Function to apply an upgrade
function applyUpgrade() {
    if (currentUpgrade < upgrades.length - 1) {
        const nextUpgrade = upgrades[currentUpgrade + 1];
        if (currentTime >= nextUpgrade.cost) {
            currentTime -= nextUpgrade.cost;
            currentUpgrade++;
            timePerSecond = nextUpgrade.timePerSecond;
            updateDisplay();
        }
    }
}

// Function to earn time over time
function earnTime() {
    currentTime += timePerSecond;
    updateDisplay();
}

// Start the time-earning loop
setInterval(earnTime, 1000); // Every second, we earn time

// Set up the upgrade button event
applyUpgradeButton.addEventListener('click', applyUpgrade);

// Initialize display
updateDisplay();

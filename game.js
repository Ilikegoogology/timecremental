// Time Incremental Game

let currentTime = 1e-43;
let timePerSecond = 1e-43;
let currentUpgrade = 0;

const upgrades = [
    { name: "Big Banged", cost: 0, timePerSecond: 1e-43 },
    { name: "Time is so peaceful", cost: 3e-43, timePerSecond: 1e-44 },
    { name: "Why am I here?", cost: 1e-43, timePerSecond: 1e-44, randomBoost: true }
];

const timeDisplay = document.getElementById('time-display');
const timePerSecondDisplay = document.getElementById('time-per-second');
const upgradeDisplay = document.getElementById('upgrade-display');
const upgradeButton = document.getElementById('upgrade-button'); // Renaming the button to "Buy"

// Function to update the display
function updateDisplay() {
    timeDisplay.textContent = `Current Time: ${currentTime.toExponential(2)}`;
    timePerSecondDisplay.textContent = `Time per second: ${timePerSecond.toExponential(2)}`;
    upgradeDisplay.textContent = `Current Upgrade: ${upgrades[currentUpgrade].name}`;
    upgradeButton.textContent = `Buy ${upgrades[currentUpgrade + 1]?.name || "No more upgrades!"}`;

    // Disable button if not enough time for next upgrade
    upgradeButton.disabled = currentTime < upgrades[currentUpgrade + 1]?.cost;
}

// Function to apply the upgrade
function buyUpgrade() {
    if (currentUpgrade < upgrades.length - 1) {
        const nextUpgrade = upgrades[currentUpgrade + 1];
        if (currentTime >= nextUpgrade.cost) {
            currentTime -= nextUpgrade.cost;
            currentUpgrade++;
            timePerSecond = nextUpgrade.timePerSecond;

            // If upgrade has a random boost (like "Why am I here?"), apply that
            if (nextUpgrade.randomBoost) {
                let randomBoost = Math.random() * (1.4e-43 - 1e-44) + 1e-44; // Random speed boost in range
                timePerSecond += randomBoost;
                alert(`Upgrade "Why am I here?" bought! Time gain multiplier increased by ${randomBoost.toExponential(2)}.`);
            }

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
upgradeButton.addEventListener('click', buyUpgrade);

// Initialize display
updateDisplay();

let isWorkMode = true;
const WORK_TIME = 25;
const REST_TIME = 5;

// Get DOM elements
const toggleButton = document.getElementById('toggle-mode');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');

let timeLeft;
let timerId = null;

// Initialize timer
function initializeTimer() {
    timeLeft = isWorkMode ? WORK_TIME * 60 : REST_TIME * 60;
    updateDisplay();
}

// Toggle between work and rest modes
toggleButton.addEventListener('click', () => {
    isWorkMode = !isWorkMode;
    toggleButton.textContent = isWorkMode ? 'Work Mode' : 'Rest Mode';
    
    // Stop the timer if it's running
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
        startButton.textContent = 'Start';
    }
    
    initializeTimer();
});

// Update the display
function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

// Start/Pause timer
startButton.addEventListener('click', () => {
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
        startButton.textContent = 'Start';
    } else {
        startButton.textContent = 'Pause';
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            
            if (timeLeft <= 0) {
                clearInterval(timerId);
                timerId = null;
                startButton.textContent = 'Start';
                alert(isWorkMode ? 'Work time is over!' : 'Rest time is over!');
                initializeTimer();
            }
        }, 1000);
    }
});

// Reset timer
resetButton.addEventListener('click', () => {
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
        startButton.textContent = 'Start';
    }
    initializeTimer();
});

// Initialize the timer when the page loads
initializeTimer(); 
let startTime, updatedTime, difference = 0, tInterval, savedTime = 0;
let running = false;

const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const milliseconds = document.getElementById('milliseconds');
const lapsList = document.getElementById('laps-list');

startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);

function start() {
    if (!running) {
        if (savedTime) {
            startTime = new Date().getTime() - savedTime;
        } else {
            startTime = new Date().getTime();
        }
        tInterval = setInterval(updateTime, 10);  // Reduced interval for better precision
        running = true;
        startBtn.style.display = 'none';
        pauseBtn.style.display = 'inline';
    }
}

function pause() {
    if (running) {
        clearInterval(tInterval);
        savedTime = difference;
        running = false;
        startBtn.style.display = 'inline';
        pauseBtn.style.display = 'none';
    }
}

function reset() {
    clearInterval(tInterval);  // Stop the timer
    running = false;           // Set running to false
    savedTime = 0;             // Reset savedTime
    difference = 0;            // Reset the time difference
    startTime = 0;             // Reset startTime
    startBtn.style.display = 'inline';  // Show the start button
    pauseBtn.style.display = 'none';    // Hide the pause button
    minutes.innerHTML = '00';           // Reset display to 00:00:00
    seconds.innerHTML = '00';
    milliseconds.innerHTML = '00';
    lapsList.innerHTML = '';            // Clear the lap times
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = (updatedTime - startTime);

    let minutesPassed = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let secondsPassed = Math.floor((difference % (1000 * 60)) / 1000);
    let millisecondsPassed = Math.floor((difference % 1000) / 10);

    minutes.innerHTML = minutesPassed < 10 ? '0' + minutesPassed : minutesPassed;
    seconds.innerHTML = secondsPassed < 10 ? '0' + secondsPassed : secondsPassed;
    milliseconds.innerHTML = millisecondsPassed < 10 ? '0' + millisecondsPassed : millisecondsPassed;
}

function recordLap() {
    const lapTime = `${minutes.innerHTML}:${seconds.innerHTML}:${milliseconds.innerHTML}`;
    const li = document.createElement('li');
    li.textContent = lapTime;
    lapsList.appendChild(li);
}

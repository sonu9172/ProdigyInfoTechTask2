let startTime;
let interval;
let lapCounter = 1;

const timeElement = document.getElementById("time");
const startPauseButton = document.getElementById("startPause");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const lapList = document.getElementById("lapList");

startPauseButton.addEventListener("click", startPause);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", lap);

function startPause() {
  if (!startTime) {
    startTime = Date.now() - (interval || 0);
    startPauseButton.textContent = "Pause";
    interval = setInterval(updateTime, 1000);
  } else {
    clearInterval(interval);
    interval = null;
    startPauseButton.textContent = "Play";
  }
}

function updateTime() {
  const elapsedTime = Date.now() - startTime;
  const formattedTime = formatTime(elapsedTime);
  timeElement.textContent = formattedTime;
}

function formatTime(time) {
  const date = new Date(time);
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const seconds = date.getUTCSeconds().toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

function reset() {
  clearInterval(interval);
  interval = null;
  startTime = null;
  timeElement.textContent = "00:00:00";
  startPauseButton.textContent = "Play";
  lapCounter = 1;
  lapList.innerHTML = "";
}

function lap() {
  if (startTime && interval) {
    const lapTime = formatTime(Date.now() - startTime);
    const lapItem = document.createElement("li");
    lapItem.className = "lap-item";
    lapItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
    lapList.appendChild(lapItem);
    lapCounter++;
  }
}

let timer;
let isRunning = false;
let timeLeft = 25 * 60; // 25分を秒に変換

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (isRunning) return;
    
    isRunning = true;
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            document.getElementById('timer-display').textContent = formatTime(timeLeft);
        } else {
            clearInterval(timer);
            isRunning = false;
            alert('時間になりました！');
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    timeLeft = 25 * 60;
    document.getElementById('timer-display').textContent = formatTime(timeLeft);
}

document.getElementById('start-btn').addEventListener('click', startTimer);
document.getElementById('reset-btn').addEventListener('click', resetTimer);

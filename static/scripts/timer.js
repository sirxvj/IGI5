const timerDuration = 60 * 60 * 1000;
const timer = document.getElementById('countdown');

function formatTime(ms)
{
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer(endTime)
{
    const interval = setInterval(() => {
    const now = new Date().getTime();
    const timeRemaining = endTime - now;

    if (timeRemaining > 0)
    {
        timer.textContent = formatTime(timeRemaining);
    }
    else
    {
        clearInterval(interval);
        timer.textContent = 'Время истекло!';
        localStorage.removeItem('timerStart');
    }
    }, 1000);
}

let timerStart = localStorage.getItem('timerStart');

if (!timerStart)
{
    timerStart = new Date().getTime();
    localStorage.setItem('timerStart', timerStart);
}

const endTime = parseInt(timerStart) + timerDuration;

startTimer(endTime);
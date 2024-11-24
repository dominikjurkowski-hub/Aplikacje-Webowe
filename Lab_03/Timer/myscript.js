let timerOnScreen = document.getElementById('timer');


let counter=0;
let timer_on = false;

function timedCount() {
    timerOnScreen.textContent = formatTime(counter);
    counter++;
    timeout = setTimeout(timedCount, 1000);
}

function startCount() {
    if (!timer_on) {
        timer_on = true;
        timedCount();
    }
}

function stopCount() {
    clearTimeout(timeout);
    timer_on = 0;
}

function resetCount() {
    counter=0;
    timerOnScreen.textContent = formatTime(counter);
}

function formatTime(counter){
    let seconds = counter%60;
    let minutes = Math.floor(counter / 60);
    if (minutes>0){
        return (minutes + "m" + seconds + "s");
    }
    return (seconds + "s");
}







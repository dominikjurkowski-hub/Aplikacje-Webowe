var achievements = document.getElementsByClassName("achievement");
var modals = document.getElementsByClassName("modal");

for (var i = 0; i < achievements.length; i++) {
    achievements[i].onclick = function() {
        var modalId = this.getAttribute("data-modal");
        var modal = document.getElementById(modalId);
        modal.style.display = "block";
    }
}


window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
    }
}


function showTime(){
    var date = new Date();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    var when = "AM";

    if(h == 0){
        h = 12;
    }
    else if(h > 12){
        h = h - 12;
        when = "PM";
    }

    if (h < 10) {
        h = "0" + h;
    }
    if (m < 10) {
        m = "0" + m;
    }
    if (s < 10) {
        s = "0" + s;
    }

    var time = h + ":" + m + ":" + s + " " + when;
    document.getElementById("clock").textContent = time;

    setTimeout(showTime, 1000);

}

showTime();
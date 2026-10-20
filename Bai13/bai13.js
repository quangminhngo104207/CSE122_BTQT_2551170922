const IMG_PATH = "images/Bai13/";

function pad(value) {
    return value < 10 ? "0" + value : "" + value;
}

function toImages(time) {
    let html = "";
    for (const ch of time) {
        if (ch === ":") {
            html += '<img src="' + IMG_PATH + 'haicham.gif" alt=":">';
        } else {
            html += '<img src="' + IMG_PATH + "0" + ch + '.gif" alt="' + ch + '">';
        }
    }
    return html;
}

function getGreeting(hour) {
    if (hour < 12) {
        return "Chào buổi sáng";
    }
    if (hour < 18) {
        return "Chào buổi chiều";
    }
    return "Chào buổi tối";
}

function updateClock() {
    const now = new Date();
    const time = pad(now.getHours()) + ":" + pad(now.getMinutes()) + ":" + pad(now.getSeconds());
    document.getElementById("dongHo").innerHTML = toImages(time);
    document.getElementById("loiChao").textContent = getGreeting(now.getHours());
}

updateClock();
setInterval(updateClock, 1000);

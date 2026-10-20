const WEEKDAYS = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];

function getGreeting(hour) {
    if (hour < 12) {
        return "Chào buổi sáng!";
    }
    if (hour < 18) {
        return "Chào buổi chiều!";
    }
    return "Chào buổi tối!";
}

function printCalendar() {
    const d = parseInt(document.getElementById("inpNgay").value, 10);
    const m = parseInt(document.getElementById("inpThang").value, 10);
    const y = parseInt(document.getElementById("inpNam").value, 10);
    const date = new Date(y, m - 1, d);

    if (!d || !m || !y ||
        date.getFullYear() !== y ||
        date.getMonth() !== m - 1 ||
        date.getDate() !== d) {
        alert("Ngày tháng không hợp lệ, bạn vui lòng nhập lại!");
        return;
    }

    document.getElementById("nam").textContent = y;
    document.getElementById("thang").textContent = "Tháng " + m;
    document.getElementById("ngay").textContent = d;
    document.getElementById("thu").textContent = WEEKDAYS[date.getDay()];
    document.getElementById("loiChao").textContent = getGreeting(new Date().getHours());
}

document.getElementById("formLich").addEventListener("submit", function (event) {
    event.preventDefault();
    printCalendar();
});

printCalendar();

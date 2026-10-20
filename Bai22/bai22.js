const btnToggle = document.getElementById("btnToggle");
const note = document.getElementById("note");

function isDark() {
    return document.body.classList.contains("toi");
}

function sync() {
    btnToggle.setAttribute("aria-checked", isDark() ? "true" : "false");
    note.textContent = isDark()
        ? "Đây là giao diện ở chế độ TỐI (đang bật)."
        : "Đây là giao diện ở chế độ SÁNG (đang tắt).";
}

btnToggle.addEventListener("click", function () {
    document.body.classList.toggle("toi");
    sync();
});

sync();

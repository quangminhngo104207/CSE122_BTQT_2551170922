const form = document.getElementById("formThem");
const input = document.getElementById("inpViec");
const list = document.getElementById("danhSach");
const countEl = document.getElementById("soCongViec");

function updateCount() {
    const total = list.querySelectorAll(".task").length;
    const left = list.querySelectorAll(".task:not(.done)").length;

    if (total === 0) {
        countEl.textContent = "Danh sách đang trống.";
        return;
    }
    countEl.textContent = "Còn " + left + " việc chưa hoàn thành";
}

function addTask(text) {
    const item = document.createElement("li");
    item.className = "task";

    const box = document.createElement("input");
    box.type = "checkbox";
    box.className = "box";

    const label = document.createElement("span");
    label.className = "text";
    label.textContent = text;

    const del = document.createElement("button");
    del.type = "button";
    del.className = "del";
    del.textContent = "Xoá";

    item.append(box, label, del);
    list.appendChild(item);
}

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const text = input.value.trim();

    if (text === "") {
        alert("Bạn chưa nhập nội dung công việc!");
        return;
    }

    addTask(text);
    input.value = "";
    input.focus();
    updateCount();
});

list.addEventListener("click", function (event) {
    const task = event.target.closest(".task");
    if (!task) {
        return;
    }

    if (event.target.classList.contains("del")) {
        task.remove();
        updateCount();
        return;
    }

    const box = task.querySelector(".box");
    if (event.target !== box) {
        box.checked = !box.checked;
    }
    task.classList.toggle("done", box.checked);
    updateCount();
});

updateCount();

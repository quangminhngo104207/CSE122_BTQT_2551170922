const photo = document.getElementById("photo");
const toolbar = document.getElementById("toolbar");
const buttons = toolbar.querySelectorAll("button");

toolbar.addEventListener("click", function (event) {
    const button = event.target.closest("button");
    if (!button) {
        return;
    }

    photo.className = "fx-" + button.dataset.fx;

    buttons.forEach(function (item) {
        item.classList.toggle("active", item === button);
    });
});

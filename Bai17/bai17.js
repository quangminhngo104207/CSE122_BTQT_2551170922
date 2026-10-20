const EMAIL_RULE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function show(id, ok, text) {
    const input = document.getElementById(id);
    const msg = document.getElementById(id + "Msg");

    input.classList.toggle("valid", ok);
    input.classList.toggle("invalid", !ok);
    msg.textContent = (ok ? "✓ " : "✗ ") + text;
    msg.className = "msg " + (ok ? "ok" : "err");
    return ok;
}

function checkHoten() {
    const value = document.getElementById("hoten").value.trim();
    if (value === "") {
        return show("hoten", false, "Họ và tên không được để trống");
    }
    return show("hoten", true, "Hợp lệ");
}

function checkEmail() {
    const value = document.getElementById("email").value.trim();

    if (value === "") {
        return show("email", false, "Email không được để trống");
    }
    if (value.indexOf("@") === -1) {
        return show("email", false, "Email không hợp lệ (thiếu ký tự @)");
    }
    if (value.split("@")[1].indexOf(".") === -1) {
        return show("email", false, "Email không hợp lệ (thiếu tên miền)");
    }
    if (!EMAIL_RULE.test(value)) {
        return show("email", false, "Email không hợp lệ");
    }
    return show("email", true, "Hợp lệ");
}

function checkMatkhau() {
    const value = document.getElementById("matkhau").value;

    if (value === "") {
        return show("matkhau", false, "Mật khẩu không được để trống");
    }
    if (value.length < 6) {
        return show("matkhau", false, "Mật khẩu phải có ít nhất 6 ký tự");
    }
    return show("matkhau", true, "Hợp lệ");
}

function checkXacnhan() {
    const value = document.getElementById("xacnhan").value;

    if (value === "") {
        return show("xacnhan", false, "Vui lòng nhập lại mật khẩu");
    }
    if (value !== document.getElementById("matkhau").value) {
        return show("xacnhan", false, "Mật khẩu xác nhận không khớp");
    }
    return show("xacnhan", true, "Hợp lệ");
}

const CHECKERS = {
    hoten: checkHoten,
    email: checkEmail,
    matkhau: checkMatkhau,
    xacnhan: checkXacnhan
};

function checkAll() {
    let valid = true;
    for (const id in CHECKERS) {
        if (!CHECKERS[id]()) {
            valid = false;
        }
    }
    return valid;
}

document.getElementById("formDangKy").addEventListener("submit", function (event) {
    event.preventDefault();
    if (checkAll()) {
        alert("Đăng ký thành công! Dữ liệu đã hợp lệ.");
    }
});

for (const id in CHECKERS) {
    document.getElementById(id).addEventListener("blur", CHECKERS[id]);
}

checkAll();

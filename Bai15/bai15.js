const expressionEl = document.getElementById("expression");
const resultEl = document.getElementById("result");

const SYMBOLS = {
    "÷": "÷",
    x: "×",
    "-": "−",
    "+": "+",
    "%": "%"
};

let expression = "";
let resultText = "0";
let justCalculated = false;

function toJs(expr) {
    return expr
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/−/g, "-")
        .replace(/(\d+(?:\.\d+)?)%/g, "($1/100)");
}

function calculate(expr) {
    const js = toJs(expr);
    if (!/[0-9]/.test(js)) {
        return null;
    }
    try {
        const value = Function('"use strict"; return (' + js + ");")();
        if (typeof value !== "number" || !isFinite(value)) {
            return null;
        }
        return Math.round(value * 10000000000) / 10000000000;
    } catch (error) {
        return null;
    }
}

function render() {
    expressionEl.textContent = expression === "" ? " " : expression;
    resultEl.textContent = resultText;
}

function updatePreview() {
    const value = calculate(expression);
    if (value === null) {
        resultText = expression === "" ? "0" : expression;
    } else {
        resultText = String(value);
    }
}

function lastChar() {
    return expression.trim().slice(-1);
}

function pressDigit(digit) {
    if (justCalculated) {
        expression = "";
        justCalculated = false;
    }
    expression += digit;
    updatePreview();
    render();
}

function pressDot() {
    if (justCalculated) {
        expression = "";
        justCalculated = false;
    }
    const currentNumber = expression.split(/[+−×÷()%]/).pop();
    if (currentNumber.indexOf(".") !== -1) {
        return;
    }
    expression += currentNumber === "" ? "0." : ".";
    updatePreview();
    render();
}

function pressOperator(symbol) {
    if (expression === "") {
        if (symbol === "-") {
            expression = "0 −";
        } else {
            return;
        }
    } else if (justCalculated) {
        justCalculated = false;
    }
    if (/[+−×÷%]$/.test(expression.trim())) {
        expression = expression.trim().slice(0, -1);
    }
    expression = expression.trimEnd() + " " + symbol + " ";
    updatePreview();
    render();
}

function pressBracket() {
    if (justCalculated) {
        expression = "";
        justCalculated = false;
    }
    const opened = (expression.match(/\(/g) || []).length;
    const closed = (expression.match(/\)/g) || []).length;
    const needClose = opened > closed && /[0-9.)]/.test(lastChar());
    expression += needClose ? ")" : "(";
    updatePreview();
    render();
}

function pressEqual() {
    const value = calculate(expression);
    if (value === null) {
        resultText = "Nhập lại";
        render();
        return;
    }
    resultText = String(value);
    justCalculated = true;
    render();
}

function press(key) {
    if (key === "C") {
        expression = "";
        resultText = "0";
        justCalculated = false;
        render();
    } else if (key === "=") {
        pressEqual();
    } else if (key === "()") {
        pressBracket();
    } else if (key === ".") {
        pressDot();
    } else if (SYMBOLS[key]) {
        pressOperator(SYMBOLS[key]);
    } else {
        pressDigit(key);
    }
}

document.getElementById("keys").addEventListener("click", function (event) {
    const button = event.target.closest("button");
    if (button) {
        press(button.dataset.key);
    }
});

render();

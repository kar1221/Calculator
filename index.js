let displayValue = "0";
let actualValue = 0;
let operator;
let completeCalculation = false;

function onButtonClick(value) {
  if (isNaN(value)) {
    handleSymbol(value);
  } else {
    handleDigit(value);
  }

  updateDisplay(displayValue);
}

function handleSymbol(symbol) {
  switch (symbol) {
    case "AC":
      displayValue = "0";
      actualValue = 0;
      operator = null;
      break;
    case "Del":
      if (completeCalculation) {
        displayValue = "0";
        completeCalculation = false;
        return;
      }

      if (displayValue.length === 1) {
        displayValue = "0";
      } else {
        displayValue = displayValue.slice(0, -1);
      }
      break;
    case "+":
    case "-":
    case "×":
    case "÷":
      handleOperator(symbol);
      break;
    case "=":
      if (operator === null) {
        return;
      }
      calculate(+displayValue);
      displayValue = actualValue.toString();
      actualValue = 0;
      operator = null;
      completeCalculation = true;
      emptyOverview();
      break;
    case ".":
      if (!displayValue.includes(".")) {
        displayValue += ".";
      }
      break;
  }
}

function handleOperator(symbol) {
  if (actualValue === 0) {
    actualValue = +displayValue;
  } else {
    calculate(+displayValue);
  }

  operator = symbol;
  displayValue = "0";
  updateOverview(actualValue, operator);
}

function calculate(value) {
  switch (operator) {
    case "+":
      actualValue += value;
      break;
    case "-":
      actualValue -= value;
      break;
    case "×":
      actualValue *= value;
      break;
    case "÷":
      actualValue /= value;
      break;
  }
}

function handleDigit(digit) {
  if (completeCalculation) {
    displayValue = digit;
    completeCalculation = false;
    return;
  }

  if (displayValue === "0") {
    displayValue = digit;
  } else {
    displayValue += digit;
  }
}

function updateOverview(value, symbol) {
  document.getElementById("display-history").textContent = `${value} ${symbol}`;
}

function emptyOverview() {
  document.getElementById("display-history").textContent = "";
}

function updateDisplay(value) {
  const displayPanel = document.getElementById("display");
  if (value === "Infinity" || value === "NaN") {
    displayPanel.textContent = "ಠ_ಠ";
    return;
  }

  if (value.length > 10) {
    displayPanel.textContent = value.slice(0, 9) + "...";
    return;
  }

  displayPanel.textContent = value;
}

const buttons = document.querySelectorAll(".key");
for (const button of buttons) {
  button.addEventListener("click", (event) => {
    onButtonClick(event.target.textContent);
  });
}

document.addEventListener("keydown", (event) => {
  event.preventDefault();
  const key = event.key;
  console.log(key);

  if (key === "Enter") {
    onButtonClick("=");
    return;
  }

  if (key === "Escape") {
    onButtonClick("AC");
    return;
  }

  if (key === "Backspace") {
    onButtonClick("Del");
    return;
  }

  if (key === "*") {
    onButtonClick("×");
    return;
  }

  if (key === "/") {
    onButtonClick("÷");
    return;
  }

  onButtonClick(key);
});

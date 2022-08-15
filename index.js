const display = document.querySelector(".display");
const equal = document.getElementById("equal");
const clearAll = document.getElementById("clear");

clearAll.addEventListener("click", function () {
  display.value = "";
});

equal.addEventListener("click", function () {
  display.value = calc(display.value);
});

function catchbutton(value) {
  display.value = display.value + value.innerHTML;
}

function priority(sign) {
  switch (sign) {
    case "*":
    case "/":
      return 2;
    case "+":
    case "-":
      return 1;
    default:
      return 0;
  }
}

function is_Number(ch) {
  if (ch >= "0" && ch <= "9") {
    return true;
  }
  return false;
}

function isOperator(symbol) {
  switch (symbol) {
    case "*":
    case "/":
    case "+":
    case "-":
      return true;
    default:
      return false;
  }
}

function calculate(second, first, sign) {
  switch (sign) {
    case "+":
      return first + second;
    case "-":
      return first - second;
    case "*":
      return first * second;
    case "/":
      if (second == 0) display.value = "Division by zero!";
      else return parseFloat(first / second, 10);
    default:
      0;
  }
}

function calc(inner) {
  let numbers = [];
  let operations = [];
  let minusSymbol = inner[0] === "-" ? true : false;
  let i = minusSymbol ? 1 : 0;

  for (i; i < inner.length; ++i) {
    if (is_Number(inner[i])) {
      let temp_num = "";

      while (inner.length > i && is_Number(inner[i])) {
        temp_num = temp_num + inner[i++];
      }
      --i;
      let integer = parseInt(temp_num, 10);
      if (minusSymbol) integer = integer * -1;
      numbers.push(integer);
      minusSymbol = false;
    } else if (isOperator(inner[i])) {
      while (
        operations.length > 0 &&
        priority(inner[i]) <= priority(operations[operations.length - 1])
      ) {
        numbers.push(calculate(numbers.pop(), numbers.pop(), operations.pop()));
      }
      operations.push(inner[i]);
    }
  }
  while (operations.length > 0) {
    numbers.push(calculate(numbers.pop(), numbers.pop(), operations.pop()));
  }
  return numbers.pop();
}

const conversionDetails = {
  binary: ['2', '8', '10', '16'],
  octal: ['8', '2', '10', '16'],
  decimal: ['10', '2', '8', '16'],
  hexadecimal: ['16', '2', '8', '10'],
};
const hexToDecimal = {
  A: 10,
  B: 11,
  C: 12,
  D: 13,
  E: 14,
  F: 15,
}
let currentNumberSystem = "binary";

const numberSystemSelector = document.querySelector("#number-system");
numberSystemSelector.addEventListener('change', (e) => {
  changeNumberSystem(e.target.value);
  currentNumberSystem = e.target.value;
});

const userValue = document.querySelector("#user-value");
userValue.addEventListener('input', (e) => {
  populateInputs(decimalToAny(e.target.value));
});
function changeNumberSystem(numberSystem) {
  const inputContainers = document.querySelectorAll(".input-container");
  Array.from(inputContainers).forEach((element, index) => {
    element.setAttribute("data-baseNumber", conversionDetails[numberSystem][index]);
  });
  const inputResults = document.querySelectorAll(".input-result");
  Array.from(inputResults).forEach((element, index) => {
    element.setAttribute("data-baseNumber", conversionDetails[numberSystem][index + 1]);
  });
}

function populateInputs(convertedNumbers) {
  const inputResults = document.querySelectorAll(".input-result");
  Array.from(inputResults).forEach((e) => {
    switch (e.getAttribute("data-baseNumber")) {
      case "2":
        e.value = convertedNumbers['2'].join("");
        break;
      case "8":
        e.value = convertedNumbers['8'].join("");
        break;
      case "10":
        e.value = convertedNumbers['10'].join("");
        break;
      case "16":
        e.value = convertedNumbers['16'].join("");
        break;
      default:
        break;
    }
  });
}

function convertInputValue(value, numberSystem) {
  switch (numberSystem) {
    case "decimal":
      return decimalToAny(value);
    default:
      break;
  }
}

function decimalToAny(decimalNumber) {
  let result = {
    2: [],
    8: [],
    16: [],
  }
  for (const key in result) {
    result[key] = getRemainders(decimalNumber, key).toReversed();
  }
  return result;
}

function binaryToDecimal(binaryNumber) {
  let value = 0;
  `${binaryNumber}`.split("").toReversed().forEach((e, index) => {
    let digit = parseInt(e, 10);
    if (digit === 1) {
      value += (digit * (2 ** index));
    }
  });
  return value;
}
function octalToDecimal(octalNumber) {
  let value = 0;
  `${octalNumber}`.split("").toReversed().forEach((e, index) => {
    let digit = parseInt(e, 10);
    value += (digit * (8 ** index));
  });
  return value;
}
function hexadecimalToDecimal(hexadecimalNumber) {
  let value = 0;
  `${hexadecimalNumber}`.split("").toReversed().forEach((e, index) => {
    if (Object.hasOwn(hexToDecimal, e.toUpperCase())) {
      value += (hexToDecimal[e.toUpperCase()] * (16 ** index));
    }
    else {
      let digit = parseInt(e, 10);
      value += (digit * (16 ** index));
    }
  });
  return value;
}

function getRemainders(dividend, divisor) {
  const remainder = dividend % divisor;
  const quotient = Math.floor(dividend / divisor);

  if ((dividend / divisor) < 1) {
    return [remainder];
  } else {
    return [remainder, ...getRemainders(quotient, divisor)];
  }
}
const conversionDetails = {
  binary: ['2', '8', '10', '16'],
  octal: ['8', '2', '10', '16'],
  decimal: ['10', '2', '8', '16'],
  hexadecimal: ['16', '2', '8', '10'],
};

const numberSystemSelector = document.querySelector("#number-system");
numberSystemSelector.addEventListener('change', (e) => {
  changeNumberSystem(e.target.value);
});

function changeNumberSystem(numberSystem) {
  const inputContainers = document.querySelectorAll(".input-container");
  Array.from(inputContainers).forEach((element, index) => {
    element.setAttribute("data-baseNumber", conversionDetails[numberSystem][index]);
  });
}
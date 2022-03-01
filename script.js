const inputBill = document.querySelector('input[name="bill"]');
const inputPeople = document.querySelector('input[name="people"]');
const radios = Array.from(document.querySelectorAll("input[name='option'] + label"));
const totalOut = document.querySelector(".total p");
const amountOut = document.querySelector(".amount p");
const custom = document.querySelector("input[name='custom']");
const reset = document.querySelector(".button-reset");
const resetRemove = document.querySelector(".button-reset button");
const span1 = document.createElement("span");
const span2 = document.createElement("span");
let value;
let key;
span1.style.color = "red";
span2.style.color = "red";

let radioValue = 0;
let divider = 0;

//Prevent select input radio
custom.onfocus = () => {
  let radioTeste = document.querySelector("input[type='radio']:checked");

  if (radioTeste) {
    radioTeste.checked = false;

    if (value !== "" && Number(value) > 0 && key !== "" && Number(key) > 0 && Number.isInteger(key) === true) {
      if (custom.value !== "") {
        radioValue = custom.value;

        totalOut.innerHTML = `$${(divider * (radioValue / 100 + 1)).toFixed(2)}`;
        amountOut.innerHTML = `$${(divider * (radioValue / 100)).toFixed(2)}`;
      } else {
        radioValue = 0;

        totalOut.innerHTML = `$${divider.toFixed(2)}`;
        amountOut.innerHTML = `$${(divider * (radioValue / 100)).toFixed(2)}`;
      }
    }
  }
};

//Input custom
function inputCustom(event) {
  const customValue = event.target.value;
  radioValue = Number(customValue);

  if (customValue < 0) {
    resetRemove.setAttribute("disabled", "");
    resetRemove.classList.add("blocked");
    custom.style.color = "red";

    totalOut.innerHTML = `$0.00`;
    amountOut.innerHTML = `$0.00`;
  } else {
    custom.style.color = "inherit";

    if (value !== "" && Number(value) > 0 && key !== "" && Number(key) > 0 && Number.isInteger(key) === true) {
      resetRemove.removeAttribute("disabled");
      resetRemove.classList.remove("blocked");
      totalOut.innerHTML = `$${(divider * (radioValue / 100 + 1)).toFixed(2)}`;
      amountOut.innerHTML = `$${(divider * (radioValue / 100)).toFixed(2)}`;
    }
  }
}

custom.addEventListener("keyup", inputCustom);

//Radio inputs
radios.forEach((radio) => {
  radio.addEventListener("click", radioSelect);
});

function radioSelect(event) {
  if (event.target.getAttribute("for") === "option5") {
    radioValue = 5;
  } else if (event.target.getAttribute("for") === "option10") {
    radioValue = 10;
  } else if (event.target.getAttribute("for") === "option15") {
    radioValue = 15;
  } else if (event.target.getAttribute("for") === "option25") {
    radioValue = 25;
  } else if (event.target.getAttribute("for") === "option50") {
    radioValue = 50;
  }

  if (value !== "" && Number(value) > 0 && key !== "" && Number(key) > 0 && Number.isInteger(key) === true) {
    totalOut.innerHTML = `$${(divider * (radioValue / 100 + 1)).toFixed(2)}`;
    amountOut.innerHTML = `$${(divider * (radioValue / 100)).toFixed(2)}`;
  }
}

//Bill and people inputs
function calc() {
  value = document.querySelector('input[name="bill"]').value;
  key = document.querySelector('input[name="people"]').value;
  const total = document.querySelector(".total p");
  const amount = document.querySelector(".amount p");
  const default5 = document.querySelector("input[value='option5']");
  const labelBill = document.querySelector(".label-bill");
  const labelPeople = document.querySelector(".label-people");

  if (value !== "") {
    value = Number(value);

    if (value < 0) {
      span1.innerHTML = "Can't be negative";
      labelBill.appendChild(span1);
      inputBill.style.color = "red";
      inputBill.classList.add("zero-negative");
    } else if (value === 0) {
      span1.innerHTML = "Can't be zero";
      labelBill.appendChild(span1);
      inputBill.style.color = "red";
      inputBill.classList.add("zero-negative");
    } else {
      span1.innerHTML = "";
      inputBill.style.color = "inherit";
      inputBill.classList.remove("zero-negative");

      total.innerHTML = `$0.00`;
      amount.innerHTML = `$0.00`;
    }
  } else {
    span1.innerHTML = "";
    inputBill.style.color = "inherit";
    inputBill.classList.remove("zero-negative");

    total.innerHTML = `$0.00`;
    amount.innerHTML = `$0.00`;
  }

  if (key !== "") {
    key = Number(key);
    if (key < 0) {
      span2.innerHTML = "Can't be negative";
      labelPeople.appendChild(span2);
      inputPeople.style.color = "red";
      inputPeople.classList.add("zero-negative");
    } else if (key === 0) {
      span2.innerHTML = "Can't be zero";
      labelPeople.appendChild(span2);
      inputPeople.style.color = "red";
      inputPeople.classList.add("zero-negative");
    } else if (Number.isInteger(key) === false) {
      span2.innerHTML = "Can't be flot";
      labelPeople.appendChild(span2);
      inputPeople.style.color = "red";
      inputPeople.classList.add("zero-negative");
    } else {
      span2.innerHTML = "";
      inputPeople.style.color = "inherit";
      inputPeople.classList.remove("zero-negative");
    }
  } else {
    span2.innerHTML = "";
    inputPeople.style.color = "inherit";
    inputPeople.classList.remove("zero-negative");

    total.innerHTML = `$0.00`;
    amount.innerHTML = `$0.00`;
  }

  if (value > 0 && key > 0 && Number.isInteger(key) === true) {
    divider = value / key;

    if (Number(custom.value) > 0 || custom.value === "") {
      resetRemove.removeAttribute("disabled");
      resetRemove.classList.remove("blocked");
      if (default5.checked) {
        total.innerHTML = `$${(divider * 1.05).toFixed(2)}`;
        amount.innerHTML = `$${(divider * 0.05).toFixed(2)}`;
      } else {
        total.innerHTML = `$${(divider * (radioValue / 100 + 1)).toFixed(2)}`;
        amount.innerHTML = `$${(divider * (radioValue / 100)).toFixed(2)}`;
      }
    }
  } else {
    resetRemove.setAttribute("disabled", "");
    resetRemove.classList.add("blocked");
  }
}

inputBill.addEventListener("keyup", calc);
inputPeople.addEventListener("keyup", calc);

function resetButton(event) {
  const default5 = document.querySelector("input[value='option5']");
  event.preventDefault();
  radioValue = 0;
  divider = 0;
  inputBill.value = 0;
  inputPeople.value = 0;
  totalOut.innerHTML = `$0.00`;
  amountOut.innerHTML = `$0.00`;
  custom.value = "";
  default5.checked = true;
  resetRemove.setAttribute("disabled", "");
  resetRemove.classList.add("blocked");
}

reset.addEventListener("click", resetButton);

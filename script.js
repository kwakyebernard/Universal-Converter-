const clickSound = document.getElementById("clickSound");
const category = document.getElementById("category");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");
const inputValue = document.getElementById("inputValue");
const result = document.getElementById("result");

const units = {
  length: { Meter: 1, Kilometer: 1000, Mile: 1609.34, Foot: 0.3048 },
  weight: { Gram: 1, Kilogram: 1000, Pound: 453.592, Ounce: 28.3495 },
  volume: { Liter: 1, Milliliter: 0.001, Gallon: 3.785 },
  speed: { "m/s": 1, "km/h": 0.277778, "mph": 0.44704 },
  time: { Second: 1, Minute: 60, Hour: 3600, Day: 86400 },
  data: { Byte: 1, KB: 1024, MB: 1048576, GB: 1073741824 },
  temperature: ["Celsius", "Fahrenheit", "Kelvin"]
};

function loadUnits() {
  fromUnit.innerHTML = "";
  toUnit.innerHTML = "";

  if (category.value === "temperature") {
    units.temperature.forEach(u => {
      fromUnit.innerHTML += `<option>${u}</option>`;
      toUnit.innerHTML += `<option>${u}</option>`;
    });
  } else {
    for (let u in units[category.value]) {
      fromUnit.innerHTML += `<option>${u}</option>`;
      toUnit.innerHTML += `<option>${u}</option>`;
    }
  }
}

category.addEventListener("change", loadUnits);
loadUnits();

document.getElementById("convertBtn").addEventListener("click", () => {
  clickSound.play();

  let value = Number(inputValue.value);
  if (!value) {
    result.innerText = "Enter a valid number";
    return;
  }

  let from = fromUnit.value;
  let to = toUnit.value;

  if (category.value === "temperature") {
    let output;
    if (from === "Celsius" && to === "Fahrenheit") output = value * 9/5 + 32;
    else if (from === "Fahrenheit" && to === "Celsius") output = (value - 32) * 5/9;
    else if (from === "Celsius" && to === "Kelvin") output = value + 273.15;
    else if (from === "Kelvin" && to === "Celsius") output = value - 273.15;
    else output = value;
    result.innerText = output.toFixed(2);
    return;
  }

  let base = value * units[category.value][from];
  let converted = base / units[category.value][to];
  result.innerText = converted.toFixed(4);
});

document.getElementById("darkToggle").onclick = () => {
  document.body.classList.toggle("dark");
};

const red = document.querySelector("#rg-red");
const green = document.querySelector("#rg-green");
const blue = document.querySelector("#rg-blue");
const colorPicked = document.querySelector("#color-picked");
const colorHex = document.querySelector("#color-hex > p");

function pickColor() {
  // alert(`rgb(${red.value}, ${green.value}, ${blue.value})`);
  red.nextElementSibling.value = red.value;
  green.nextElementSibling.value = green.value;
  blue.nextElementSibling.value = blue.value;

  var color = `#${hex(parseInt(red.value))}${hex(parseInt(green.value))}${hex(parseInt(blue.value))}`;

  console.log(color);

  colorPicked.setAttribute("style", `background: ${color}`);
  colorHex.innerHTML = color;

}

function hex(val) {
  var hex = val.toString(16);
  if(val < 16) {
    hex = "0" + hex;
  }
  return hex;
}
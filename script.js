const cardsContainer = document.querySelector(".cards");

const colors = [
  "pink",
  "aqua",
  "crimson",
  "blue",
  "gold",
  "greenyellow",
  "teal",
  "aquamarine",
  "dodgerblue",
];

const colorPickList = [...colors, ...colors];
const color = colorPickList[0];

function buildCard(color) {
  const element = document.createElement("div");
  element.classList.add("card");
  element.setAttribute("background-color", color);
  element.addEventListener("click", () => {
    element.style.backgroundColor = color;
  });
  return element;
}

const card = buildCard(color);
cardsContainer.appendChild(card);

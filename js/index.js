const cardsContainer = document.querySelector(".cards");

const images = [
  { id: 1, name: "graduated-emoji", url: "./images/front-pic1.jpg" },
  { id: 2, name: "thinking-emoji", url: "./images/front-pic2.jpg" },
  { id: 3, name: "crying-emoji", url: "./images/front-pic3.jpg" },
  { id: 4, name: "drink-emoji", url: "./images/front-pic4.jpg" },
  { id: 5, name: "winking-emoji", url: "./images/front-pic5.jpg" },
  { id: 6, name: "dream-emoji", url: "./images/front-pic6.jpg" },
  { id: 7, name: "wondering-emoji", url: "./images/front-pic7.jpg" },
  { id: 8, name: "smile-emoji", url: "./images/front-pic8.jpg" },
];

const imagePickList = [...images, ...images];

const cardCount = imagePickList.length;

function buildCard(image) {
  const element = document.createElement("div");
  element.classList.add("card");

  const img = document.createElement("img");
  img.classList.add("card-img");
  img.setAttribute("src", "./images/back-pic.jpg");

  element.addEventListener("click", () => {
    if (img.getAttribute("src") === image.url) {
      img.setAttribute("src", "./images/back-pic.jpg");
    } else {
      img.setAttribute("src", image.url);
    }
  });

  element.appendChild(img);
  return element;
}

function createCardGrid() {
  for (i = 0; i < cardCount; i++) {
    const randomIndex = getRandomIndex();
    const image = imagePickList[randomIndex];
    const card = buildCard(image);
    imagePickList.splice(randomIndex, 1);
    cardsContainer.appendChild(card);
  }
}

function getRandomIndex() {
  return Math.floor(Math.random() * imagePickList.length);
}

createCardGrid();

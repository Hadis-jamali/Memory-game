const cardsContainer = document.querySelector(".cards");

const images = [
  { id: 1, name: "graduated-emoji", url: "./images/front-pic1.png" },
  { id: 2, name: "thinking-imoji", url: "./images/front-pic2.png" },
  { id: 3, name: "crying-emoji", url: "./images/front-pic3.png" },
  { id: 4, name: "drink-emoji", url: "./images/front-pic4.png" },
  { id: 5, name: "winking-emoji", url: "./images/front-pic5.png" },
  { id: 6, name: "dream-emoji", url: "./images/front-pic6.png" },
  { id: 7, name: "wondering-emoji", url: "./images/front-pic7.png" },
  { id: 8, name: "smile-emoji", url: "./images/front-pic8.png" },
];

const imagePickList = [...images, ...images];

const cardCount = imagePickList.length;

function buildCard(image) {
  const element = document.createElement("div");
  element.classList.add("card");

  const img = document.createElement("img");
  img.classList.add("card-img");
  img.setAttribute("src", "./images/back-pic.jpg");

  img.addEventListener("click", () => {
    if (img.getAttribute("src") === image.url) {
      img.setAttribute("src", "./images/back-pic.jpg");
    } else {
      img.setAttribute("src", image.url);
    }
  });

  element.appendChild(img);
  return element;
}

for (i = 0; i < cardCount; i++) {
  const randomIndex = Math.floor(Math.random() * imagePickList.length);
  const image = imagePickList[randomIndex];
  const card = buildCard(image);
  imagePickList.splice(randomIndex, 1);
  cardsContainer.appendChild(card);
}

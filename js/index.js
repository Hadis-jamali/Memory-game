const cardsContainer = document.querySelector(".cards");

const images = [
  { id: 1, name: "sera", url: "./images/front-pic1.png" },
  { id: 2, name: "lux", url: "./images/front-pic2.png" },
  { id: 3, name: "leblanc", url: "./images/front-pic3.png" },
  { id: 4, name: "brand", url: "./images/front-pic4.png" },
  { id: 5, name: "morgana", url: "./images/front-pic5.png" },
  { id: 6, name: "nami", url: "./images/front-pic6.png" },
  { id: 7, name: "leona", url: "./images/front-pic7.png" },
  { id: 8, name: "xerath", url: "./images/front-pic8.png" },
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

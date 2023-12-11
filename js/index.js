const cardsContainer = document.querySelector(".cards");

const images = [
  { name: "sera", img: "./images/front-pic1.png" },
  { name: "lux", img: "./images/front-pic2.png" },
  { name: "leblanc", img: "./images/front-pic3.png" },
  { name: "brand", img: "./images/front-pic4.png" },
  { name: "morgana", img: "./images/front-pic5.png" },
  { name: "nami", img: "./images/front-pic6.png" },
  { name: "leona", img: "./images/front-pic7.png" },
  { name: "xerath", img: "./images/front-pic8.png" },
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
    img.setAttribute("src", image.img);
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

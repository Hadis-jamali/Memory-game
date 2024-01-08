const cardsContainer = document.querySelector(".cards");
const timerDisplay = document.getElementById("timer");
const resetBtn = document.getElementById("reset-btn");
let cardCount = 0;
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

let firstPic = null;
let counter = 0;

function buildCard(image) {
  const element = document.createElement("div");
  element.classList.add("card");

  const img = document.createElement("img");
  img.classList.add("card-img");
  img.setAttribute("src", "./images/back-pic.jpg");

  element.addEventListener("click", () => {
    startTimer();
    element.classList.add("flip-card");
    if (img.getAttribute("src") === image.url) {
      img.setAttribute("src", "./images/back-pic.jpg");
    } else {
      img.setAttribute("src", image.url);
      img.setAttribute("name", image.name);
      img.setAttribute("id", image.id);

      //the functionality so that once 2 cards are flipped, they stay flipped for X seconds,
      //after which they flip back down automatically and implement a counter for how many times in total you have flipped a card.
      counter++;

      if (firstPic === null) {
        firstPic = img;
      } else {
        setTimeout(() => {
          if (Number(firstPic.getAttribute("id")) !== image.id) {
            img.setAttribute("src", "./images/back-pic.jpg");
            firstPic.setAttribute("src", "./images/back-pic.jpg");
            element.classList.remove("flip-card");
            firstPic.parentNode.classList.remove("flip-card");
          }
          firstPic = null;
        }, 600);
      }
    }
  });

  element.appendChild(img);
  return element;
}

//Random card
function createCardGrid() {
  const imagePickList = [...images, ...images];
  cardCount = imagePickList.length;
  for (i = 0; i < cardCount; i++) {
    const randomIndex = getRandomIndex(imagePickList);
    const image = imagePickList[randomIndex];
    const card = buildCard(image);
    imagePickList.splice(randomIndex, 1);
    cardsContainer.appendChild(card);
  }
}

function getRandomIndex(imagePickList) {
  return Math.floor(Math.random() * imagePickList.length);
}
createCardGrid();

//how much time has passed since you first clicked on a card.
let startTime;
let timerInterval;
let clickedCards = 0;

function startTimer() {
  if (!startTime) {
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
  }

  // Check if all cards have been clicked
  if (clickedCards === cardCount) {
    clearInterval(timerInterval);
  }
}

function updateTimer() {
  const currentTime = Date.now();
  const timePassed = Math.floor((currentTime - startTime) / 1000);
  const date = new Date(timePassed * 1000);
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  timerDisplay.innerText = `${hours}:${minutes}:${seconds}`;
}

//Reset Button

function resetGame() {
  clearInterval(timerInterval);
  startTime = null;
  clickedCards = 0;
  timerDisplay.innerText = "00:00:00";
  resetCards();
}

function resetCards() {
  const items = document.querySelector(".cards");
  items.innerHTML = "";
  createCardGrid();
  // items.forEach((element) => {
  //   element.children[0].setAttribute("src", "./images/back-pic.jpg");
  // });
}

resetBtn.addEventListener("click", resetGame);

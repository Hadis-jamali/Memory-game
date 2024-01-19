const cardsContainer = document.querySelector(".cards");
const timerDisplay = document.getElementById("timer");
const resetBtn = document.getElementById("reset-btn");
const modalTitle = document.querySelector("#modal-title");
const modal = document.querySelector("#modal");

//Api

async function getData() {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/Hadis-jamali/Hadis-jamali.github.io/main/data/memory-cards.json"
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }
    const json = await response.json();

    createCardGrid(json);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
getData();

let firstPic = null;
let secondPic = null;
let counter = 0;
let isLose = false;
let cardCount = 0;
let stopTimer = false;

function buildCard(image) {
  const element = document.createElement("div");
  element.classList.add("card");

  const img = document.createElement("img");
  img.classList.add("card-img");
  img.setAttribute("src", "./images/back-pic.jpg");

  element.addEventListener("click", () => {
    startTimer();
    if (secondPic !== null || element.classList.contains("match")) {
      return;
    }
    element.classList.add("flip-card");
    if (img.getAttribute("src") === image.url) {
      img.setAttribute("src", "./images/back-pic.jpg");
      firstPic = null;
      element.classList.toggle("flip-card");
    } else {
      img.setAttribute("src", image.url);
      img.setAttribute("name", image.name);
      img.setAttribute("id", image.id);
      counter++;
      if (firstPic === null) {
        firstPic = img;
      } else {
        secondPic = img;
        setTimeout(() => {
          if (Number(firstPic.getAttribute("id")) !== image.id) {
            img.setAttribute("src", "./images/back-pic.jpg");
            firstPic.setAttribute("src", "./images/back-pic.jpg");
            element.classList.remove("flip-card");
            firstPic.parentNode.classList.remove("flip-card");
          } else {
            element.classList.add("match");
            firstPic.parentNode.classList.add("match");
            const isWin = cardsContainer.querySelectorAll(".match").length === cardCount;
            // win();
            if (isWin) {
              win();
            }
          }
          firstPic = null;
          secondPic = null;
        }, 600);
      }
    }
  });

  element.appendChild(img);
  return element;
}
document.querySelector("#play-again").addEventListener("click", function () {
  modal.classList.remove("modal-open");
  resetGame();
});

//Random card
function createCardGrid(images) {
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
  if (stopTimer) return;
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

  getData();
}

resetBtn.addEventListener("click", resetGame);

function win() {
  stopTimer = true;
  modalTitle.innerHTML = "Congratulations 🥳 You win!";
  modal.classList.add("modal-open");
}

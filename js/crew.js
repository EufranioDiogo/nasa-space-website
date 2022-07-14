let crew = null;
let intervalId = null;
let actualIndex = 0;
let actualSlider = 0;

const activeSlideIdentifier = (index) => {
  const sliderItens = document.querySelectorAll(".crew-slider-container--element");

  if (index == 0) {
    sliderItens[sliderItens.length - 1].classList.remove("active-slider-element")
  } else {
    sliderItens[index - 1].classList.remove("active-slider-element");
  }
  sliderItens[index].classList.add("active-slider-element");
}

const cleanSlideIdentifier = () => {
  const sliderItens = document.querySelectorAll(".crew-slider-container--element");
  sliderItens[actualIndex].classList.remove("active-slider-element");
}

const startSlide = (startIndex) => {
  actualIndex = startIndex;
  getInfoAboutCrew(startIndex);
  activeSlideIdentifier(startIndex);

  intervalId = setInterval(() => {
    startIndex++;
    if (startIndex >= crew.length) {
      startIndex = 0;
    }

    getInfoAboutCrew(startIndex);
    activeSlideIdentifier(startIndex);
  }, 4000)
} 

const updateFront = (crewFounded) => {
  const crewImageElement = document.querySelector(".crew-img");
  const crewNameElement = document.querySelector(".crew-name");
  const crewAboutElement = document.querySelector(".crew-about");
  const crewPositionElement = document.querySelector(".crew-position");

  crewImageElement.src = crewFounded.images.webp;
  crewNameElement.innerText = crewFounded.name;
  crewAboutElement.innerText = crewFounded.bio;
  crewPositionElement.innerText = crewFounded.role;
};

const getInfoAboutCrew = (crewPosition) => {
  const index = Number.parseInt(crewPosition);
  const crewFounded = crew[index];

  updateFront(crewFounded);
};

const getAllCrew = () => {
  fetch("../json/data.json")
    .then((response) => response.json())
    .then((data) => {
      crew = data.crew;
      
      startSlide(0);
      actualIndex = 0;
    })
    .catch((error) => console.log(error));
};

getAllCrew();

document
  .querySelectorAll(".crew-slider-container--element")
  .forEach((element) => {
    element.addEventListener("click", (e) => {
      const index = Number.parseInt(e.target.getAttribute('index'));

      clearInterval(intervalId);

      cleanSlideIdentifier();
      getInfoAboutCrew(index);
      startSlide(index);
    });
  });

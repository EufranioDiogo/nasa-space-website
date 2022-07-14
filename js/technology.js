let technologys = null;
let selectedTechnology = null;

const selectNewTechnologyItem = (technologyItem) => {
  if (selectedTechnology !== null) {
    selectedTechnology.classList.remove("actual-selected-item")
  } 

  technologyItem.classList.add("actual-selected-item")
  selectedTechnology = technologyItem;
}

const updateFront = (technologyFounded) => {
  const technologyImageElement = document.querySelector(".technology-img");
  const technologyNameElement = document.querySelector(".technology-name");
  const technologyAboutElement = document.querySelector(".technology-about");

  technologyImageElement.src = technologyFounded.images.portrait;
  technologyNameElement.innerText = technologyFounded.name;
  technologyAboutElement.innerText = technologyFounded.description;
};

const getInfoAboutTechnology = (technologyName) => {
  technologyName = technologyName.toLowerCase();

  const technologysFounded = technologys.filter(
    (technology) => technology.name.toLowerCase() === technologyName
  );


  if (technologysFounded.length !== 0) {
    updateFront(technologysFounded[0]);
  }
};

const getAllTechnologys = () => {
  fetch("../json/data.json")
    .then((response) => response.json())
    .then((data) => {
      technologys = data.technology;

      getInfoAboutTechnology(technologys[0].name);
    })
    .catch((error) => console.log(error));
};

getAllTechnologys();

document
  .querySelectorAll(".controller-container--technology-option")
  .forEach((element, index) => {
    if (index === 0) {
      selectNewTechnologyItem(element)
    }
    element.addEventListener("click", (e) => {
      getInfoAboutTechnology(element.getAttribute("value"));
      selectNewTechnologyItem(element);
    });
  });

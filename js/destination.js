let planets = null;

const updateFront = (planetFounded) => {
  const planetImageElement = document.querySelector(".planet-img");
  const planetNameElement = document.querySelector(".planet-name");
  const planetAboutElement = document.querySelector(".planet-about");
  const planetMoreAboutDistance = document.querySelector(
    ".planet-info--more-about--value--distance"
  );
  const planetMoreAboutTravel = document.querySelector(
    ".planet-info--more-about--value--travel"
  );

  planetImageElement.src = planetFounded.images.webp;
  planetNameElement.innerText = planetFounded.name;
  planetAboutElement.innerText = planetFounded.description;
  planetMoreAboutDistance.innerText = planetFounded.distance;
  planetMoreAboutTravel.innerHTML = planetFounded.travel;
};

const getInfoAboutPlanet = (planetName) => {
  planetName = planetName.toLowerCase();

  const planetsFounded = planets.filter(
    (planet) => planet.name.toLowerCase() === planetName
  );

  if (planetsFounded.length !== 0) {
    updateFront(planetsFounded[0]);
  }
};

const getAllPlanets = () => {
  fetch("../json/data.json")
    .then((response) => response.json())
    .then((data) => {
      planets = data.destinations;

      getInfoAboutPlanet(planets[0].name)
    })
    .catch((error) => console.log(error));
};

getAllPlanets();

document
  .querySelectorAll(".controller-container--planet-option")
  .forEach((element) => {
    element.addEventListener("click", (e) => {
      getInfoAboutPlanet(e.target.innerText)
    });
  });

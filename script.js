const imagePrompt = document.getElementById("image-prompt");
const imgQuantity = document.getElementById("img-quantity");
const title = document.getElementById("title");
const imageResults = document.getElementById("image-results");
const customAlert = document.getElementById("custom-alert");
const imageContainer = document.getElementById("image-container");
const loadMoreButton = document.getElementById("load-more");
const searchBarButton = document.getElementById("search-bar");
const mealName = document.getElementById("meal-name");

let images = [];
let imagesFromApi = [];
let query = "";

document.addEventListener("DOMContentLoaded", function () {
  // Load Image when windows is successful loaded
  loadImages();
});

function loadImages(queryData = "") {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${queryData}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      if (data.meals) {
        const meals = data.meals;

        // Reset imagesFromApi array
        imagesFromApi = [];

        // Get meals and random data
        const selectedMeals = meals.sort(() => 0.25 - Math.random());

        // Looping random data and add to array variable named imagesFromApi
        selectedMeals.forEach((meal) => {
          imagesFromApi.push(meal);
        });
      } else {
        console.error("No meals found in the response");
      }
    })
    .then(() => {
      // Grouping data meals from imagesFromApi variable with 4 each meal data
      const chunkSize = 4;

      // Initial value for grouping
      let chunkedData = [];

      // Looping imagesFromApi variable
      for (let i = 0; i < imagesFromApi.length; i += chunkSize) {
        chunkedData.push(imagesFromApi.slice(i, i + chunkSize));
      }

      // When data is successfully grouped, get first data for first load
      if (chunkedData.length !== 0) {
        chunkedData[0].forEach((meal) => {
          const card = createCardElement(meal);
          imageContainer.appendChild(card);
        });
      }

      // Change value of images with chunkedData taken from the first index
      // because the first data or index 0 has been used
      images = chunkedData.slice(1, chunkedData.length);
    })
    .catch((error) => console.error("Error fetching the API:", error));
}

// create function for handle create element image
// so that, it can be used by all other functions
function createImageElement(meal) {
  const image = document.createElement("img");
  image.className = "object-cover w-full h-full";
  image.src = meal.strMealThumb;
  image.alt = meal.strMeal;

  return image;
}

// create function for handle create element div
// so that, it can be used by all other functions
function createCardElement(meal) {
  const card = document.createElement("div");
  card.className =
    "aspect-video h-full w-full rounded-lg overflow-hidden image-card bg-white shadow-md flex flex-col";

  const image = document.createElement("img");
  image.className = "object-cover w-full h-48";
  image.src = meal.strMealThumb;
  image.alt = meal.strMeal;

  const infoContainer = document.createElement("div");
  infoContainer.className =
    "p-4 bg-white flex flex-col justify-center items-start";

  const mealName = document.createElement("h2");
  mealName.className = "text-lg font-semibold text-gray-800";
  mealName.textContent = meal.strMeal;

  const mealCountry = document.createElement("p");
  mealCountry.className = "text-sm text-gray-600";
  mealCountry.textContent = `Country: ${meal.strArea}`;

  infoContainer.appendChild(mealName);
  infoContainer.appendChild(mealCountry);

  card.appendChild(image);
  card.appendChild(infoContainer);

  return card;
}

// load more button click
loadMoreButton.addEventListener("click", () => {
  if (images.length > 0) {
    // destructuring array
    const [imageChunk] = images.splice(0, 1);

    // destructuring object
    //  const {objectName} = objectParent;

    imageChunk.forEach((meal) => {
      const image = createImageElement(meal);
      const card = createCardElement(image);
      imageContainer.appendChild(card);
    });
  }
});

// Get query from input field
imagePrompt.addEventListener("input", (event) => {
  const value = event.target.value;
  query = value;
});

// When there is query, search bar will get api by query
// first that, reset all
searchBarButton.addEventListener("click", (event) => {
  // prevent page reloads
  event.preventDefault();

  // Reset all
  images = [];
  imagesFromApi = [];
  imageContainer.innerHTML = null;

  if (query !== "") {
    loadImages(query);
    return;
  }

  loadImages("");
  return;
});

function Menu(e) {
  let list = document.querySelector("ul");
  e.name === "menu"
    ? ((e.name = "close"),
      list.classList.add("top-[80px]"),
      list.classList.add("opacity-100"))
    : ((e.name = "menu"),
      list.classList.remove("top-[80px]"),
      list.classList.remove("opacity-100"));
}

document.querySelectorAll(".toggle-icon").forEach((icon) => {
  icon.addEventListener("click", () => {
    const content = icon.parentNode.parentNode.nextElementSibling;
    if (content.classList.contains("hidden")) {
      content.classList.remove("hidden");
      content.classList.add("visible");
      icon.textContent = "-";
    } else {
      content.classList.remove("visible");
      content.classList.add("hidden");
      icon.textContent = "+";
    }
    icon.style.transform = "rotate(180deg)";
  });
});

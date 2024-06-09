const imagePrompt = document.getElementById("image-prompt");
const imgQuantity = document.getElementById("img-quantity");
const title = document.getElementById("title");
const imageResults = document.getElementById("image-results");
const customAlert = document.getElementById("custom-alert");
const meals = data.meals;
const imageContainer = document.getElementById("image-container");
const loadMore = document.getElementById("load-more");

document.addEventListener("DOMContentLoaded", function () {
  loadImages(); // Load images on initial load
});
let images = [];
function loadImages() {
  fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Data fetched from API:", data); // Debugging
      if (data.meals) {
        const meals = data.meals;
        // Select random meals
        const selectedMeals = meals
          .sort(() => 0.5 - Math.random())
          .slice(images.length, images.length + 4);
        console.log(images);
        images.push(selectedMeals);
        images.forEach((meal) => {
          const card = document.createElement("div");
          card.className =
            "h-48 w-full rounded-lg overflow-hidden image-card bg-white shadow-md";

          const img = document.createElement("img");
          img.className = "object-cover w-full h-full";
          img.src = meal.strMealThumb;
          img.alt = meal.strMeal;

          card.appendChild(img);
          imageContainer.appendChild(card);
        });
      } else {
        console.error("No meals found in the response");
      }
    })
    .catch((error) => console.error("Error fetching the API:", error));
}

loadMore.addEventListener("click", loadImages);

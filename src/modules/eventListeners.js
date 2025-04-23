import { fetchData } from "./weatherData.js";

let currentUnit = "metric";

export function events() {
  const form = document.getElementById("weather-form");
  const input = document.getElementById("city-input");
  const message = document.getElementById("weather-message");
  const fetchBtn = document.getElementById("fetch-weather");
  const clearBtn = document.getElementById("clear-weather");
  const toggleUnitBtn = document.getElementById("toggle-unit");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const weatherInput =
      input.value.trim().charAt(0).toUpperCase() + input.value.slice(1);

    // Clear previous messages
    message.textContent = "";
    document.getElementById("city-name").textContent = "Name: ";
    document.getElementById("temperature").textContent = "Temperature: ";
    document.getElementById("humidity").textContent = "Humidity: ";
    document.getElementById("conditions").textContent = "Conditions: ";

    if (!weatherInput) {
      message.textContent = "❌ Please enter a City.";
      return;
    }

    fetchBtn.disabled = true;
    fetchBtn.textContent = "Loading...";

    fetchData(weatherInput, currentUnit);
  });

  clearBtn.addEventListener("click", () => {
    input.value = "";
    message.textContent = "";
    document.getElementById("city-name").textContent = "Name: ";
    document.getElementById("temperature").textContent = "Temperature: ";
    document.getElementById("humidity").textContent = "Humidity: ";
    document.getElementById("conditions").textContent = "Conditions: ";
  });

  toggleUnitBtn.addEventListener("click", () => {
    currentUnit = currentUnit === "metric" ? "us" : "metric";
    toggleUnitBtn.setAttribute("data-unit", currentUnit);

    // If there's already weather data, refetch with new units
    const cityDisplay = document.getElementById("city-name").textContent;
    if (cityDisplay && !cityDisplay.includes("Location:")) {
      const city = cityDisplay.replace("Name: ", "").trim();
      if (city) fetchData(city, currentUnit);
    }
  });
}

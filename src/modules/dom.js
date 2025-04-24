export function domElements() {
  const container = document.querySelector(".container");

  const form = document.createElement("form");
  form.id = "weather-form";
  container.append(form);

  const title = document.createElement("h2");
  title.textContent = "Weather App";
  form.append(title);

  const label = document.createElement("label");
  label.setAttribute("for", "city-input");
  label.textContent = "Enter a City: ";
  form.append(label);

  const input = document.createElement("input");
  input.setAttribute("id", "city-input");
  input.setAttribute("required", "");
  input.type = "text";
  form.append(input);

  const fetchBtn = document.createElement("button");
  fetchBtn.id = "fetch-weather";
  fetchBtn.type = "submit";
  fetchBtn.textContent = "Weather Data";
  form.append(fetchBtn);

  const clearBtn = document.createElement("button");
  clearBtn.id = "clear-weather";
  clearBtn.textContent = "Clear";
  form.append(clearBtn);

  // Add unit toggle button
  const toggleUnitBtn = document.createElement("button");
  toggleUnitBtn.id = "toggle-unit";
  toggleUnitBtn.type = "button";
  toggleUnitBtn.textContent = "°F";
  form.append(toggleUnitBtn);

  const message = document.createElement("p");
  message.id = "weather-message";
  container.append(message);

  const weatherInfo = document.createElement("div");
  weatherInfo.id = "weather-info";
  container.append(weatherInfo);
  const loading = document.createElement("div");
  loading.id = "loading-skeleton";
  loading.textContent = "⏳ Loading weather data...";
  loading.style.display = "none"; // initially hidden
  container.append(loading);

  const forecastContainer = document.createElement("div");
  forecastContainer.id = "forecast-container";
  forecastContainer.style.display = "none"; // hidden until data is fetched
  container.append(forecastContainer);

  const cityName = document.createElement("p");
  cityName.id = "city-name";
  const cityNameTitle = document.createElement("strong");
  cityNameTitle.textContent = "Name: ";
  cityName.append(cityNameTitle);
  weatherInfo.append(cityName);

  const temperature = document.createElement("p");
  temperature.id = "temperature";
  const temperatureTitle = document.createElement("strong");
  temperatureTitle.textContent = "Temperature: ";
  temperature.append(temperatureTitle);
  weatherInfo.append(temperature);

  const humidity = document.createElement("p");
  humidity.id = "humidity";
  const humidityTitle = document.createElement("strong");
  humidityTitle.textContent = "Humidity: ";
  humidity.append(humidityTitle);
  weatherInfo.append(humidity);

  const conditions = document.createElement("p");
  conditions.id = "conditions";
  const conditionsTitle = document.createElement("strong");
  conditionsTitle.textContent = "Conditions: ";
  conditions.append(conditionsTitle);
  weatherInfo.append(conditions);
}

const API_KEY = "4948N3AHP6CMNE6EZAQM6YFMM";
export async function fetchData(weatherInput, unitGroup = "metric") {
  const loadingSkeleton = document.getElementById("loading-skeleton");
  const weatherInfo = document.getElementById("weather-info");
  const forecastContainer = document.getElementById("forecast-container");

  try {
    loadingSkeleton.style.display = "block";
    weatherInfo.style.display = "none";
    forecastContainer.style.display = "none";
    forecastContainer.innerHTML = ""; // clear old forecast

    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${weatherInput}/next5days?key=${API_KEY}&unitGroup=${unitGroup}`
    );

    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    const tempUnit = unitGroup === "metric" ? "°C" : "°F";

    // Current weather
    document.getElementById("city-name").textContent = `Name: ${data.address}`;
    document.getElementById(
      "temperature"
    ).textContent = `Temperature: ${data.days[0].temp}${tempUnit}`;
    document.getElementById(
      "humidity"
    ).textContent = `Humidity: ${data.days[0].humidity}%`;
    document.getElementById(
      "conditions"
    ).textContent = `Conditions: ${data.days[0].conditions}`;
    document.getElementById("weather-message").textContent = "";

    weatherInfo.style.display = "block";

    // Daily Forecast Loop
    data.days.slice(0, 5).forEach((day) => {
      const tile = document.createElement("div");
      tile.className = "forecast-tile";

      const date = document.createElement("p");
      date.textContent = new Date(day.datetime).toDateString();

      const icon = document.createElement("img");
      icon.src = `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/1st%20Set%20-%20Color/${day.icon}.png`;
      icon.alt = day.icon;
      icon.width = 48;

      const temp = document.createElement("p");
      temp.textContent = `↑${day.tempmax}${tempUnit} ↓${day.tempmin}${tempUnit}`;

      const cond = document.createElement("p");
      cond.textContent = day.conditions;

      tile.append(date, icon, temp, cond);
      forecastContainer.append(tile);
    });

    forecastContainer.style.display = "flex";
  } catch (error) {
    document.getElementById(
      "weather-message"
    ).textContent = `❌ ${error.message}`;
  } finally {
    loadingSkeleton.style.display = "none";
    document.getElementById("fetch-weather").disabled = false;
    document.getElementById("fetch-weather").textContent = "Weather Data";
  }
}

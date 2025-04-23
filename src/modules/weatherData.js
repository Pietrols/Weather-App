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
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${weatherInput}?unitGroup=metric&key=4948N3AHP6CMNE6EZAQM6YFMM&include=current,days&elements=datetime,tempmax,tempmin,icon,conditions,temp,humidity&contentType=json`
    );

    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    console.log("DAYS RECEIVED:", data.days);

    if (!data.currentConditions) {
      throw new Error("Current weather data is not available.");
    }

    console.log("DAYS RECEIVED:", data.days);
    const tempUnit = unitGroup === "metric" ? "°C" : "°F";

    document.getElementById("city-name").textContent = `Name: ${data.address}`;
    document.getElementById(
      "temperature"
    ).textContent = `Temperature: ${data.currentConditions.temp}${tempUnit}`;
    document.getElementById(
      "humidity"
    ).textContent = `Humidity: ${data.currentConditions.humidity}%`;
    document.getElementById(
      "conditions"
    ).textContent = `Conditions: ${data.currentConditions.conditions}`;
    document.getElementById("weather-message").textContent = "";

    weatherInfo.style.display = "block"; // now show data

    function formatDate(dateString) {
      const options = { weekday: "short", month: "short", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    }

    function displayForecast(days, unit = "°C") {
      const forecastContainer = document.getElementById("forecast-container");
      forecastContainer.innerHTML = ""; // clear previous cards

      const nextFiveDays = days.slice(1, 6); // Skip today, show next 5

      nextFiveDays.forEach((day) => {
        const card = document.createElement("div");
        card.classList.add("forecast-card", "fade-in");

        const date = document.createElement("p");
        date.textContent = formatDate(day.datetime);

        const icon = document.createElement("img");
        icon.src = `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/2nd%20Set%20-%20Color/${day.icon}.png`;
        icon.alt = day.conditions;
        icon.width = 48;
        icon.onerror = () => {
          icon.src = "https://via.placeholder.com/48?text=☁️"; // fallback emoji icon
        };

        const temp = document.createElement("p");
        temp.textContent = `🌡️ ${day.tempmin} - ${day.tempmax} ${unit}`;

        const condition = document.createElement("p");
        condition.textContent = day.conditions;

        card.append(date, icon, temp, condition);
        forecastContainer.appendChild(card);
      });
      forecastContainer.style.display = "block";
    }
    displayForecast(data.days, tempUnit);
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

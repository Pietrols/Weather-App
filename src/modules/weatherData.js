export async function fetchData(weatherInput, unitGroup = "metric") {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${weatherInput}/today?key=4948N3AHP6CMNE6EZAQM6YFMM&include=current&unitGroup=${unitGroup}`
    );

    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
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
  } catch (error) {
    document.getElementById(
      "weather-message"
    ).textContent = `❌ ${error.message}`;
  } finally {
    document.getElementById("fetch-weather").disabled = false;
    document.getElementById("fetch-weather").textContent = "Weather Data";
  }
}

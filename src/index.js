let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDays = days[now.getDay()];
let currentHour = now.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
let currentMinutes = now.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}
currentDayAndTime.innerHTML = `Last updated: ${currentDays} ${currentHour}:${currentMinutes}`;
function showCity(event) {
  event.preventDefault();
  let enterCityInput = document.querySelector("#city-input");
  let cityInput = document.querySelector("#currentCity");
  cityInput.innerHTML = `${enterCityInput.value}`;
  searchCity(enterCityInput.value);
}

function searchCity(city) {
  let apiKey = "f7da78bd04741d407fc9d96cf87b54b8";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
let enterCityForm = document.querySelector("#city-form");
enterCityForm.addEventListener("submit", showCity);
function showTemperature(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}˚C`;
  let cityInput = document.querySelector("#currentCity");
  cityInput.innerHTML = `${response.data.name}`;
  let descriptionElement = document.querySelector("#weatherDescription");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let windSpeed = response.data.wind.speed * 0.6214;
  let windElement = document.querySelector("#windDescription");
  windElement.innerHTML = `Wind speed: ${Math.round(windSpeed)} mph`;

  let iconElement = document.querySelector("#iconElement");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celsiusTemperature = response.data.main.temp;
}

function revealPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "f7da78bd04741d407fc9d96cf87b54b8";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}
navigator.geolocation.getCurrentPosition(revealPosition);

function displayFahrenheitTemperature() {
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${Math.round(fahrenheitTemperature)}˚F`;
}
function displayCelsiusTemperature() {
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${Math.round(celsiusTemperature)}˚C`;
}
let celsiusTemperature = null;
let fahrenheitButton = document.querySelector("#fahrenheit-link-button");
fahrenheitButton.addEventListener("click", displayFahrenheitTemperature);
let celsiusButton = document.querySelector("#celsius-link-button");
celsiusButton.addEventListener("click", displayCelsiusTemperature);

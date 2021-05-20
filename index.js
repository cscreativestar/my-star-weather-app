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
let currentMinutes = now.getMinutes();

currentDay.innerHTML = `${currentDays}`;
currentTime.innerHTML = `${currentHour}:${currentMinutes}`;

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
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}
let enterCityForm = document.querySelector("#city-form");
enterCityForm.addEventListener("submit", showCity);
function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = `${temperature}˚C`;
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}˚C`;
  let cityInput = document.querySelector("#currentCity");
  cityInput.innerHTML = `${response.data.name}`;
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

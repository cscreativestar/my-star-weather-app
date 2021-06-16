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

//entering city name

function showCity(event) {
  event.preventDefault();
  let enterCityInput = document.querySelector("#city-input");
  let cityInput = document.querySelector("#currentCity");
  cityInput.innerHTML = `${enterCityInput.value}`;
  searchCity(enterCityInput.value);
}

// showing Hourly Forecast

function formatHour(timestamp) {
  let date = new Date(timestamp * 1000);
  let hour = date.getHours();
  if (hour > 10) {
    hour = `${hour}:00`;
  } else {
    `0${hour}:00`;
  }

  return hour;
}

function displayHourlyForecast(hourlyForecast) {
  let forecastHourElement = document.querySelector("#hourly-time-forecast");
  let hourForecastHTML = `<div class="row">`;
  hourlyForecast.forEach(function (forecastDay, index) {
    if (index < 2) {
      hourForecastHTML =
        hourForecastHTML +
        `<div class="col-sm-6">
                  <h4 class="hourly-time-forecast" id="hourly-time-forecast">
                    ${formatHour(forecastDay.dt)}<br />
                    <h4 class="hourly-time-description"> ${
                      forecastDay.weather[0].description
                    }</h4>
                    <div class="align-items-center">
                    <h4 class="hourly-forecast-temp" id="hourly-forecast-temp"> ${Math.round(
                      forecastDay.temp
                    )}˚C <img src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png" alt="" width="50" /></h4>
                    
                  </div>
                </div>
                
              `;
    }
  });
  hourForecastHTML = hourForecastHTML + `</div>`;
  forecastHourElement.innerHTML = hourForecastHTML;
}

// showing 6 day forecast

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function displayForecast(response) {
  console.log(response.data.hourly);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-sm-2">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">${formatDay(forecastDay.dt)}</h5>
              <img src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png" alt="" />
              <span class="weather-forecast-temp-max">${Math.round(
                forecastDay.temp.max
              )}˚C</span>
              <span class="weather-forecast-temp-min">${Math.round(
                forecastDay.temp.min
              )}˚C</span>
            </div>
          </div>
        </div>
        `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  displayHourlyForecast(response.data.hourly);
}

function getForecast(coordinates) {
  let apiKey = "f7da78bd04741d407fc9d96cf87b54b8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

//showing current/local temperature with location name, including icon, description and wind speed

function searchCity(city) {
  let apiKey = "f7da78bd04741d407fc9d96cf87b54b8";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
let enterCityForm = document.querySelector("#city-form");
enterCityForm.addEventListener("submit", showCity);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}˚C`;
  let cityInput = document.querySelector("#currentCity");
  cityInput.innerHTML = `${response.data.name}`;
  let descriptionElement = document.querySelector("#weatherDescription");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let windSpeed = response.data.wind.speed * 2.237;
  let windElement = document.querySelector("#windDescription");
  windElement.innerHTML = `Wind speed: ${Math.round(windSpeed)} mph`;

  let iconElement = document.querySelector("#iconElement");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celsiusTemperature = response.data.main.temp;
  getForecast(response.data.coord);
}

function displayWeatherComment() {}

//revealing current position

function revealPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "f7da78bd04741d407fc9d96cf87b54b8";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}
navigator.geolocation.getCurrentPosition(revealPosition);

//converting Celsius and Fahrenheit

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

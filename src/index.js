function displayDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thusday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hour = date.getHours();
  if (hour <= 10) {
    hour = `0${hour}`;
  }
  let minute = date.getMinutes();
  if (minute <= 10) {
    minute = `0${minute}`;
  }
  let todayDate = `${day} ${hour}:${minute}`;
  return todayDate;
}
function futureDates(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thusday",
    "Friday",
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wedsnesday",
    "Thusday",
  ];
  let dayOne = document.querySelector("#day-plus-one");
  dayOne.innerHTML = days[date.getDay() + 1];
  let dayTwo = document.querySelector("#day-plus-two");
  dayTwo.innerHTML = days[date.getDay() + 2];
  let dayThree = document.querySelector("#day-plus-three");
  dayThree.innerHTML = days[date.getDay() + 3];
  let dayFour = document.querySelector("#day-plus-four");
  dayFour.innerHTML = days[date.getDay() + 4];
  let dayFive = document.querySelector("#day-plus-five");
  dayFive.innerHTML = days[date.getDay() + 5];
}

let currentDate = document.querySelector("#date-container");
let now = new Date();
currentDate.innerHTML = displayDate(now);
futureDates(now);

function showWeather(response) {
  document.querySelector("#main-city").innerHTML = response.data.name;

  let temperature = Math.round(response.data.main.temp);
  document.querySelector("#temperature-value").innerHTML = `${temperature}`;

  let humidity = response.data.main.humidity;
  document.querySelector(
    "#humidity-container"
  ).innerHTML = `Humidity ${humidity}%`;

  let feelsLike = Math.round(response.data.main.feels_like);
  document.querySelector("#feels-like").innerHTML = `Feels like ${feelsLike}°C`;

  let description = response.data.weather[0].main;
  document.querySelector("#weather-description").innerHTML = `${description}`;
}

function currentCity(city) {
  let unit = "metric";
  let apiKey = "f8e6a9e3d6fde87cb38868da460b1371";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

  axios.get(apiURL).then(showWeather);
}

function findLocation(position) {
  let unit = "metric";
  let apiKey = "f8e6a9e3d6fde87cb38868da460b1371";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${unit}`;

  axios.get(apiURL).then(showWeather);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findLocation);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city").value;
  currentCity(city);
}

let enterCity = document.querySelector("#location-city-entry");
enterCity.addEventListener("submit", handleSubmit);

let enterLocation = document.querySelector("#location-button");
enterLocation.addEventListener("click", currentLocation);

currentCity("London");

function convertC(event) {
  event.preventDefault();
  let currentTempC = document.querySelector("#temperature-value");
  let temperatureC = currentTempC.innerHTML;
  currentTempC.innerHTML = Math.round((temperatureC - 32) * (5 / 9));
}

function convertF(event) {
  event.preventDefault();
  let currentTempF = document.querySelector("#temperature-value");
  let temperatureF = currentTempF.innerHTML;
  currentTempF.innerHTML = Math.round((temperatureF * 9) / 5 + 32);
}

let convertToCelsius = document.querySelector("#unit-celsius");
convertToCelsius.addEventListener("click", convertC);

let convertToFahrenheit = document.querySelector("#unit-fahrenheit");
convertToFahrenheit.addEventListener("click", convertF);

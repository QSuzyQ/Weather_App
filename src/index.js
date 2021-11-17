//Date & Time Input

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

let day = days[now.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let date = now.getDate();
let year = now.getFullYear();
let currentDate = `${day}, ${month} ${date}, ${year}`;
console.log(currentDate);
let rowDate = document.querySelector(".date");
rowDate.innerHTML = `${currentDate}`;

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let currentTime = `${hours}:${minutes}`;
console.log(currentTime);

let rowTime = document.querySelector("#time");
rowTime.innerHTML = `${currentTime}`;

//Display weather by search form
function searchCity(city) {
  let apiKey = "066545da4c8046912b00adb2744905ad";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherSearch);
  console.log(apiUrl);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector(".form-control").value;
  searchCity(city);
}

function displayWeatherSearch(response) {
  console.log(response);
  let cityNow = document.querySelector("#city-now");
  cityNow.innerHTML = response.data.name;

  let temperatureCelsius = Math.round(response.data.main.temp);

  let tempNowC = document.querySelector("#temp-now");
  tempNowC.innerHTML = `${temperatureCelsius}°C`;

  let currentDescription = response.data.weather[0].description;
  let forecastDescription = document.querySelector("#forecast-now");
  forecastDescription.innerHTML = `${currentDescription}`;

  let feelsLikeData = Math.round(response.data.main.feels_like);
  let feelsLikeInfo = document.querySelector("#feels-like-now");
  feelsLikeInfo.innerHTML = `Feels like: ${feelsLikeData}°C`;

  let humidity = response.data.main.humidity;
  let humidityInfo = document.querySelector("#humidity-now");
  humidityInfo.innerHTML = `Humidity: ${humidity}%`;

  let windSpeed = Math.round(response.data.wind.speed);
  let windSpeedInfo = document.querySelector("#wind-now");
  windSpeedInfo.innerHTML = `Wind: ${windSpeed} km/h`;
}

let inputForm = document.querySelector("#search-city");
inputForm.addEventListener("submit", handleSubmit);

searchCity("Lagos");

//Display weather by current postition button
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = `066545da4c8046912b00adb2744905ad`;
  let units = `metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayCurrentWeather);
  console.log(apiUrl);
}

function displayCurrentWeather(response) {
  console.log(response);

  let currentCity = response.data.name;
  let displaycurrentCity = document.querySelector("#city-now");
  displaycurrentCity.innerHTML = `${currentCity}`;

  let temperatureCelsius = Math.round(response.data.main.temp);

  let tempNowC = document.querySelector("#temp-now");
  tempNowC.innerHTML = `${temperatureCelsius}°C`;

  let currentDescription = response.data.weather[0].description;
  let forecastDescription = document.querySelector("#forecast-now");
  forecastDescription.innerHTML = `${currentDescription}`;

  let feelsLikeData = Math.round(response.data.main.feels_like);
  let feelsLikeInfo = document.querySelector("#feels-like-now");
  feelsLikeInfo.innerHTML = `Feels like: ${feelsLikeData}°C`;

  let humidity = response.data.main.humidity;
  let humidityInfo = document.querySelector("#humidity-now");
  humidityInfo.innerHTML = `Humidity: ${humidity}%`;

  let windSpeed = Math.round(response.data.wind.speed);
  let windSpeedInfo = document.querySelector("#wind-now");
  windSpeedInfo.innerHTML = `Wind: ${windSpeed} km/h`;
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let buttonCurrentWeather = document.querySelector("#button-current-weather");
buttonCurrentWeather.addEventListener("click", getCurrentLocation);

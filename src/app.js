function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let i = 1;
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
  
                <div class="col-2">
                  <div class="weather-forecast-date" id="">${formatDay(
                    forecastDay.dt
                  )}</div>
                  <img
                    src="http://openweathermap.org/img/wn/${
                      forecastDay.weather[0].icon
                    }@2x.png"
                    alt=""
                    width="42"
                  />
                  <div class="weather-forecast-temp">
                  
                  <span class ="weather-forecast-max" id="max` +
        i +
        `"> ${Math.round(forecastDay.temp.max)} </span>°
                  <span class="weather-forecast-min" id="min` +
        i +
        `"> ${Math.round(forecastDay.temp.min)} </span>°
                  </div>
                </div>
             
              `;
    }
    i = i + 1;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  //console.log(coordinates);
  let apiKey = "f09d3949047ab6c9e3bcaf79cf61f619";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemp = response.data.main.temp;
  //console.log(response.data);
  temperatureElement.innerHTML = Math.round(celsiusTemp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "f09d3949047ab6c9e3bcaf79cf61f619";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  cityElement = cityInputElement.value;
  search(cityInputElement.value);
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);

  for (let j = 1; j < 7; j++) {
    let myMax = document.getElementById("max" + j).innerHTML;
    let myMaxAgain = parseInt(myMax);
    let myMaxFahrenheit = Math.round((myMaxAgain * 9) / 5 + 32);
    let myMaxFinal = myMaxFahrenheit.toString();
    document.getElementById("max" + j).innerHTML = myMaxFinal;

    let myMin = document.getElementById("min" + j).innerHTML;
    let myMinAgain = parseInt(myMin);
    let myMinFahrenheit = Math.round((myMinAgain * 9) / 5 + 32);
    let myMinFinal = myMinFahrenheit.toString();
    document.getElementById("min" + j).innerHTML = myMinFinal;
  }
}

function displayCelsiusTemp(event) {
  event.preventDefault();

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemp);

  for (let j = 1; j < 7; j++) {
    let myMax = document.getElementById("max" + j).innerHTML;
    let myMaxAgain = parseInt(myMax);
    let myMaxCelsius = Math.round((myMaxAgain - 32) / 1.8);
    let myMaxFinal = myMaxCelsius.toString();
    document.getElementById("max" + j).innerHTML = myMaxFinal;

    let myMin = document.getElementById("min" + j).innerHTML;
    let myMinAgain = parseInt(myMin);
    let myMinCelsius = Math.round((myMinAgain - 32) / 1.8);
    let myMinFinal = myMinCelsius.toString();
    document.getElementById("min" + j).innerHTML = myMinFinal;
  }
}

let celsiusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

search("New York");

displayForecast();

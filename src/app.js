function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("wind");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.main;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "f09d3949047ab6c9e3bcaf79cf61f619";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=london&appid=${apiKey}&units= metric`;

console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);

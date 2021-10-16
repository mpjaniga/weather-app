let now = new Date();
let h6 = document.querySelector("#current-date");
let hours = now.getHours();
let minutes = now.getMinutes();
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
h6.innerHTML = day + " " + hours + ":" + minutes;

function search(event) {
  event.preventDefault();
  let searchInput = document.getElementById("search-text-input").value;
  document.getElementById("h1-id").innerHTML = searchInput;

  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&units=metric&appid=${apiKey}`
    )
    .then(showTemperature);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.getElementById("temperature");
  temperatureElement.innerHTML = `${temperature}°C`;
}

let button = document.querySelector("#submitButton");
button.addEventListener("click", search);

let apiKey = "f09d3949047ab6c9e3bcaf79cf61f619";
let city = "Sydney";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;

axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);

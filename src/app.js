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
	return `${day}, ${hours}:${minutes}`;
}

function displayForecast(response) {
	console.log(response.data.daily);
	let forecastElement = document.querySelector("#forecast");
	let forecastHTML = "";
	let days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	days.forEach(function (day) {
		forecastHTML =
			forecastHTML +
			`
	<div class="row align-items-center">
						<div class="col-2 week-temperature">
							<span class="weather-forecast-temperature-max">20°</span>&nbsp;
							<span class="weather-forecast-temperature-min">10°</span>
						</div>
						<div class="col-3">
							<img src="src/hot1.png" class="day-img" />
						</div>
						<div class="col-3">cloudly</div>

						<div class="col-4">${day}, 25 June</div>
					</div>
	`;
	});

	forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
	console.log(coordinates);
	let apiKey = "15b17c39bc6708ab7518942a1ffb9aca";
	let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
	console.log(apiUrl);
	axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
	//console.log(response.data);
	let temperatureElement = document.querySelector("#temperature");
	celsiusTemperature = response.data.main.temp;
	temperatureElement.innerHTML = Math.round(celsiusTemperature);

	let cityElement = document.querySelector("#city");
	cityElement.innerHTML = `${response.data.name}, ${response.data.sys.country}`;

	let descriptionElement = document.querySelector("#description");
	descriptionElement.innerHTML = response.data.weather[0].description;

	let humidityElement = document.querySelector("#humidity");
	humidityElement.innerHTML = response.data.main.humidity;

	let windElement = document.querySelector("#wind");
	windElement.innerHTML = Math.round(response.data.wind.speed);

	let dateElement = document.querySelector("#date");
	dateElement.innerHTML = formatDate(response.data.dt * 1000);

	let iconElement = document.querySelector("#icon");
	iconElement.setAttribute(
		"src",
		`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
	);
	getForecast(response.data.coord);
}

function search(city) {
	let apiKey = "15b17c39bc6708ab7518942a1ffb9aca";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
	axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
	event.preventDefault();
	let cityInputElement = document.querySelector("#city-input");
	console.log(cityInputElement.value);
	search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
	event.preventDefault();
	let temperatureElement = document.querySelector("#temperature");
	celsiusLink.classList.remove("active");
	fahrenheitLink.classList.add("active");

	let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
	temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displaycelsiusTemperature(event) {
	event.preventDefault();
	let temperatureElement = document.querySelector("#temperature");
	fahrenheitLink.classList.remove("active");
	celsiusLink.classList.add("active");

	temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;
search("kyiv");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displaycelsiusTemperature);

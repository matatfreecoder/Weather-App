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

function displayTemperature(response) {
	//console.log(response.data);
	let temperatureElement = document.querySelector("#temperature");
	temperatureElement.innerHTML = Math.round(response.data.main.temp);

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
}

let city = "New York";
let apiKey = "15b17c39bc6708ab7518942a1ffb9aca";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);

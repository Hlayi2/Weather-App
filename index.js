let currentUnit = 'metric'; // Default to metric

function refreshWeather(response) {
    document.querySelector("#loading").style.display = "none"; // Hide loading spinner
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector("#icon");

    cityElement.innerHTML = response.data.city;
    timeElement.innerHTML = formatDate(date);
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
    temperatureElement.innerHTML = Math.round(temperature);
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
}

function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
    document.querySelector("#loading").style.display = "block"; 
    let apiKey = "70bo47b7ca63b3dcb0f35atb0dc18d4a";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${currentUnit}`;
    axios.get(apiUrl)
        .then(refreshWeather)
        .catch(error => {
            alert("City not found. Please try another one.");
            console.error(error);
            document.querySelector("#loading").style.display = "none"; 
        });
}

function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    searchCity(searchInput.value);
}

function toggleUnit() {
    currentUnit = currentUnit === 'metric' ? 'imperial' : 'metric';
    document.querySelector("#unit-toggle").innerHTML = currentUnit === 'metric' ? '°C' : '°F';
    
    let lastCity = document.querySelector("#city").innerHTML;
    if (lastCity) {
        searchCity(lastCity);
    }
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

document.querySelector("#unit-toggle").addEventListener("click", toggleUnit);

searchCity("Paris"); 

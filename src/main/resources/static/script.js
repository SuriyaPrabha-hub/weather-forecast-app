const apiKey = "6bfdeabc04b7d88c2aa4799c80f49ea8";

function displayWeather(data) {
    document.getElementById("weatherBox").style.display = "block";
    document.getElementById("location").innerText = data.name + ", India";
    document.getElementById("temperature").innerText = data.main.temp + " °C";
    document.getElementById("feelsLike").innerText = data.main.feels_like + " °C";
    document.getElementById("humidity").innerText = data.main.humidity + " %";
    document.getElementById("pressure").innerText = data.main.pressure + " hPa";
    document.getElementById("wind").innerText = data.wind.speed + " m/s";
    document.getElementById("description").innerText = data.weather[0].description;
}

function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    if (!city) {
        alert("Enter city name");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},IN&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.cod !== 200) {
                alert("City not found");
                return;
            }
            displayWeather(data);
            getFiveDayForecast(city);
        });
}

function getLocationWeather() {
    navigator.geolocation.getCurrentPosition(pos => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                displayWeather(data);
                getFiveDayForecast(data.name);
            });
    });
}

function getFiveDayForecast(city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city},IN&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(res => res.json())
        .then(data => showForecast(data));
}

function showForecast(data) {
    const container = document.getElementById("forecastCards");
    container.innerHTML = "";

    const daily = {};
    data.list.forEach(item => {
        const date = item.dt_txt.split(" ")[0];
        if (!daily[date]) daily[date] = item;
    });

    let count = 0;
    for (let date in daily) {
        if (count === 5) break;
        const d = daily[date];
        container.innerHTML += `
            <div class="forecast-card">
                <strong>${formatDate(date)}</strong><br>
                ${d.main.temp} °C<br>
                ${d.weather[0].description}
            </div>`;
        count++;
    }
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
}

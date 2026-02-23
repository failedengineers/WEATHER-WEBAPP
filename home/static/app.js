async function getWeather() {

    const city = document.getElementById("cityInput").value;

    if (!city) return;

    const loading = document.getElementById("loading");
    const error = document.getElementById("error");
    const weather = document.getElementById("weather");

    loading.classList.remove("hidden");
    error.classList.add("hidden");
    weather.classList.add("hidden");

    try {
        const response = await fetch(`/api/weather/?city=${city}`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "City not found");
        }

        document.getElementById("cityName").innerText = data.city;
        document.getElementById("temperature").innerText = `${data.temperature}°C`;
        document.getElementById("description").innerText = data.description;
        document.getElementById("humidity").innerText = `${data.humidity}%`;
        document.getElementById("wind").innerText = `${data.wind} m/s`;
        document.getElementById("feels_like").innerText = `${data.feels_like}°C`;
        document.getElementById("pressure").innerText = `${data.pressure} hPa`;

        document.getElementById("weatherIcon").src =
            `https://openweathermap.org/img/wn/${data.icon}@2x.png`;

        weather.classList.remove("hidden");

    } catch (err) {
        error.innerText = err.message;
        error.classList.remove("hidden");
    } finally {
        loading.classList.add("hidden");
    }
}
const apiKey = "45a75d3ff81ec473ba7a63887c4c3648";

const baseURL = `https://api.openweathermap.org/data/2.5/weather`

// Obtenemos el input para agregar el listener en cada evento keyup
const btnSaveHTML = document.getElementById("weather-save");

const inputSearchHTML = document.getElementById("weather-search")

const weatherLocationHTML = document.getElementById("weather-location");
const weatherTempHTML = document.querySelector("#weather-temp");
const weatherIconHTML = document.getElementById("weather-icon");
const weatherDatetimeHTML = document.getElementById("weather-datetime-container");

function getCurrentLocation() {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log(position)
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                getWeatherByCoordinates(lat, lon)
            },
            (error) => {
                console.error('No se pudo obtener la posición', error);

                const citySaved = JSON.parse(localStorage.getItem("weatherCity")) || "Mendoza"

                getWeatherByCity(citySaved)
            }
        )
    }

}

getCurrentLocation();

function getWeatherByCoordinates(latitude, longitude) {
    // Petición a la API de openweather para obtener los datos del clima

    const URL = `${baseURL}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`

    fetch(URL)
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            updateWeatherWidget(data)
        })
        .catch(error => console.log(error))


}

function getWeatherByCity(cityName) {

    const URL = `${baseURL}?q=${cityName}&appid=${apiKey}&units=metric`;

    fetch(URL)
        .then(resp => resp.json())
        .then((data) => {
            console.log(data)

            if (data.cod === '404') {
                return alert("Ciudad no encontrada")
            }

            updateWeatherWidget(data);
        })
        .catch(error => console.log(error))
}



function updateWeatherWidget(data) {


    // Insertar en los elementos del DOM los datos que recibimos de la API
    // Nombre de la ciudad en weather location'
    weatherLocationHTML.innerText = data.name;
    // Temperatura en weather temp
    weatherTempHTML.innerText = data.main.temp;
    // Icono en weather icon
    const icon = data.weather[0].icon;

    weatherIconHTML.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="icono de clima">`

    // Crear un elemento HTML desde JS
    // <div class="weather-datetime">20:45 20/04/2024</div>

    // Para que no se acumulen los appendChild
    weatherDatetimeHTML.removeChild(weatherDatetimeHTML.lastChild)

    const weatherDatetimeElem = document.createElement("div");

    weatherDatetimeElem.classList.add("weather-datetime");

    weatherDatetimeElem.style.border = "2px solid royalblue"
    weatherDatetimeElem.id = "w-dt";

    weatherDatetimeElem.innerText = "Registro: " + formatDatetime(data.dt);

    weatherDatetimeHTML.appendChild(weatherDatetimeElem);
}

function formatDatetime(fechaUnix) {
    // La pasamos de seg a milisegundos
    const dt = fechaUnix * 1000;

    const dateFormat = new Intl.DateTimeFormat("es-AR", {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    })

    return dateFormat.format(dt).split(",").reverse().join(" ").trim()
}

inputSearchHTML.addEventListener("keyup", (evt) => {

    if (evt.key === "Enter") {
        const ciudad = evt.target.value;

        // if(ciudad.length < 4) return
        getWeatherByCity(ciudad)

    }

})

btnSaveHTML.addEventListener("click", () => {
    // Cuando la persona haga click guarde la ciudad que se esta mostrando en este momento


    const cityName = weatherLocationHTML.innerText;

    localStorage.setItem("weatherCity", JSON.stringify(cityName))

})

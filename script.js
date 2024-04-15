document.addEventListener('DOMContentLoaded', () => {
    const countryCards = document.getElementById('countryCards');

    // Fetch data from Rest Countries API
    fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(countries => {
        countries.forEach(country => {
        const { capital, latlng, flags, region, name, cca2 } = country;

// Fetch weather data from OpenWeatherMap API based on country capital
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=47fc8496e9591a7638b7dddb422e03d5&units=metric`)
    .then(response => response.json())
    .then(weatherData => {
        const weather = weatherData.weather[0];
        const temperature = weatherData.main.temp;

// Create Bootstrap card HTML dynamically
    const card = `
        <div class="col-md-4 mb-4 p-3 border ">
        <div class="card bg-dark text-white">
        <img src="${flags.png}" class="card-img-top" alt="${name.common}">
        <div class="card-body">
        <h5 class="card-title">${name.common}</h5>
        <p class="card-text">Capital: ${capital}</p>
        <p class="card-text">Region: ${region}</p>
        <p class="card-text">Country Code: ${cca2}</p>
        <p class="card-text">Weather: ${weather.description}</p>
        <p class="card-text">Temperature: ${temperature} °C</p>
        </div>
        </div>
        </div>
    `;

// Append card HTML to countryCards container
    countryCards.innerHTML += card;
    })
    .catch(error => console.log('Error fetching weather data:', error));
            });
        })
    .catch(error => console.log('Error fetching countries data:', error));
});

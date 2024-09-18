// Import necessary modules

// Fetch weather data from OpenWeatherMap API

document.getElementById('getWeather').addEventListener('click', function () {
	const city = document.getElementById('city').value;
	const state = document.getElementById('state').value;
	const country = document.getElementById('country').value;

	// if (city && country) {
	// 	fetchWeather(city, state, country);
	// } else {
	// 	alert('Please enter both city and country');
	// }
	if (city && country) {
		fetch('http://localhost:3001/api/key')
			.then((response) => response.json())
			.then((data) => {
				const apiKey = data.apiKey;
				fetchWeather(city, state, country, apiKey);
			});
	} else {
		alert('Please enter both city and country');
	}
});

function fetchWeather(city, state, country, apiKey) {
	let location = `${city}`;
	if (state) {
		location += `,${state}`;
	}
	location += `,${country}`;

	const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

	/* 
function fetchWeather(city, state, country) {
	// const apiKey = '';
	let location = `${city}`;
	if (state) {
		location += `,${state}`;
	}
	location += `,${country}`;

	const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=imperial`; */

	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			// Extracting relevant information for wind, country, sunrise, sunset
			const windSpeed = data.wind.speed;
			const windDirection = data.wind.deg;
			const sunriseTime = new Date(
				data.sys.sunrise * 1000
			).toLocaleTimeString();
			const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();

			const weatherInfo = `
                <p>City: ${data.name}</p>
                <p>State: ${state ? state : 'N/A'}</p>
                <p>Country: ${data.sys.country}</p>
                <p>Temperature: ${data.main.temp} °F</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Weather: ${data.weather[0].description}</p>
                <p>Wind Speed: ${windSpeed} mph</p>
                <p>Wind Direction: ${windDirection}°</p>
                <p>Sunrise: ${sunriseTime}</p>
                <p>Sunset: ${sunsetTime}</p>
            `;
			document.getElementById('weatherInfo').innerHTML = weatherInfo;

			// Get latitude and longitude from the weather data and display the radar
			const lat = data.coord.lat;
			const lon = data.coord.lon;
			displayRadar(lat, lon);
			displayRadar2(lat, lon); // Uncomment this line to display radar using Windy.com instead of RainViewer
		})
		.catch((error) => {
			alert('Error fetching weather data. Please try again later.');
			console.error('Error:', error);
		});
}

// Function to display radar based on coordinates (using RainViewer)
function displayRadar(lat, lon) {
	const radarUrl = `https://tilecache.rainviewer.com/v2/radar/last/512/${lat},${lon}/1/0_0.png`;
	const radarInfo = `
        <h3>RainViewer Local Radar</h3>
        <img src="${radarUrl}" alt="Local radar" style="width:100%; max-width:600px;">
    `;
	document.getElementById('radarInfo').innerHTML = radarInfo;
}

// Function to display radar using Windy.com based on latitude and longitude
function displayRadar2(lat, lon) {
	const radarUrl2 = `https://embed.windy.com/embed2.html?lat=${lat}&lon=${lon}&zoom=5&level=surface&overlay=radar&menu=&message=true&marker=true&calendar=12&pressure=true&type=map&location=coordinates&detail=&detailLat=${lat}&detailLon=${lon}&metricWind=default&metricTemp=default&radarRange=-1`;
	const radarInfo2 = `
        <h3>Windy.com Local Radar</h3>
        <iframe width="650" height="450" src="${radarUrl2}" frameborder="0"></iframe>
    `;
	document.getElementById('radarInfo2').innerHTML = radarInfo2;
}

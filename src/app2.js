// Add dotenv to the project
import 'dotenv/config';
// require('dotenv').config();
// import http-server modules from http-server
const httpServer = require('http-server');
const http = require('http');
const fs = require('fs');
const { WeatherData } = require('./weatherData');

document.getElementById('getWeather').addEventListener('click', function () {
	const city = document.getElementById('city').value;
	if (city) {
		fetchWeather2(city);
	} else {
		alert('Please enter a city name.');
	}
});

async function fetchWeather2(city) {
	try {
		const response = await axios.get(
			`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHERMAP_API_KEY}&units=metric`
		);

		const weatherData = new WeatherData(response.data);

		displayWeatherData(weatherData);
	} catch (error) {
		console.error(error);
		alert('An error occurred while fetching weather data.');
	}
}

function displayWeatherData(weatherData) {
	const weatherInfo2 = `
    <p>City: ${weatherData.city}</p>
    <p>Temperature: ${weatherData.temperature}°C</p>
    <p>Humidity: ${weatherData.humidity}%</p>
    <p>Weather: ${weatherData.description}</p>
    <p>Wind Speed: ${weatherData.windSpeed} m/s</p>
    <p>Wind Direction: ${weatherData.windDirection}°</p>
    <p>Sunrise: ${moment.unix(weatherData.sunrise).format('h:mm A')}</p>
    <p>Sunset: ${moment.unix(weatherData.sunset).format('h:mm A')}</p>
    `;
	document.getElementById('weatherInfo2').innerHTML = weatherInfo2;
}

// Open and Expose Port 8080 for npm package module http-server
const server = httpServer.createServer();
server.listen(8080);
// Read the HTML file

fs.readFile('index.html', 'utf8', (err, html) => {
	if (err) {
		console.error('Error reading HTML file:', err);
	} else {
		server.on('request', (req, res) => {
			res.writeHead(200, { 'Content-Type': 'text/html' });
			res.end(html);
		});
	}
});
// Create the server using port 8080 for listening and display all the weather information

const port = process.env.PORT || 8080;
server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});

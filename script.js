document.getElementById("getWeather").addEventListener("click", function () {
    const city = document.getElementById("cityInput").value;
    if (city) {
        getWeather(city);
    }
});

async function getWeather(city) {
    try {
        const apiKey = '4f55ceac100752e5d36593ec2c9de735'; 
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
        const data = await response.json();
        
        if (data.cod === 200) {
            displayWeather(data);
        } else {
            document.getElementById("weatherDisplay").innerText = "City not found!";
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.getElementById("weatherDisplay").innerText = "Error fetching weather data!";
    }
}

function displayWeather(data) {
    const { name, main, weather } = data;
    const temperature = (main.temp - 273.15).toFixed(1); 
    const weatherDescription = weather[0].description;


    let weatherEmoji = '';
    if (weatherDescription.includes("clear") || weatherDescription.includes("sunny")) {
        weatherEmoji = '😊';  
    } else if (weatherDescription.includes("rain") || weatherDescription.includes("storm")) {
        weatherEmoji = '😞';  
    } else {
        weatherEmoji = '❤️';  
    }

  
    document.getElementById("weatherDisplay").innerHTML = `
        <h2>${name}</h2>
        <p>${temperature}°C</p>
        <p>${weatherDescription}</p>
        <p class="emoji">${weatherEmoji}</p>
    `;

  
    updateNotification(weatherEmoji, weatherDescription);
}

function updateNotification(emoji, description) {
    const notification = document.querySelector('.notification');
    const notificationMessage = `Weather is ${description} ${emoji}`;
    notification.innerHTML = `
        <img alt="Notification bell icon" src="https://storage.googleapis.com/a1aa/image/Y4dnKD7N5wJEM9DRJZNq2NX3kcgJchj61KRhd4otrAuUXv7E.jpg" width="30"/>
        <span class="notification-message">${notificationMessage}</span>
    `;
}

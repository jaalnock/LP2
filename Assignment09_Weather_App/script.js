function getWeather() {
  const city = document.getElementById("city").value.trim().toLowerCase();
  const output = document.getElementById("output");
  if (!city) return (output.textContent = "Enter a city name.");

  const xhr = new XMLHttpRequest();
  xhr.open("GET", "weather.json");
  xhr.onload = () => {
    const w = JSON.parse(xhr.responseText)[city];
    output.innerHTML = w
      ? `<h2>${city[0].toUpperCase() + city.slice(1)}</h2>
         <p>Temp: ${w.temp}</p>
         <p>Humidity: ${w.humidity}</p>
         <p>Condition: ${w.condition}</p>`
      : "City not found.";
  };
  xhr.onerror = () => (output.textContent = "Request error.");
  xhr.send();
} 

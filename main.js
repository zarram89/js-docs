const cities = {
  Aktobe: {temp: 14, icon: '☁️'},
  Amur: {temp: 10, icon: '🌧️'},
  Samara: {temp: 18, icon: '🌤️'},
  Bali: {temp: 30, icon: '☀️'},
  Dane: {temp: 7, icon: '❄️'},
  Kilo: {temp: 25, icon: '⛅'},
};

const addBtn = document.getElementById('add-btn');
const cityNameEl = document.getElementById('city-name');
const locationsList = document.getElementById('locations-list');

let addedCities = ["Kilo", "Dane", ];

function renderLocations() {
  locationsList.innerHTML = '';
  addedCities.forEach(city => {
    const li = document.createElement('li');
    li.innerHTML = `
        <span class="city-item" data-city="${city}">${city}</span>
        <button class="remove-btn" data-remove="${city}">✖</button>
      `;
    locationsList.appendChild(li);
  });
}

function updateMainWeather(city) {
  const data = cities[city];
  document.getElementById('temperature').textContent = `${data.temp}°`;
  document.getElementById('weather-icon').textContent = data.icon;
  document.getElementById('city-name').textContent = city;
  document.getElementById('search-input').value = city;
}

addBtn.addEventListener('click', () => {
  const city = cityNameEl.textContent;
  if (!addedCities.includes(city)) {
    addedCities.push(city);
    renderLocations();
  }
});

locationsList.addEventListener('click', (e) => {
  const city = e.target.dataset.city;
  const toRemove = e.target.dataset.remove;

  if (city) {
    updateMainWeather(city);
  }

  if (toRemove) {
    addedCities = addedCities.filter(c => c !== toRemove);
    renderLocations();
  }
});

renderLocations();
updateMainWeather('Aktobe');

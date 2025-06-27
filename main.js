const API_KEY = 'f660a2fb1e4bad108d6160b7f58c555f';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const ICON_BASE_URL = 'https://openweathermap.org/img/wn/';

const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const addBtn = document.getElementById('add-btn');
const cityNameEl = document.getElementById('city-name');
const locationsList = document.getElementById('locations-list');
const temperatureEl = document.getElementById('temperature');
const weatherIconEl = document.getElementById('weather-icon');


let addedCities = [];
const cityData = new Map(); // ключ: имя города, значение: { temp, icon }

// 🔁 UI-рендер добавленных городов
function renderLocations() {
  locationsList.innerHTML = '';
  addedCities.forEach(city => {
    if (!city) return; // пропускаем пустые
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="city-item" data-city="${city}">${city}</span>
      <button class="remove-btn" data-remove="${city}">✖</button>
    `;
    locationsList.appendChild(li);
  });
}

// 📦 Обновить отображение погоды
function updateMainWeather(city) {
  const data = cityData.get(city);
  if (!data) return alert(`Нет данных по городу: ${city}`);

  temperatureEl.textContent = `${data.temp}°`;
  weatherIconEl.innerHTML = `<img src="${data.icon}" alt="Weather Icon" style="width: 50px; height: 50px;" />`;
  cityNameEl.textContent = city;
  searchInput.value = city;
}

// 🔍 Обработка ввода + API
async function searchCityWeather(cityInput) {
  const city = cityInput.trim();
  if (!city) return;

  try {
    const res = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
    if (!res.ok) throw new Error();

    const data = await res.json();
    const temp = Math.round(data.main.temp);
    const iconId = data.weather[0].icon;
    const iconUrl = `${ICON_BASE_URL}${iconId}@4x.png`;

    cityData.set(data.name, { temp, icon: iconUrl });
    updateMainWeather(data.name);

  } catch {
    alert('Ошибка: город не найден или превышен лимит API');
  }
}

searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    searchCityWeather(searchInput.value);
  }
});

searchBtn.addEventListener('click', () => {
  searchCityWeather(searchInput.value);
});


// 💗 Добавить текущий город в список
addBtn.addEventListener('click', () => {
  const city = cityNameEl.textContent.trim();
  if (!city) {
    alert('Сначала выберите город!');
    return;
  }
  if (!addedCities.includes(city)) {
    addedCities.push(city);
    renderLocations();
  }
});


// 🖱 Клик по списку городов: выбор / удаление
locationsList.addEventListener('click', (e) => {
  const city = e.target.dataset.city;
  const toRemove = e.target.dataset.remove;

  if (city) {
    if (!cityData.has(city)) {
      alert('Нет данных о погоде для этого города');
    } else {
      updateMainWeather(city);
    }
  }

  if (toRemove) {
    addedCities = addedCities.filter(c => c !== toRemove);
    renderLocations();
  }
});

// ▶ Стартовое состояние
renderLocations();

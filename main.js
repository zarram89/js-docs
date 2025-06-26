const guessButton = document.getElementById("guessButton");
const serverUrl = 'https://api.genderize.io';

guessButton.addEventListener('click', async (e) => {
  const name = document.getElementById("nameInput").value.trim();

  if (!name) {
    alert("Пожалуйста, введите имя");
    return;
  }

  const url = `${serverUrl}?name=${encodeURIComponent(name)}`;

  try {
    guessButton.disabled = true;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    console.log(data);

    if (data.gender) {
      alert(`Имя: ${data.name}\nПол: ${data.gender === 'male' ? 'мужской' : 'женский'}\nВероятность: ${Math.round(data.probability * 100)}%`);
    } else {
      alert('Не удалось определить пол для этого имени');
    }
  } catch (error) {
    alert('Произошла ошибка при запросе к серверу');
    console.error('Error:', error);
  } finally {
    guessButton.disabled = false;
  }
});
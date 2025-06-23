document.querySelectorAll('.todo-form').forEach((form) => {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const input = this.querySelector('input[type="text"]');
    const text = input.value.trim();

    if (!text) return;

    const li = document.createElement('li');
    li.classList.add('todo-item');

    li.innerHTML = `
      <label>
        <input type="checkbox">
        <span class="custom-checkbox"></span>
        <span class="todo-text">${text}</span>
      </label>
      <button class="delete-btn">×</button>
    `;

    this.nextElementSibling.appendChild(li);
    input.value = '';
  });
});

const todo = {
  list: [],

  addTask(name, priority = 'low') {
    this.list.push({
      name,
      status: 'To Do',
      priority,
    });
  },

  changeStatus(name, newStatus) {
    const task = this.list.find((t) => t.name === name);
    if (task) task.status = newStatus;
  },

  deleteTask(name) {
    this.list = this.list.filter((t) => t.name !== name);
  }
}

function renderTasks() {
  document.querySelectorAll('.todo-group').forEach((group) => {
    const listEl = group.querySelector('.todo-list');
    const priority = group.querySelector('h2').textContent.toLowerCase();

    listEl.innerHTML = '';

    todo.list.filter((t) => t.priority === priority).forEach((task) => {
      const li = document.createElement('li');
      li.className = 'todo-item' + (task.status === 'Done' ? ' done' : '');
      li.innerHTML = `
        <label>
          <input type="checkbox" ${task.status === 'Done' ? 'checked' : ''}>
          <span class="custom-checkbox"></span>
          <span class="todo-text">${task.name}</span>
        </label>
        <button class="delete-btn">×</button>
      `;
      listEl.appendChild(li);
    })
  });
}

function handleSubmitForm(e) {
  e.preventDefault();
  const form = e.currentTarget;
  const input = form.querySelector('input[type="text"]');
  const text = input.value.trim();
  if (!text) return;

  const priority = form.previousElementSibling.textContent.toLowerCase();
  todo.addTask(text, priority);
  input.value = '';
  renderTasks();
}

function handleClick(e) {
  const todoItem = e.target.closest('.todo-item');
  if (!todoItem) return;

  const taskName = todoItem.querySelector('.todo-text').textContent;

  if (e.target.classList.contains('delete-btn')) {
    todo.deleteTask(taskName);
    renderTasks();
  }

  if (e.target.matches('input[type="checkbox"]')) {
    todo.changeStatus(taskName, e.target.checked ? 'Done' : 'To Do');
    renderTasks();
  }
}

document.querySelectorAll('.todo-form').forEach((form) => {
  form.addEventListener('submit', handleSubmitForm);
})

document.querySelector('.todo-container').addEventListener('click', handleClick);

renderTasks();

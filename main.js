class Task {
  constructor(name, priority = 'low') {
    if (name.length < 3 || name.length > 30) {
      throw new Error(`Задача "${name}" должна быть не меньше трех символов и не более тридцати`);
    }
    this.name = name;
    this.priority = priority;
    this.status = 'To Do';
  }

  toggleStatus() {
    this.status = this.status === 'Done' ? 'To Do' : 'Done';
  }
}


const todo = {
  list: [],

  addTask(name, priority = 'low') {
    const task = new Task(name, priority);
    this.list.unshift(task);
  },

  changeStatus(name) {
    const task = this.list.find((t) => t.name === name);
    if (!task) {
      throw new Error(`Задача "${name}" не найдена`);
    }
    task.toggleStatus();
  },

  deleteTask(name) {
    const before = this.list.length;
    this.list = this.list.filter((t) => t.name !== name);
    if (this.list.length === before) {
      throw new Error(`Невозможно удалить: задача "${name}" не найдена`);
    }
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

  try {
    todo.addTask(text, priority);
    input.value = '';
    renderTasks();
  } catch (error) {
    alert(error.message); // Показываем пользователю сообщение об ошибке
    console.error(error); // Логируем ошибку в консоль
    input.focus(); // Возвращаем фокус в поле ввода
  }
}

function handleClick(e) {
  const todoItem = e.target.closest('.todo-item');
  if (!todoItem) return;

  const taskName = todoItem.querySelector('.todo-text').textContent;

  if (e.target.classList.contains('delete-btn')) {
    try {
      todo.deleteTask(taskName);
      renderTasks();
    } catch (error) {
      alert(error.message);
      console.error(error);
    }
  }

  if (e.target.matches('input[type="checkbox"]')) {
    try {
      todo.changeStatus(taskName);
      renderTasks();
    } catch (error) {
      alert(error.message);
      console.error(error);
    }
  }
}

document.querySelectorAll('.todo-form').forEach((form) => {
  form.addEventListener('submit', handleSubmitForm);
})

document.querySelector('.todo-container').addEventListener('click', handleClick);

async function loadTasksFromJSON() {
  try {
    const response = await fetch('tasks.json');
    if (!response.ok) throw new Error(`Ошибка загрузки: ${response.status}`);
    const tasks = await response.json();
    tasks.forEach(({name, priority, status}) => {
      const task = new Task(name, priority);
      task.status = status;
      todo.list.push(task);
    });

    renderTasks();
  } catch (error) {
    alert(`Ошибка загрузки задач: ${error.message}`);
    console.error(error);
  }
}

(async () => {
  await loadTasksFromJSON();
})();

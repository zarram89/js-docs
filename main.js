const todo = {
  list: {
    "create a new practice task": "In Progress",
    "make a bed": "Done",
    "write a post": "To Do",
  },

  validStatuses: ["To Do", "In Progress", "Done"],

  addTask(task, status = "To Do") {
    if (typeof task !== "string" || task.trim() === "") {
      console.error("❌ Имя задачи должно быть непустой строкой");
      return;
    }

    if (task.length > 50) {
      console.error(`❌ Имя задачи слишком длинное (максимум 50 символов): "${task}"`);
      return;
    }

    if (task in this.list) {
      console.warn(`⚠️ Задача "${task}" уже существует`);
      return;
    }

    this.list[task] = status;
    console.log(`✅ Добавлена задача: "${task}" со статусом "${status}"`);
  },

  changeStatus(task, status) {
    if (!(task in this.list)) {
      console.error(`❌ Задача "${task}" не найдена`);
      return;
    }

    if (!this.validStatuses.includes(status)) {
      console.error(`❌ Недопустимый статус: "${status}"`);
      return;
    }

    this.list[task] = status;
    console.log(`🔄 Статус задачи "${task}" обновлён на "${status}"`);
  },


  deleteTask(task) {
    if (!(task in this.list)) {
      console.warn(`⚠️ Задача "${task}" не найдена`);
      return;
    }

    delete this.list[task];
    console.log(`🗑 Задача "${task}" удалена`);
  },

  showList() {
    const tasks = Object.entries(this.list);
    if (tasks.length === 0) {
      console.log("📭 Список задач пуст");
      return;
    }

    console.log("📋 Список задач:");
    for (const [task, status] of tasks) {
      console.log(`• "${task}": ${status}`);
    }
  },
}


todo.showList();
todo.addTask("clean the room");
todo.addTask("eat breakfast");
todo.changeStatus("write a post", "Done");
todo.deleteTask("make a bed");
todo.showList();
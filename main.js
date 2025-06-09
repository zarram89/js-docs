const todo = {
  list: {},
  addTask(taskName) {
    if (typeof taskName !== 'string' || taskName.trim() === '') {
      console.log('Ошибка: название задачи должно быть непустой строкой');
      return;
    }
    if (taskName.length > 50) {
      console.log('Ошибка: название задачи не должно превышать 50 символов');
      return;
    }
    if (this.list.hasOwnProperty(taskName)) {
      console.log(`Задача "${taskName}" уже существует!`);
    }
    this.list[taskName] = "To Do";
    console.log(`Задача "${taskName}" добавлена!`);
  },
  changeStatus(taskName, newStatus) {
    if (!this.list.hasOwnProperty(taskName)) {
      console.log(`Ошибка: задача "${taskName}" не найдена!`);
      return;
    }

    const validStatuses = ["To Do", "In Progress", "Done"];
    if (!validStatuses.includes(newStatus)) {
      console.log(`Ошибка: "${newStatus}" - недопустимый статус!`);
      return;
    }

    this.list[taskName] = newStatus;
    console.log(`Статус задачи "${taskName}" изменён на "${newStatus}"`);
  },
  deleteTask(taskName) {
    if (!this.list.hasOwnProperty(taskName)) {
      console.log(`Ошибка: задача "${taskName}" не найдена!`);
      return;
    }

    delete this.list[taskName];
    console.log(`Задача "${taskName}" удалена!`);
  },
  showList() {
    if (Object.keys(this.list).length === 0) {
      console.log("Список задач пуст!");
      return;
    }

    console.log("📝 Список задач:");
    console.log("------------------");
    for (const [task, status] of Object.entries(this.list)) {
      console.log(`🔹 ${task.padEnd(40)} → ${status}`);
    }
    console.log("------------------");
    console.log(`Всего задач: ${Object.keys(this.list).length}`);
  }
}


todo.addTask("create a new practice task");
todo.addTask("make a bed");
todo.addTask("write a post");

todo.changeStatus("make a bed", "Done");
todo.changeStatus("write a post", "In progress");

todo.showList();

todo.deleteTask("create a new practice task");

todo.showList();

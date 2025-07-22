export const todo = {
  list: [
    {name: 'create a post', status: 'In Progress', priority: 'low'},
    {name: 'test', status: 'Done', priority: 'high'}
  ],

  validStatuses: ["To Do", "In Progress", "Done"],

  addTask(task, status = "To Do", priority = "low") {
    if (typeof task !== "string" || task.trim() === "") {
      console.error("❌ Имя задачи должно быть непустой строкой");
      return;
    }

    if (task.length > 50) {
      console.error(`❌ Имя задачи слишком длинное (максимум 50 символов): "${task}"`);
      return;
    }

    if (this.list.some(obj => obj.name === task)) {
      console.warn(`⚠️ Задача "${task}" уже существует`);
      return;
    }

    this.list.push({
      name: task,
      status: status,
      priority: priority,
    })
    console.log(`✅ Добавлена задача: "${task}" со статусом "${status}" и приоритетом "${priority}"`);
  },

  changeStatus(task, status) {
    const index = this.list.findIndex(obj => obj.name === task);
    if (index === -1) {
      console.error(`❌ Задача "${task}" не найдена`);
      return;
    }

    if (!this.validStatuses.includes(status)) {
      console.error(`❌ Недопустимый статус: "${status}"`);
      return;
    }

    this.list[index].status = status;
    console.log(`🔄 Статус задачи "${task}" обновлён на "${status}"`);
  },


  deleteTask(task) {
    const index = this.list.findIndex(obj => obj.name === task);

    if (index === -1) {
      console.warn(`⚠️ Задача "${task}" не найдена`);
      return;
    }

    this.list.splice(index, 1);
    console.log(`🗑 Задача "${task}" удалена`);
  },

  showList(status) {
    let tasks = this.list;

    if (status) {
      if (!this.validStatuses.includes(status)) {
        console.error(`❌ Недопустимый статус: "${status}"`);
        return;
      }

      tasks = tasks.filter(obj => obj.status === status);
    }

    if (tasks.length === 0) {
      console.log("📭 Список задач пуст");
      return;
    }

    tasks.sort((a, b) => a.status.localeCompare(b.status));

    console.log("📋 Список задач:");
    for (const task of tasks) {
      console.log(`• "${task.name}"(priority: ${task.priority}): ${task.status}`);
    }
  },
}
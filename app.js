export const todo = {
  list: [],
  addTask(name, priority = 'medium') {
    if (typeof name !== 'string' || name.trim() === '') {
      console.log('Ошибка: название задачи должно быть непустой строкой');
      return;
    }

    if (name.length > 50) {
      console.log('Ошибка: название задачи не должно превышать 50 символов');
      return;
    }

    if (this.list.some((task) => task.name === name)) {
      console.log(`Задача "${name}" уже существует!`);
      return;
    }

    this.list.push({
      name,
      status: 'To Do',
      priority: ['low', 'medium', 'high'].includes(priority) ? priority : 'medium',
    });

    console.log(`Задача "${name}" добавлена!`);
  },

  changeStatus(name, newStatus) {
    const task = this.list.find((task) => task.name === name);

    if (!task) {
      console.log(`Ошибка: задача "${name}" не найдена!`);
      return;
    }

    const validStatuses = ["To Do", "In Progress", "Done"];
    if (!validStatuses.includes(newStatus)) {
      console.log(`Ошибка: "${newStatus}" - недопустимый статус!`);
      return;
    }

    task.status = newStatus;
    console.log(`Статус задачи "${name}" изменён на "${newStatus}"`);
  },

  deleteTask(name) {
    const initialLength = this.list.length;
    this.list = this.list.filter((task) => task.name !== name);

    if (this.list.length === initialLength) {
      console.log(`Ошибка: задача "${name}" не найдена!`);
    } else {
      console.log(`Задача "${name}" удалена!`);
    }
  },

  showList(statusName) {
    let tasksToShow = this.list;
    if (statusName) {
      tasksToShow = this.list.filter((task) => task.status === statusName);
      if (tasksToShow.length === 0) {
        console.log(`Задач со статусом "${statusName}" не найдено!`);
        return;
      }
    } else if (this.list.length === 0) {
      console.log("Список задач пуст!");
      return;
    }

    tasksToShow = [...tasksToShow].sort((a, b) => a.status.localeCompare(b.status));

    console.log("📝 Список задач:" + (statusName ? ` (фильтр: ${statusName})` : ""));
    console.log("--------------------------------------------------");
    console.log("| Задача".padEnd(40) + "| Статус".padEnd(15) + "| Приоритет |");
    console.log("--------------------------------------------------");

    tasksToShow.forEach(task => {
      console.log(
        `| ${task.name.padEnd(38)} | ${task.status.padEnd(13)} | ${task.priority.padEnd(9)} |`
      );
    });

    console.log("--------------------------------------------------");
    console.log(`Всего задач: ${tasksToShow.length}${statusName ? ` (отфильтровано)` : ""}`);
  }
}
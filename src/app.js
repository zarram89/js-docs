export const todoList = {
  list: [
    {
      name: "write a post",
      status: "To Do"
    },
    {
      name: "create a new practice task",
      status: "In Progress",
    },
    {
      name: "make a bed",
      status: "Done",
    },
  ],

  showList() {
    console.log("Current tasks:");
    this.list.forEach((task, index) => {
      console.log(`${index + 1}. ${task.name} [${task.status}]`);
    });
    console.log("---");
  },

  addTask(task) {
    if (!task || typeof task !== 'object') {
      console.log("Invalid task format");
      return false;
    }

    if (typeof task.name !== 'string' || task.name.trim().length > 50 || task.name.trim().length < 3) {
      console.log("Task name must be between 3 and 50 characters");
      return false;
    }

    const validStatuses = ["To Do", "In Progress", "Done"];
    if (!validStatuses.includes(task.status)) {
      console.log(`Invalid status. Use one of: ${validStatuses.join(", ")}`);
      return false;
    }

    const taskExists = this.list.some(item =>
      item.name.toLowerCase() === task.name.trim().toLowerCase()
    );
    if (taskExists) {
      console.log(`Task "${task.name}" already exists`);
      return false;
    }

    this.list.push({
      name: task.name.trim(),
      status: task.status
    });
    console.log(`Task "${task.name}" added successfully with status "${task.status}"`);
    return true;
  },

  changeStatus(taskName, newStatus) {
    const taskIndex = this.list.findIndex(item =>
      item.name.toLowerCase() === taskName.trim().toLowerCase()
    );

    if (taskIndex === -1) {
      console.log(`Task "${taskName}" not found in list`);
      return false;
    }

    const validStatuses = ["To Do", "In Progress", "Done"];
    if (!validStatuses.includes(newStatus)) {
      console.log(`Invalid status. Use one of: ${validStatuses.join(", ")}`);
      return false;
    }

    if (this.list[taskIndex].status === newStatus) {
      console.log(`Task already has status "${newStatus}"`);
      return false;
    }

    this.list[taskIndex].status = newStatus;
    console.log(`Task "${taskName}" status changed to "${newStatus}"`);
    return true;
  },

  deleteTask(taskName) {
    const taskIndex = this.list.findIndex(item =>
      item.name.toLowerCase() === taskName.trim().toLowerCase()
    );

    if (taskIndex === -1) {
      console.log(`Task "${taskName}" not found in list`);
      return false;
    }

    this.list.splice(taskIndex, 1);
    console.log(`Task "${taskName}" deleted successfully`);
    return true;
  },

  sortTasks() {
    const sortedTasks = this.list.sort((a, b) => a.name.localeCompare(b.name));
    console.log(`Tasks sorted by name:`);
    sortedTasks.forEach((task, index) => {
      console.log(`${index}. ${task.name}, [${task.status}]`);
    })

    return sortedTasks;
  },

  filterByStatus(status) {
    const validStatuses = ["To Do", "In Progress", "Done"];

    // Проверка валидности статуса
    if (!validStatuses.includes(status)) {
      console.log(`Invalid status. Valid statuses are: ${validStatuses.join(", ")}`);
      return false;
    }

    const filteredTasks = this.list.filter(task => task.status === status);

    if (filteredTasks.length === 0) {
      console.log(`No tasks found with status "${status}"`);
      return false;
    }

    console.log(`Tasks with status "${status}":`);
    filteredTasks.forEach((task, index) => {
      console.log(`${index + 1}. ${task.name}`);
    });

    return filteredTasks; // Возвращаем массив найденных задач
  },
};

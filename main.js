import {todo} from './app.js';

todo.addTask("create a new practice task");
todo.addTask("make a bed");
todo.addTask("write a post");

todo.changeStatus("make a bed", "Done");
todo.changeStatus("write a post", "In Progress");

console.log("\nВсе задачи (отсортированные по статусу):");
todo.showList();

console.log("\nТолько задачи 'In Progress':");
todo.showList("In Progress");

console.log("\nТолько задачи 'Done':");
todo.showList("Done");

console.log("\nПосле удаления задачи:");
todo.deleteTask("create a new practice task");
todo.showList();
const list = {};

function addTask(taskName) {
  list[taskName] =  "To Do";
}

function changeStatus(taskName, newStatus) {
  if (list.hasOwnProperty(taskName)) {
    list[taskName] = newStatus;
  } else {
    console.log(`Задача "${taskName}" не найдена.`);
  }
}

function deleteTask(taskName) {
  if (list.hasOwnProperty(taskName)) {
    delete list[taskName];
  } else {
    console.log(`Задача "${taskName}" не найдена.`);
  }
}

function showList() {
  console.log("Текущий список задач:");
  for (const task in list) {
    console.log(`- ${task}: ${list[task]}`);
  }
  if (Object.keys(list).length === 0) {
    console.log("Список задач пуст!");
  }

}

addTask("create a new practice task");
addTask("make a bed");
addTask("write a post");

changeStatus("make a bed", "Done");
changeStatus("write a post", "In progress");

showList();

deleteTask("create a new practice task");

showList();
const list = {
  "create a new practice task": "In Progress",
  "make a bed": "Done",
  "write a post": "To Do",
};

function changeStatus(task, status) {
  if (task in list) {
    list[task] = status;
  }
}

function addTask(task, status = "To Do") {
  if (!(task in list)) {
    list[task] = status
  }
}

function deleteTask(task) {
  if (task in list) {
    delete list[task];
  }
}

function showList() {
  console.log(list);
}

showList();
addTask("clean the room");
addTask("eat breakfast");
changeStatus("write a post", "Done");
deleteTask("make a bed");
showList();
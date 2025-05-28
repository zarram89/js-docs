import {todoList} from "./app";

todoList.showList();
todoList.filterByStatus("To Do");
todoList.sortTasks();
todoList.showList();
console.log(document.body);

for (const node of document.body.childNodes) {
  console.log(node); // все узлы из коллекции
}

const nodes = Array.from(document.body.childNodes);
console.log(nodes);
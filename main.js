import {todo} from "./app.js";


todo.showList();
todo.addTask("clean the room");
todo.showList();
todo.addTask("test");
todo.showList();
todo.addTask("write a post");
todo.changeStatus("write a post", "Done");
todo.deleteTask("test");
todo.showList("To Do");
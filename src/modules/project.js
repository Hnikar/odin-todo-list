export default class Project {
	constructor(title, description, todoList, index) {
		this.title = title;
		this.description = description;
		if (todoList === null) this.todoList = [];
		else this.todoList = todos;
		this.index = index;
	}
	addNewTodo(todo) {
		this.todoList.push(todo);
	}
	removeTodo(todo) {
		this.todoList.splice(this.todoList.indexOf(todo), 1);
	}
	updateTodo(todo, newTodo) {
		this.todoList.splice(this.todoList.indexOf(todo), 1, newTodo);
	}
}

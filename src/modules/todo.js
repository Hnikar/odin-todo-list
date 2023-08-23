export default class Todo {
	constructor(title, details, dueDate, completed) {
		this.title = title;
		this.details = details;
		this.dueDate = dueDate;
		this.completed = completed;
	}
	toggleCompleted() {
		this.completed = !this.completed;
	}
}

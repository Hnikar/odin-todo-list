export default class Project {
	constructor(title, description, todos) {
		this.title = title;
		this.description = description;
		if (todos === undefined) this.todos = [];
		else this.todos = todos;
	}
}

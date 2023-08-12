const Storage = (() => {
	const projects = [
		{
			title: "One Project",
			description: "Project Description",
			todos: [
				{
					title: "todo 1",
					description: "todo Description 1",
					dueDate: "2023-08-15",
				},
				{
					title: "todo 2",
					description: "todo Description 2",
					dueDate: "2023-08-20",
				},
			],
			addNewTodo(todo) {
				this.todos.push(todo);
			},
			removeTodo(todo) {
				const index = this.todos.indexOf(todo);
				if (index !== -1) {
					this.todos.splice(index, 1);
				}
			},
			updateTodo(todo, newTodo) {
				const index = this.todos.indexOf(todo);
				if (index !== -1) {
					this.todos.splice(index, 1, newTodo);
				}
			},
		},
		{
			title: "Two Project",
			description: "Project Description",
			todos: [
				{
					title: "todo 2-1",
					description: "todo Description 1",
					dueDate: "2023-08-15",
				},
				{
					title: "todo 2-2",
					description: "todo Description 2",
					dueDate: "2023-08-20",
				},
			],
			addNewTodo(todo) {
				this.todos.push(todo);
			},
			removeTodo(todo) {
				const index = this.todos.indexOf(todo);
				if (index !== -1) {
					this.todos.splice(index, 1);
				}
			},
			updateTodo(todo, newTodo) {
				const index = this.todos.indexOf(todo);
				if (index !== -1) {
					this.todos.splice(index, 1, newTodo);
				}
			},
		},
	];
	return { projects };
})();
export default Storage;

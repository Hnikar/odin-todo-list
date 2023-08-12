import "./todo.js";
import "./storage.js";
import "./project.js";

const projectList = [
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
		index: 0,
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
		index: 1,
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

const DomManipulation = (() => {
	const todoList = document.querySelector(".todo-list");
	const projectsContainer = document.querySelector(".projects-container");
	const projectListDOM = projectsContainer.querySelector("ul");

	const newTodoBtn = document.getElementById("new-todo-btn");
	newTodoBtn.addEventListener("click", () => {
		const newTodo = {
			title: "New Todo",
			description: "Todo Description",
			dueDate: "2023-08-15",
		};
		console.log(projectList[newTodoBtn.dataset.value]);
		projectList[newTodoBtn.dataset.value].addNewTodo(newTodo);
		display(newTodoBtn.dataset.value);
	});

	const newProjectBtn = document.getElementById("new-project-btn");
	newProjectBtn.addEventListener("click", () => {
		const newProject = {
			title: "One Project",
			description: "Project Description",
			todos: [],
			index: projectList.length,
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
		};
		projectList.push(newProject);
		newTodoBtn.dataset.value = projectList.length - 1;
		display(projectList.length - 1);
	});

	function createtodoElement(todo, project) {
		const todoElement = document.createElement("li");
		todoElement.className = "todo";

		const leftDiv = document.createElement("div");
		leftDiv.className = "left";

		const checkboxDiv = document.createElement("div");
		checkboxDiv.className = "checkbox";
		checkboxDiv.textContent = "✔️"; // Use a proper Unicode checkmark

		const todoNameDiv = document.createElement("div");
		todoNameDiv.className = "todo-name";
		todoNameDiv.textContent = todo.title;

		leftDiv.appendChild(checkboxDiv);
		leftDiv.appendChild(todoNameDiv);

		const rightDiv = document.createElement("div");
		rightDiv.className = "right";

		const detailsButton = document.createElement("button");
		detailsButton.className = "details";
		detailsButton.textContent = todo.description;

		const dateDiv = document.createElement("div");
		dateDiv.className = "date";
		dateDiv.textContent = todo.dueDate;

		const btnContainerDiv = document.createElement("div");
		btnContainerDiv.className = "btn-container";

		const editButton = document.createElement("button");
		editButton.className = "edit";
		editButton.textContent = "Edit";

		const deleteButton = document.createElement("button");
		deleteButton.className = "delete";
		deleteButton.textContent = "Delete";
		deleteButton.addEventListener("click", (event) => {
			project.removeTodo(todo);
			display(project.index);
		});

		btnContainerDiv.appendChild(editButton);
		btnContainerDiv.appendChild(deleteButton);

		rightDiv.appendChild(detailsButton);
		rightDiv.appendChild(dateDiv);
		rightDiv.appendChild(btnContainerDiv);

		todoElement.appendChild(leftDiv);
		todoElement.appendChild(rightDiv);

		todoList.appendChild(todoElement);
	}

	function createProjectElement(project) {
		const projectItem = document.createElement("li");
		projectItem.textContent = project.title;
		projectListDOM.appendChild(projectItem);
		projectItem.classList.add("project-list-element");
		projectItem.addEventListener("click", () => {
			display(project.index);
			newTodoBtn.dataset.value = project.index;
		});
	}

	function display(projectIndex) {
		projectListDOM.innerHTML = "";
		projectList.forEach((project) => {
			createProjectElement(project);
		});
		todoList.innerHTML = "";
		projectList[projectIndex].todos.forEach((todo) => {
			createtodoElement(todo, projectList[projectIndex]);
		});
	}

	return { display };
})();

export default DomManipulation;

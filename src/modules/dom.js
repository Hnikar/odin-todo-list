import "./todo.js";
import "./storage.js";
import "./project.js";

const projectList = [
	{
		title: "One Project",
		description: "Project Description",
		todos: [
			{
				title: "Task 1",
				description: "Task Description 1",
				dueDate: "2023-08-15",
			},
			{
				title: "Task 2",
				description: "Task Description 2",
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
				title: "Task 2-1",
				description: "Task Description 1",
				dueDate: "2023-08-15",
			},
			{
				title: "Task 2-2",
				description: "Task Description 2",
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

const DomManipulation = (() => {
	const mainElement = document.querySelector("main");
	const projectsContainer = document.querySelector(".projects-container");
	const projectListDOM = projectsContainer.querySelector("ul");

	function createTaskElement(task, currentProject, currentProjectIndex) {
		const taskElement = document.createElement("div");
		taskElement.className = "task";

		const leftDiv = document.createElement("div");
		leftDiv.className = "left";

		const checkboxDiv = document.createElement("div");
		checkboxDiv.className = "checkbox";
		checkboxDiv.textContent = "✔️"; // Use a proper Unicode checkmark

		const taskNameDiv = document.createElement("div");
		taskNameDiv.className = "task-name";
		taskNameDiv.textContent = task.title;

		leftDiv.appendChild(checkboxDiv);
		leftDiv.appendChild(taskNameDiv);

		const rightDiv = document.createElement("div");
		rightDiv.className = "right";

		const detailsButton = document.createElement("button");
		detailsButton.className = "details";
		detailsButton.textContent = task.description;

		const dateDiv = document.createElement("div");
		dateDiv.className = "date";
		dateDiv.textContent = task.dueDate;

		const btnContainerDiv = document.createElement("div");
		btnContainerDiv.className = "btn-container";

		const editButton = document.createElement("button");
		editButton.className = "edit";
		editButton.textContent = "Edit";

		const deleteButton = document.createElement("button");
		deleteButton.className = "delete";
		deleteButton.textContent = "Delete";
		deleteButton.addEventListener("click", (event) => {
			currentProject.removeTodo(task);
			display(currentProjectIndex);
		});

		btnContainerDiv.appendChild(editButton);
		btnContainerDiv.appendChild(deleteButton);

		rightDiv.appendChild(detailsButton);
		rightDiv.appendChild(dateDiv);
		rightDiv.appendChild(btnContainerDiv);

		taskElement.appendChild(leftDiv);
		taskElement.appendChild(rightDiv);

		mainElement.appendChild(taskElement);
	}

	function createProjectElement(project, projectIndex) {
		const projectItem = document.createElement("li");
		projectItem.textContent = project.title;
		projectListDOM.appendChild(projectItem);
		projectItem.classList.add("project-list-element");
		projectItem.addEventListener("click", () => {
			display(projectIndex);
		});
	}

	function display(projectIndex) {
		projectListDOM.innerHTML = "";
		projectList.forEach((project, index) => {
			createProjectElement(project, index);
		});

		mainElement.innerHTML = "";
		projectList[projectIndex].todos.forEach((todo) => {
			createTaskElement(todo, projectList[projectIndex], projectIndex);
		});
	}

	return { display };
})();

export default DomManipulation;

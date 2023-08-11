import "./todo.js";
import "./storage.js";
import "./project.js";

let projectList = [
	{
		title: "One",
		description: "none",
		todoList: [
			{
				title: "Sussy",
				description: "none",
				dueDate: "hz",
			},
			{
				title: "Sussy2",
				description: "none",
				dueDate: "hz2",
			},
		],
		addNewTodo(todo) {
			this.todoList.push(todo);
		},
		removeTodo(todo) {
			this.todoList.splice(this.todoList.indexOf(todo), 1);
		},
		updateTodo(todo, newTodo) {
			this.todoList.splice(this.todoList.indexOf(todo), 1, newTodo);
		},
	},
];

const DomManipulation = (() => {
	const main = document.querySelector("main");

	const projectsContainer = document.querySelector(".projects-container");
	const projectListDOM = projectsContainer.querySelector("ul");

	function _createTaskInDom(item, currentProject, currentProjectIndex) {
		const taskDiv = document.createElement("div");
		taskDiv.className = "task";

		const leftDiv = document.createElement("div");
		leftDiv.className = "left";

		const checkboxDiv = document.createElement("div");
		checkboxDiv.className = "checkbox";
		checkboxDiv.textContent = "SU";

		const taskNameDiv = document.createElement("div");
		taskNameDiv.className = "task-name";
		taskNameDiv.textContent = item.title;

		leftDiv.appendChild(checkboxDiv);
		leftDiv.appendChild(taskNameDiv);

		const rightDiv = document.createElement("div");
		rightDiv.className = "right";

		const detailsButton = document.createElement("button");
		detailsButton.className = "details";
		detailsButton.textContent = item.description;

		const dateDiv = document.createElement("div");
		dateDiv.className = "date";
		dateDiv.textContent = item.dueDate;

		const btnContainerDiv = document.createElement("div");
		btnContainerDiv.className = "btn-container";

		const editButton = document.createElement("button");
		editButton.className = "edit";
		editButton.textContent = "Edit";

		const deleteButton = document.createElement("button");
		deleteButton.className = "delete";
		deleteButton.textContent = "Delete";
		deleteButton.addEventListener("click", (event) => {
			currentProject.removeTodo(item);
			display(currentProjectIndex);
		});

		btnContainerDiv.appendChild(editButton);
		btnContainerDiv.appendChild(deleteButton);

		rightDiv.appendChild(detailsButton);
		rightDiv.appendChild(dateDiv);
		rightDiv.appendChild(btnContainerDiv);

		taskDiv.appendChild(leftDiv);
		taskDiv.appendChild(rightDiv);

		main.appendChild(taskDiv);
	}
	function __createProjectInDom(item, project) {
		const newProjectItem = document.createElement("li");
		newProjectItem.textContent = item.title;
		projectListDOM.appendChild(newProjectItem);

		const newProjectButton =
			projectsContainer.querySelector(".new-project-btn");

		newProjectButton.addEventListener("click", () => {
			console.log("new project placeholder");
		});
	}
	function display(project) {
		const projectArr = document.querySelectorAll(".project-list-element");
		projectArr.forEach((item) => projectListDOM.removeChild(item));

		for (let i = 0; i < projectList.length; i++) {
			__createProjectInDom(projectList[i], project);
		}

		const taskArr = document.querySelectorAll(".task");
		taskArr.forEach((task) => main.removeChild(task));
		for (let i = 0; i < projectList[project].todoList.length; i++) {
			_createTaskInDom(
				projectList[project].todoList[i],
				projectList[project],
				project
			);
		}
	}
	return { display };
})();

export default DomManipulation;

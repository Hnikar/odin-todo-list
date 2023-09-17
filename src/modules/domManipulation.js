import Storage from "./storage.js";
import EventListeners from "./eventListeners.js";

const DomManipulation = (() => {
	const todoList = document.querySelector(".todo-list");
	const projectsContainer = document.querySelector(".projects-container");
	const projectList = projectsContainer.querySelector("ul");

	const overlay = document.getElementById("overlay");

	const newTodoBtn = document.getElementById("new-todo-btn");
	const newProjectBtn = document.getElementById("new-project-btn");

	const todoForm = document.getElementById("todoForm");
	const formCancelBtn = document.getElementById("formCancelBtn");

	function editTodoForm(todo, project) {
		todoForm.style.display = "block";
		overlay.style.display = "block";

		const editTodoTitleInput = document.getElementById("todoTitle");
		const editTodoDetailsInput = document.getElementById("todoDetails");
		const editTodoDueDateInput = document.getElementById("todoDueDate");

		editTodoTitleInput.value = todo.title;
		editTodoDetailsInput.value = todo.details;
		editTodoDueDateInput.value = todo.dueDate;

		EventListeners.attachEditFormSubmitListener(
			todoForm,
			editTodoTitleInput,
			editTodoDetailsInput,
			editTodoDueDateInput,
			project,
			todo,
			newTodoBtn,
			formCancelBtn
		);
	}

	EventListeners.attachTodoFormListeners(newTodoBtn, overlay)
		.attachProjectFormListeners(newProjectBtn, newTodoBtn, overlay)
		.attachHomeListener(newTodoBtn);

	function createtodoElement(todo, project) {
		const todoElement = document.createElement("li");
		todoElement.className = "todo";
		if (todo.completed) {
			todoElement.classList.add("completed");
		}

		const leftDiv = document.createElement("div");
		leftDiv.className = "left";

		const checkboxInput = document.createElement("input");
		checkboxInput.type = "checkbox";
		checkboxInput.className = "checkbox";
		checkboxInput.checked = todo.completed;
		checkboxInput.addEventListener("change", () => {
			todo.toggleCompleted();
			todoElement.classList.toggle("completed", todo.completed);
			Storage.saveProjectsToLocalStorage(Storage.projects);
		});

		const todoNameDiv = document.createElement("div");
		todoNameDiv.className = "todo-name";
		todoNameDiv.textContent = todo.title;

		leftDiv.appendChild(checkboxInput);
		leftDiv.appendChild(todoNameDiv);

		const rightDiv = document.createElement("div");
		rightDiv.className = "right";

		const detailsButton = document.createElement("button");
		detailsButton.className = "details";
		detailsButton.textContent = "Details";
		detailsButton.dataset.details = todo.details;

		const dateDiv = document.createElement("div");
		dateDiv.className = "date";
		dateDiv.textContent = todo.dueDate;

		const btnContainerDiv = document.createElement("div");
		btnContainerDiv.className = "btn-container";

		const editButton = document.createElement("button");
		editButton.className = "edit";
		editButton.textContent = "Edit";
		editButton.addEventListener("click", (event) => {
			editTodoForm(todo, project);
		});

		const deleteButton = document.createElement("button");
		deleteButton.className = "delete";
		deleteButton.textContent = "Delete";
		deleteButton.addEventListener("click", (event) => {
			project.removeTodo(todo);
			if (
				newTodoBtn.dataset.value == "null" ||
				newTodoBtn.dataset.value == null
			) {
				display(null);
			} else {
				display(newTodoBtn.dataset.value);
			}
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

	function createProjectElement(project, index) {
		const projectItem = document.createElement("li");
		projectItem.classList.add("project-list-element");

		const projectName = document.createElement("div");
		projectName.textContent = project.title;
		projectName.classList.add("project-name");
		projectItem.appendChild(projectName);

		const projectDescription = document.createElement("div");
		projectDescription.classList.add("project-description");
		projectDescription.textContent = project.description;
		projectItem.appendChild(projectDescription);

		const deleteButton = document.createElement("button");
		deleteButton.textContent = "X";
		deleteButton.classList.add("delete-project-btn");
		projectItem.appendChild(deleteButton);

		projectList.appendChild(projectItem);

		projectItem.addEventListener("click", () => {
			display(index);
			newTodoBtn.dataset.value = index;
		});
		deleteButton.addEventListener("click", (event) => {
			event.stopPropagation();
			Storage.projects.splice(index, 1);
			if (Storage.projects.length === 0) {
				display(null);
			} else display(newTodoBtn.dataset.value);
		});
	}

	function display(projectIndex) {
		projectList.innerHTML = "";
		Storage.projects.forEach((project, index) => {
			createProjectElement(project, index);
		});
		todoList.innerHTML = "";

		if (projectIndex === null) {
			Storage.projects.forEach((project) => {
				project.todos.forEach((todo) => {
					createtodoElement(todo, project);
				});
			});
			newTodoBtn.style.display = "none";
		} else {
			const currentProject = Storage.projects[projectIndex];
			currentProject.todos.forEach((todo) => {
				createtodoElement(todo, currentProject);
			});
			newTodoBtn.style.display = "block";
		}
		Storage.saveProjectsToLocalStorage(Storage.projects);
	}

	return { display };
})();

export default DomManipulation;

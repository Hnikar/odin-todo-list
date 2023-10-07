import Todo from "./todo.js";
import Storage from "./storage.js";
import EventListeners from "./eventListeners.js";
const DomManipulation = (() => {
	const todoList = document.querySelector(".todo-list");
	const projectsContainer = document.querySelector(".projects-container");
	const projectListDOM = projectsContainer.querySelector("ul");

	const addTodoBtn = document.getElementById("add-todo-btn");
	const newProjectBtn = document.getElementById("new-project-btn");

	const todoFormContainer = document.getElementById("todoFormContainer");

	const closeFormBtn = document.getElementById("closeFormBtn");

	newProjectBtn.addEventListener("click", () => {
		addProjectForm.style.display = "block";
		overlay.style.display = "block";
	});
	projectForm.addEventListener("submit", (event) => {
		event.preventDefault();
		EventListeners.projectFormEventListener();
	});
	closeProjectFormBtn.addEventListener("click", () => {
		addProjectForm.style.display = "none";
		overlay.style.display = "none";
	});

	addTodoBtn.addEventListener("click", () => {
		editTodoBtn.style.display = "none";
		submitNewTodoBtn.style.display = "block";
		todoFormContainer.style.display = "block";
		overlay.style.display = "block";
	});
	closeFormBtn.addEventListener("click", () => {
		todoFormContainer.style.display = "none";
		overlay.style.display = "none";
	});

	const submitNewTodoBtn = document.getElementById("submitNewTodoBtn");
	todoForm.addEventListener("submit", (event) => {
		EventListeners.submitNewTodoEvent();
		event.preventDefault();
	});

	const homeProjectHeader = document.querySelector(".sidebar h2");
	homeProjectHeader.addEventListener("click", () => {
		submitNewTodoBtn.dataset.value = null;
		DomManipulation.display(null);
	});

	function editTodo(todo, project) {
		todoFormContainer.style.display = "block";
		overlay.style.display = "block";
		const TitleInput = document.getElementById("todoTitle");
		const DetailsInput = document.getElementById("todoDetails");
		const DueDateInput = document.getElementById("dueDate");

		TitleInput.value = todo.title;
		DetailsInput.value = todo.details;
		DueDateInput.value = todo.dueDate;

		const editTodoBtn = document.getElementById("editTodoBtn");
		editTodoBtn.addEventListener("click", (event) => {
			event.preventDefault();
			const updatedTodo = new Todo(
				TitleInput.value,
				DetailsInput.value,
				DueDateInput.value,
				todo.completed
			);
			project.updateTodo(todo, updatedTodo);
			DomManipulation.display(submitNewTodoBtn.dataset.value);
			todoFormContainer.style.display = "none";
			overlay.style.display = "none";
		});
	}

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
			editTodoBtn.style.display = "block";
			submitNewTodoBtn.style.display = "none";
			editTodo(todo, project);
		});

		const deleteButton = document.createElement("button");
		deleteButton.className = "delete";
		deleteButton.textContent = "Delete";
		deleteButton.addEventListener("click", (event) => {
			project.removeTodo(todo);
			if (
				submitNewTodoBtn.dataset.value == "null" ||
				submitNewTodoBtn.dataset.value == null
			) {
				display(null);
			} else {
				display(submitNewTodoBtn.dataset.value);
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

		projectListDOM.appendChild(projectItem);

		projectItem.addEventListener("click", () => {
			display(index);
			submitNewTodoBtn.dataset.value = index;
		});
		deleteButton.addEventListener("click", (event) => {
			event.stopPropagation();
			Storage.projects.splice(index, 1);
			if (Storage.projects.length === 0) {
				display(null);
			} else display(submitNewTodoBtn.dataset.value);
		});
	}

	function display(projectIndex) {
		projectListDOM.innerHTML = "";
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
			addTodoBtn.style.display = "none";
		} else {
			const currentProject = Storage.projects[projectIndex];
			currentProject.todos.forEach((todo) => {
				createtodoElement(todo, currentProject);
			});
			addTodoBtn.style.display = "block";
		}
		Storage.saveProjectsToLocalStorage(Storage.projects);
	}

	return { display };
})();

export default DomManipulation;

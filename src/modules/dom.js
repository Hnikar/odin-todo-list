import Storage from "./storage.js";
import Todo from "./todo.js";
import Project from "./project.js";
const DomManipulation = (() => {
	const todoList = document.querySelector(".todo-list");
	const projectsContainer = document.querySelector(".projects-container");
	const projectListDOM = projectsContainer.querySelector("ul");

	const newTodoBtn = document.getElementById("new-todo-btn");
	const addTodoForm = document.getElementById("addTodoForm");
	const closeFormBtn = document.getElementById("closeFormBtn");
	const todoForm = document.getElementById("todoForm");

	const overlay = document.getElementById("overlay");

	newTodoBtn.addEventListener("click", () => {
		addTodoForm.style.display = "block";
		overlay.style.display = "block";
	});

	closeFormBtn.addEventListener("click", () => {
		addTodoForm.style.display = "none";
		overlay.style.display = "none";
	});

	todoForm.addEventListener("submit", (event) => {
		event.preventDefault();

		const title = document.getElementById("todoTitle").value;
		const description = document.getElementById("todoDescription").value;
		const dueDate = document.getElementById("dueDate").value;

		const newTodo = new Todo(title, description, dueDate, false);

		Storage.projects[newTodoBtn.dataset.value].addNewTodo(newTodo);
		display(newTodoBtn.dataset.value);

		todoForm.reset();
		addTodoForm.style.display = "none";
		overlay.style.display = "none";
	});

	const newProjectBtn = document.getElementById("new-project-btn");
	const addProjectForm = document.getElementById("addProjectForm");
	const closeProjectFormBtn = document.getElementById("closeProjectFormBtn");
	const projectForm = document.getElementById("projectForm");

	newProjectBtn.addEventListener("click", () => {
		addProjectForm.style.display = "block";
		overlay.style.display = "block";
	});

	closeProjectFormBtn.addEventListener("click", () => {
		addProjectForm.style.display = "none";
		overlay.style.display = "none";
	});

	function openEditTodoForm(todo, project) {
		editTodoForm.style.display = "block";
		overlay.style.display = "block";

		const editTodoTitleInput = document.getElementById("editTodoTitle");
		const editTodoDescriptionInput = document.getElementById(
			"editTodoDescription"
		);
		const editDueDateInput = document.getElementById("editDueDate");

		editTodoTitleInput.value = todo.title;
		editTodoDescriptionInput.value = todo.description;
		editDueDateInput.value = todo.dueDate;

		editTodoForm
			.querySelector("form")
			.addEventListener("submit", (event) => {
				event.preventDefault();

				const updatedTodo = {
					title: editTodoTitleInput.value,
					description: editTodoDescriptionInput.value,
					dueDate: editDueDateInput.value,
				};

				project.updateTodo(todo, updatedTodo);
				display(newTodoBtn.dataset.value);

				editTodoForm.style.display = "none";
				overlay.style.display = "none";
			});
	}

	const editTodoForm = document.getElementById("editTodoForm");
	const closeEditFormBtn = document.getElementById("closeEditFormBtn");

	closeEditFormBtn.addEventListener("click", () => {
		editTodoForm.style.display = "none";
		overlay.style.display = "none";
	});

	projectForm.addEventListener("submit", (event) => {
		event.preventDefault();

		const title = document.getElementById("projectTitle").value;
		const description = document.getElementById("projectDescription").value;

		const newProject = new Project(title, description, []);

		Storage.projects.push(newProject);
		display(Storage.projects.length - 1);

		projectForm.reset();
		addProjectForm.style.display = "none";
		overlay.style.display = "none";
	});

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
		detailsButton.textContent = "Description"; // Change text content
		detailsButton.dataset.description = todo.description; // Set description as a data attribute

		const dateDiv = document.createElement("div");
		dateDiv.className = "date";
		dateDiv.textContent = todo.dueDate;

		const btnContainerDiv = document.createElement("div");
		btnContainerDiv.className = "btn-container";

		const editButton = document.createElement("button");
		editButton.className = "edit";
		editButton.textContent = "Edit";
		editButton.addEventListener("click", (event) => {
			openEditTodoForm(todo, project);
		});

		const deleteButton = document.createElement("button");
		deleteButton.className = "delete";
		deleteButton.textContent = "Delete";
		deleteButton.addEventListener("click", (event) => {
			project.removeTodo(todo);
			display(newTodoBtn.dataset.value);
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
			newTodoBtn.dataset.value = index;
		});
		deleteButton.addEventListener("click", (event) => {
			event.stopPropagation();
			Storage.projects.splice(index, 1);
			display(newTodoBtn.dataset.value);
		});
	}

	const homeProjectHeader = document.querySelector(".sidebar h2");
	homeProjectHeader.addEventListener("click", () => {
		display(null);
		newTodoBtn.dataset.value = null;
	});

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
			newTodoBtn.style.display = "none";
		} else {
			const currentProject = Storage.projects[projectIndex];
			currentProject.todos.forEach((todo) => {
				createtodoElement(todo, currentProject);
			});
			newTodoBtn.style.display = "block";
		}
	}

	return { display };
})();

export default DomManipulation;

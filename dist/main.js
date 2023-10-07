/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/modules/todo.js
class Todo {
	constructor(title, details, dueDate, completed) {
		this.title = title;
		this.details = details;
		this.dueDate = dueDate;
		this.completed = completed;
	}

	toggleCompleted() {
		this.completed = !this.completed;
	}

	toJSON() {
		return {
			title: this.title,
			details: this.details,
			dueDate: this.dueDate,
			completed: this.completed,
		};
	}
}

;// CONCATENATED MODULE: ./src/modules/project.js
class Project {
	constructor(title, description, todos) {
		this.title = title;
		this.description = description;
		this.todos = todos;
	}
	addNewTodo(todo) {
		this.todos.push(todo);
	}
	removeTodo(todo) {
		this.todos.splice(this.todos.indexOf(todo), 1);
	}
	updateTodo(todo, newTodo) {
		this.todos.splice(this.todos.indexOf(todo), 1, newTodo);
	}
}

;// CONCATENATED MODULE: ./src/modules/storage.js


const Storage = (() => {
	let projects = [];

	const saveProjectsToLocalStorage = (projectDisplayed) => {
		projects = projectDisplayed;
		localStorage.setItem("projects", JSON.stringify(projects));
	};

	const loadProjectsFromLocalStorage = () => {
		const savedProjects =
			JSON.parse(localStorage.getItem("projects")) || [];
		projects = savedProjects.map((projectData) =>
			recreateProjectInstance(projectData)
		);
	};

	const recreateProjectInstance = (projectData) => {
		const projectInstance = new Project(
			projectData.title,
			projectData.description,
			[]
		);

		projectData.todos.forEach((todoData) => {
			const todoInstance = new Todo(
				todoData.title,
				todoData.details,
				todoData.dueDate,
				todoData.completed
			);
			projectInstance.addNewTodo(todoInstance);
		});

		return projectInstance;
	};

	loadProjectsFromLocalStorage();
	return {
		projects,
		saveProjectsToLocalStorage,
		loadProjectsFromLocalStorage,
	};
})();

/* harmony default export */ const storage = (Storage);

;// CONCATENATED MODULE: ./src/modules/eventListeners.js





const EventListeners = (() => {
	const addNewTodo = document.getElementById("add-todo-btn");

	function projectFormEventListener() {
		const title = document.getElementById("projectTitle").value;
		const description = document.getElementById("projectDescription").value;

		const newProject = new Project(title, description, []);
		storage.projects.push(newProject);
		domManipulation.display(storage.projects.length - 1);

		addNewTodo.dataset.value = storage.projects.length - 1;
		console.log(addNewTodo.dataset.value);
		projectForm.reset();
		addProjectForm.style.display = "none";
		overlay.style.display = "none";
	}

	function editTodoFormEventListener(
		edit,
		todo,
		project,
		newTitle,
		newDetails,
		newDueDate
	) {
		if (edit) _editTodo(todo, project, newTitle, newDetails, newDueDate);
		else _addTodo();

		domManipulation.display(addNewTodo.dataset.value);
		todoFormContainer.style.display = "none";
		overlay.style.display = "none";
	}
	function _editTodo(todo, project, newTitle, newDetails, newDueDate) {
		const updatedTodo = new Todo(
			newTitle.value,
			newDetails.value,
			newDueDate.value,
			todo.completed
		);
		project.updateTodo(todo, updatedTodo);
	}
	function submitNewTodoEvent() {
		const title = document.getElementById("todoTitle").value;
		const details = document.getElementById("todoDetails").value;
		const dueDate = document.getElementById("dueDate").value;

		const newTodo = new Todo(title, details, dueDate, false);
		storage.projects[addNewTodo.dataset.value].addNewTodo(newTodo);
		todoForm.reset();
		domManipulation.display(submitNewTodoBtn.dataset.value);
		todoFormContainer.style.display = "none";
		overlay.style.display = "none";
	}

	return {
		projectFormEventListener,
		submitNewTodoEvent,
	};
})();

/* harmony default export */ const eventListeners = (EventListeners);

;// CONCATENATED MODULE: ./src/modules/domManipulation.js



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
		eventListeners.projectFormEventListener();
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
		eventListeners.submitNewTodoEvent();
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
			storage.saveProjectsToLocalStorage(storage.projects);
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
			storage.projects.splice(index, 1);
			if (storage.projects.length === 0) {
				display(null);
			} else display(submitNewTodoBtn.dataset.value);
		});
	}

	function display(projectIndex) {
		projectListDOM.innerHTML = "";
		storage.projects.forEach((project, index) => {
			createProjectElement(project, index);
		});
		todoList.innerHTML = "";

		if (projectIndex === null) {
			storage.projects.forEach((project) => {
				project.todos.forEach((todo) => {
					createtodoElement(todo, project);
				});
			});
			addTodoBtn.style.display = "none";
		} else {
			const currentProject = storage.projects[projectIndex];
			currentProject.todos.forEach((todo) => {
				createtodoElement(todo, currentProject);
			});
			addTodoBtn.style.display = "block";
		}
		storage.saveProjectsToLocalStorage(storage.projects);
	}

	return { display };
})();

/* harmony default export */ const domManipulation = (DomManipulation);

;// CONCATENATED MODULE: ./src/script.js

domManipulation.display(null);

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3BCZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDZmdDO0FBQ047QUFDMUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhCQUE4QixPQUFPO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNEJBQTRCLElBQUk7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQsOENBQWUsT0FBTyxFQUFDOzs7QUM5QzRCO0FBQ2hCO0FBQ047QUFDTTs7QUFFbkM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEseUJBQXlCLE9BQU87QUFDaEMsRUFBRSxPQUFPO0FBQ1QsRUFBRSxlQUFlLFNBQVMsT0FBTzs7QUFFakMsNkJBQTZCLE9BQU87QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxFQUFFLGVBQWU7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsSUFBSTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHNCQUFzQixJQUFJO0FBQzFCLEVBQUUsT0FBTztBQUNUO0FBQ0EsRUFBRSxlQUFlO0FBQ2pCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQscURBQWUsY0FBYyxFQUFDOzs7QUNsRUQ7QUFDTTtBQUNjO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSxFQUFFLGNBQWM7QUFDaEIsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQSxFQUFFLGNBQWM7QUFDaEI7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixJQUFJO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUcsT0FBTyw0QkFBNEIsT0FBTztBQUM3QyxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHLE9BQU87QUFDVixPQUFPLE9BQU87QUFDZDtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBLEVBQUUsT0FBTztBQUNUO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0EsR0FBRyxPQUFPO0FBQ1Y7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0osMEJBQTBCLE9BQU87QUFDakM7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsRUFBRSxPQUFPLDRCQUE0QixPQUFPO0FBQzVDOztBQUVBLFVBQVU7QUFDVixDQUFDOztBQUVELHNEQUFlLGVBQWUsRUFBQzs7O0FDMU55QjtBQUN4RCxlQUFlIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy90b2RvLmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvcHJvamVjdC5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9ldmVudExpc3RlbmVycy5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2RvbU1hbmlwdWxhdGlvbi5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9zY3JpcHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9kbyB7XG5cdGNvbnN0cnVjdG9yKHRpdGxlLCBkZXRhaWxzLCBkdWVEYXRlLCBjb21wbGV0ZWQpIHtcblx0XHR0aGlzLnRpdGxlID0gdGl0bGU7XG5cdFx0dGhpcy5kZXRhaWxzID0gZGV0YWlscztcblx0XHR0aGlzLmR1ZURhdGUgPSBkdWVEYXRlO1xuXHRcdHRoaXMuY29tcGxldGVkID0gY29tcGxldGVkO1xuXHR9XG5cblx0dG9nZ2xlQ29tcGxldGVkKCkge1xuXHRcdHRoaXMuY29tcGxldGVkID0gIXRoaXMuY29tcGxldGVkO1xuXHR9XG5cblx0dG9KU09OKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHR0aXRsZTogdGhpcy50aXRsZSxcblx0XHRcdGRldGFpbHM6IHRoaXMuZGV0YWlscyxcblx0XHRcdGR1ZURhdGU6IHRoaXMuZHVlRGF0ZSxcblx0XHRcdGNvbXBsZXRlZDogdGhpcy5jb21wbGV0ZWQsXG5cdFx0fTtcblx0fVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvamVjdCB7XG5cdGNvbnN0cnVjdG9yKHRpdGxlLCBkZXNjcmlwdGlvbiwgdG9kb3MpIHtcblx0XHR0aGlzLnRpdGxlID0gdGl0bGU7XG5cdFx0dGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuXHRcdHRoaXMudG9kb3MgPSB0b2Rvcztcblx0fVxuXHRhZGROZXdUb2RvKHRvZG8pIHtcblx0XHR0aGlzLnRvZG9zLnB1c2godG9kbyk7XG5cdH1cblx0cmVtb3ZlVG9kbyh0b2RvKSB7XG5cdFx0dGhpcy50b2Rvcy5zcGxpY2UodGhpcy50b2Rvcy5pbmRleE9mKHRvZG8pLCAxKTtcblx0fVxuXHR1cGRhdGVUb2RvKHRvZG8sIG5ld1RvZG8pIHtcblx0XHR0aGlzLnRvZG9zLnNwbGljZSh0aGlzLnRvZG9zLmluZGV4T2YodG9kbyksIDEsIG5ld1RvZG8pO1xuXHR9XG59XG4iLCJpbXBvcnQgUHJvamVjdCBmcm9tIFwiLi9wcm9qZWN0XCI7XG5pbXBvcnQgVG9kbyBmcm9tIFwiLi90b2RvXCI7XG5jb25zdCBTdG9yYWdlID0gKCgpID0+IHtcblx0bGV0IHByb2plY3RzID0gW107XG5cblx0Y29uc3Qgc2F2ZVByb2plY3RzVG9Mb2NhbFN0b3JhZ2UgPSAocHJvamVjdERpc3BsYXllZCkgPT4ge1xuXHRcdHByb2plY3RzID0gcHJvamVjdERpc3BsYXllZDtcblx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInByb2plY3RzXCIsIEpTT04uc3RyaW5naWZ5KHByb2plY3RzKSk7XG5cdH07XG5cblx0Y29uc3QgbG9hZFByb2plY3RzRnJvbUxvY2FsU3RvcmFnZSA9ICgpID0+IHtcblx0XHRjb25zdCBzYXZlZFByb2plY3RzID1cblx0XHRcdEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJwcm9qZWN0c1wiKSkgfHwgW107XG5cdFx0cHJvamVjdHMgPSBzYXZlZFByb2plY3RzLm1hcCgocHJvamVjdERhdGEpID0+XG5cdFx0XHRyZWNyZWF0ZVByb2plY3RJbnN0YW5jZShwcm9qZWN0RGF0YSlcblx0XHQpO1xuXHR9O1xuXG5cdGNvbnN0IHJlY3JlYXRlUHJvamVjdEluc3RhbmNlID0gKHByb2plY3REYXRhKSA9PiB7XG5cdFx0Y29uc3QgcHJvamVjdEluc3RhbmNlID0gbmV3IFByb2plY3QoXG5cdFx0XHRwcm9qZWN0RGF0YS50aXRsZSxcblx0XHRcdHByb2plY3REYXRhLmRlc2NyaXB0aW9uLFxuXHRcdFx0W11cblx0XHQpO1xuXG5cdFx0cHJvamVjdERhdGEudG9kb3MuZm9yRWFjaCgodG9kb0RhdGEpID0+IHtcblx0XHRcdGNvbnN0IHRvZG9JbnN0YW5jZSA9IG5ldyBUb2RvKFxuXHRcdFx0XHR0b2RvRGF0YS50aXRsZSxcblx0XHRcdFx0dG9kb0RhdGEuZGV0YWlscyxcblx0XHRcdFx0dG9kb0RhdGEuZHVlRGF0ZSxcblx0XHRcdFx0dG9kb0RhdGEuY29tcGxldGVkXG5cdFx0XHQpO1xuXHRcdFx0cHJvamVjdEluc3RhbmNlLmFkZE5ld1RvZG8odG9kb0luc3RhbmNlKTtcblx0XHR9KTtcblxuXHRcdHJldHVybiBwcm9qZWN0SW5zdGFuY2U7XG5cdH07XG5cblx0bG9hZFByb2plY3RzRnJvbUxvY2FsU3RvcmFnZSgpO1xuXHRyZXR1cm4ge1xuXHRcdHByb2plY3RzLFxuXHRcdHNhdmVQcm9qZWN0c1RvTG9jYWxTdG9yYWdlLFxuXHRcdGxvYWRQcm9qZWN0c0Zyb21Mb2NhbFN0b3JhZ2UsXG5cdH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBTdG9yYWdlO1xuIiwiaW1wb3J0IERvbU1hbmlwdWxhdGlvbiBmcm9tIFwiLi9kb21NYW5pcHVsYXRpb24uanNcIjtcbmltcG9ydCBTdG9yYWdlIGZyb20gXCIuL3N0b3JhZ2UuanNcIjtcbmltcG9ydCBUb2RvIGZyb20gXCIuL3RvZG8uanNcIjtcbmltcG9ydCBQcm9qZWN0IGZyb20gXCIuL3Byb2plY3QuanNcIjtcblxuY29uc3QgRXZlbnRMaXN0ZW5lcnMgPSAoKCkgPT4ge1xuXHRjb25zdCBhZGROZXdUb2RvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtdG9kby1idG5cIik7XG5cblx0ZnVuY3Rpb24gcHJvamVjdEZvcm1FdmVudExpc3RlbmVyKCkge1xuXHRcdGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0VGl0bGVcIikudmFsdWU7XG5cdFx0Y29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3REZXNjcmlwdGlvblwiKS52YWx1ZTtcblxuXHRcdGNvbnN0IG5ld1Byb2plY3QgPSBuZXcgUHJvamVjdCh0aXRsZSwgZGVzY3JpcHRpb24sIFtdKTtcblx0XHRTdG9yYWdlLnByb2plY3RzLnB1c2gobmV3UHJvamVjdCk7XG5cdFx0RG9tTWFuaXB1bGF0aW9uLmRpc3BsYXkoU3RvcmFnZS5wcm9qZWN0cy5sZW5ndGggLSAxKTtcblxuXHRcdGFkZE5ld1RvZG8uZGF0YXNldC52YWx1ZSA9IFN0b3JhZ2UucHJvamVjdHMubGVuZ3RoIC0gMTtcblx0XHRjb25zb2xlLmxvZyhhZGROZXdUb2RvLmRhdGFzZXQudmFsdWUpO1xuXHRcdHByb2plY3RGb3JtLnJlc2V0KCk7XG5cdFx0YWRkUHJvamVjdEZvcm0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXHRcdG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXHR9XG5cblx0ZnVuY3Rpb24gZWRpdFRvZG9Gb3JtRXZlbnRMaXN0ZW5lcihcblx0XHRlZGl0LFxuXHRcdHRvZG8sXG5cdFx0cHJvamVjdCxcblx0XHRuZXdUaXRsZSxcblx0XHRuZXdEZXRhaWxzLFxuXHRcdG5ld0R1ZURhdGVcblx0KSB7XG5cdFx0aWYgKGVkaXQpIF9lZGl0VG9kbyh0b2RvLCBwcm9qZWN0LCBuZXdUaXRsZSwgbmV3RGV0YWlscywgbmV3RHVlRGF0ZSk7XG5cdFx0ZWxzZSBfYWRkVG9kbygpO1xuXG5cdFx0RG9tTWFuaXB1bGF0aW9uLmRpc3BsYXkoYWRkTmV3VG9kby5kYXRhc2V0LnZhbHVlKTtcblx0XHR0b2RvRm9ybUNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cdFx0b3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cdH1cblx0ZnVuY3Rpb24gX2VkaXRUb2RvKHRvZG8sIHByb2plY3QsIG5ld1RpdGxlLCBuZXdEZXRhaWxzLCBuZXdEdWVEYXRlKSB7XG5cdFx0Y29uc3QgdXBkYXRlZFRvZG8gPSBuZXcgVG9kbyhcblx0XHRcdG5ld1RpdGxlLnZhbHVlLFxuXHRcdFx0bmV3RGV0YWlscy52YWx1ZSxcblx0XHRcdG5ld0R1ZURhdGUudmFsdWUsXG5cdFx0XHR0b2RvLmNvbXBsZXRlZFxuXHRcdCk7XG5cdFx0cHJvamVjdC51cGRhdGVUb2RvKHRvZG8sIHVwZGF0ZWRUb2RvKTtcblx0fVxuXHRmdW5jdGlvbiBzdWJtaXROZXdUb2RvRXZlbnQoKSB7XG5cdFx0Y29uc3QgdGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvZG9UaXRsZVwiKS52YWx1ZTtcblx0XHRjb25zdCBkZXRhaWxzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b2RvRGV0YWlsc1wiKS52YWx1ZTtcblx0XHRjb25zdCBkdWVEYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkdWVEYXRlXCIpLnZhbHVlO1xuXG5cdFx0Y29uc3QgbmV3VG9kbyA9IG5ldyBUb2RvKHRpdGxlLCBkZXRhaWxzLCBkdWVEYXRlLCBmYWxzZSk7XG5cdFx0U3RvcmFnZS5wcm9qZWN0c1thZGROZXdUb2RvLmRhdGFzZXQudmFsdWVdLmFkZE5ld1RvZG8obmV3VG9kbyk7XG5cdFx0dG9kb0Zvcm0ucmVzZXQoKTtcblx0XHREb21NYW5pcHVsYXRpb24uZGlzcGxheShzdWJtaXROZXdUb2RvQnRuLmRhdGFzZXQudmFsdWUpO1xuXHRcdHRvZG9Gb3JtQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblx0XHRvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0cHJvamVjdEZvcm1FdmVudExpc3RlbmVyLFxuXHRcdHN1Ym1pdE5ld1RvZG9FdmVudCxcblx0fTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IEV2ZW50TGlzdGVuZXJzO1xuIiwiaW1wb3J0IFRvZG8gZnJvbSBcIi4vdG9kby5qc1wiO1xuaW1wb3J0IFN0b3JhZ2UgZnJvbSBcIi4vc3RvcmFnZS5qc1wiO1xuaW1wb3J0IEV2ZW50TGlzdGVuZXJzIGZyb20gXCIuL2V2ZW50TGlzdGVuZXJzLmpzXCI7XG5jb25zdCBEb21NYW5pcHVsYXRpb24gPSAoKCkgPT4ge1xuXHRjb25zdCB0b2RvTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1saXN0XCIpO1xuXHRjb25zdCBwcm9qZWN0c0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdHMtY29udGFpbmVyXCIpO1xuXHRjb25zdCBwcm9qZWN0TGlzdERPTSA9IHByb2plY3RzQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCJ1bFwiKTtcblxuXHRjb25zdCBhZGRUb2RvQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtdG9kby1idG5cIik7XG5cdGNvbnN0IG5ld1Byb2plY3RCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5ldy1wcm9qZWN0LWJ0blwiKTtcblxuXHRjb25zdCB0b2RvRm9ybUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG9kb0Zvcm1Db250YWluZXJcIik7XG5cblx0Y29uc3QgY2xvc2VGb3JtQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjbG9zZUZvcm1CdG5cIik7XG5cblx0bmV3UHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdGFkZFByb2plY3RGb3JtLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG5cdFx0b3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuXHR9KTtcblx0cHJvamVjdEZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZlbnQpID0+IHtcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdEV2ZW50TGlzdGVuZXJzLnByb2plY3RGb3JtRXZlbnRMaXN0ZW5lcigpO1xuXHR9KTtcblx0Y2xvc2VQcm9qZWN0Rm9ybUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdGFkZFByb2plY3RGb3JtLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblx0XHRvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblx0fSk7XG5cblx0YWRkVG9kb0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdGVkaXRUb2RvQnRuLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblx0XHRzdWJtaXROZXdUb2RvQnRuLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG5cdFx0dG9kb0Zvcm1Db250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcblx0XHRvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG5cdH0pO1xuXHRjbG9zZUZvcm1CdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblx0XHR0b2RvRm9ybUNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cdFx0b3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cdH0pO1xuXG5cdGNvbnN0IHN1Ym1pdE5ld1RvZG9CdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN1Ym1pdE5ld1RvZG9CdG5cIik7XG5cdHRvZG9Gb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGV2ZW50KSA9PiB7XG5cdFx0RXZlbnRMaXN0ZW5lcnMuc3VibWl0TmV3VG9kb0V2ZW50KCk7XG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0fSk7XG5cblx0Y29uc3QgaG9tZVByb2plY3RIZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXIgaDJcIik7XG5cdGhvbWVQcm9qZWN0SGVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0c3VibWl0TmV3VG9kb0J0bi5kYXRhc2V0LnZhbHVlID0gbnVsbDtcblx0XHREb21NYW5pcHVsYXRpb24uZGlzcGxheShudWxsKTtcblx0fSk7XG5cblx0ZnVuY3Rpb24gZWRpdFRvZG8odG9kbywgcHJvamVjdCkge1xuXHRcdHRvZG9Gb3JtQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG5cdFx0b3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuXHRcdGNvbnN0IFRpdGxlSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvZG9UaXRsZVwiKTtcblx0XHRjb25zdCBEZXRhaWxzSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvZG9EZXRhaWxzXCIpO1xuXHRcdGNvbnN0IER1ZURhdGVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZHVlRGF0ZVwiKTtcblxuXHRcdFRpdGxlSW5wdXQudmFsdWUgPSB0b2RvLnRpdGxlO1xuXHRcdERldGFpbHNJbnB1dC52YWx1ZSA9IHRvZG8uZGV0YWlscztcblx0XHREdWVEYXRlSW5wdXQudmFsdWUgPSB0b2RvLmR1ZURhdGU7XG5cblx0XHRjb25zdCBlZGl0VG9kb0J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZWRpdFRvZG9CdG5cIik7XG5cdFx0ZWRpdFRvZG9CdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGNvbnN0IHVwZGF0ZWRUb2RvID0gbmV3IFRvZG8oXG5cdFx0XHRcdFRpdGxlSW5wdXQudmFsdWUsXG5cdFx0XHRcdERldGFpbHNJbnB1dC52YWx1ZSxcblx0XHRcdFx0RHVlRGF0ZUlucHV0LnZhbHVlLFxuXHRcdFx0XHR0b2RvLmNvbXBsZXRlZFxuXHRcdFx0KTtcblx0XHRcdHByb2plY3QudXBkYXRlVG9kbyh0b2RvLCB1cGRhdGVkVG9kbyk7XG5cdFx0XHREb21NYW5pcHVsYXRpb24uZGlzcGxheShzdWJtaXROZXdUb2RvQnRuLmRhdGFzZXQudmFsdWUpO1xuXHRcdFx0dG9kb0Zvcm1Db250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXHRcdFx0b3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cdFx0fSk7XG5cdH1cblxuXHRmdW5jdGlvbiBjcmVhdGV0b2RvRWxlbWVudCh0b2RvLCBwcm9qZWN0KSB7XG5cdFx0Y29uc3QgdG9kb0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG5cdFx0dG9kb0VsZW1lbnQuY2xhc3NOYW1lID0gXCJ0b2RvXCI7XG5cdFx0aWYgKHRvZG8uY29tcGxldGVkKSB7XG5cdFx0XHR0b2RvRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiY29tcGxldGVkXCIpO1xuXHRcdH1cblxuXHRcdGNvbnN0IGxlZnREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdGxlZnREaXYuY2xhc3NOYW1lID0gXCJsZWZ0XCI7XG5cblx0XHRjb25zdCBjaGVja2JveElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuXHRcdGNoZWNrYm94SW5wdXQudHlwZSA9IFwiY2hlY2tib3hcIjtcblx0XHRjaGVja2JveElucHV0LmNsYXNzTmFtZSA9IFwiY2hlY2tib3hcIjtcblx0XHRjaGVja2JveElucHV0LmNoZWNrZWQgPSB0b2RvLmNvbXBsZXRlZDtcblx0XHRjaGVja2JveElucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKCkgPT4ge1xuXHRcdFx0dG9kby50b2dnbGVDb21wbGV0ZWQoKTtcblx0XHRcdHRvZG9FbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoXCJjb21wbGV0ZWRcIiwgdG9kby5jb21wbGV0ZWQpO1xuXHRcdFx0U3RvcmFnZS5zYXZlUHJvamVjdHNUb0xvY2FsU3RvcmFnZShTdG9yYWdlLnByb2plY3RzKTtcblx0XHR9KTtcblxuXHRcdGNvbnN0IHRvZG9OYW1lRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHR0b2RvTmFtZURpdi5jbGFzc05hbWUgPSBcInRvZG8tbmFtZVwiO1xuXHRcdHRvZG9OYW1lRGl2LnRleHRDb250ZW50ID0gdG9kby50aXRsZTtcblxuXHRcdGxlZnREaXYuYXBwZW5kQ2hpbGQoY2hlY2tib3hJbnB1dCk7XG5cdFx0bGVmdERpdi5hcHBlbmRDaGlsZCh0b2RvTmFtZURpdik7XG5cblx0XHRjb25zdCByaWdodERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0cmlnaHREaXYuY2xhc3NOYW1lID0gXCJyaWdodFwiO1xuXG5cdFx0Y29uc3QgZGV0YWlsc0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cdFx0ZGV0YWlsc0J1dHRvbi5jbGFzc05hbWUgPSBcImRldGFpbHNcIjtcblx0XHRkZXRhaWxzQnV0dG9uLnRleHRDb250ZW50ID0gXCJEZXRhaWxzXCI7XG5cdFx0ZGV0YWlsc0J1dHRvbi5kYXRhc2V0LmRldGFpbHMgPSB0b2RvLmRldGFpbHM7XG5cblx0XHRjb25zdCBkYXRlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRkYXRlRGl2LmNsYXNzTmFtZSA9IFwiZGF0ZVwiO1xuXHRcdGRhdGVEaXYudGV4dENvbnRlbnQgPSB0b2RvLmR1ZURhdGU7XG5cblx0XHRjb25zdCBidG5Db250YWluZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdGJ0bkNvbnRhaW5lckRpdi5jbGFzc05hbWUgPSBcImJ0bi1jb250YWluZXJcIjtcblxuXHRcdGNvbnN0IGVkaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXHRcdGVkaXRCdXR0b24uY2xhc3NOYW1lID0gXCJlZGl0XCI7XG5cdFx0ZWRpdEJ1dHRvbi50ZXh0Q29udGVudCA9IFwiRWRpdFwiO1xuXHRcdGVkaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuXHRcdFx0ZWRpdFRvZG9CdG4uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcblx0XHRcdHN1Ym1pdE5ld1RvZG9CdG4uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXHRcdFx0ZWRpdFRvZG8odG9kbywgcHJvamVjdCk7XG5cdFx0fSk7XG5cblx0XHRjb25zdCBkZWxldGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXHRcdGRlbGV0ZUJ1dHRvbi5jbGFzc05hbWUgPSBcImRlbGV0ZVwiO1xuXHRcdGRlbGV0ZUJ1dHRvbi50ZXh0Q29udGVudCA9IFwiRGVsZXRlXCI7XG5cdFx0ZGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcblx0XHRcdHByb2plY3QucmVtb3ZlVG9kbyh0b2RvKTtcblx0XHRcdGlmIChcblx0XHRcdFx0c3VibWl0TmV3VG9kb0J0bi5kYXRhc2V0LnZhbHVlID09IFwibnVsbFwiIHx8XG5cdFx0XHRcdHN1Ym1pdE5ld1RvZG9CdG4uZGF0YXNldC52YWx1ZSA9PSBudWxsXG5cdFx0XHQpIHtcblx0XHRcdFx0ZGlzcGxheShudWxsKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGRpc3BsYXkoc3VibWl0TmV3VG9kb0J0bi5kYXRhc2V0LnZhbHVlKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdGJ0bkNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZChlZGl0QnV0dG9uKTtcblx0XHRidG5Db250YWluZXJEaXYuYXBwZW5kQ2hpbGQoZGVsZXRlQnV0dG9uKTtcblxuXHRcdHJpZ2h0RGl2LmFwcGVuZENoaWxkKGRldGFpbHNCdXR0b24pO1xuXHRcdHJpZ2h0RGl2LmFwcGVuZENoaWxkKGRhdGVEaXYpO1xuXHRcdHJpZ2h0RGl2LmFwcGVuZENoaWxkKGJ0bkNvbnRhaW5lckRpdik7XG5cblx0XHR0b2RvRWxlbWVudC5hcHBlbmRDaGlsZChsZWZ0RGl2KTtcblx0XHR0b2RvRWxlbWVudC5hcHBlbmRDaGlsZChyaWdodERpdik7XG5cblx0XHR0b2RvTGlzdC5hcHBlbmRDaGlsZCh0b2RvRWxlbWVudCk7XG5cdH1cblxuXHRmdW5jdGlvbiBjcmVhdGVQcm9qZWN0RWxlbWVudChwcm9qZWN0LCBpbmRleCkge1xuXHRcdGNvbnN0IHByb2plY3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuXHRcdHByb2plY3RJdGVtLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LWxpc3QtZWxlbWVudFwiKTtcblxuXHRcdGNvbnN0IHByb2plY3ROYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRwcm9qZWN0TmFtZS50ZXh0Q29udGVudCA9IHByb2plY3QudGl0bGU7XG5cdFx0cHJvamVjdE5hbWUuY2xhc3NMaXN0LmFkZChcInByb2plY3QtbmFtZVwiKTtcblx0XHRwcm9qZWN0SXRlbS5hcHBlbmRDaGlsZChwcm9qZWN0TmFtZSk7XG5cblx0XHRjb25zdCBwcm9qZWN0RGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdHByb2plY3REZXNjcmlwdGlvbi5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC1kZXNjcmlwdGlvblwiKTtcblx0XHRwcm9qZWN0RGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBwcm9qZWN0LmRlc2NyaXB0aW9uO1xuXHRcdHByb2plY3RJdGVtLmFwcGVuZENoaWxkKHByb2plY3REZXNjcmlwdGlvbik7XG5cblx0XHRjb25zdCBkZWxldGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXHRcdGRlbGV0ZUJ1dHRvbi50ZXh0Q29udGVudCA9IFwiWFwiO1xuXHRcdGRlbGV0ZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiZGVsZXRlLXByb2plY3QtYnRuXCIpO1xuXHRcdHByb2plY3RJdGVtLmFwcGVuZENoaWxkKGRlbGV0ZUJ1dHRvbik7XG5cblx0XHRwcm9qZWN0TGlzdERPTS5hcHBlbmRDaGlsZChwcm9qZWN0SXRlbSk7XG5cblx0XHRwcm9qZWN0SXRlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdFx0ZGlzcGxheShpbmRleCk7XG5cdFx0XHRzdWJtaXROZXdUb2RvQnRuLmRhdGFzZXQudmFsdWUgPSBpbmRleDtcblx0XHR9KTtcblx0XHRkZWxldGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuXHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRTdG9yYWdlLnByb2plY3RzLnNwbGljZShpbmRleCwgMSk7XG5cdFx0XHRpZiAoU3RvcmFnZS5wcm9qZWN0cy5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0ZGlzcGxheShudWxsKTtcblx0XHRcdH0gZWxzZSBkaXNwbGF5KHN1Ym1pdE5ld1RvZG9CdG4uZGF0YXNldC52YWx1ZSk7XG5cdFx0fSk7XG5cdH1cblxuXHRmdW5jdGlvbiBkaXNwbGF5KHByb2plY3RJbmRleCkge1xuXHRcdHByb2plY3RMaXN0RE9NLmlubmVySFRNTCA9IFwiXCI7XG5cdFx0U3RvcmFnZS5wcm9qZWN0cy5mb3JFYWNoKChwcm9qZWN0LCBpbmRleCkgPT4ge1xuXHRcdFx0Y3JlYXRlUHJvamVjdEVsZW1lbnQocHJvamVjdCwgaW5kZXgpO1xuXHRcdH0pO1xuXHRcdHRvZG9MaXN0LmlubmVySFRNTCA9IFwiXCI7XG5cblx0XHRpZiAocHJvamVjdEluZGV4ID09PSBudWxsKSB7XG5cdFx0XHRTdG9yYWdlLnByb2plY3RzLmZvckVhY2goKHByb2plY3QpID0+IHtcblx0XHRcdFx0cHJvamVjdC50b2Rvcy5mb3JFYWNoKCh0b2RvKSA9PiB7XG5cdFx0XHRcdFx0Y3JlYXRldG9kb0VsZW1lbnQodG9kbywgcHJvamVjdCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0XHRhZGRUb2RvQnRuLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc3QgY3VycmVudFByb2plY3QgPSBTdG9yYWdlLnByb2plY3RzW3Byb2plY3RJbmRleF07XG5cdFx0XHRjdXJyZW50UHJvamVjdC50b2Rvcy5mb3JFYWNoKCh0b2RvKSA9PiB7XG5cdFx0XHRcdGNyZWF0ZXRvZG9FbGVtZW50KHRvZG8sIGN1cnJlbnRQcm9qZWN0KTtcblx0XHRcdH0pO1xuXHRcdFx0YWRkVG9kb0J0bi5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuXHRcdH1cblx0XHRTdG9yYWdlLnNhdmVQcm9qZWN0c1RvTG9jYWxTdG9yYWdlKFN0b3JhZ2UucHJvamVjdHMpO1xuXHR9XG5cblx0cmV0dXJuIHsgZGlzcGxheSB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgRG9tTWFuaXB1bGF0aW9uO1xuIiwiaW1wb3J0IERvbU1hbmlwdWxhdGlvbiBmcm9tIFwiLi9tb2R1bGVzL2RvbU1hbmlwdWxhdGlvblwiO1xuRG9tTWFuaXB1bGF0aW9uLmRpc3BsYXkobnVsbCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
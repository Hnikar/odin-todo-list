/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

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
	const eventListeners = {};

	eventListeners.attachTodoFormListeners = (newTodoBtn, overlay) => {
		newTodoBtn.addEventListener("click", () => {
			todoForm.style.display = "block";
			overlay.style.display = "block";
		});

		formCancelBtn.addEventListener("click", () => {
			todoForm.style.display = "none";
			overlay.style.display = "none";
		});

		todoForm.querySelector("form").addEventListener("submit", (event) => {
			event.preventDefault();

			const title = document.getElementById("todoTitle").value;
			const details = document.getElementById("todoDetails").value;
			const dueDate = document.getElementById("todoDueDate").value;

			const newTodo = new Todo(title, details, dueDate, false);

			storage.projects[newTodoBtn.dataset.value].addNewTodo(newTodo);
			domManipulation.display(newTodoBtn.dataset.value);
			todoForm.querySelector("form").reset();
			todoForm.style.display = "none";
			overlay.style.display = "none";
		});

		return eventListeners;
	};

	eventListeners.attachProjectFormListeners = (
		newProjectBtn,
		newTodoBtn,
		overlay
	) => {
		newProjectBtn.addEventListener("click", () => {
			addProjectForm.style.display = "block";
			overlay.style.display = "block";
		});

		closeProjectFormBtn.addEventListener("click", () => {
			addProjectForm.style.display = "none";
			overlay.style.display = "none";
		});

		projectForm.addEventListener("submit", (event) => {
			event.preventDefault();

			const title = document.getElementById("projectTitle").value;
			const description =
				document.getElementById("projectDescription").value;

			const newProject = new Project(title, description, []);
			storage.projects.push(newProject);
			domManipulation.display(storage.projects.length - 1);

			newTodoBtn.dataset.value = storage.projects.length - 1;

			projectForm.reset();
			addProjectForm.style.display = "none";
			overlay.style.display = "none";
		});

		return eventListeners;
	};

	eventListeners.attachHomeListener = (newTodoBtn) => {
		const homeProjectHeader = document.querySelector(".sidebar h2");
		homeProjectHeader.addEventListener("click", () => {
			newTodoBtn.dataset.value = null;
			domManipulation.display(null);
		});
	};

	eventListeners.attachEditFormSubmitListener = (
		todoForm,
		editTodoTitleInput,
		editTodoDetailsInput,
		editDueDateInput,
		project,
		todo,
		newTodoBtn,
		formCancelBtn
	) => {
		todoForm.querySelector("form").addEventListener("submit", (event) => {
			event.preventDefault();

			const updatedTodo = {
				title: editTodoTitleInput.value,
				details: editTodoDetailsInput.value,
				dueDate: editDueDateInput.value,
				completed: todo.completed,
			};
			project.updateTodo(todo, updatedTodo);
			domManipulation.display(newTodoBtn.dataset.value);

			todoForm.style.display = "none";
			overlay.style.display = "none";
		});
		formCancelBtn.addEventListener("click", () => {
			todoForm.style.display = "none";
			overlay.style.display = "none";
		});

		return eventListeners;
	};

	return eventListeners;
})();

/* harmony default export */ const eventListeners = (EventListeners);

;// CONCATENATED MODULE: ./src/modules/domManipulation.js



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

		eventListeners.attachEditFormSubmitListener(
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

	eventListeners.attachTodoFormListeners(newTodoBtn, overlay)
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
			storage.projects.splice(index, 1);
			if (storage.projects.length === 0) {
				display(null);
			} else display(newTodoBtn.dataset.value);
		});
	}

	function display(projectIndex) {
		projectList.innerHTML = "";
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
			newTodoBtn.style.display = "none";
		} else {
			const currentProject = storage.projects[projectIndex];
			currentProject.todos.forEach((todo) => {
				createtodoElement(todo, currentProject);
			});
			newTodoBtn.style.display = "block";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNmZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNwQmdDO0FBQ047QUFDMUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhCQUE4QixPQUFPO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNEJBQTRCLElBQUk7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQsOENBQWUsT0FBTyxFQUFDOzs7QUM5Q1k7QUFDTjtBQUNNO0FBQ2dCOztBQUVuRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHVCQUF1QixJQUFJOztBQUUzQixHQUFHLE9BQU87QUFDVixHQUFHLGVBQWU7QUFDbEI7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsMEJBQTBCLE9BQU87QUFDakMsR0FBRyxPQUFPO0FBQ1YsR0FBRyxlQUFlLFNBQVMsT0FBTzs7QUFFbEMsOEJBQThCLE9BQU87O0FBRXJDO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUcsZUFBZTtBQUNsQixHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRyxlQUFlOztBQUVsQjtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQscURBQWUsY0FBYyxFQUFDOzs7QUN0SEs7QUFDYzs7QUFFakQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLEVBQUUsY0FBYztBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDLGNBQWM7QUFDZjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRyxPQUFPLDRCQUE0QixPQUFPO0FBQzdDLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRyxPQUFPO0FBQ1YsT0FBTyxPQUFPO0FBQ2Q7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQSxFQUFFLE9BQU87QUFDVDtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBLEdBQUcsT0FBTztBQUNWO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKLDBCQUEwQixPQUFPO0FBQ2pDO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLEVBQUUsT0FBTyw0QkFBNEIsT0FBTztBQUM1Qzs7QUFFQSxVQUFVO0FBQ1YsQ0FBQzs7QUFFRCxzREFBZSxlQUFlLEVBQUM7OztBQ3RMeUI7QUFDeEQsZUFBZSIsInNvdXJjZXMiOlsid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvcHJvamVjdC5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3RvZG8uanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9zdG9yYWdlLmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvZXZlbnRMaXN0ZW5lcnMuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9kb21NYW5pcHVsYXRpb24uanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvc2NyaXB0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2plY3Qge1xuXHRjb25zdHJ1Y3Rvcih0aXRsZSwgZGVzY3JpcHRpb24sIHRvZG9zKSB7XG5cdFx0dGhpcy50aXRsZSA9IHRpdGxlO1xuXHRcdHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcblx0XHR0aGlzLnRvZG9zID0gdG9kb3M7XG5cdH1cblx0YWRkTmV3VG9kbyh0b2RvKSB7XG5cdFx0dGhpcy50b2Rvcy5wdXNoKHRvZG8pO1xuXHR9XG5cdHJlbW92ZVRvZG8odG9kbykge1xuXHRcdHRoaXMudG9kb3Muc3BsaWNlKHRoaXMudG9kb3MuaW5kZXhPZih0b2RvKSwgMSk7XG5cdH1cblx0dXBkYXRlVG9kbyh0b2RvLCBuZXdUb2RvKSB7XG5cdFx0dGhpcy50b2Rvcy5zcGxpY2UodGhpcy50b2Rvcy5pbmRleE9mKHRvZG8pLCAxLCBuZXdUb2RvKTtcblx0fVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9kbyB7XG5cdGNvbnN0cnVjdG9yKHRpdGxlLCBkZXRhaWxzLCBkdWVEYXRlLCBjb21wbGV0ZWQpIHtcblx0XHR0aGlzLnRpdGxlID0gdGl0bGU7XG5cdFx0dGhpcy5kZXRhaWxzID0gZGV0YWlscztcblx0XHR0aGlzLmR1ZURhdGUgPSBkdWVEYXRlO1xuXHRcdHRoaXMuY29tcGxldGVkID0gY29tcGxldGVkO1xuXHR9XG5cblx0dG9nZ2xlQ29tcGxldGVkKCkge1xuXHRcdHRoaXMuY29tcGxldGVkID0gIXRoaXMuY29tcGxldGVkO1xuXHR9XG5cblx0dG9KU09OKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHR0aXRsZTogdGhpcy50aXRsZSxcblx0XHRcdGRldGFpbHM6IHRoaXMuZGV0YWlscyxcblx0XHRcdGR1ZURhdGU6IHRoaXMuZHVlRGF0ZSxcblx0XHRcdGNvbXBsZXRlZDogdGhpcy5jb21wbGV0ZWQsXG5cdFx0fTtcblx0fVxufVxuIiwiaW1wb3J0IFByb2plY3QgZnJvbSBcIi4vcHJvamVjdFwiO1xuaW1wb3J0IFRvZG8gZnJvbSBcIi4vdG9kb1wiO1xuY29uc3QgU3RvcmFnZSA9ICgoKSA9PiB7XG5cdGxldCBwcm9qZWN0cyA9IFtdO1xuXG5cdGNvbnN0IHNhdmVQcm9qZWN0c1RvTG9jYWxTdG9yYWdlID0gKHByb2plY3REaXNwbGF5ZWQpID0+IHtcblx0XHRwcm9qZWN0cyA9IHByb2plY3REaXNwbGF5ZWQ7XG5cdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwcm9qZWN0c1wiLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0cykpO1xuXHR9O1xuXG5cdGNvbnN0IGxvYWRQcm9qZWN0c0Zyb21Mb2NhbFN0b3JhZ2UgPSAoKSA9PiB7XG5cdFx0Y29uc3Qgc2F2ZWRQcm9qZWN0cyA9XG5cdFx0XHRKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwicHJvamVjdHNcIikpIHx8IFtdO1xuXHRcdHByb2plY3RzID0gc2F2ZWRQcm9qZWN0cy5tYXAoKHByb2plY3REYXRhKSA9PlxuXHRcdFx0cmVjcmVhdGVQcm9qZWN0SW5zdGFuY2UocHJvamVjdERhdGEpXG5cdFx0KTtcblx0fTtcblxuXHRjb25zdCByZWNyZWF0ZVByb2plY3RJbnN0YW5jZSA9IChwcm9qZWN0RGF0YSkgPT4ge1xuXHRcdGNvbnN0IHByb2plY3RJbnN0YW5jZSA9IG5ldyBQcm9qZWN0KFxuXHRcdFx0cHJvamVjdERhdGEudGl0bGUsXG5cdFx0XHRwcm9qZWN0RGF0YS5kZXNjcmlwdGlvbixcblx0XHRcdFtdXG5cdFx0KTtcblxuXHRcdHByb2plY3REYXRhLnRvZG9zLmZvckVhY2goKHRvZG9EYXRhKSA9PiB7XG5cdFx0XHRjb25zdCB0b2RvSW5zdGFuY2UgPSBuZXcgVG9kbyhcblx0XHRcdFx0dG9kb0RhdGEudGl0bGUsXG5cdFx0XHRcdHRvZG9EYXRhLmRldGFpbHMsXG5cdFx0XHRcdHRvZG9EYXRhLmR1ZURhdGUsXG5cdFx0XHRcdHRvZG9EYXRhLmNvbXBsZXRlZFxuXHRcdFx0KTtcblx0XHRcdHByb2plY3RJbnN0YW5jZS5hZGROZXdUb2RvKHRvZG9JbnN0YW5jZSk7XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gcHJvamVjdEluc3RhbmNlO1xuXHR9O1xuXG5cdGxvYWRQcm9qZWN0c0Zyb21Mb2NhbFN0b3JhZ2UoKTtcblx0cmV0dXJuIHtcblx0XHRwcm9qZWN0cyxcblx0XHRzYXZlUHJvamVjdHNUb0xvY2FsU3RvcmFnZSxcblx0XHRsb2FkUHJvamVjdHNGcm9tTG9jYWxTdG9yYWdlLFxuXHR9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgU3RvcmFnZTtcbiIsImltcG9ydCBTdG9yYWdlIGZyb20gXCIuL3N0b3JhZ2UuanNcIjtcbmltcG9ydCBUb2RvIGZyb20gXCIuL3RvZG8uanNcIjtcbmltcG9ydCBQcm9qZWN0IGZyb20gXCIuL3Byb2plY3QuanNcIjtcbmltcG9ydCBEb21NYW5pcHVsYXRpb24gZnJvbSBcIi4vZG9tTWFuaXB1bGF0aW9uLmpzXCI7XG5cbmNvbnN0IEV2ZW50TGlzdGVuZXJzID0gKCgpID0+IHtcblx0Y29uc3QgZXZlbnRMaXN0ZW5lcnMgPSB7fTtcblxuXHRldmVudExpc3RlbmVycy5hdHRhY2hUb2RvRm9ybUxpc3RlbmVycyA9IChuZXdUb2RvQnRuLCBvdmVybGF5KSA9PiB7XG5cdFx0bmV3VG9kb0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdFx0dG9kb0Zvcm0uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcblx0XHRcdG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcblx0XHR9KTtcblxuXHRcdGZvcm1DYW5jZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblx0XHRcdHRvZG9Gb3JtLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblx0XHRcdG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXHRcdH0pO1xuXG5cdFx0dG9kb0Zvcm0ucXVlcnlTZWxlY3RvcihcImZvcm1cIikuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZlbnQpID0+IHtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b2RvVGl0bGVcIikudmFsdWU7XG5cdFx0XHRjb25zdCBkZXRhaWxzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b2RvRGV0YWlsc1wiKS52YWx1ZTtcblx0XHRcdGNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvZG9EdWVEYXRlXCIpLnZhbHVlO1xuXG5cdFx0XHRjb25zdCBuZXdUb2RvID0gbmV3IFRvZG8odGl0bGUsIGRldGFpbHMsIGR1ZURhdGUsIGZhbHNlKTtcblxuXHRcdFx0U3RvcmFnZS5wcm9qZWN0c1tuZXdUb2RvQnRuLmRhdGFzZXQudmFsdWVdLmFkZE5ld1RvZG8obmV3VG9kbyk7XG5cdFx0XHREb21NYW5pcHVsYXRpb24uZGlzcGxheShuZXdUb2RvQnRuLmRhdGFzZXQudmFsdWUpO1xuXHRcdFx0dG9kb0Zvcm0ucXVlcnlTZWxlY3RvcihcImZvcm1cIikucmVzZXQoKTtcblx0XHRcdHRvZG9Gb3JtLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblx0XHRcdG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIGV2ZW50TGlzdGVuZXJzO1xuXHR9O1xuXG5cdGV2ZW50TGlzdGVuZXJzLmF0dGFjaFByb2plY3RGb3JtTGlzdGVuZXJzID0gKFxuXHRcdG5ld1Byb2plY3RCdG4sXG5cdFx0bmV3VG9kb0J0bixcblx0XHRvdmVybGF5XG5cdCkgPT4ge1xuXHRcdG5ld1Byb2plY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblx0XHRcdGFkZFByb2plY3RGb3JtLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG5cdFx0XHRvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG5cdFx0fSk7XG5cblx0XHRjbG9zZVByb2plY3RGb3JtQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0XHRhZGRQcm9qZWN0Rm9ybS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cdFx0XHRvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblx0XHR9KTtcblxuXHRcdHByb2plY3RGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGV2ZW50KSA9PiB7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHRjb25zdCB0aXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdFRpdGxlXCIpLnZhbHVlO1xuXHRcdFx0Y29uc3QgZGVzY3JpcHRpb24gPVxuXHRcdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3REZXNjcmlwdGlvblwiKS52YWx1ZTtcblxuXHRcdFx0Y29uc3QgbmV3UHJvamVjdCA9IG5ldyBQcm9qZWN0KHRpdGxlLCBkZXNjcmlwdGlvbiwgW10pO1xuXHRcdFx0U3RvcmFnZS5wcm9qZWN0cy5wdXNoKG5ld1Byb2plY3QpO1xuXHRcdFx0RG9tTWFuaXB1bGF0aW9uLmRpc3BsYXkoU3RvcmFnZS5wcm9qZWN0cy5sZW5ndGggLSAxKTtcblxuXHRcdFx0bmV3VG9kb0J0bi5kYXRhc2V0LnZhbHVlID0gU3RvcmFnZS5wcm9qZWN0cy5sZW5ndGggLSAxO1xuXG5cdFx0XHRwcm9qZWN0Rm9ybS5yZXNldCgpO1xuXHRcdFx0YWRkUHJvamVjdEZvcm0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXHRcdFx0b3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gZXZlbnRMaXN0ZW5lcnM7XG5cdH07XG5cblx0ZXZlbnRMaXN0ZW5lcnMuYXR0YWNoSG9tZUxpc3RlbmVyID0gKG5ld1RvZG9CdG4pID0+IHtcblx0XHRjb25zdCBob21lUHJvamVjdEhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhciBoMlwiKTtcblx0XHRob21lUHJvamVjdEhlYWRlci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdFx0bmV3VG9kb0J0bi5kYXRhc2V0LnZhbHVlID0gbnVsbDtcblx0XHRcdERvbU1hbmlwdWxhdGlvbi5kaXNwbGF5KG51bGwpO1xuXHRcdH0pO1xuXHR9O1xuXG5cdGV2ZW50TGlzdGVuZXJzLmF0dGFjaEVkaXRGb3JtU3VibWl0TGlzdGVuZXIgPSAoXG5cdFx0dG9kb0Zvcm0sXG5cdFx0ZWRpdFRvZG9UaXRsZUlucHV0LFxuXHRcdGVkaXRUb2RvRGV0YWlsc0lucHV0LFxuXHRcdGVkaXREdWVEYXRlSW5wdXQsXG5cdFx0cHJvamVjdCxcblx0XHR0b2RvLFxuXHRcdG5ld1RvZG9CdG4sXG5cdFx0Zm9ybUNhbmNlbEJ0blxuXHQpID0+IHtcblx0XHR0b2RvRm9ybS5xdWVyeVNlbGVjdG9yKFwiZm9ybVwiKS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChldmVudCkgPT4ge1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0Y29uc3QgdXBkYXRlZFRvZG8gPSB7XG5cdFx0XHRcdHRpdGxlOiBlZGl0VG9kb1RpdGxlSW5wdXQudmFsdWUsXG5cdFx0XHRcdGRldGFpbHM6IGVkaXRUb2RvRGV0YWlsc0lucHV0LnZhbHVlLFxuXHRcdFx0XHRkdWVEYXRlOiBlZGl0RHVlRGF0ZUlucHV0LnZhbHVlLFxuXHRcdFx0XHRjb21wbGV0ZWQ6IHRvZG8uY29tcGxldGVkLFxuXHRcdFx0fTtcblx0XHRcdHByb2plY3QudXBkYXRlVG9kbyh0b2RvLCB1cGRhdGVkVG9kbyk7XG5cdFx0XHREb21NYW5pcHVsYXRpb24uZGlzcGxheShuZXdUb2RvQnRuLmRhdGFzZXQudmFsdWUpO1xuXG5cdFx0XHR0b2RvRm9ybS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cdFx0XHRvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblx0XHR9KTtcblx0XHRmb3JtQ2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0XHR0b2RvRm9ybS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cdFx0XHRvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblx0XHR9KTtcblxuXHRcdHJldHVybiBldmVudExpc3RlbmVycztcblx0fTtcblxuXHRyZXR1cm4gZXZlbnRMaXN0ZW5lcnM7XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBFdmVudExpc3RlbmVycztcbiIsImltcG9ydCBTdG9yYWdlIGZyb20gXCIuL3N0b3JhZ2UuanNcIjtcbmltcG9ydCBFdmVudExpc3RlbmVycyBmcm9tIFwiLi9ldmVudExpc3RlbmVycy5qc1wiO1xuXG5jb25zdCBEb21NYW5pcHVsYXRpb24gPSAoKCkgPT4ge1xuXHRjb25zdCB0b2RvTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1saXN0XCIpO1xuXHRjb25zdCBwcm9qZWN0c0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdHMtY29udGFpbmVyXCIpO1xuXHRjb25zdCBwcm9qZWN0TGlzdCA9IHByb2plY3RzQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCJ1bFwiKTtcblxuXHRjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvdmVybGF5XCIpO1xuXG5cdGNvbnN0IG5ld1RvZG9CdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5ldy10b2RvLWJ0blwiKTtcblx0Y29uc3QgbmV3UHJvamVjdEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmV3LXByb2plY3QtYnRuXCIpO1xuXG5cdGNvbnN0IHRvZG9Gb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b2RvRm9ybVwiKTtcblx0Y29uc3QgZm9ybUNhbmNlbEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZm9ybUNhbmNlbEJ0blwiKTtcblxuXHRmdW5jdGlvbiBlZGl0VG9kb0Zvcm0odG9kbywgcHJvamVjdCkge1xuXHRcdHRvZG9Gb3JtLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG5cdFx0b3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuXG5cdFx0Y29uc3QgZWRpdFRvZG9UaXRsZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b2RvVGl0bGVcIik7XG5cdFx0Y29uc3QgZWRpdFRvZG9EZXRhaWxzSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvZG9EZXRhaWxzXCIpO1xuXHRcdGNvbnN0IGVkaXRUb2RvRHVlRGF0ZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b2RvRHVlRGF0ZVwiKTtcblxuXHRcdGVkaXRUb2RvVGl0bGVJbnB1dC52YWx1ZSA9IHRvZG8udGl0bGU7XG5cdFx0ZWRpdFRvZG9EZXRhaWxzSW5wdXQudmFsdWUgPSB0b2RvLmRldGFpbHM7XG5cdFx0ZWRpdFRvZG9EdWVEYXRlSW5wdXQudmFsdWUgPSB0b2RvLmR1ZURhdGU7XG5cblx0XHRFdmVudExpc3RlbmVycy5hdHRhY2hFZGl0Rm9ybVN1Ym1pdExpc3RlbmVyKFxuXHRcdFx0dG9kb0Zvcm0sXG5cdFx0XHRlZGl0VG9kb1RpdGxlSW5wdXQsXG5cdFx0XHRlZGl0VG9kb0RldGFpbHNJbnB1dCxcblx0XHRcdGVkaXRUb2RvRHVlRGF0ZUlucHV0LFxuXHRcdFx0cHJvamVjdCxcblx0XHRcdHRvZG8sXG5cdFx0XHRuZXdUb2RvQnRuLFxuXHRcdFx0Zm9ybUNhbmNlbEJ0blxuXHRcdCk7XG5cdH1cblxuXHRFdmVudExpc3RlbmVycy5hdHRhY2hUb2RvRm9ybUxpc3RlbmVycyhuZXdUb2RvQnRuLCBvdmVybGF5KVxuXHRcdC5hdHRhY2hQcm9qZWN0Rm9ybUxpc3RlbmVycyhuZXdQcm9qZWN0QnRuLCBuZXdUb2RvQnRuLCBvdmVybGF5KVxuXHRcdC5hdHRhY2hIb21lTGlzdGVuZXIobmV3VG9kb0J0bik7XG5cblx0ZnVuY3Rpb24gY3JlYXRldG9kb0VsZW1lbnQodG9kbywgcHJvamVjdCkge1xuXHRcdGNvbnN0IHRvZG9FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuXHRcdHRvZG9FbGVtZW50LmNsYXNzTmFtZSA9IFwidG9kb1wiO1xuXHRcdGlmICh0b2RvLmNvbXBsZXRlZCkge1xuXHRcdFx0dG9kb0VsZW1lbnQuY2xhc3NMaXN0LmFkZChcImNvbXBsZXRlZFwiKTtcblx0XHR9XG5cblx0XHRjb25zdCBsZWZ0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRsZWZ0RGl2LmNsYXNzTmFtZSA9IFwibGVmdFwiO1xuXG5cdFx0Y29uc3QgY2hlY2tib3hJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcblx0XHRjaGVja2JveElucHV0LnR5cGUgPSBcImNoZWNrYm94XCI7XG5cdFx0Y2hlY2tib3hJbnB1dC5jbGFzc05hbWUgPSBcImNoZWNrYm94XCI7XG5cdFx0Y2hlY2tib3hJbnB1dC5jaGVja2VkID0gdG9kby5jb21wbGV0ZWQ7XG5cdFx0Y2hlY2tib3hJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsICgpID0+IHtcblx0XHRcdHRvZG8udG9nZ2xlQ29tcGxldGVkKCk7XG5cdFx0XHR0b2RvRWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKFwiY29tcGxldGVkXCIsIHRvZG8uY29tcGxldGVkKTtcblx0XHRcdFN0b3JhZ2Uuc2F2ZVByb2plY3RzVG9Mb2NhbFN0b3JhZ2UoU3RvcmFnZS5wcm9qZWN0cyk7XG5cdFx0fSk7XG5cblx0XHRjb25zdCB0b2RvTmFtZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0dG9kb05hbWVEaXYuY2xhc3NOYW1lID0gXCJ0b2RvLW5hbWVcIjtcblx0XHR0b2RvTmFtZURpdi50ZXh0Q29udGVudCA9IHRvZG8udGl0bGU7XG5cblx0XHRsZWZ0RGl2LmFwcGVuZENoaWxkKGNoZWNrYm94SW5wdXQpO1xuXHRcdGxlZnREaXYuYXBwZW5kQ2hpbGQodG9kb05hbWVEaXYpO1xuXG5cdFx0Y29uc3QgcmlnaHREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdHJpZ2h0RGl2LmNsYXNzTmFtZSA9IFwicmlnaHRcIjtcblxuXHRcdGNvbnN0IGRldGFpbHNCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXHRcdGRldGFpbHNCdXR0b24uY2xhc3NOYW1lID0gXCJkZXRhaWxzXCI7XG5cdFx0ZGV0YWlsc0J1dHRvbi50ZXh0Q29udGVudCA9IFwiRGV0YWlsc1wiO1xuXHRcdGRldGFpbHNCdXR0b24uZGF0YXNldC5kZXRhaWxzID0gdG9kby5kZXRhaWxzO1xuXG5cdFx0Y29uc3QgZGF0ZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0ZGF0ZURpdi5jbGFzc05hbWUgPSBcImRhdGVcIjtcblx0XHRkYXRlRGl2LnRleHRDb250ZW50ID0gdG9kby5kdWVEYXRlO1xuXG5cdFx0Y29uc3QgYnRuQ29udGFpbmVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRidG5Db250YWluZXJEaXYuY2xhc3NOYW1lID0gXCJidG4tY29udGFpbmVyXCI7XG5cblx0XHRjb25zdCBlZGl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcblx0XHRlZGl0QnV0dG9uLmNsYXNzTmFtZSA9IFwiZWRpdFwiO1xuXHRcdGVkaXRCdXR0b24udGV4dENvbnRlbnQgPSBcIkVkaXRcIjtcblx0XHRlZGl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcblx0XHRcdGVkaXRUb2RvRm9ybSh0b2RvLCBwcm9qZWN0KTtcblx0XHR9KTtcblxuXHRcdGNvbnN0IGRlbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cdFx0ZGVsZXRlQnV0dG9uLmNsYXNzTmFtZSA9IFwiZGVsZXRlXCI7XG5cdFx0ZGVsZXRlQnV0dG9uLnRleHRDb250ZW50ID0gXCJEZWxldGVcIjtcblx0XHRkZWxldGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuXHRcdFx0cHJvamVjdC5yZW1vdmVUb2RvKHRvZG8pO1xuXHRcdFx0aWYgKFxuXHRcdFx0XHRuZXdUb2RvQnRuLmRhdGFzZXQudmFsdWUgPT0gXCJudWxsXCIgfHxcblx0XHRcdFx0bmV3VG9kb0J0bi5kYXRhc2V0LnZhbHVlID09IG51bGxcblx0XHRcdCkge1xuXHRcdFx0XHRkaXNwbGF5KG51bGwpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZGlzcGxheShuZXdUb2RvQnRuLmRhdGFzZXQudmFsdWUpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0YnRuQ29udGFpbmVyRGl2LmFwcGVuZENoaWxkKGVkaXRCdXR0b24pO1xuXHRcdGJ0bkNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZChkZWxldGVCdXR0b24pO1xuXG5cdFx0cmlnaHREaXYuYXBwZW5kQ2hpbGQoZGV0YWlsc0J1dHRvbik7XG5cdFx0cmlnaHREaXYuYXBwZW5kQ2hpbGQoZGF0ZURpdik7XG5cdFx0cmlnaHREaXYuYXBwZW5kQ2hpbGQoYnRuQ29udGFpbmVyRGl2KTtcblxuXHRcdHRvZG9FbGVtZW50LmFwcGVuZENoaWxkKGxlZnREaXYpO1xuXHRcdHRvZG9FbGVtZW50LmFwcGVuZENoaWxkKHJpZ2h0RGl2KTtcblxuXHRcdHRvZG9MaXN0LmFwcGVuZENoaWxkKHRvZG9FbGVtZW50KTtcblx0fVxuXG5cdGZ1bmN0aW9uIGNyZWF0ZVByb2plY3RFbGVtZW50KHByb2plY3QsIGluZGV4KSB7XG5cdFx0Y29uc3QgcHJvamVjdEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG5cdFx0cHJvamVjdEl0ZW0uY2xhc3NMaXN0LmFkZChcInByb2plY3QtbGlzdC1lbGVtZW50XCIpO1xuXG5cdFx0Y29uc3QgcHJvamVjdE5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdHByb2plY3ROYW1lLnRleHRDb250ZW50ID0gcHJvamVjdC50aXRsZTtcblx0XHRwcm9qZWN0TmFtZS5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC1uYW1lXCIpO1xuXHRcdHByb2plY3RJdGVtLmFwcGVuZENoaWxkKHByb2plY3ROYW1lKTtcblxuXHRcdGNvbnN0IHByb2plY3REZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0cHJvamVjdERlc2NyaXB0aW9uLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LWRlc2NyaXB0aW9uXCIpO1xuXHRcdHByb2plY3REZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IHByb2plY3QuZGVzY3JpcHRpb247XG5cdFx0cHJvamVjdEl0ZW0uYXBwZW5kQ2hpbGQocHJvamVjdERlc2NyaXB0aW9uKTtcblxuXHRcdGNvbnN0IGRlbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cdFx0ZGVsZXRlQnV0dG9uLnRleHRDb250ZW50ID0gXCJYXCI7XG5cdFx0ZGVsZXRlQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJkZWxldGUtcHJvamVjdC1idG5cIik7XG5cdFx0cHJvamVjdEl0ZW0uYXBwZW5kQ2hpbGQoZGVsZXRlQnV0dG9uKTtcblxuXHRcdHByb2plY3RMaXN0LmFwcGVuZENoaWxkKHByb2plY3RJdGVtKTtcblxuXHRcdHByb2plY3RJdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0XHRkaXNwbGF5KGluZGV4KTtcblx0XHRcdG5ld1RvZG9CdG4uZGF0YXNldC52YWx1ZSA9IGluZGV4O1xuXHRcdH0pO1xuXHRcdGRlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdFN0b3JhZ2UucHJvamVjdHMuc3BsaWNlKGluZGV4LCAxKTtcblx0XHRcdGlmIChTdG9yYWdlLnByb2plY3RzLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRkaXNwbGF5KG51bGwpO1xuXHRcdFx0fSBlbHNlIGRpc3BsYXkobmV3VG9kb0J0bi5kYXRhc2V0LnZhbHVlKTtcblx0XHR9KTtcblx0fVxuXG5cdGZ1bmN0aW9uIGRpc3BsYXkocHJvamVjdEluZGV4KSB7XG5cdFx0cHJvamVjdExpc3QuaW5uZXJIVE1MID0gXCJcIjtcblx0XHRTdG9yYWdlLnByb2plY3RzLmZvckVhY2goKHByb2plY3QsIGluZGV4KSA9PiB7XG5cdFx0XHRjcmVhdGVQcm9qZWN0RWxlbWVudChwcm9qZWN0LCBpbmRleCk7XG5cdFx0fSk7XG5cdFx0dG9kb0xpc3QuaW5uZXJIVE1MID0gXCJcIjtcblxuXHRcdGlmIChwcm9qZWN0SW5kZXggPT09IG51bGwpIHtcblx0XHRcdFN0b3JhZ2UucHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xuXHRcdFx0XHRwcm9qZWN0LnRvZG9zLmZvckVhY2goKHRvZG8pID0+IHtcblx0XHRcdFx0XHRjcmVhdGV0b2RvRWxlbWVudCh0b2RvLCBwcm9qZWN0KTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHRcdG5ld1RvZG9CdG4uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCBjdXJyZW50UHJvamVjdCA9IFN0b3JhZ2UucHJvamVjdHNbcHJvamVjdEluZGV4XTtcblx0XHRcdGN1cnJlbnRQcm9qZWN0LnRvZG9zLmZvckVhY2goKHRvZG8pID0+IHtcblx0XHRcdFx0Y3JlYXRldG9kb0VsZW1lbnQodG9kbywgY3VycmVudFByb2plY3QpO1xuXHRcdFx0fSk7XG5cdFx0XHRuZXdUb2RvQnRuLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG5cdFx0fVxuXHRcdFN0b3JhZ2Uuc2F2ZVByb2plY3RzVG9Mb2NhbFN0b3JhZ2UoU3RvcmFnZS5wcm9qZWN0cyk7XG5cdH1cblxuXHRyZXR1cm4geyBkaXNwbGF5IH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBEb21NYW5pcHVsYXRpb247XG4iLCJpbXBvcnQgRG9tTWFuaXB1bGF0aW9uIGZyb20gXCIuL21vZHVsZXMvZG9tTWFuaXB1bGF0aW9uXCI7XG5Eb21NYW5pcHVsYXRpb24uZGlzcGxheShudWxsKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
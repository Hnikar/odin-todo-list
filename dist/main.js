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
		editButton.className = "edit-btn";
		editButton.textContent = "Edit";
		editButton.addEventListener("click", (event) => {
			editTodoBtn.style.display = "block";
			submitNewTodoBtn.style.display = "none";
			editTodo(todo, project);
		});

		const deleteButton = document.createElement("button");
		deleteButton.className = "delete-btn";
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
			if (
				storage.projects.length === 0 ||
				submitNewTodoBtn.dataset.value === "null"
			) {
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
		let editBtn = null;
		if (projectIndex === null) {
			storage.projects.forEach((project) => {
				project.todos.forEach((todo) => {
					createtodoElement(todo, project);
				});
			});
			addTodoBtn.style.display = "none";
			editBtn = document.querySelector(".edit-btn");
			if (editBtn != null) editBtn.disabled = true;
		} else {
			const currentProject = storage.projects[projectIndex];
			currentProject.todos.forEach((todo) => {
				createtodoElement(todo, currentProject);
			});
			addTodoBtn.style.display = "block";
			editBtn = document.querySelector(".edit-btn");
			if (editBtn != null) editBtn.disabled = false;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQSxFQUFFLE9BQU87QUFDVDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHLE9BQU87QUFDVjtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osMEJBQTBCLE9BQU87QUFDakM7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxFQUFFLE9BQU8sNEJBQTRCLE9BQU87QUFDNUM7O0FBRUEsVUFBVTtBQUNWLENBQUM7O0FBRUQsc0RBQWUsZUFBZSxFQUFDOzs7QUNsT3lCO0FBQ3hELGVBQWUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3RvZG8uanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9wcm9qZWN0LmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2V2ZW50TGlzdGVuZXJzLmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvZG9tTWFuaXB1bGF0aW9uLmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL3NjcmlwdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBUb2RvIHtcblx0Y29uc3RydWN0b3IodGl0bGUsIGRldGFpbHMsIGR1ZURhdGUsIGNvbXBsZXRlZCkge1xuXHRcdHRoaXMudGl0bGUgPSB0aXRsZTtcblx0XHR0aGlzLmRldGFpbHMgPSBkZXRhaWxzO1xuXHRcdHRoaXMuZHVlRGF0ZSA9IGR1ZURhdGU7XG5cdFx0dGhpcy5jb21wbGV0ZWQgPSBjb21wbGV0ZWQ7XG5cdH1cblxuXHR0b2dnbGVDb21wbGV0ZWQoKSB7XG5cdFx0dGhpcy5jb21wbGV0ZWQgPSAhdGhpcy5jb21wbGV0ZWQ7XG5cdH1cblxuXHR0b0pTT04oKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHRpdGxlOiB0aGlzLnRpdGxlLFxuXHRcdFx0ZGV0YWlsczogdGhpcy5kZXRhaWxzLFxuXHRcdFx0ZHVlRGF0ZTogdGhpcy5kdWVEYXRlLFxuXHRcdFx0Y29tcGxldGVkOiB0aGlzLmNvbXBsZXRlZCxcblx0XHR9O1xuXHR9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9qZWN0IHtcblx0Y29uc3RydWN0b3IodGl0bGUsIGRlc2NyaXB0aW9uLCB0b2Rvcykge1xuXHRcdHRoaXMudGl0bGUgPSB0aXRsZTtcblx0XHR0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG5cdFx0dGhpcy50b2RvcyA9IHRvZG9zO1xuXHR9XG5cdGFkZE5ld1RvZG8odG9kbykge1xuXHRcdHRoaXMudG9kb3MucHVzaCh0b2RvKTtcblx0fVxuXHRyZW1vdmVUb2RvKHRvZG8pIHtcblx0XHR0aGlzLnRvZG9zLnNwbGljZSh0aGlzLnRvZG9zLmluZGV4T2YodG9kbyksIDEpO1xuXHR9XG5cdHVwZGF0ZVRvZG8odG9kbywgbmV3VG9kbykge1xuXHRcdHRoaXMudG9kb3Muc3BsaWNlKHRoaXMudG9kb3MuaW5kZXhPZih0b2RvKSwgMSwgbmV3VG9kbyk7XG5cdH1cbn1cbiIsImltcG9ydCBQcm9qZWN0IGZyb20gXCIuL3Byb2plY3RcIjtcbmltcG9ydCBUb2RvIGZyb20gXCIuL3RvZG9cIjtcbmNvbnN0IFN0b3JhZ2UgPSAoKCkgPT4ge1xuXHRsZXQgcHJvamVjdHMgPSBbXTtcblxuXHRjb25zdCBzYXZlUHJvamVjdHNUb0xvY2FsU3RvcmFnZSA9IChwcm9qZWN0RGlzcGxheWVkKSA9PiB7XG5cdFx0cHJvamVjdHMgPSBwcm9qZWN0RGlzcGxheWVkO1xuXHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwicHJvamVjdHNcIiwgSlNPTi5zdHJpbmdpZnkocHJvamVjdHMpKTtcblx0fTtcblxuXHRjb25zdCBsb2FkUHJvamVjdHNGcm9tTG9jYWxTdG9yYWdlID0gKCkgPT4ge1xuXHRcdGNvbnN0IHNhdmVkUHJvamVjdHMgPVxuXHRcdFx0SlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInByb2plY3RzXCIpKSB8fCBbXTtcblx0XHRwcm9qZWN0cyA9IHNhdmVkUHJvamVjdHMubWFwKChwcm9qZWN0RGF0YSkgPT5cblx0XHRcdHJlY3JlYXRlUHJvamVjdEluc3RhbmNlKHByb2plY3REYXRhKVxuXHRcdCk7XG5cdH07XG5cblx0Y29uc3QgcmVjcmVhdGVQcm9qZWN0SW5zdGFuY2UgPSAocHJvamVjdERhdGEpID0+IHtcblx0XHRjb25zdCBwcm9qZWN0SW5zdGFuY2UgPSBuZXcgUHJvamVjdChcblx0XHRcdHByb2plY3REYXRhLnRpdGxlLFxuXHRcdFx0cHJvamVjdERhdGEuZGVzY3JpcHRpb24sXG5cdFx0XHRbXVxuXHRcdCk7XG5cblx0XHRwcm9qZWN0RGF0YS50b2Rvcy5mb3JFYWNoKCh0b2RvRGF0YSkgPT4ge1xuXHRcdFx0Y29uc3QgdG9kb0luc3RhbmNlID0gbmV3IFRvZG8oXG5cdFx0XHRcdHRvZG9EYXRhLnRpdGxlLFxuXHRcdFx0XHR0b2RvRGF0YS5kZXRhaWxzLFxuXHRcdFx0XHR0b2RvRGF0YS5kdWVEYXRlLFxuXHRcdFx0XHR0b2RvRGF0YS5jb21wbGV0ZWRcblx0XHRcdCk7XG5cdFx0XHRwcm9qZWN0SW5zdGFuY2UuYWRkTmV3VG9kbyh0b2RvSW5zdGFuY2UpO1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHByb2plY3RJbnN0YW5jZTtcblx0fTtcblxuXHRsb2FkUHJvamVjdHNGcm9tTG9jYWxTdG9yYWdlKCk7XG5cdHJldHVybiB7XG5cdFx0cHJvamVjdHMsXG5cdFx0c2F2ZVByb2plY3RzVG9Mb2NhbFN0b3JhZ2UsXG5cdFx0bG9hZFByb2plY3RzRnJvbUxvY2FsU3RvcmFnZSxcblx0fTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IFN0b3JhZ2U7XG4iLCJpbXBvcnQgRG9tTWFuaXB1bGF0aW9uIGZyb20gXCIuL2RvbU1hbmlwdWxhdGlvbi5qc1wiO1xuaW1wb3J0IFN0b3JhZ2UgZnJvbSBcIi4vc3RvcmFnZS5qc1wiO1xuaW1wb3J0IFRvZG8gZnJvbSBcIi4vdG9kby5qc1wiO1xuaW1wb3J0IFByb2plY3QgZnJvbSBcIi4vcHJvamVjdC5qc1wiO1xuXG5jb25zdCBFdmVudExpc3RlbmVycyA9ICgoKSA9PiB7XG5cdGNvbnN0IGFkZE5ld1RvZG8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC10b2RvLWJ0blwiKTtcblxuXHRmdW5jdGlvbiBwcm9qZWN0Rm9ybUV2ZW50TGlzdGVuZXIoKSB7XG5cdFx0Y29uc3QgdGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3RUaXRsZVwiKS52YWx1ZTtcblx0XHRjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdERlc2NyaXB0aW9uXCIpLnZhbHVlO1xuXG5cdFx0Y29uc3QgbmV3UHJvamVjdCA9IG5ldyBQcm9qZWN0KHRpdGxlLCBkZXNjcmlwdGlvbiwgW10pO1xuXHRcdFN0b3JhZ2UucHJvamVjdHMucHVzaChuZXdQcm9qZWN0KTtcblx0XHREb21NYW5pcHVsYXRpb24uZGlzcGxheShTdG9yYWdlLnByb2plY3RzLmxlbmd0aCAtIDEpO1xuXG5cdFx0YWRkTmV3VG9kby5kYXRhc2V0LnZhbHVlID0gU3RvcmFnZS5wcm9qZWN0cy5sZW5ndGggLSAxO1xuXHRcdGNvbnNvbGUubG9nKGFkZE5ld1RvZG8uZGF0YXNldC52YWx1ZSk7XG5cdFx0cHJvamVjdEZvcm0ucmVzZXQoKTtcblx0XHRhZGRQcm9qZWN0Rm9ybS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cdFx0b3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cdH1cblxuXHRmdW5jdGlvbiBzdWJtaXROZXdUb2RvRXZlbnQoKSB7XG5cdFx0Y29uc3QgdGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvZG9UaXRsZVwiKS52YWx1ZTtcblx0XHRjb25zdCBkZXRhaWxzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b2RvRGV0YWlsc1wiKS52YWx1ZTtcblx0XHRjb25zdCBkdWVEYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkdWVEYXRlXCIpLnZhbHVlO1xuXG5cdFx0Y29uc3QgbmV3VG9kbyA9IG5ldyBUb2RvKHRpdGxlLCBkZXRhaWxzLCBkdWVEYXRlLCBmYWxzZSk7XG5cdFx0U3RvcmFnZS5wcm9qZWN0c1thZGROZXdUb2RvLmRhdGFzZXQudmFsdWVdLmFkZE5ld1RvZG8obmV3VG9kbyk7XG5cdFx0dG9kb0Zvcm0ucmVzZXQoKTtcblx0XHREb21NYW5pcHVsYXRpb24uZGlzcGxheShzdWJtaXROZXdUb2RvQnRuLmRhdGFzZXQudmFsdWUpO1xuXHRcdHRvZG9Gb3JtQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblx0XHRvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0cHJvamVjdEZvcm1FdmVudExpc3RlbmVyLFxuXHRcdHN1Ym1pdE5ld1RvZG9FdmVudCxcblx0fTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IEV2ZW50TGlzdGVuZXJzO1xuIiwiaW1wb3J0IFRvZG8gZnJvbSBcIi4vdG9kby5qc1wiO1xuaW1wb3J0IFN0b3JhZ2UgZnJvbSBcIi4vc3RvcmFnZS5qc1wiO1xuaW1wb3J0IEV2ZW50TGlzdGVuZXJzIGZyb20gXCIuL2V2ZW50TGlzdGVuZXJzLmpzXCI7XG5jb25zdCBEb21NYW5pcHVsYXRpb24gPSAoKCkgPT4ge1xuXHRjb25zdCB0b2RvTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1saXN0XCIpO1xuXHRjb25zdCBwcm9qZWN0c0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdHMtY29udGFpbmVyXCIpO1xuXHRjb25zdCBwcm9qZWN0TGlzdERPTSA9IHByb2plY3RzQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCJ1bFwiKTtcblxuXHRjb25zdCBhZGRUb2RvQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtdG9kby1idG5cIik7XG5cdGNvbnN0IG5ld1Byb2plY3RCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5ldy1wcm9qZWN0LWJ0blwiKTtcblxuXHRjb25zdCB0b2RvRm9ybUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG9kb0Zvcm1Db250YWluZXJcIik7XG5cblx0Y29uc3QgY2xvc2VGb3JtQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjbG9zZUZvcm1CdG5cIik7XG5cblx0bmV3UHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdGFkZFByb2plY3RGb3JtLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG5cdFx0b3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuXHR9KTtcblx0cHJvamVjdEZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZlbnQpID0+IHtcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdEV2ZW50TGlzdGVuZXJzLnByb2plY3RGb3JtRXZlbnRMaXN0ZW5lcigpO1xuXHR9KTtcblx0Y2xvc2VQcm9qZWN0Rm9ybUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdGFkZFByb2plY3RGb3JtLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblx0XHRvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblx0fSk7XG5cblx0YWRkVG9kb0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdGVkaXRUb2RvQnRuLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblx0XHRzdWJtaXROZXdUb2RvQnRuLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG5cdFx0dG9kb0Zvcm1Db250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcblx0XHRvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG5cdH0pO1xuXHRjbG9zZUZvcm1CdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblx0XHR0b2RvRm9ybUNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cdFx0b3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cdH0pO1xuXG5cdGNvbnN0IHN1Ym1pdE5ld1RvZG9CdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN1Ym1pdE5ld1RvZG9CdG5cIik7XG5cdHRvZG9Gb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGV2ZW50KSA9PiB7XG5cdFx0RXZlbnRMaXN0ZW5lcnMuc3VibWl0TmV3VG9kb0V2ZW50KCk7XG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0fSk7XG5cblx0Y29uc3QgaG9tZVByb2plY3RIZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXIgaDJcIik7XG5cdGhvbWVQcm9qZWN0SGVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0c3VibWl0TmV3VG9kb0J0bi5kYXRhc2V0LnZhbHVlID0gbnVsbDtcblx0XHREb21NYW5pcHVsYXRpb24uZGlzcGxheShudWxsKTtcblx0fSk7XG5cblx0ZnVuY3Rpb24gZWRpdFRvZG8odG9kbywgcHJvamVjdCkge1xuXHRcdHRvZG9Gb3JtQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG5cdFx0b3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuXHRcdGNvbnN0IFRpdGxlSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvZG9UaXRsZVwiKTtcblx0XHRjb25zdCBEZXRhaWxzSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvZG9EZXRhaWxzXCIpO1xuXHRcdGNvbnN0IER1ZURhdGVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZHVlRGF0ZVwiKTtcblxuXHRcdFRpdGxlSW5wdXQudmFsdWUgPSB0b2RvLnRpdGxlO1xuXHRcdERldGFpbHNJbnB1dC52YWx1ZSA9IHRvZG8uZGV0YWlscztcblx0XHREdWVEYXRlSW5wdXQudmFsdWUgPSB0b2RvLmR1ZURhdGU7XG5cblx0XHRjb25zdCBlZGl0VG9kb0J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZWRpdFRvZG9CdG5cIik7XG5cdFx0ZWRpdFRvZG9CdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGNvbnN0IHVwZGF0ZWRUb2RvID0gbmV3IFRvZG8oXG5cdFx0XHRcdFRpdGxlSW5wdXQudmFsdWUsXG5cdFx0XHRcdERldGFpbHNJbnB1dC52YWx1ZSxcblx0XHRcdFx0RHVlRGF0ZUlucHV0LnZhbHVlLFxuXHRcdFx0XHR0b2RvLmNvbXBsZXRlZFxuXHRcdFx0KTtcblx0XHRcdHByb2plY3QudXBkYXRlVG9kbyh0b2RvLCB1cGRhdGVkVG9kbyk7XG5cdFx0XHREb21NYW5pcHVsYXRpb24uZGlzcGxheShzdWJtaXROZXdUb2RvQnRuLmRhdGFzZXQudmFsdWUpO1xuXHRcdFx0dG9kb0Zvcm1Db250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXHRcdFx0b3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cdFx0fSk7XG5cdH1cblxuXHRmdW5jdGlvbiBjcmVhdGV0b2RvRWxlbWVudCh0b2RvLCBwcm9qZWN0KSB7XG5cdFx0Y29uc3QgdG9kb0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG5cdFx0dG9kb0VsZW1lbnQuY2xhc3NOYW1lID0gXCJ0b2RvXCI7XG5cdFx0aWYgKHRvZG8uY29tcGxldGVkKSB7XG5cdFx0XHR0b2RvRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiY29tcGxldGVkXCIpO1xuXHRcdH1cblxuXHRcdGNvbnN0IGxlZnREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdGxlZnREaXYuY2xhc3NOYW1lID0gXCJsZWZ0XCI7XG5cblx0XHRjb25zdCBjaGVja2JveElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuXHRcdGNoZWNrYm94SW5wdXQudHlwZSA9IFwiY2hlY2tib3hcIjtcblx0XHRjaGVja2JveElucHV0LmNsYXNzTmFtZSA9IFwiY2hlY2tib3hcIjtcblx0XHRjaGVja2JveElucHV0LmNoZWNrZWQgPSB0b2RvLmNvbXBsZXRlZDtcblx0XHRjaGVja2JveElucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKCkgPT4ge1xuXHRcdFx0dG9kby50b2dnbGVDb21wbGV0ZWQoKTtcblx0XHRcdHRvZG9FbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoXCJjb21wbGV0ZWRcIiwgdG9kby5jb21wbGV0ZWQpO1xuXHRcdFx0U3RvcmFnZS5zYXZlUHJvamVjdHNUb0xvY2FsU3RvcmFnZShTdG9yYWdlLnByb2plY3RzKTtcblx0XHR9KTtcblxuXHRcdGNvbnN0IHRvZG9OYW1lRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHR0b2RvTmFtZURpdi5jbGFzc05hbWUgPSBcInRvZG8tbmFtZVwiO1xuXHRcdHRvZG9OYW1lRGl2LnRleHRDb250ZW50ID0gdG9kby50aXRsZTtcblxuXHRcdGxlZnREaXYuYXBwZW5kQ2hpbGQoY2hlY2tib3hJbnB1dCk7XG5cdFx0bGVmdERpdi5hcHBlbmRDaGlsZCh0b2RvTmFtZURpdik7XG5cblx0XHRjb25zdCByaWdodERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0cmlnaHREaXYuY2xhc3NOYW1lID0gXCJyaWdodFwiO1xuXG5cdFx0Y29uc3QgZGV0YWlsc0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cdFx0ZGV0YWlsc0J1dHRvbi5jbGFzc05hbWUgPSBcImRldGFpbHNcIjtcblx0XHRkZXRhaWxzQnV0dG9uLnRleHRDb250ZW50ID0gXCJEZXRhaWxzXCI7XG5cdFx0ZGV0YWlsc0J1dHRvbi5kYXRhc2V0LmRldGFpbHMgPSB0b2RvLmRldGFpbHM7XG5cblx0XHRjb25zdCBkYXRlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRkYXRlRGl2LmNsYXNzTmFtZSA9IFwiZGF0ZVwiO1xuXHRcdGRhdGVEaXYudGV4dENvbnRlbnQgPSB0b2RvLmR1ZURhdGU7XG5cblx0XHRjb25zdCBidG5Db250YWluZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdGJ0bkNvbnRhaW5lckRpdi5jbGFzc05hbWUgPSBcImJ0bi1jb250YWluZXJcIjtcblxuXHRcdGNvbnN0IGVkaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXHRcdGVkaXRCdXR0b24uY2xhc3NOYW1lID0gXCJlZGl0LWJ0blwiO1xuXHRcdGVkaXRCdXR0b24udGV4dENvbnRlbnQgPSBcIkVkaXRcIjtcblx0XHRlZGl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcblx0XHRcdGVkaXRUb2RvQnRuLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG5cdFx0XHRzdWJtaXROZXdUb2RvQnRuLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblx0XHRcdGVkaXRUb2RvKHRvZG8sIHByb2plY3QpO1xuXHRcdH0pO1xuXG5cdFx0Y29uc3QgZGVsZXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcblx0XHRkZWxldGVCdXR0b24uY2xhc3NOYW1lID0gXCJkZWxldGUtYnRuXCI7XG5cdFx0ZGVsZXRlQnV0dG9uLnRleHRDb250ZW50ID0gXCJEZWxldGVcIjtcblx0XHRkZWxldGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuXHRcdFx0cHJvamVjdC5yZW1vdmVUb2RvKHRvZG8pO1xuXHRcdFx0aWYgKFxuXHRcdFx0XHRzdWJtaXROZXdUb2RvQnRuLmRhdGFzZXQudmFsdWUgPT0gXCJudWxsXCIgfHxcblx0XHRcdFx0c3VibWl0TmV3VG9kb0J0bi5kYXRhc2V0LnZhbHVlID09IG51bGxcblx0XHRcdCkge1xuXHRcdFx0XHRkaXNwbGF5KG51bGwpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZGlzcGxheShzdWJtaXROZXdUb2RvQnRuLmRhdGFzZXQudmFsdWUpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0YnRuQ29udGFpbmVyRGl2LmFwcGVuZENoaWxkKGVkaXRCdXR0b24pO1xuXHRcdGJ0bkNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZChkZWxldGVCdXR0b24pO1xuXG5cdFx0cmlnaHREaXYuYXBwZW5kQ2hpbGQoZGV0YWlsc0J1dHRvbik7XG5cdFx0cmlnaHREaXYuYXBwZW5kQ2hpbGQoZGF0ZURpdik7XG5cdFx0cmlnaHREaXYuYXBwZW5kQ2hpbGQoYnRuQ29udGFpbmVyRGl2KTtcblxuXHRcdHRvZG9FbGVtZW50LmFwcGVuZENoaWxkKGxlZnREaXYpO1xuXHRcdHRvZG9FbGVtZW50LmFwcGVuZENoaWxkKHJpZ2h0RGl2KTtcblxuXHRcdHRvZG9MaXN0LmFwcGVuZENoaWxkKHRvZG9FbGVtZW50KTtcblx0fVxuXG5cdGZ1bmN0aW9uIGNyZWF0ZVByb2plY3RFbGVtZW50KHByb2plY3QsIGluZGV4KSB7XG5cdFx0Y29uc3QgcHJvamVjdEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG5cdFx0cHJvamVjdEl0ZW0uY2xhc3NMaXN0LmFkZChcInByb2plY3QtbGlzdC1lbGVtZW50XCIpO1xuXG5cdFx0Y29uc3QgcHJvamVjdE5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdHByb2plY3ROYW1lLnRleHRDb250ZW50ID0gcHJvamVjdC50aXRsZTtcblx0XHRwcm9qZWN0TmFtZS5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC1uYW1lXCIpO1xuXHRcdHByb2plY3RJdGVtLmFwcGVuZENoaWxkKHByb2plY3ROYW1lKTtcblxuXHRcdGNvbnN0IHByb2plY3REZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0cHJvamVjdERlc2NyaXB0aW9uLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LWRlc2NyaXB0aW9uXCIpO1xuXHRcdHByb2plY3REZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IHByb2plY3QuZGVzY3JpcHRpb247XG5cdFx0cHJvamVjdEl0ZW0uYXBwZW5kQ2hpbGQocHJvamVjdERlc2NyaXB0aW9uKTtcblxuXHRcdGNvbnN0IGRlbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cdFx0ZGVsZXRlQnV0dG9uLnRleHRDb250ZW50ID0gXCJYXCI7XG5cdFx0ZGVsZXRlQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJkZWxldGUtcHJvamVjdC1idG5cIik7XG5cdFx0cHJvamVjdEl0ZW0uYXBwZW5kQ2hpbGQoZGVsZXRlQnV0dG9uKTtcblxuXHRcdHByb2plY3RMaXN0RE9NLmFwcGVuZENoaWxkKHByb2plY3RJdGVtKTtcblxuXHRcdHByb2plY3RJdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0XHRkaXNwbGF5KGluZGV4KTtcblx0XHRcdHN1Ym1pdE5ld1RvZG9CdG4uZGF0YXNldC52YWx1ZSA9IGluZGV4O1xuXHRcdH0pO1xuXHRcdGRlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdFN0b3JhZ2UucHJvamVjdHMuc3BsaWNlKGluZGV4LCAxKTtcblx0XHRcdGlmIChcblx0XHRcdFx0U3RvcmFnZS5wcm9qZWN0cy5sZW5ndGggPT09IDAgfHxcblx0XHRcdFx0c3VibWl0TmV3VG9kb0J0bi5kYXRhc2V0LnZhbHVlID09PSBcIm51bGxcIlxuXHRcdFx0KSB7XG5cdFx0XHRcdGRpc3BsYXkobnVsbCk7XG5cdFx0XHR9IGVsc2UgZGlzcGxheShzdWJtaXROZXdUb2RvQnRuLmRhdGFzZXQudmFsdWUpO1xuXHRcdH0pO1xuXHR9XG5cblx0ZnVuY3Rpb24gZGlzcGxheShwcm9qZWN0SW5kZXgpIHtcblx0XHRwcm9qZWN0TGlzdERPTS5pbm5lckhUTUwgPSBcIlwiO1xuXHRcdFN0b3JhZ2UucHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCwgaW5kZXgpID0+IHtcblx0XHRcdGNyZWF0ZVByb2plY3RFbGVtZW50KHByb2plY3QsIGluZGV4KTtcblx0XHR9KTtcblx0XHR0b2RvTGlzdC5pbm5lckhUTUwgPSBcIlwiO1xuXHRcdGxldCBlZGl0QnRuID0gbnVsbDtcblx0XHRpZiAocHJvamVjdEluZGV4ID09PSBudWxsKSB7XG5cdFx0XHRTdG9yYWdlLnByb2plY3RzLmZvckVhY2goKHByb2plY3QpID0+IHtcblx0XHRcdFx0cHJvamVjdC50b2Rvcy5mb3JFYWNoKCh0b2RvKSA9PiB7XG5cdFx0XHRcdFx0Y3JlYXRldG9kb0VsZW1lbnQodG9kbywgcHJvamVjdCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0XHRhZGRUb2RvQnRuLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblx0XHRcdGVkaXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmVkaXQtYnRuXCIpO1xuXHRcdFx0aWYgKGVkaXRCdG4gIT0gbnVsbCkgZWRpdEJ0bi5kaXNhYmxlZCA9IHRydWU7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnN0IGN1cnJlbnRQcm9qZWN0ID0gU3RvcmFnZS5wcm9qZWN0c1twcm9qZWN0SW5kZXhdO1xuXHRcdFx0Y3VycmVudFByb2plY3QudG9kb3MuZm9yRWFjaCgodG9kbykgPT4ge1xuXHRcdFx0XHRjcmVhdGV0b2RvRWxlbWVudCh0b2RvLCBjdXJyZW50UHJvamVjdCk7XG5cdFx0XHR9KTtcblx0XHRcdGFkZFRvZG9CdG4uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcblx0XHRcdGVkaXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmVkaXQtYnRuXCIpO1xuXHRcdFx0aWYgKGVkaXRCdG4gIT0gbnVsbCkgZWRpdEJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xuXHRcdH1cblxuXHRcdFN0b3JhZ2Uuc2F2ZVByb2plY3RzVG9Mb2NhbFN0b3JhZ2UoU3RvcmFnZS5wcm9qZWN0cyk7XG5cdH1cblxuXHRyZXR1cm4geyBkaXNwbGF5IH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBEb21NYW5pcHVsYXRpb247XG4iLCJpbXBvcnQgRG9tTWFuaXB1bGF0aW9uIGZyb20gXCIuL21vZHVsZXMvZG9tTWFuaXB1bGF0aW9uXCI7XG5Eb21NYW5pcHVsYXRpb24uZGlzcGxheShudWxsKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
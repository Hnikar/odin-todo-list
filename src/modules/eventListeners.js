import Storage from "./storage.js";
import Todo from "./todo.js";
import Project from "./project.js";
import DomManipulation from "./domManipulation.js";

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

			Storage.projects[newTodoBtn.dataset.value].addNewTodo(newTodo);
			DomManipulation.display(newTodoBtn.dataset.value);
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
			Storage.projects.push(newProject);
			DomManipulation.display(Storage.projects.length - 1);

			newTodoBtn.dataset.value = Storage.projects.length - 1;

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
			DomManipulation.display(null);
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
			DomManipulation.display(newTodoBtn.dataset.value);

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

export default EventListeners;

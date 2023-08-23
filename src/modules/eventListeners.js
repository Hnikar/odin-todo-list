import Storage from "./storage.js";
import Todo from "./todo.js";
import Project from "./project.js";
import DomManipulation from "./domManipulation.js"; // Adjust the path as needed

const EventListeners = (() => {
	const eventListeners = {};

	eventListeners.attachTodoFormListeners = (newTodoBtn, overlay) => {
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
			const description =
				document.getElementById("todoDescription").value;
			const dueDate = document.getElementById("dueDate").value;

			const newTodo = new Todo(title, description, dueDate, false);

			Storage.projects[newTodoBtn.dataset.value].addNewTodo(newTodo);
			DomManipulation.display(newTodoBtn.dataset.value);

			todoForm.reset();
			addTodoForm.style.display = "none";
			overlay.style.display = "none";
		});

		return eventListeners;
	};

	eventListeners.attachProjectFormListeners = (newProjectBtn, overlay) => {
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

			projectForm.reset();
			addProjectForm.style.display = "none";
			overlay.style.display = "none";
		});

		return eventListeners;
	};

	eventListeners.attachHomeListener = (newTodoBtn) => {
		const homeProjectHeader = document.querySelector(".sidebar h2");
		homeProjectHeader.addEventListener("click", () => {
			DomManipulation.display(null);
			newTodoBtn.dataset.value = null;
		});
	};
	return eventListeners;
})();

export default EventListeners;

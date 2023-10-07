import DomManipulation from "./domManipulation.js";
import Storage from "./storage.js";
import Todo from "./todo.js";
import Project from "./project.js";

const EventListeners = (() => {
	const addNewTodo = document.getElementById("add-todo-btn");

	function projectFormEventListener() {
		const title = document.getElementById("projectTitle").value;
		const description = document.getElementById("projectDescription").value;

		const newProject = new Project(title, description, []);
		Storage.projects.push(newProject);
		DomManipulation.display(Storage.projects.length - 1);

		addNewTodo.dataset.value = Storage.projects.length - 1;
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
		Storage.projects[addNewTodo.dataset.value].addNewTodo(newTodo);
		todoForm.reset();
		DomManipulation.display(submitNewTodoBtn.dataset.value);
		todoFormContainer.style.display = "none";
		overlay.style.display = "none";
	}

	return {
		projectFormEventListener,
		submitNewTodoEvent,
	};
})();

export default EventListeners;

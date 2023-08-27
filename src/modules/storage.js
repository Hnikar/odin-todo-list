import Project from "./project";
import Todo from "./todo";
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

export default Storage;

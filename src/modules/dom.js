import "./todo.js";
import todoList from "./memory.js";

const DomManipulation = (() => {
	const main = document.querySelector("main");
	function _createTaskInDom(item) {
		const taskDiv = document.createElement("div");
		taskDiv.className = "task";

		const leftDiv = document.createElement("div");
		leftDiv.className = "left";

		const checkboxDiv = document.createElement("div");
		checkboxDiv.className = "checkbox";
		checkboxDiv.textContent = "SU";

		const taskNameDiv = document.createElement("div");
		taskNameDiv.className = "task-name";
		taskNameDiv.textContent = item.title;

		leftDiv.appendChild(checkboxDiv);
		leftDiv.appendChild(taskNameDiv);

		const rightDiv = document.createElement("div");
		rightDiv.className = "right";

		const detailsButton = document.createElement("button");
		detailsButton.className = "details";
		detailsButton.textContent = item.description;

		const dateDiv = document.createElement("div");
		dateDiv.className = "date";
		dateDiv.textContent = item.dueDate;

		const btnContainerDiv = document.createElement("div");
		btnContainerDiv.className = "btn-container";

		const editButton = document.createElement("button");
		editButton.className = "edit";
		editButton.textContent = "Edit";

		const deleteButton = document.createElement("button");
		deleteButton.className = "delete";
		deleteButton.textContent = "Delete";

		btnContainerDiv.appendChild(editButton);
		btnContainerDiv.appendChild(deleteButton);

		rightDiv.appendChild(detailsButton);
		rightDiv.appendChild(dateDiv);
		rightDiv.appendChild(btnContainerDiv);

		taskDiv.appendChild(leftDiv);
		taskDiv.appendChild(rightDiv);

		main.appendChild(taskDiv);
	}
	// function __addNewTask()
	function display() {
		const taskArr = document.querySelectorAll(".task");
		taskArr.forEach((task) => main.removeChild(task));
		for (let i = 0; i < todoList.length; i++) {
			_createTaskInDom(todoList[i]);
		}
	}
	return { display };
})();

export default DomManipulation;

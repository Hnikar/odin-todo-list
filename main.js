/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/modules/dom.js




const projectList = [
	{
		title: "One Project",
		description: "Project Description",
		todos: [
			{
				title: "Task 1",
				description: "Task Description 1",
				dueDate: "2023-08-15",
			},
			{
				title: "Task 2",
				description: "Task Description 2",
				dueDate: "2023-08-20",
			},
		],
		addNewTodo(todo) {
			this.todos.push(todo);
		},
		removeTodo(todo) {
			const index = this.todos.indexOf(todo);
			if (index !== -1) {
				this.todos.splice(index, 1);
			}
		},
		updateTodo(todo, newTodo) {
			const index = this.todos.indexOf(todo);
			if (index !== -1) {
				this.todos.splice(index, 1, newTodo);
			}
		},
	},
	{
		title: "Two Project",
		description: "Project Description",
		todos: [
			{
				title: "Task 2-1",
				description: "Task Description 1",
				dueDate: "2023-08-15",
			},
			{
				title: "Task 2-2",
				description: "Task Description 2",
				dueDate: "2023-08-20",
			},
		],
		addNewTodo(todo) {
			this.todos.push(todo);
		},
		removeTodo(todo) {
			const index = this.todos.indexOf(todo);
			if (index !== -1) {
				this.todos.splice(index, 1);
			}
		},
		updateTodo(todo, newTodo) {
			const index = this.todos.indexOf(todo);
			if (index !== -1) {
				this.todos.splice(index, 1, newTodo);
			}
		},
	},
];

const DomManipulation = (() => {
	const mainElement = document.querySelector("main");
	const projectsContainer = document.querySelector(".projects-container");
	const projectListDOM = projectsContainer.querySelector("ul");

	function createTaskElement(task, currentProject, currentProjectIndex) {
		const taskElement = document.createElement("div");
		taskElement.className = "task";

		const leftDiv = document.createElement("div");
		leftDiv.className = "left";

		const checkboxDiv = document.createElement("div");
		checkboxDiv.className = "checkbox";
		checkboxDiv.textContent = "✔️"; // Use a proper Unicode checkmark

		const taskNameDiv = document.createElement("div");
		taskNameDiv.className = "task-name";
		taskNameDiv.textContent = task.title;

		leftDiv.appendChild(checkboxDiv);
		leftDiv.appendChild(taskNameDiv);

		const rightDiv = document.createElement("div");
		rightDiv.className = "right";

		const detailsButton = document.createElement("button");
		detailsButton.className = "details";
		detailsButton.textContent = task.description;

		const dateDiv = document.createElement("div");
		dateDiv.className = "date";
		dateDiv.textContent = task.dueDate;

		const btnContainerDiv = document.createElement("div");
		btnContainerDiv.className = "btn-container";

		const editButton = document.createElement("button");
		editButton.className = "edit";
		editButton.textContent = "Edit";

		const deleteButton = document.createElement("button");
		deleteButton.className = "delete";
		deleteButton.textContent = "Delete";
		deleteButton.addEventListener("click", (event) => {
			currentProject.removeTodo(task);
			display(currentProjectIndex);
		});

		btnContainerDiv.appendChild(editButton);
		btnContainerDiv.appendChild(deleteButton);

		rightDiv.appendChild(detailsButton);
		rightDiv.appendChild(dateDiv);
		rightDiv.appendChild(btnContainerDiv);

		taskElement.appendChild(leftDiv);
		taskElement.appendChild(rightDiv);

		mainElement.appendChild(taskElement);
	}

	function createProjectElement(project, projectIndex) {
		const projectItem = document.createElement("li");
		projectItem.textContent = project.title;
		projectListDOM.appendChild(projectItem);
		projectItem.classList.add("project-list-element");
		projectItem.addEventListener("click", () => {
			display(projectIndex);
		});
	}

	function display(projectIndex) {
		projectListDOM.innerHTML = "";
		projectList.forEach((project, index) => {
			createProjectElement(project, index);
		});

		mainElement.innerHTML = "";
		projectList[projectIndex].todos.forEach((todo) => {
			createTaskElement(todo, projectList[projectIndex], projectIndex);
		});
	}

	return { display };
})();

/* harmony default export */ const dom = (DomManipulation);

;// CONCATENATED MODULE: ./src/script.js

dom.display(0);

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFtQjtBQUNHO0FBQ0E7O0FBRXRCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrQ0FBa0M7O0FBRWxDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBLFVBQVU7QUFDVixDQUFDOztBQUVELDBDQUFlLGVBQWUsRUFBQzs7O0FDNUphO0FBQzVDLEdBQWUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2RvbS5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9zY3JpcHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFwiLi90b2RvLmpzXCI7XG5pbXBvcnQgXCIuL3N0b3JhZ2UuanNcIjtcbmltcG9ydCBcIi4vcHJvamVjdC5qc1wiO1xuXG5jb25zdCBwcm9qZWN0TGlzdCA9IFtcblx0e1xuXHRcdHRpdGxlOiBcIk9uZSBQcm9qZWN0XCIsXG5cdFx0ZGVzY3JpcHRpb246IFwiUHJvamVjdCBEZXNjcmlwdGlvblwiLFxuXHRcdHRvZG9zOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIlRhc2sgMVwiLFxuXHRcdFx0XHRkZXNjcmlwdGlvbjogXCJUYXNrIERlc2NyaXB0aW9uIDFcIixcblx0XHRcdFx0ZHVlRGF0ZTogXCIyMDIzLTA4LTE1XCIsXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCJUYXNrIDJcIixcblx0XHRcdFx0ZGVzY3JpcHRpb246IFwiVGFzayBEZXNjcmlwdGlvbiAyXCIsXG5cdFx0XHRcdGR1ZURhdGU6IFwiMjAyMy0wOC0yMFwiLFxuXHRcdFx0fSxcblx0XHRdLFxuXHRcdGFkZE5ld1RvZG8odG9kbykge1xuXHRcdFx0dGhpcy50b2Rvcy5wdXNoKHRvZG8pO1xuXHRcdH0sXG5cdFx0cmVtb3ZlVG9kbyh0b2RvKSB7XG5cdFx0XHRjb25zdCBpbmRleCA9IHRoaXMudG9kb3MuaW5kZXhPZih0b2RvKTtcblx0XHRcdGlmIChpbmRleCAhPT0gLTEpIHtcblx0XHRcdFx0dGhpcy50b2Rvcy5zcGxpY2UoaW5kZXgsIDEpO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0dXBkYXRlVG9kbyh0b2RvLCBuZXdUb2RvKSB7XG5cdFx0XHRjb25zdCBpbmRleCA9IHRoaXMudG9kb3MuaW5kZXhPZih0b2RvKTtcblx0XHRcdGlmIChpbmRleCAhPT0gLTEpIHtcblx0XHRcdFx0dGhpcy50b2Rvcy5zcGxpY2UoaW5kZXgsIDEsIG5ld1RvZG8pO1xuXHRcdFx0fVxuXHRcdH0sXG5cdH0sXG5cdHtcblx0XHR0aXRsZTogXCJUd28gUHJvamVjdFwiLFxuXHRcdGRlc2NyaXB0aW9uOiBcIlByb2plY3QgRGVzY3JpcHRpb25cIixcblx0XHR0b2RvczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCJUYXNrIDItMVwiLFxuXHRcdFx0XHRkZXNjcmlwdGlvbjogXCJUYXNrIERlc2NyaXB0aW9uIDFcIixcblx0XHRcdFx0ZHVlRGF0ZTogXCIyMDIzLTA4LTE1XCIsXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCJUYXNrIDItMlwiLFxuXHRcdFx0XHRkZXNjcmlwdGlvbjogXCJUYXNrIERlc2NyaXB0aW9uIDJcIixcblx0XHRcdFx0ZHVlRGF0ZTogXCIyMDIzLTA4LTIwXCIsXG5cdFx0XHR9LFxuXHRcdF0sXG5cdFx0YWRkTmV3VG9kbyh0b2RvKSB7XG5cdFx0XHR0aGlzLnRvZG9zLnB1c2godG9kbyk7XG5cdFx0fSxcblx0XHRyZW1vdmVUb2RvKHRvZG8pIHtcblx0XHRcdGNvbnN0IGluZGV4ID0gdGhpcy50b2Rvcy5pbmRleE9mKHRvZG8pO1xuXHRcdFx0aWYgKGluZGV4ICE9PSAtMSkge1xuXHRcdFx0XHR0aGlzLnRvZG9zLnNwbGljZShpbmRleCwgMSk7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHR1cGRhdGVUb2RvKHRvZG8sIG5ld1RvZG8pIHtcblx0XHRcdGNvbnN0IGluZGV4ID0gdGhpcy50b2Rvcy5pbmRleE9mKHRvZG8pO1xuXHRcdFx0aWYgKGluZGV4ICE9PSAtMSkge1xuXHRcdFx0XHR0aGlzLnRvZG9zLnNwbGljZShpbmRleCwgMSwgbmV3VG9kbyk7XG5cdFx0XHR9XG5cdFx0fSxcblx0fSxcbl07XG5cbmNvbnN0IERvbU1hbmlwdWxhdGlvbiA9ICgoKSA9PiB7XG5cdGNvbnN0IG1haW5FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIm1haW5cIik7XG5cdGNvbnN0IHByb2plY3RzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0cy1jb250YWluZXJcIik7XG5cdGNvbnN0IHByb2plY3RMaXN0RE9NID0gcHJvamVjdHNDb250YWluZXIucXVlcnlTZWxlY3RvcihcInVsXCIpO1xuXG5cdGZ1bmN0aW9uIGNyZWF0ZVRhc2tFbGVtZW50KHRhc2ssIGN1cnJlbnRQcm9qZWN0LCBjdXJyZW50UHJvamVjdEluZGV4KSB7XG5cdFx0Y29uc3QgdGFza0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdHRhc2tFbGVtZW50LmNsYXNzTmFtZSA9IFwidGFza1wiO1xuXG5cdFx0Y29uc3QgbGVmdERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0bGVmdERpdi5jbGFzc05hbWUgPSBcImxlZnRcIjtcblxuXHRcdGNvbnN0IGNoZWNrYm94RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRjaGVja2JveERpdi5jbGFzc05hbWUgPSBcImNoZWNrYm94XCI7XG5cdFx0Y2hlY2tib3hEaXYudGV4dENvbnRlbnQgPSBcIuKclO+4j1wiOyAvLyBVc2UgYSBwcm9wZXIgVW5pY29kZSBjaGVja21hcmtcblxuXHRcdGNvbnN0IHRhc2tOYW1lRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHR0YXNrTmFtZURpdi5jbGFzc05hbWUgPSBcInRhc2stbmFtZVwiO1xuXHRcdHRhc2tOYW1lRGl2LnRleHRDb250ZW50ID0gdGFzay50aXRsZTtcblxuXHRcdGxlZnREaXYuYXBwZW5kQ2hpbGQoY2hlY2tib3hEaXYpO1xuXHRcdGxlZnREaXYuYXBwZW5kQ2hpbGQodGFza05hbWVEaXYpO1xuXG5cdFx0Y29uc3QgcmlnaHREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdHJpZ2h0RGl2LmNsYXNzTmFtZSA9IFwicmlnaHRcIjtcblxuXHRcdGNvbnN0IGRldGFpbHNCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXHRcdGRldGFpbHNCdXR0b24uY2xhc3NOYW1lID0gXCJkZXRhaWxzXCI7XG5cdFx0ZGV0YWlsc0J1dHRvbi50ZXh0Q29udGVudCA9IHRhc2suZGVzY3JpcHRpb247XG5cblx0XHRjb25zdCBkYXRlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRkYXRlRGl2LmNsYXNzTmFtZSA9IFwiZGF0ZVwiO1xuXHRcdGRhdGVEaXYudGV4dENvbnRlbnQgPSB0YXNrLmR1ZURhdGU7XG5cblx0XHRjb25zdCBidG5Db250YWluZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdGJ0bkNvbnRhaW5lckRpdi5jbGFzc05hbWUgPSBcImJ0bi1jb250YWluZXJcIjtcblxuXHRcdGNvbnN0IGVkaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXHRcdGVkaXRCdXR0b24uY2xhc3NOYW1lID0gXCJlZGl0XCI7XG5cdFx0ZWRpdEJ1dHRvbi50ZXh0Q29udGVudCA9IFwiRWRpdFwiO1xuXG5cdFx0Y29uc3QgZGVsZXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcblx0XHRkZWxldGVCdXR0b24uY2xhc3NOYW1lID0gXCJkZWxldGVcIjtcblx0XHRkZWxldGVCdXR0b24udGV4dENvbnRlbnQgPSBcIkRlbGV0ZVwiO1xuXHRcdGRlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG5cdFx0XHRjdXJyZW50UHJvamVjdC5yZW1vdmVUb2RvKHRhc2spO1xuXHRcdFx0ZGlzcGxheShjdXJyZW50UHJvamVjdEluZGV4KTtcblx0XHR9KTtcblxuXHRcdGJ0bkNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZChlZGl0QnV0dG9uKTtcblx0XHRidG5Db250YWluZXJEaXYuYXBwZW5kQ2hpbGQoZGVsZXRlQnV0dG9uKTtcblxuXHRcdHJpZ2h0RGl2LmFwcGVuZENoaWxkKGRldGFpbHNCdXR0b24pO1xuXHRcdHJpZ2h0RGl2LmFwcGVuZENoaWxkKGRhdGVEaXYpO1xuXHRcdHJpZ2h0RGl2LmFwcGVuZENoaWxkKGJ0bkNvbnRhaW5lckRpdik7XG5cblx0XHR0YXNrRWxlbWVudC5hcHBlbmRDaGlsZChsZWZ0RGl2KTtcblx0XHR0YXNrRWxlbWVudC5hcHBlbmRDaGlsZChyaWdodERpdik7XG5cblx0XHRtYWluRWxlbWVudC5hcHBlbmRDaGlsZCh0YXNrRWxlbWVudCk7XG5cdH1cblxuXHRmdW5jdGlvbiBjcmVhdGVQcm9qZWN0RWxlbWVudChwcm9qZWN0LCBwcm9qZWN0SW5kZXgpIHtcblx0XHRjb25zdCBwcm9qZWN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcblx0XHRwcm9qZWN0SXRlbS50ZXh0Q29udGVudCA9IHByb2plY3QudGl0bGU7XG5cdFx0cHJvamVjdExpc3RET00uYXBwZW5kQ2hpbGQocHJvamVjdEl0ZW0pO1xuXHRcdHByb2plY3RJdGVtLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LWxpc3QtZWxlbWVudFwiKTtcblx0XHRwcm9qZWN0SXRlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdFx0ZGlzcGxheShwcm9qZWN0SW5kZXgpO1xuXHRcdH0pO1xuXHR9XG5cblx0ZnVuY3Rpb24gZGlzcGxheShwcm9qZWN0SW5kZXgpIHtcblx0XHRwcm9qZWN0TGlzdERPTS5pbm5lckhUTUwgPSBcIlwiO1xuXHRcdHByb2plY3RMaXN0LmZvckVhY2goKHByb2plY3QsIGluZGV4KSA9PiB7XG5cdFx0XHRjcmVhdGVQcm9qZWN0RWxlbWVudChwcm9qZWN0LCBpbmRleCk7XG5cdFx0fSk7XG5cblx0XHRtYWluRWxlbWVudC5pbm5lckhUTUwgPSBcIlwiO1xuXHRcdHByb2plY3RMaXN0W3Byb2plY3RJbmRleF0udG9kb3MuZm9yRWFjaCgodG9kbykgPT4ge1xuXHRcdFx0Y3JlYXRlVGFza0VsZW1lbnQodG9kbywgcHJvamVjdExpc3RbcHJvamVjdEluZGV4XSwgcHJvamVjdEluZGV4KTtcblx0XHR9KTtcblx0fVxuXG5cdHJldHVybiB7IGRpc3BsYXkgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IERvbU1hbmlwdWxhdGlvbjtcbiIsImltcG9ydCBEb21NYW5pcHVsYXRpb24gZnJvbSBcIi4vbW9kdWxlcy9kb21cIjtcbkRvbU1hbmlwdWxhdGlvbi5kaXNwbGF5KDApO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
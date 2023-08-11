/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/modules/dom.js




let projectList = [
	{
		title: "One",
		description: "none",
		todoList: [
			{
				title: "Sussy",
				description: "none",
				dueDate: "hz",
			},
			{
				title: "Sussy2",
				description: "none",
				dueDate: "hz2",
			},
		],
		addNewTodo(todo) {
			this.todoList.push(todo);
		},
		removeTodo(todo) {
			this.todoList.splice(this.todoList.indexOf(todo), 1);
		},
		updateTodo(todo, newTodo) {
			this.todoList.splice(this.todoList.indexOf(todo), 1, newTodo);
		},
	},
];

const DomManipulation = (() => {
	const main = document.querySelector("main");

	const projectsContainer = document.querySelector(".projects-container");
	const projectListDOM = projectsContainer.querySelector("ul");

	function _createTaskInDom(item, currentProject, currentProjectIndex) {
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
		deleteButton.addEventListener("click", (event) => {
			currentProject.removeTodo(item);
			display(currentProjectIndex);
		});

		btnContainerDiv.appendChild(editButton);
		btnContainerDiv.appendChild(deleteButton);

		rightDiv.appendChild(detailsButton);
		rightDiv.appendChild(dateDiv);
		rightDiv.appendChild(btnContainerDiv);

		taskDiv.appendChild(leftDiv);
		taskDiv.appendChild(rightDiv);

		main.appendChild(taskDiv);
	}
	function __createProjectInDom(item, project) {
		const newProjectItem = document.createElement("li");
		newProjectItem.textContent = item.title;
		projectListDOM.appendChild(newProjectItem);

		const newProjectButton =
			projectsContainer.querySelector(".new-project-btn");

		newProjectButton.addEventListener("click", () => {
			console.log("new project placeholder");
		});
	}
	function display(project) {
		const projectArr = document.querySelectorAll(".project-list-element");
		projectArr.forEach((item) => projectListDOM.removeChild(item));

		for (let i = 0; i < projectList.length; i++) {
			__createProjectInDom(projectList[i], project);
		}

		const taskArr = document.querySelectorAll(".task");
		taskArr.forEach((task) => main.removeChild(task));
		for (let i = 0; i < projectList[project].todoList.length; i++) {
			_createTaskInDom(
				projectList[project].todoList[i],
				projectList[project],
				project
			);
		}
	}
	return { display };
})();

/* harmony default export */ const dom = (DomManipulation);

;// CONCATENATED MODULE: ./src/script.js

dom.display(0);

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFtQjtBQUNHO0FBQ0E7O0FBRXRCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7QUFDRjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0Isd0JBQXdCO0FBQzFDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtCQUFrQiwwQ0FBMEM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1YsQ0FBQzs7QUFFRCwwQ0FBZSxlQUFlLEVBQUM7OztBQy9IYTtBQUM1QyxHQUFlIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9kb20uanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvc2NyaXB0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcIi4vdG9kby5qc1wiO1xuaW1wb3J0IFwiLi9zdG9yYWdlLmpzXCI7XG5pbXBvcnQgXCIuL3Byb2plY3QuanNcIjtcblxubGV0IHByb2plY3RMaXN0ID0gW1xuXHR7XG5cdFx0dGl0bGU6IFwiT25lXCIsXG5cdFx0ZGVzY3JpcHRpb246IFwibm9uZVwiLFxuXHRcdHRvZG9MaXN0OiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIlN1c3N5XCIsXG5cdFx0XHRcdGRlc2NyaXB0aW9uOiBcIm5vbmVcIixcblx0XHRcdFx0ZHVlRGF0ZTogXCJoelwiLFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwiU3Vzc3kyXCIsXG5cdFx0XHRcdGRlc2NyaXB0aW9uOiBcIm5vbmVcIixcblx0XHRcdFx0ZHVlRGF0ZTogXCJoejJcIixcblx0XHRcdH0sXG5cdFx0XSxcblx0XHRhZGROZXdUb2RvKHRvZG8pIHtcblx0XHRcdHRoaXMudG9kb0xpc3QucHVzaCh0b2RvKTtcblx0XHR9LFxuXHRcdHJlbW92ZVRvZG8odG9kbykge1xuXHRcdFx0dGhpcy50b2RvTGlzdC5zcGxpY2UodGhpcy50b2RvTGlzdC5pbmRleE9mKHRvZG8pLCAxKTtcblx0XHR9LFxuXHRcdHVwZGF0ZVRvZG8odG9kbywgbmV3VG9kbykge1xuXHRcdFx0dGhpcy50b2RvTGlzdC5zcGxpY2UodGhpcy50b2RvTGlzdC5pbmRleE9mKHRvZG8pLCAxLCBuZXdUb2RvKTtcblx0XHR9LFxuXHR9LFxuXTtcblxuY29uc3QgRG9tTWFuaXB1bGF0aW9uID0gKCgpID0+IHtcblx0Y29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJtYWluXCIpO1xuXG5cdGNvbnN0IHByb2plY3RzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0cy1jb250YWluZXJcIik7XG5cdGNvbnN0IHByb2plY3RMaXN0RE9NID0gcHJvamVjdHNDb250YWluZXIucXVlcnlTZWxlY3RvcihcInVsXCIpO1xuXG5cdGZ1bmN0aW9uIF9jcmVhdGVUYXNrSW5Eb20oaXRlbSwgY3VycmVudFByb2plY3QsIGN1cnJlbnRQcm9qZWN0SW5kZXgpIHtcblx0XHRjb25zdCB0YXNrRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHR0YXNrRGl2LmNsYXNzTmFtZSA9IFwidGFza1wiO1xuXG5cdFx0Y29uc3QgbGVmdERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0bGVmdERpdi5jbGFzc05hbWUgPSBcImxlZnRcIjtcblxuXHRcdGNvbnN0IGNoZWNrYm94RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRjaGVja2JveERpdi5jbGFzc05hbWUgPSBcImNoZWNrYm94XCI7XG5cdFx0Y2hlY2tib3hEaXYudGV4dENvbnRlbnQgPSBcIlNVXCI7XG5cblx0XHRjb25zdCB0YXNrTmFtZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0dGFza05hbWVEaXYuY2xhc3NOYW1lID0gXCJ0YXNrLW5hbWVcIjtcblx0XHR0YXNrTmFtZURpdi50ZXh0Q29udGVudCA9IGl0ZW0udGl0bGU7XG5cblx0XHRsZWZ0RGl2LmFwcGVuZENoaWxkKGNoZWNrYm94RGl2KTtcblx0XHRsZWZ0RGl2LmFwcGVuZENoaWxkKHRhc2tOYW1lRGl2KTtcblxuXHRcdGNvbnN0IHJpZ2h0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRyaWdodERpdi5jbGFzc05hbWUgPSBcInJpZ2h0XCI7XG5cblx0XHRjb25zdCBkZXRhaWxzQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcblx0XHRkZXRhaWxzQnV0dG9uLmNsYXNzTmFtZSA9IFwiZGV0YWlsc1wiO1xuXHRcdGRldGFpbHNCdXR0b24udGV4dENvbnRlbnQgPSBpdGVtLmRlc2NyaXB0aW9uO1xuXG5cdFx0Y29uc3QgZGF0ZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0ZGF0ZURpdi5jbGFzc05hbWUgPSBcImRhdGVcIjtcblx0XHRkYXRlRGl2LnRleHRDb250ZW50ID0gaXRlbS5kdWVEYXRlO1xuXG5cdFx0Y29uc3QgYnRuQ29udGFpbmVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRidG5Db250YWluZXJEaXYuY2xhc3NOYW1lID0gXCJidG4tY29udGFpbmVyXCI7XG5cblx0XHRjb25zdCBlZGl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcblx0XHRlZGl0QnV0dG9uLmNsYXNzTmFtZSA9IFwiZWRpdFwiO1xuXHRcdGVkaXRCdXR0b24udGV4dENvbnRlbnQgPSBcIkVkaXRcIjtcblxuXHRcdGNvbnN0IGRlbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cdFx0ZGVsZXRlQnV0dG9uLmNsYXNzTmFtZSA9IFwiZGVsZXRlXCI7XG5cdFx0ZGVsZXRlQnV0dG9uLnRleHRDb250ZW50ID0gXCJEZWxldGVcIjtcblx0XHRkZWxldGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuXHRcdFx0Y3VycmVudFByb2plY3QucmVtb3ZlVG9kbyhpdGVtKTtcblx0XHRcdGRpc3BsYXkoY3VycmVudFByb2plY3RJbmRleCk7XG5cdFx0fSk7XG5cblx0XHRidG5Db250YWluZXJEaXYuYXBwZW5kQ2hpbGQoZWRpdEJ1dHRvbik7XG5cdFx0YnRuQ29udGFpbmVyRGl2LmFwcGVuZENoaWxkKGRlbGV0ZUJ1dHRvbik7XG5cblx0XHRyaWdodERpdi5hcHBlbmRDaGlsZChkZXRhaWxzQnV0dG9uKTtcblx0XHRyaWdodERpdi5hcHBlbmRDaGlsZChkYXRlRGl2KTtcblx0XHRyaWdodERpdi5hcHBlbmRDaGlsZChidG5Db250YWluZXJEaXYpO1xuXG5cdFx0dGFza0Rpdi5hcHBlbmRDaGlsZChsZWZ0RGl2KTtcblx0XHR0YXNrRGl2LmFwcGVuZENoaWxkKHJpZ2h0RGl2KTtcblxuXHRcdG1haW4uYXBwZW5kQ2hpbGQodGFza0Rpdik7XG5cdH1cblx0ZnVuY3Rpb24gX19jcmVhdGVQcm9qZWN0SW5Eb20oaXRlbSwgcHJvamVjdCkge1xuXHRcdGNvbnN0IG5ld1Byb2plY3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuXHRcdG5ld1Byb2plY3RJdGVtLnRleHRDb250ZW50ID0gaXRlbS50aXRsZTtcblx0XHRwcm9qZWN0TGlzdERPTS5hcHBlbmRDaGlsZChuZXdQcm9qZWN0SXRlbSk7XG5cblx0XHRjb25zdCBuZXdQcm9qZWN0QnV0dG9uID1cblx0XHRcdHByb2plY3RzQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIubmV3LXByb2plY3QtYnRuXCIpO1xuXG5cdFx0bmV3UHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdFx0Y29uc29sZS5sb2coXCJuZXcgcHJvamVjdCBwbGFjZWhvbGRlclwiKTtcblx0XHR9KTtcblx0fVxuXHRmdW5jdGlvbiBkaXNwbGF5KHByb2plY3QpIHtcblx0XHRjb25zdCBwcm9qZWN0QXJyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcm9qZWN0LWxpc3QtZWxlbWVudFwiKTtcblx0XHRwcm9qZWN0QXJyLmZvckVhY2goKGl0ZW0pID0+IHByb2plY3RMaXN0RE9NLnJlbW92ZUNoaWxkKGl0ZW0pKTtcblxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcHJvamVjdExpc3QubGVuZ3RoOyBpKyspIHtcblx0XHRcdF9fY3JlYXRlUHJvamVjdEluRG9tKHByb2plY3RMaXN0W2ldLCBwcm9qZWN0KTtcblx0XHR9XG5cblx0XHRjb25zdCB0YXNrQXJyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50YXNrXCIpO1xuXHRcdHRhc2tBcnIuZm9yRWFjaCgodGFzaykgPT4gbWFpbi5yZW1vdmVDaGlsZCh0YXNrKSk7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0TGlzdFtwcm9qZWN0XS50b2RvTGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdFx0X2NyZWF0ZVRhc2tJbkRvbShcblx0XHRcdFx0cHJvamVjdExpc3RbcHJvamVjdF0udG9kb0xpc3RbaV0sXG5cdFx0XHRcdHByb2plY3RMaXN0W3Byb2plY3RdLFxuXHRcdFx0XHRwcm9qZWN0XG5cdFx0XHQpO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4geyBkaXNwbGF5IH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBEb21NYW5pcHVsYXRpb247XG4iLCJpbXBvcnQgRG9tTWFuaXB1bGF0aW9uIGZyb20gXCIuL21vZHVsZXMvZG9tXCI7XG5Eb21NYW5pcHVsYXRpb24uZGlzcGxheSgwKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
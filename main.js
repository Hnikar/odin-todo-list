/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/modules/memory.js
let todoList = [
	{
		title: "Sussy",
		description: "none",
		dueDate: "hz",
	},
	{
		title: "Sussy2",
		description: "none",
		dueDate: "hz",
	},
];

/* harmony default export */ const memory = (todoList);

;// CONCATENATED MODULE: ./src/modules/dom.js



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
		for (let i = 0; i < memory.length; i++) {
			_createTaskInDom(memory[i]);
		}
	}
	return { display };
})();

/* harmony default export */ const dom = (DomManipulation);

;// CONCATENATED MODULE: ./src/script.js

dom.display();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7O0FBRUEsNkNBQWUsUUFBUSxFQUFDOzs7QUNiTDtBQUNnQjs7QUFFbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLElBQUksTUFBUSxTQUFTO0FBQ3ZDLG9CQUFvQixNQUFRO0FBQzVCO0FBQ0E7QUFDQSxVQUFVO0FBQ1YsQ0FBQzs7QUFFRCwwQ0FBZSxlQUFlLEVBQUM7OztBQ3BFYTtBQUM1QyxHQUFlIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9tZW1vcnkuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9kb20uanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvc2NyaXB0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImxldCB0b2RvTGlzdCA9IFtcblx0e1xuXHRcdHRpdGxlOiBcIlN1c3N5XCIsXG5cdFx0ZGVzY3JpcHRpb246IFwibm9uZVwiLFxuXHRcdGR1ZURhdGU6IFwiaHpcIixcblx0fSxcblx0e1xuXHRcdHRpdGxlOiBcIlN1c3N5MlwiLFxuXHRcdGRlc2NyaXB0aW9uOiBcIm5vbmVcIixcblx0XHRkdWVEYXRlOiBcImh6XCIsXG5cdH0sXG5dO1xuXG5leHBvcnQgZGVmYXVsdCB0b2RvTGlzdDtcbiIsImltcG9ydCBcIi4vdG9kby5qc1wiO1xuaW1wb3J0IHRvZG9MaXN0IGZyb20gXCIuL21lbW9yeS5qc1wiO1xuXG5jb25zdCBEb21NYW5pcHVsYXRpb24gPSAoKCkgPT4ge1xuXHRjb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIm1haW5cIik7XG5cdGZ1bmN0aW9uIF9jcmVhdGVUYXNrSW5Eb20oaXRlbSkge1xuXHRcdGNvbnN0IHRhc2tEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdHRhc2tEaXYuY2xhc3NOYW1lID0gXCJ0YXNrXCI7XG5cblx0XHRjb25zdCBsZWZ0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRsZWZ0RGl2LmNsYXNzTmFtZSA9IFwibGVmdFwiO1xuXG5cdFx0Y29uc3QgY2hlY2tib3hEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdGNoZWNrYm94RGl2LmNsYXNzTmFtZSA9IFwiY2hlY2tib3hcIjtcblx0XHRjaGVja2JveERpdi50ZXh0Q29udGVudCA9IFwiU1VcIjtcblxuXHRcdGNvbnN0IHRhc2tOYW1lRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHR0YXNrTmFtZURpdi5jbGFzc05hbWUgPSBcInRhc2stbmFtZVwiO1xuXHRcdHRhc2tOYW1lRGl2LnRleHRDb250ZW50ID0gaXRlbS50aXRsZTtcblxuXHRcdGxlZnREaXYuYXBwZW5kQ2hpbGQoY2hlY2tib3hEaXYpO1xuXHRcdGxlZnREaXYuYXBwZW5kQ2hpbGQodGFza05hbWVEaXYpO1xuXG5cdFx0Y29uc3QgcmlnaHREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdHJpZ2h0RGl2LmNsYXNzTmFtZSA9IFwicmlnaHRcIjtcblxuXHRcdGNvbnN0IGRldGFpbHNCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXHRcdGRldGFpbHNCdXR0b24uY2xhc3NOYW1lID0gXCJkZXRhaWxzXCI7XG5cdFx0ZGV0YWlsc0J1dHRvbi50ZXh0Q29udGVudCA9IGl0ZW0uZGVzY3JpcHRpb247XG5cblx0XHRjb25zdCBkYXRlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRkYXRlRGl2LmNsYXNzTmFtZSA9IFwiZGF0ZVwiO1xuXHRcdGRhdGVEaXYudGV4dENvbnRlbnQgPSBpdGVtLmR1ZURhdGU7XG5cblx0XHRjb25zdCBidG5Db250YWluZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdGJ0bkNvbnRhaW5lckRpdi5jbGFzc05hbWUgPSBcImJ0bi1jb250YWluZXJcIjtcblxuXHRcdGNvbnN0IGVkaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXHRcdGVkaXRCdXR0b24uY2xhc3NOYW1lID0gXCJlZGl0XCI7XG5cdFx0ZWRpdEJ1dHRvbi50ZXh0Q29udGVudCA9IFwiRWRpdFwiO1xuXG5cdFx0Y29uc3QgZGVsZXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcblx0XHRkZWxldGVCdXR0b24uY2xhc3NOYW1lID0gXCJkZWxldGVcIjtcblx0XHRkZWxldGVCdXR0b24udGV4dENvbnRlbnQgPSBcIkRlbGV0ZVwiO1xuXG5cdFx0YnRuQ29udGFpbmVyRGl2LmFwcGVuZENoaWxkKGVkaXRCdXR0b24pO1xuXHRcdGJ0bkNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZChkZWxldGVCdXR0b24pO1xuXG5cdFx0cmlnaHREaXYuYXBwZW5kQ2hpbGQoZGV0YWlsc0J1dHRvbik7XG5cdFx0cmlnaHREaXYuYXBwZW5kQ2hpbGQoZGF0ZURpdik7XG5cdFx0cmlnaHREaXYuYXBwZW5kQ2hpbGQoYnRuQ29udGFpbmVyRGl2KTtcblxuXHRcdHRhc2tEaXYuYXBwZW5kQ2hpbGQobGVmdERpdik7XG5cdFx0dGFza0Rpdi5hcHBlbmRDaGlsZChyaWdodERpdik7XG5cblx0XHRtYWluLmFwcGVuZENoaWxkKHRhc2tEaXYpO1xuXHR9XG5cdC8vIGZ1bmN0aW9uIF9fYWRkTmV3VGFzaygpXG5cdGZ1bmN0aW9uIGRpc3BsYXkoKSB7XG5cdFx0Y29uc3QgdGFza0FyciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFza1wiKTtcblx0XHR0YXNrQXJyLmZvckVhY2goKHRhc2spID0+IG1haW4ucmVtb3ZlQ2hpbGQodGFzaykpO1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgdG9kb0xpc3QubGVuZ3RoOyBpKyspIHtcblx0XHRcdF9jcmVhdGVUYXNrSW5Eb20odG9kb0xpc3RbaV0pO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4geyBkaXNwbGF5IH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBEb21NYW5pcHVsYXRpb247XG4iLCJpbXBvcnQgRG9tTWFuaXB1bGF0aW9uIGZyb20gXCIuL21vZHVsZXMvZG9tXCI7XG5Eb21NYW5pcHVsYXRpb24uZGlzcGxheSgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
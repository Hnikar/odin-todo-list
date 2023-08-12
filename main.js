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
				title: "todo 1",
				description: "todo Description 1",
				dueDate: "2023-08-15",
			},
			{
				title: "todo 2",
				description: "todo Description 2",
				dueDate: "2023-08-20",
			},
		],
		index: 0,
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
				title: "todo 2-1",
				description: "todo Description 1",
				dueDate: "2023-08-15",
			},
			{
				title: "todo 2-2",
				description: "todo Description 2",
				dueDate: "2023-08-20",
			},
		],
		index: 1,
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
	const todoList = document.querySelector(".todo-list");
	const projectsContainer = document.querySelector(".projects-container");
	const projectListDOM = projectsContainer.querySelector("ul");

	const newTodoBtn = document.getElementById("new-todo-btn");
	newTodoBtn.addEventListener("click", () => {
		const newTodo = {
			title: "New Todo",
			description: "Todo Description",
			dueDate: "2023-08-15",
		};
		console.log(projectList[newTodoBtn.dataset.value]);
		projectList[newTodoBtn.dataset.value].addNewTodo(newTodo);
		display(newTodoBtn.dataset.value);
	});

	const newProjectBtn = document.getElementById("new-project-btn");
	newProjectBtn.addEventListener("click", () => {
		const newProject = {
			title: "One Project",
			description: "Project Description",
			todos: [],
			index: projectList.length,
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
		};
		projectList.push(newProject);
		newTodoBtn.dataset.value = projectList.length - 1;
		display(projectList.length - 1);
	});

	function createtodoElement(todo, project) {
		const todoElement = document.createElement("li");
		todoElement.className = "todo";

		const leftDiv = document.createElement("div");
		leftDiv.className = "left";

		const checkboxDiv = document.createElement("div");
		checkboxDiv.className = "checkbox";
		checkboxDiv.textContent = "✔️"; // Use a proper Unicode checkmark

		const todoNameDiv = document.createElement("div");
		todoNameDiv.className = "todo-name";
		todoNameDiv.textContent = todo.title;

		leftDiv.appendChild(checkboxDiv);
		leftDiv.appendChild(todoNameDiv);

		const rightDiv = document.createElement("div");
		rightDiv.className = "right";

		const detailsButton = document.createElement("button");
		detailsButton.className = "details";
		detailsButton.textContent = todo.description;

		const dateDiv = document.createElement("div");
		dateDiv.className = "date";
		dateDiv.textContent = todo.dueDate;

		const btnContainerDiv = document.createElement("div");
		btnContainerDiv.className = "btn-container";

		const editButton = document.createElement("button");
		editButton.className = "edit";
		editButton.textContent = "Edit";

		const deleteButton = document.createElement("button");
		deleteButton.className = "delete";
		deleteButton.textContent = "Delete";
		deleteButton.addEventListener("click", (event) => {
			project.removeTodo(todo);
			display(project.index);
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

	function createProjectElement(project) {
		const projectItem = document.createElement("li");
		projectItem.textContent = project.title;
		projectListDOM.appendChild(projectItem);
		projectItem.classList.add("project-list-element");
		projectItem.addEventListener("click", () => {
			display(project.index);
			newTodoBtn.dataset.value = project.index;
		});
	}

	function display(projectIndex) {
		projectListDOM.innerHTML = "";
		projectList.forEach((project) => {
			createProjectElement(project);
		});
		todoList.innerHTML = "";
		projectList[projectIndex].todos.forEach((todo) => {
			createtodoElement(todo, projectList[projectIndex]);
		});
	}

	return { display };
})();

/* harmony default export */ const dom = (DomManipulation);

;// CONCATENATED MODULE: ./src/script.js

dom.display(0);

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFtQjtBQUNHO0FBQ0E7O0FBRXRCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtDQUFrQzs7QUFFbEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBLFVBQVU7QUFDVixDQUFDOztBQUVELDBDQUFlLGVBQWUsRUFBQzs7O0FDdE1hO0FBQzVDLEdBQWUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2RvbS5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9zY3JpcHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFwiLi90b2RvLmpzXCI7XG5pbXBvcnQgXCIuL3N0b3JhZ2UuanNcIjtcbmltcG9ydCBcIi4vcHJvamVjdC5qc1wiO1xuXG5jb25zdCBwcm9qZWN0TGlzdCA9IFtcblx0e1xuXHRcdHRpdGxlOiBcIk9uZSBQcm9qZWN0XCIsXG5cdFx0ZGVzY3JpcHRpb246IFwiUHJvamVjdCBEZXNjcmlwdGlvblwiLFxuXHRcdHRvZG9zOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcInRvZG8gMVwiLFxuXHRcdFx0XHRkZXNjcmlwdGlvbjogXCJ0b2RvIERlc2NyaXB0aW9uIDFcIixcblx0XHRcdFx0ZHVlRGF0ZTogXCIyMDIzLTA4LTE1XCIsXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCJ0b2RvIDJcIixcblx0XHRcdFx0ZGVzY3JpcHRpb246IFwidG9kbyBEZXNjcmlwdGlvbiAyXCIsXG5cdFx0XHRcdGR1ZURhdGU6IFwiMjAyMy0wOC0yMFwiLFxuXHRcdFx0fSxcblx0XHRdLFxuXHRcdGluZGV4OiAwLFxuXHRcdGFkZE5ld1RvZG8odG9kbykge1xuXHRcdFx0dGhpcy50b2Rvcy5wdXNoKHRvZG8pO1xuXHRcdH0sXG5cdFx0cmVtb3ZlVG9kbyh0b2RvKSB7XG5cdFx0XHRjb25zdCBpbmRleCA9IHRoaXMudG9kb3MuaW5kZXhPZih0b2RvKTtcblx0XHRcdGlmIChpbmRleCAhPT0gLTEpIHtcblx0XHRcdFx0dGhpcy50b2Rvcy5zcGxpY2UoaW5kZXgsIDEpO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0dXBkYXRlVG9kbyh0b2RvLCBuZXdUb2RvKSB7XG5cdFx0XHRjb25zdCBpbmRleCA9IHRoaXMudG9kb3MuaW5kZXhPZih0b2RvKTtcblx0XHRcdGlmIChpbmRleCAhPT0gLTEpIHtcblx0XHRcdFx0dGhpcy50b2Rvcy5zcGxpY2UoaW5kZXgsIDEsIG5ld1RvZG8pO1xuXHRcdFx0fVxuXHRcdH0sXG5cdH0sXG5cdHtcblx0XHR0aXRsZTogXCJUd28gUHJvamVjdFwiLFxuXHRcdGRlc2NyaXB0aW9uOiBcIlByb2plY3QgRGVzY3JpcHRpb25cIixcblx0XHR0b2RvczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCJ0b2RvIDItMVwiLFxuXHRcdFx0XHRkZXNjcmlwdGlvbjogXCJ0b2RvIERlc2NyaXB0aW9uIDFcIixcblx0XHRcdFx0ZHVlRGF0ZTogXCIyMDIzLTA4LTE1XCIsXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCJ0b2RvIDItMlwiLFxuXHRcdFx0XHRkZXNjcmlwdGlvbjogXCJ0b2RvIERlc2NyaXB0aW9uIDJcIixcblx0XHRcdFx0ZHVlRGF0ZTogXCIyMDIzLTA4LTIwXCIsXG5cdFx0XHR9LFxuXHRcdF0sXG5cdFx0aW5kZXg6IDEsXG5cdFx0YWRkTmV3VG9kbyh0b2RvKSB7XG5cdFx0XHR0aGlzLnRvZG9zLnB1c2godG9kbyk7XG5cdFx0fSxcblx0XHRyZW1vdmVUb2RvKHRvZG8pIHtcblx0XHRcdGNvbnN0IGluZGV4ID0gdGhpcy50b2Rvcy5pbmRleE9mKHRvZG8pO1xuXHRcdFx0aWYgKGluZGV4ICE9PSAtMSkge1xuXHRcdFx0XHR0aGlzLnRvZG9zLnNwbGljZShpbmRleCwgMSk7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHR1cGRhdGVUb2RvKHRvZG8sIG5ld1RvZG8pIHtcblx0XHRcdGNvbnN0IGluZGV4ID0gdGhpcy50b2Rvcy5pbmRleE9mKHRvZG8pO1xuXHRcdFx0aWYgKGluZGV4ICE9PSAtMSkge1xuXHRcdFx0XHR0aGlzLnRvZG9zLnNwbGljZShpbmRleCwgMSwgbmV3VG9kbyk7XG5cdFx0XHR9XG5cdFx0fSxcblx0fSxcbl07XG5cbmNvbnN0IERvbU1hbmlwdWxhdGlvbiA9ICgoKSA9PiB7XG5cdGNvbnN0IHRvZG9MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLWxpc3RcIik7XG5cdGNvbnN0IHByb2plY3RzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0cy1jb250YWluZXJcIik7XG5cdGNvbnN0IHByb2plY3RMaXN0RE9NID0gcHJvamVjdHNDb250YWluZXIucXVlcnlTZWxlY3RvcihcInVsXCIpO1xuXG5cdGNvbnN0IG5ld1RvZG9CdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5ldy10b2RvLWJ0blwiKTtcblx0bmV3VG9kb0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdGNvbnN0IG5ld1RvZG8gPSB7XG5cdFx0XHR0aXRsZTogXCJOZXcgVG9kb1wiLFxuXHRcdFx0ZGVzY3JpcHRpb246IFwiVG9kbyBEZXNjcmlwdGlvblwiLFxuXHRcdFx0ZHVlRGF0ZTogXCIyMDIzLTA4LTE1XCIsXG5cdFx0fTtcblx0XHRjb25zb2xlLmxvZyhwcm9qZWN0TGlzdFtuZXdUb2RvQnRuLmRhdGFzZXQudmFsdWVdKTtcblx0XHRwcm9qZWN0TGlzdFtuZXdUb2RvQnRuLmRhdGFzZXQudmFsdWVdLmFkZE5ld1RvZG8obmV3VG9kbyk7XG5cdFx0ZGlzcGxheShuZXdUb2RvQnRuLmRhdGFzZXQudmFsdWUpO1xuXHR9KTtcblxuXHRjb25zdCBuZXdQcm9qZWN0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuZXctcHJvamVjdC1idG5cIik7XG5cdG5ld1Byb2plY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblx0XHRjb25zdCBuZXdQcm9qZWN0ID0ge1xuXHRcdFx0dGl0bGU6IFwiT25lIFByb2plY3RcIixcblx0XHRcdGRlc2NyaXB0aW9uOiBcIlByb2plY3QgRGVzY3JpcHRpb25cIixcblx0XHRcdHRvZG9zOiBbXSxcblx0XHRcdGluZGV4OiBwcm9qZWN0TGlzdC5sZW5ndGgsXG5cdFx0XHRhZGROZXdUb2RvKHRvZG8pIHtcblx0XHRcdFx0dGhpcy50b2Rvcy5wdXNoKHRvZG8pO1xuXHRcdFx0fSxcblx0XHRcdHJlbW92ZVRvZG8odG9kbykge1xuXHRcdFx0XHRjb25zdCBpbmRleCA9IHRoaXMudG9kb3MuaW5kZXhPZih0b2RvKTtcblx0XHRcdFx0aWYgKGluZGV4ICE9PSAtMSkge1xuXHRcdFx0XHRcdHRoaXMudG9kb3Muc3BsaWNlKGluZGV4LCAxKTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdHVwZGF0ZVRvZG8odG9kbywgbmV3VG9kbykge1xuXHRcdFx0XHRjb25zdCBpbmRleCA9IHRoaXMudG9kb3MuaW5kZXhPZih0b2RvKTtcblx0XHRcdFx0aWYgKGluZGV4ICE9PSAtMSkge1xuXHRcdFx0XHRcdHRoaXMudG9kb3Muc3BsaWNlKGluZGV4LCAxLCBuZXdUb2RvKTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHR9O1xuXHRcdHByb2plY3RMaXN0LnB1c2gobmV3UHJvamVjdCk7XG5cdFx0bmV3VG9kb0J0bi5kYXRhc2V0LnZhbHVlID0gcHJvamVjdExpc3QubGVuZ3RoIC0gMTtcblx0XHRkaXNwbGF5KHByb2plY3RMaXN0Lmxlbmd0aCAtIDEpO1xuXHR9KTtcblxuXHRmdW5jdGlvbiBjcmVhdGV0b2RvRWxlbWVudCh0b2RvLCBwcm9qZWN0KSB7XG5cdFx0Y29uc3QgdG9kb0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG5cdFx0dG9kb0VsZW1lbnQuY2xhc3NOYW1lID0gXCJ0b2RvXCI7XG5cblx0XHRjb25zdCBsZWZ0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRsZWZ0RGl2LmNsYXNzTmFtZSA9IFwibGVmdFwiO1xuXG5cdFx0Y29uc3QgY2hlY2tib3hEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdGNoZWNrYm94RGl2LmNsYXNzTmFtZSA9IFwiY2hlY2tib3hcIjtcblx0XHRjaGVja2JveERpdi50ZXh0Q29udGVudCA9IFwi4pyU77iPXCI7IC8vIFVzZSBhIHByb3BlciBVbmljb2RlIGNoZWNrbWFya1xuXG5cdFx0Y29uc3QgdG9kb05hbWVEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdHRvZG9OYW1lRGl2LmNsYXNzTmFtZSA9IFwidG9kby1uYW1lXCI7XG5cdFx0dG9kb05hbWVEaXYudGV4dENvbnRlbnQgPSB0b2RvLnRpdGxlO1xuXG5cdFx0bGVmdERpdi5hcHBlbmRDaGlsZChjaGVja2JveERpdik7XG5cdFx0bGVmdERpdi5hcHBlbmRDaGlsZCh0b2RvTmFtZURpdik7XG5cblx0XHRjb25zdCByaWdodERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0cmlnaHREaXYuY2xhc3NOYW1lID0gXCJyaWdodFwiO1xuXG5cdFx0Y29uc3QgZGV0YWlsc0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cdFx0ZGV0YWlsc0J1dHRvbi5jbGFzc05hbWUgPSBcImRldGFpbHNcIjtcblx0XHRkZXRhaWxzQnV0dG9uLnRleHRDb250ZW50ID0gdG9kby5kZXNjcmlwdGlvbjtcblxuXHRcdGNvbnN0IGRhdGVEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdGRhdGVEaXYuY2xhc3NOYW1lID0gXCJkYXRlXCI7XG5cdFx0ZGF0ZURpdi50ZXh0Q29udGVudCA9IHRvZG8uZHVlRGF0ZTtcblxuXHRcdGNvbnN0IGJ0bkNvbnRhaW5lckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0YnRuQ29udGFpbmVyRGl2LmNsYXNzTmFtZSA9IFwiYnRuLWNvbnRhaW5lclwiO1xuXG5cdFx0Y29uc3QgZWRpdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cdFx0ZWRpdEJ1dHRvbi5jbGFzc05hbWUgPSBcImVkaXRcIjtcblx0XHRlZGl0QnV0dG9uLnRleHRDb250ZW50ID0gXCJFZGl0XCI7XG5cblx0XHRjb25zdCBkZWxldGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXHRcdGRlbGV0ZUJ1dHRvbi5jbGFzc05hbWUgPSBcImRlbGV0ZVwiO1xuXHRcdGRlbGV0ZUJ1dHRvbi50ZXh0Q29udGVudCA9IFwiRGVsZXRlXCI7XG5cdFx0ZGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcblx0XHRcdHByb2plY3QucmVtb3ZlVG9kbyh0b2RvKTtcblx0XHRcdGRpc3BsYXkocHJvamVjdC5pbmRleCk7XG5cdFx0fSk7XG5cblx0XHRidG5Db250YWluZXJEaXYuYXBwZW5kQ2hpbGQoZWRpdEJ1dHRvbik7XG5cdFx0YnRuQ29udGFpbmVyRGl2LmFwcGVuZENoaWxkKGRlbGV0ZUJ1dHRvbik7XG5cblx0XHRyaWdodERpdi5hcHBlbmRDaGlsZChkZXRhaWxzQnV0dG9uKTtcblx0XHRyaWdodERpdi5hcHBlbmRDaGlsZChkYXRlRGl2KTtcblx0XHRyaWdodERpdi5hcHBlbmRDaGlsZChidG5Db250YWluZXJEaXYpO1xuXG5cdFx0dG9kb0VsZW1lbnQuYXBwZW5kQ2hpbGQobGVmdERpdik7XG5cdFx0dG9kb0VsZW1lbnQuYXBwZW5kQ2hpbGQocmlnaHREaXYpO1xuXG5cdFx0dG9kb0xpc3QuYXBwZW5kQ2hpbGQodG9kb0VsZW1lbnQpO1xuXHR9XG5cblx0ZnVuY3Rpb24gY3JlYXRlUHJvamVjdEVsZW1lbnQocHJvamVjdCkge1xuXHRcdGNvbnN0IHByb2plY3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuXHRcdHByb2plY3RJdGVtLnRleHRDb250ZW50ID0gcHJvamVjdC50aXRsZTtcblx0XHRwcm9qZWN0TGlzdERPTS5hcHBlbmRDaGlsZChwcm9qZWN0SXRlbSk7XG5cdFx0cHJvamVjdEl0ZW0uY2xhc3NMaXN0LmFkZChcInByb2plY3QtbGlzdC1lbGVtZW50XCIpO1xuXHRcdHByb2plY3RJdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0XHRkaXNwbGF5KHByb2plY3QuaW5kZXgpO1xuXHRcdFx0bmV3VG9kb0J0bi5kYXRhc2V0LnZhbHVlID0gcHJvamVjdC5pbmRleDtcblx0XHR9KTtcblx0fVxuXG5cdGZ1bmN0aW9uIGRpc3BsYXkocHJvamVjdEluZGV4KSB7XG5cdFx0cHJvamVjdExpc3RET00uaW5uZXJIVE1MID0gXCJcIjtcblx0XHRwcm9qZWN0TGlzdC5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG5cdFx0XHRjcmVhdGVQcm9qZWN0RWxlbWVudChwcm9qZWN0KTtcblx0XHR9KTtcblx0XHR0b2RvTGlzdC5pbm5lckhUTUwgPSBcIlwiO1xuXHRcdHByb2plY3RMaXN0W3Byb2plY3RJbmRleF0udG9kb3MuZm9yRWFjaCgodG9kbykgPT4ge1xuXHRcdFx0Y3JlYXRldG9kb0VsZW1lbnQodG9kbywgcHJvamVjdExpc3RbcHJvamVjdEluZGV4XSk7XG5cdFx0fSk7XG5cdH1cblxuXHRyZXR1cm4geyBkaXNwbGF5IH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBEb21NYW5pcHVsYXRpb247XG4iLCJpbXBvcnQgRG9tTWFuaXB1bGF0aW9uIGZyb20gXCIuL21vZHVsZXMvZG9tXCI7XG5Eb21NYW5pcHVsYXRpb24uZGlzcGxheSgwKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
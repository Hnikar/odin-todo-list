/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/modules/storage.js
const Storage = (() => {
	const projects = [
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
	return { projects };
})();
/* harmony default export */ const storage = (Storage);

;// CONCATENATED MODULE: ./src/modules/dom.js




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
		console.log(storage.projects[newTodoBtn.dataset.value]);
		storage.projects[newTodoBtn.dataset.value].addNewTodo(newTodo);
		display(newTodoBtn.dataset.value);
	});

	const newProjectBtn = document.getElementById("new-project-btn");
	newProjectBtn.addEventListener("click", () => {
		const newProject = {
			title: "One Project",
			description: "Project Description",
			todos: [],
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
		storage.projects.push(newProject);
		newTodoBtn.dataset.value = storage.projects.length - 1;
		display(storage.projects.length - 1);
	});

	function createtodoElement(todo, project) {
		const todoElement = document.createElement("li");
		todoElement.className = "todo";

		const leftDiv = document.createElement("div");
		leftDiv.className = "left";

		const checkboxDiv = document.createElement("div");
		checkboxDiv.className = "checkbox";
		checkboxDiv.textContent = "✔️";

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

	function createProjectElement(project, index) {
		const projectItem = document.createElement("li");
		projectItem.textContent = project.title;
		projectListDOM.appendChild(projectItem);
		projectItem.classList.add("project-list-element");
		projectItem.addEventListener("click", () => {
			display(index);
			newTodoBtn.dataset.value = index;
		});
	}

	function display(projectIndex) {
		projectListDOM.innerHTML = "";
		storage.projects.forEach((project, index) => {
			createProjectElement(project, index);
		});
		todoList.innerHTML = "";
		const currentProject = storage.projects[projectIndex];
		currentProject.todos.forEach((todo) => {
			createtodoElement(todo, currentProject);
		});
	}
	return { display };
})();

/* harmony default export */ const dom = (DomManipulation);

;// CONCATENATED MODULE: ./src/script.js

dom.display(0);

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixHQUFHO0FBQ0g7QUFDQSxVQUFVO0FBQ1YsQ0FBQztBQUNELDhDQUFlLE9BQU8sRUFBQzs7O0FDbkVKO0FBQ2dCO0FBQ2I7O0FBRXRCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxPQUFPO0FBQ3JCLEVBQUUsT0FBTztBQUNUO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLEVBQUUsT0FBTztBQUNULDZCQUE2QixPQUFPO0FBQ3BDLFVBQVUsT0FBTztBQUNqQixFQUFFOztBQUVGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0EsRUFBRSxPQUFPO0FBQ1Q7QUFDQSxHQUFHO0FBQ0g7QUFDQSx5QkFBeUIsT0FBTztBQUNoQztBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsVUFBVTtBQUNWLENBQUM7O0FBRUQsMENBQWUsZUFBZSxFQUFDOzs7QUNsSWE7QUFDNUMsR0FBZSIsInNvdXJjZXMiOlsid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2RvbS5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9zY3JpcHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgU3RvcmFnZSA9ICgoKSA9PiB7XG5cdGNvbnN0IHByb2plY3RzID0gW1xuXHRcdHtcblx0XHRcdHRpdGxlOiBcIk9uZSBQcm9qZWN0XCIsXG5cdFx0XHRkZXNjcmlwdGlvbjogXCJQcm9qZWN0IERlc2NyaXB0aW9uXCIsXG5cdFx0XHR0b2RvczogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGl0bGU6IFwidG9kbyAxXCIsXG5cdFx0XHRcdFx0ZGVzY3JpcHRpb246IFwidG9kbyBEZXNjcmlwdGlvbiAxXCIsXG5cdFx0XHRcdFx0ZHVlRGF0ZTogXCIyMDIzLTA4LTE1XCIsXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aXRsZTogXCJ0b2RvIDJcIixcblx0XHRcdFx0XHRkZXNjcmlwdGlvbjogXCJ0b2RvIERlc2NyaXB0aW9uIDJcIixcblx0XHRcdFx0XHRkdWVEYXRlOiBcIjIwMjMtMDgtMjBcIixcblx0XHRcdFx0fSxcblx0XHRcdF0sXG5cdFx0XHRhZGROZXdUb2RvKHRvZG8pIHtcblx0XHRcdFx0dGhpcy50b2Rvcy5wdXNoKHRvZG8pO1xuXHRcdFx0fSxcblx0XHRcdHJlbW92ZVRvZG8odG9kbykge1xuXHRcdFx0XHRjb25zdCBpbmRleCA9IHRoaXMudG9kb3MuaW5kZXhPZih0b2RvKTtcblx0XHRcdFx0aWYgKGluZGV4ICE9PSAtMSkge1xuXHRcdFx0XHRcdHRoaXMudG9kb3Muc3BsaWNlKGluZGV4LCAxKTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdHVwZGF0ZVRvZG8odG9kbywgbmV3VG9kbykge1xuXHRcdFx0XHRjb25zdCBpbmRleCA9IHRoaXMudG9kb3MuaW5kZXhPZih0b2RvKTtcblx0XHRcdFx0aWYgKGluZGV4ICE9PSAtMSkge1xuXHRcdFx0XHRcdHRoaXMudG9kb3Muc3BsaWNlKGluZGV4LCAxLCBuZXdUb2RvKTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHR9LFxuXHRcdHtcblx0XHRcdHRpdGxlOiBcIlR3byBQcm9qZWN0XCIsXG5cdFx0XHRkZXNjcmlwdGlvbjogXCJQcm9qZWN0IERlc2NyaXB0aW9uXCIsXG5cdFx0XHR0b2RvczogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGl0bGU6IFwidG9kbyAyLTFcIixcblx0XHRcdFx0XHRkZXNjcmlwdGlvbjogXCJ0b2RvIERlc2NyaXB0aW9uIDFcIixcblx0XHRcdFx0XHRkdWVEYXRlOiBcIjIwMjMtMDgtMTVcIixcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRpdGxlOiBcInRvZG8gMi0yXCIsXG5cdFx0XHRcdFx0ZGVzY3JpcHRpb246IFwidG9kbyBEZXNjcmlwdGlvbiAyXCIsXG5cdFx0XHRcdFx0ZHVlRGF0ZTogXCIyMDIzLTA4LTIwXCIsXG5cdFx0XHRcdH0sXG5cdFx0XHRdLFxuXHRcdFx0YWRkTmV3VG9kbyh0b2RvKSB7XG5cdFx0XHRcdHRoaXMudG9kb3MucHVzaCh0b2RvKTtcblx0XHRcdH0sXG5cdFx0XHRyZW1vdmVUb2RvKHRvZG8pIHtcblx0XHRcdFx0Y29uc3QgaW5kZXggPSB0aGlzLnRvZG9zLmluZGV4T2YodG9kbyk7XG5cdFx0XHRcdGlmIChpbmRleCAhPT0gLTEpIHtcblx0XHRcdFx0XHR0aGlzLnRvZG9zLnNwbGljZShpbmRleCwgMSk7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHR1cGRhdGVUb2RvKHRvZG8sIG5ld1RvZG8pIHtcblx0XHRcdFx0Y29uc3QgaW5kZXggPSB0aGlzLnRvZG9zLmluZGV4T2YodG9kbyk7XG5cdFx0XHRcdGlmIChpbmRleCAhPT0gLTEpIHtcblx0XHRcdFx0XHR0aGlzLnRvZG9zLnNwbGljZShpbmRleCwgMSwgbmV3VG9kbyk7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0fSxcblx0XTtcblx0cmV0dXJuIHsgcHJvamVjdHMgfTtcbn0pKCk7XG5leHBvcnQgZGVmYXVsdCBTdG9yYWdlO1xuIiwiaW1wb3J0IFwiLi90b2RvLmpzXCI7XG5pbXBvcnQgU3RvcmFnZSBmcm9tIFwiLi9zdG9yYWdlLmpzXCI7XG5pbXBvcnQgXCIuL3Byb2plY3QuanNcIjtcblxuY29uc3QgRG9tTWFuaXB1bGF0aW9uID0gKCgpID0+IHtcblx0Y29uc3QgdG9kb0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8tbGlzdFwiKTtcblx0Y29uc3QgcHJvamVjdHNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3RzLWNvbnRhaW5lclwiKTtcblx0Y29uc3QgcHJvamVjdExpc3RET00gPSBwcm9qZWN0c0NvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwidWxcIik7XG5cblx0Y29uc3QgbmV3VG9kb0J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmV3LXRvZG8tYnRuXCIpO1xuXHRuZXdUb2RvQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0Y29uc3QgbmV3VG9kbyA9IHtcblx0XHRcdHRpdGxlOiBcIk5ldyBUb2RvXCIsXG5cdFx0XHRkZXNjcmlwdGlvbjogXCJUb2RvIERlc2NyaXB0aW9uXCIsXG5cdFx0XHRkdWVEYXRlOiBcIjIwMjMtMDgtMTVcIixcblx0XHR9O1xuXHRcdGNvbnNvbGUubG9nKFN0b3JhZ2UucHJvamVjdHNbbmV3VG9kb0J0bi5kYXRhc2V0LnZhbHVlXSk7XG5cdFx0U3RvcmFnZS5wcm9qZWN0c1tuZXdUb2RvQnRuLmRhdGFzZXQudmFsdWVdLmFkZE5ld1RvZG8obmV3VG9kbyk7XG5cdFx0ZGlzcGxheShuZXdUb2RvQnRuLmRhdGFzZXQudmFsdWUpO1xuXHR9KTtcblxuXHRjb25zdCBuZXdQcm9qZWN0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuZXctcHJvamVjdC1idG5cIik7XG5cdG5ld1Byb2plY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblx0XHRjb25zdCBuZXdQcm9qZWN0ID0ge1xuXHRcdFx0dGl0bGU6IFwiT25lIFByb2plY3RcIixcblx0XHRcdGRlc2NyaXB0aW9uOiBcIlByb2plY3QgRGVzY3JpcHRpb25cIixcblx0XHRcdHRvZG9zOiBbXSxcblx0XHRcdGFkZE5ld1RvZG8odG9kbykge1xuXHRcdFx0XHR0aGlzLnRvZG9zLnB1c2godG9kbyk7XG5cdFx0XHR9LFxuXHRcdFx0cmVtb3ZlVG9kbyh0b2RvKSB7XG5cdFx0XHRcdGNvbnN0IGluZGV4ID0gdGhpcy50b2Rvcy5pbmRleE9mKHRvZG8pO1xuXHRcdFx0XHRpZiAoaW5kZXggIT09IC0xKSB7XG5cdFx0XHRcdFx0dGhpcy50b2Rvcy5zcGxpY2UoaW5kZXgsIDEpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0dXBkYXRlVG9kbyh0b2RvLCBuZXdUb2RvKSB7XG5cdFx0XHRcdGNvbnN0IGluZGV4ID0gdGhpcy50b2Rvcy5pbmRleE9mKHRvZG8pO1xuXHRcdFx0XHRpZiAoaW5kZXggIT09IC0xKSB7XG5cdFx0XHRcdFx0dGhpcy50b2Rvcy5zcGxpY2UoaW5kZXgsIDEsIG5ld1RvZG8pO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdH07XG5cdFx0U3RvcmFnZS5wcm9qZWN0cy5wdXNoKG5ld1Byb2plY3QpO1xuXHRcdG5ld1RvZG9CdG4uZGF0YXNldC52YWx1ZSA9IFN0b3JhZ2UucHJvamVjdHMubGVuZ3RoIC0gMTtcblx0XHRkaXNwbGF5KFN0b3JhZ2UucHJvamVjdHMubGVuZ3RoIC0gMSk7XG5cdH0pO1xuXG5cdGZ1bmN0aW9uIGNyZWF0ZXRvZG9FbGVtZW50KHRvZG8sIHByb2plY3QpIHtcblx0XHRjb25zdCB0b2RvRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcblx0XHR0b2RvRWxlbWVudC5jbGFzc05hbWUgPSBcInRvZG9cIjtcblxuXHRcdGNvbnN0IGxlZnREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdGxlZnREaXYuY2xhc3NOYW1lID0gXCJsZWZ0XCI7XG5cblx0XHRjb25zdCBjaGVja2JveERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0Y2hlY2tib3hEaXYuY2xhc3NOYW1lID0gXCJjaGVja2JveFwiO1xuXHRcdGNoZWNrYm94RGl2LnRleHRDb250ZW50ID0gXCLinJTvuI9cIjtcblxuXHRcdGNvbnN0IHRvZG9OYW1lRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHR0b2RvTmFtZURpdi5jbGFzc05hbWUgPSBcInRvZG8tbmFtZVwiO1xuXHRcdHRvZG9OYW1lRGl2LnRleHRDb250ZW50ID0gdG9kby50aXRsZTtcblxuXHRcdGxlZnREaXYuYXBwZW5kQ2hpbGQoY2hlY2tib3hEaXYpO1xuXHRcdGxlZnREaXYuYXBwZW5kQ2hpbGQodG9kb05hbWVEaXYpO1xuXG5cdFx0Y29uc3QgcmlnaHREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdHJpZ2h0RGl2LmNsYXNzTmFtZSA9IFwicmlnaHRcIjtcblxuXHRcdGNvbnN0IGRldGFpbHNCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXHRcdGRldGFpbHNCdXR0b24uY2xhc3NOYW1lID0gXCJkZXRhaWxzXCI7XG5cdFx0ZGV0YWlsc0J1dHRvbi50ZXh0Q29udGVudCA9IHRvZG8uZGVzY3JpcHRpb247XG5cblx0XHRjb25zdCBkYXRlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRkYXRlRGl2LmNsYXNzTmFtZSA9IFwiZGF0ZVwiO1xuXHRcdGRhdGVEaXYudGV4dENvbnRlbnQgPSB0b2RvLmR1ZURhdGU7XG5cblx0XHRjb25zdCBidG5Db250YWluZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdGJ0bkNvbnRhaW5lckRpdi5jbGFzc05hbWUgPSBcImJ0bi1jb250YWluZXJcIjtcblxuXHRcdGNvbnN0IGVkaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXHRcdGVkaXRCdXR0b24uY2xhc3NOYW1lID0gXCJlZGl0XCI7XG5cdFx0ZWRpdEJ1dHRvbi50ZXh0Q29udGVudCA9IFwiRWRpdFwiO1xuXG5cdFx0Y29uc3QgZGVsZXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcblx0XHRkZWxldGVCdXR0b24uY2xhc3NOYW1lID0gXCJkZWxldGVcIjtcblx0XHRkZWxldGVCdXR0b24udGV4dENvbnRlbnQgPSBcIkRlbGV0ZVwiO1xuXHRcdGRlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG5cdFx0XHRwcm9qZWN0LnJlbW92ZVRvZG8odG9kbyk7XG5cdFx0XHRkaXNwbGF5KHByb2plY3QuaW5kZXgpO1xuXHRcdH0pO1xuXG5cdFx0YnRuQ29udGFpbmVyRGl2LmFwcGVuZENoaWxkKGVkaXRCdXR0b24pO1xuXHRcdGJ0bkNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZChkZWxldGVCdXR0b24pO1xuXG5cdFx0cmlnaHREaXYuYXBwZW5kQ2hpbGQoZGV0YWlsc0J1dHRvbik7XG5cdFx0cmlnaHREaXYuYXBwZW5kQ2hpbGQoZGF0ZURpdik7XG5cdFx0cmlnaHREaXYuYXBwZW5kQ2hpbGQoYnRuQ29udGFpbmVyRGl2KTtcblxuXHRcdHRvZG9FbGVtZW50LmFwcGVuZENoaWxkKGxlZnREaXYpO1xuXHRcdHRvZG9FbGVtZW50LmFwcGVuZENoaWxkKHJpZ2h0RGl2KTtcblxuXHRcdHRvZG9MaXN0LmFwcGVuZENoaWxkKHRvZG9FbGVtZW50KTtcblx0fVxuXG5cdGZ1bmN0aW9uIGNyZWF0ZVByb2plY3RFbGVtZW50KHByb2plY3QsIGluZGV4KSB7XG5cdFx0Y29uc3QgcHJvamVjdEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG5cdFx0cHJvamVjdEl0ZW0udGV4dENvbnRlbnQgPSBwcm9qZWN0LnRpdGxlO1xuXHRcdHByb2plY3RMaXN0RE9NLmFwcGVuZENoaWxkKHByb2plY3RJdGVtKTtcblx0XHRwcm9qZWN0SXRlbS5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC1saXN0LWVsZW1lbnRcIik7XG5cdFx0cHJvamVjdEl0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblx0XHRcdGRpc3BsYXkoaW5kZXgpO1xuXHRcdFx0bmV3VG9kb0J0bi5kYXRhc2V0LnZhbHVlID0gaW5kZXg7XG5cdFx0fSk7XG5cdH1cblxuXHRmdW5jdGlvbiBkaXNwbGF5KHByb2plY3RJbmRleCkge1xuXHRcdHByb2plY3RMaXN0RE9NLmlubmVySFRNTCA9IFwiXCI7XG5cdFx0U3RvcmFnZS5wcm9qZWN0cy5mb3JFYWNoKChwcm9qZWN0LCBpbmRleCkgPT4ge1xuXHRcdFx0Y3JlYXRlUHJvamVjdEVsZW1lbnQocHJvamVjdCwgaW5kZXgpO1xuXHRcdH0pO1xuXHRcdHRvZG9MaXN0LmlubmVySFRNTCA9IFwiXCI7XG5cdFx0Y29uc3QgY3VycmVudFByb2plY3QgPSBTdG9yYWdlLnByb2plY3RzW3Byb2plY3RJbmRleF07XG5cdFx0Y3VycmVudFByb2plY3QudG9kb3MuZm9yRWFjaCgodG9kbykgPT4ge1xuXHRcdFx0Y3JlYXRldG9kb0VsZW1lbnQodG9kbywgY3VycmVudFByb2plY3QpO1xuXHRcdH0pO1xuXHR9XG5cdHJldHVybiB7IGRpc3BsYXkgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IERvbU1hbmlwdWxhdGlvbjtcbiIsImltcG9ydCBEb21NYW5pcHVsYXRpb24gZnJvbSBcIi4vbW9kdWxlcy9kb21cIjtcbkRvbU1hbmlwdWxhdGlvbi5kaXNwbGF5KDApO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
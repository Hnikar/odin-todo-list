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
		projectList.forEach((project, index) => {
			createProjectElement(project, index);
		});
		todoList.innerHTML = "";
		const currentProject = projectList[projectIndex];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFtQjtBQUNHO0FBQ0E7O0FBRXRCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsVUFBVTtBQUNWLENBQUM7O0FBRUQsMENBQWUsZUFBZSxFQUFDOzs7QUNuTWE7QUFDNUMsR0FBZSIsInNvdXJjZXMiOlsid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvZG9tLmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL3NjcmlwdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXCIuL3RvZG8uanNcIjtcbmltcG9ydCBcIi4vc3RvcmFnZS5qc1wiO1xuaW1wb3J0IFwiLi9wcm9qZWN0LmpzXCI7XG5cbmNvbnN0IHByb2plY3RMaXN0ID0gW1xuXHR7XG5cdFx0dGl0bGU6IFwiT25lIFByb2plY3RcIixcblx0XHRkZXNjcmlwdGlvbjogXCJQcm9qZWN0IERlc2NyaXB0aW9uXCIsXG5cdFx0dG9kb3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwidG9kbyAxXCIsXG5cdFx0XHRcdGRlc2NyaXB0aW9uOiBcInRvZG8gRGVzY3JpcHRpb24gMVwiLFxuXHRcdFx0XHRkdWVEYXRlOiBcIjIwMjMtMDgtMTVcIixcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcInRvZG8gMlwiLFxuXHRcdFx0XHRkZXNjcmlwdGlvbjogXCJ0b2RvIERlc2NyaXB0aW9uIDJcIixcblx0XHRcdFx0ZHVlRGF0ZTogXCIyMDIzLTA4LTIwXCIsXG5cdFx0XHR9LFxuXHRcdF0sXG5cdFx0YWRkTmV3VG9kbyh0b2RvKSB7XG5cdFx0XHR0aGlzLnRvZG9zLnB1c2godG9kbyk7XG5cdFx0fSxcblx0XHRyZW1vdmVUb2RvKHRvZG8pIHtcblx0XHRcdGNvbnN0IGluZGV4ID0gdGhpcy50b2Rvcy5pbmRleE9mKHRvZG8pO1xuXHRcdFx0aWYgKGluZGV4ICE9PSAtMSkge1xuXHRcdFx0XHR0aGlzLnRvZG9zLnNwbGljZShpbmRleCwgMSk7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHR1cGRhdGVUb2RvKHRvZG8sIG5ld1RvZG8pIHtcblx0XHRcdGNvbnN0IGluZGV4ID0gdGhpcy50b2Rvcy5pbmRleE9mKHRvZG8pO1xuXHRcdFx0aWYgKGluZGV4ICE9PSAtMSkge1xuXHRcdFx0XHR0aGlzLnRvZG9zLnNwbGljZShpbmRleCwgMSwgbmV3VG9kbyk7XG5cdFx0XHR9XG5cdFx0fSxcblx0fSxcblx0e1xuXHRcdHRpdGxlOiBcIlR3byBQcm9qZWN0XCIsXG5cdFx0ZGVzY3JpcHRpb246IFwiUHJvamVjdCBEZXNjcmlwdGlvblwiLFxuXHRcdHRvZG9zOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcInRvZG8gMi0xXCIsXG5cdFx0XHRcdGRlc2NyaXB0aW9uOiBcInRvZG8gRGVzY3JpcHRpb24gMVwiLFxuXHRcdFx0XHRkdWVEYXRlOiBcIjIwMjMtMDgtMTVcIixcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcInRvZG8gMi0yXCIsXG5cdFx0XHRcdGRlc2NyaXB0aW9uOiBcInRvZG8gRGVzY3JpcHRpb24gMlwiLFxuXHRcdFx0XHRkdWVEYXRlOiBcIjIwMjMtMDgtMjBcIixcblx0XHRcdH0sXG5cdFx0XSxcblx0XHRhZGROZXdUb2RvKHRvZG8pIHtcblx0XHRcdHRoaXMudG9kb3MucHVzaCh0b2RvKTtcblx0XHR9LFxuXHRcdHJlbW92ZVRvZG8odG9kbykge1xuXHRcdFx0Y29uc3QgaW5kZXggPSB0aGlzLnRvZG9zLmluZGV4T2YodG9kbyk7XG5cdFx0XHRpZiAoaW5kZXggIT09IC0xKSB7XG5cdFx0XHRcdHRoaXMudG9kb3Muc3BsaWNlKGluZGV4LCAxKTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdHVwZGF0ZVRvZG8odG9kbywgbmV3VG9kbykge1xuXHRcdFx0Y29uc3QgaW5kZXggPSB0aGlzLnRvZG9zLmluZGV4T2YodG9kbyk7XG5cdFx0XHRpZiAoaW5kZXggIT09IC0xKSB7XG5cdFx0XHRcdHRoaXMudG9kb3Muc3BsaWNlKGluZGV4LCAxLCBuZXdUb2RvKTtcblx0XHRcdH1cblx0XHR9LFxuXHR9LFxuXTtcblxuY29uc3QgRG9tTWFuaXB1bGF0aW9uID0gKCgpID0+IHtcblx0Y29uc3QgdG9kb0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8tbGlzdFwiKTtcblx0Y29uc3QgcHJvamVjdHNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3RzLWNvbnRhaW5lclwiKTtcblx0Y29uc3QgcHJvamVjdExpc3RET00gPSBwcm9qZWN0c0NvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwidWxcIik7XG5cblx0Y29uc3QgbmV3VG9kb0J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmV3LXRvZG8tYnRuXCIpO1xuXHRuZXdUb2RvQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0Y29uc3QgbmV3VG9kbyA9IHtcblx0XHRcdHRpdGxlOiBcIk5ldyBUb2RvXCIsXG5cdFx0XHRkZXNjcmlwdGlvbjogXCJUb2RvIERlc2NyaXB0aW9uXCIsXG5cdFx0XHRkdWVEYXRlOiBcIjIwMjMtMDgtMTVcIixcblx0XHR9O1xuXHRcdGNvbnNvbGUubG9nKHByb2plY3RMaXN0W25ld1RvZG9CdG4uZGF0YXNldC52YWx1ZV0pO1xuXHRcdHByb2plY3RMaXN0W25ld1RvZG9CdG4uZGF0YXNldC52YWx1ZV0uYWRkTmV3VG9kbyhuZXdUb2RvKTtcblx0XHRkaXNwbGF5KG5ld1RvZG9CdG4uZGF0YXNldC52YWx1ZSk7XG5cdH0pO1xuXG5cdGNvbnN0IG5ld1Byb2plY3RCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5ldy1wcm9qZWN0LWJ0blwiKTtcblx0bmV3UHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdGNvbnN0IG5ld1Byb2plY3QgPSB7XG5cdFx0XHR0aXRsZTogXCJPbmUgUHJvamVjdFwiLFxuXHRcdFx0ZGVzY3JpcHRpb246IFwiUHJvamVjdCBEZXNjcmlwdGlvblwiLFxuXHRcdFx0dG9kb3M6IFtdLFxuXHRcdFx0YWRkTmV3VG9kbyh0b2RvKSB7XG5cdFx0XHRcdHRoaXMudG9kb3MucHVzaCh0b2RvKTtcblx0XHRcdH0sXG5cdFx0XHRyZW1vdmVUb2RvKHRvZG8pIHtcblx0XHRcdFx0Y29uc3QgaW5kZXggPSB0aGlzLnRvZG9zLmluZGV4T2YodG9kbyk7XG5cdFx0XHRcdGlmIChpbmRleCAhPT0gLTEpIHtcblx0XHRcdFx0XHR0aGlzLnRvZG9zLnNwbGljZShpbmRleCwgMSk7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHR1cGRhdGVUb2RvKHRvZG8sIG5ld1RvZG8pIHtcblx0XHRcdFx0Y29uc3QgaW5kZXggPSB0aGlzLnRvZG9zLmluZGV4T2YodG9kbyk7XG5cdFx0XHRcdGlmIChpbmRleCAhPT0gLTEpIHtcblx0XHRcdFx0XHR0aGlzLnRvZG9zLnNwbGljZShpbmRleCwgMSwgbmV3VG9kbyk7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0fTtcblx0XHRwcm9qZWN0TGlzdC5wdXNoKG5ld1Byb2plY3QpO1xuXHRcdG5ld1RvZG9CdG4uZGF0YXNldC52YWx1ZSA9IHByb2plY3RMaXN0Lmxlbmd0aCAtIDE7XG5cdFx0ZGlzcGxheShwcm9qZWN0TGlzdC5sZW5ndGggLSAxKTtcblx0fSk7XG5cblx0ZnVuY3Rpb24gY3JlYXRldG9kb0VsZW1lbnQodG9kbywgcHJvamVjdCkge1xuXHRcdGNvbnN0IHRvZG9FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuXHRcdHRvZG9FbGVtZW50LmNsYXNzTmFtZSA9IFwidG9kb1wiO1xuXG5cdFx0Y29uc3QgbGVmdERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0bGVmdERpdi5jbGFzc05hbWUgPSBcImxlZnRcIjtcblxuXHRcdGNvbnN0IGNoZWNrYm94RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRjaGVja2JveERpdi5jbGFzc05hbWUgPSBcImNoZWNrYm94XCI7XG5cdFx0Y2hlY2tib3hEaXYudGV4dENvbnRlbnQgPSBcIuKclO+4j1wiO1xuXG5cdFx0Y29uc3QgdG9kb05hbWVEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdHRvZG9OYW1lRGl2LmNsYXNzTmFtZSA9IFwidG9kby1uYW1lXCI7XG5cdFx0dG9kb05hbWVEaXYudGV4dENvbnRlbnQgPSB0b2RvLnRpdGxlO1xuXG5cdFx0bGVmdERpdi5hcHBlbmRDaGlsZChjaGVja2JveERpdik7XG5cdFx0bGVmdERpdi5hcHBlbmRDaGlsZCh0b2RvTmFtZURpdik7XG5cblx0XHRjb25zdCByaWdodERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0cmlnaHREaXYuY2xhc3NOYW1lID0gXCJyaWdodFwiO1xuXG5cdFx0Y29uc3QgZGV0YWlsc0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cdFx0ZGV0YWlsc0J1dHRvbi5jbGFzc05hbWUgPSBcImRldGFpbHNcIjtcblx0XHRkZXRhaWxzQnV0dG9uLnRleHRDb250ZW50ID0gdG9kby5kZXNjcmlwdGlvbjtcblxuXHRcdGNvbnN0IGRhdGVEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdGRhdGVEaXYuY2xhc3NOYW1lID0gXCJkYXRlXCI7XG5cdFx0ZGF0ZURpdi50ZXh0Q29udGVudCA9IHRvZG8uZHVlRGF0ZTtcblxuXHRcdGNvbnN0IGJ0bkNvbnRhaW5lckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0YnRuQ29udGFpbmVyRGl2LmNsYXNzTmFtZSA9IFwiYnRuLWNvbnRhaW5lclwiO1xuXG5cdFx0Y29uc3QgZWRpdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cdFx0ZWRpdEJ1dHRvbi5jbGFzc05hbWUgPSBcImVkaXRcIjtcblx0XHRlZGl0QnV0dG9uLnRleHRDb250ZW50ID0gXCJFZGl0XCI7XG5cblx0XHRjb25zdCBkZWxldGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXHRcdGRlbGV0ZUJ1dHRvbi5jbGFzc05hbWUgPSBcImRlbGV0ZVwiO1xuXHRcdGRlbGV0ZUJ1dHRvbi50ZXh0Q29udGVudCA9IFwiRGVsZXRlXCI7XG5cdFx0ZGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcblx0XHRcdHByb2plY3QucmVtb3ZlVG9kbyh0b2RvKTtcblx0XHRcdGRpc3BsYXkocHJvamVjdC5pbmRleCk7XG5cdFx0fSk7XG5cblx0XHRidG5Db250YWluZXJEaXYuYXBwZW5kQ2hpbGQoZWRpdEJ1dHRvbik7XG5cdFx0YnRuQ29udGFpbmVyRGl2LmFwcGVuZENoaWxkKGRlbGV0ZUJ1dHRvbik7XG5cblx0XHRyaWdodERpdi5hcHBlbmRDaGlsZChkZXRhaWxzQnV0dG9uKTtcblx0XHRyaWdodERpdi5hcHBlbmRDaGlsZChkYXRlRGl2KTtcblx0XHRyaWdodERpdi5hcHBlbmRDaGlsZChidG5Db250YWluZXJEaXYpO1xuXG5cdFx0dG9kb0VsZW1lbnQuYXBwZW5kQ2hpbGQobGVmdERpdik7XG5cdFx0dG9kb0VsZW1lbnQuYXBwZW5kQ2hpbGQocmlnaHREaXYpO1xuXG5cdFx0dG9kb0xpc3QuYXBwZW5kQ2hpbGQodG9kb0VsZW1lbnQpO1xuXHR9XG5cblx0ZnVuY3Rpb24gY3JlYXRlUHJvamVjdEVsZW1lbnQocHJvamVjdCwgaW5kZXgpIHtcblx0XHRjb25zdCBwcm9qZWN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcblx0XHRwcm9qZWN0SXRlbS50ZXh0Q29udGVudCA9IHByb2plY3QudGl0bGU7XG5cdFx0cHJvamVjdExpc3RET00uYXBwZW5kQ2hpbGQocHJvamVjdEl0ZW0pO1xuXHRcdHByb2plY3RJdGVtLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LWxpc3QtZWxlbWVudFwiKTtcblx0XHRwcm9qZWN0SXRlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdFx0ZGlzcGxheShpbmRleCk7XG5cdFx0XHRuZXdUb2RvQnRuLmRhdGFzZXQudmFsdWUgPSBpbmRleDtcblx0XHR9KTtcblx0fVxuXG5cdGZ1bmN0aW9uIGRpc3BsYXkocHJvamVjdEluZGV4KSB7XG5cdFx0cHJvamVjdExpc3RET00uaW5uZXJIVE1MID0gXCJcIjtcblx0XHRwcm9qZWN0TGlzdC5mb3JFYWNoKChwcm9qZWN0LCBpbmRleCkgPT4ge1xuXHRcdFx0Y3JlYXRlUHJvamVjdEVsZW1lbnQocHJvamVjdCwgaW5kZXgpO1xuXHRcdH0pO1xuXHRcdHRvZG9MaXN0LmlubmVySFRNTCA9IFwiXCI7XG5cdFx0Y29uc3QgY3VycmVudFByb2plY3QgPSBwcm9qZWN0TGlzdFtwcm9qZWN0SW5kZXhdO1xuXHRcdGN1cnJlbnRQcm9qZWN0LnRvZG9zLmZvckVhY2goKHRvZG8pID0+IHtcblx0XHRcdGNyZWF0ZXRvZG9FbGVtZW50KHRvZG8sIGN1cnJlbnRQcm9qZWN0KTtcblx0XHR9KTtcblx0fVxuXHRyZXR1cm4geyBkaXNwbGF5IH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBEb21NYW5pcHVsYXRpb247XG4iLCJpbXBvcnQgRG9tTWFuaXB1bGF0aW9uIGZyb20gXCIuL21vZHVsZXMvZG9tXCI7XG5Eb21NYW5pcHVsYXRpb24uZGlzcGxheSgwKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
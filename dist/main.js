/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/dom.js":
/*!****************************!*\
  !*** ./src/modules/dom.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage.js */ "./src/modules/storage.js");
/* harmony import */ var _todo_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./todo.js */ "./src/modules/todo.js");
/* harmony import */ var _project_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./project.js */ "./src/modules/project.js");



const DomManipulation = (() => {
	const todoList = document.querySelector(".todo-list");
	const projectsContainer = document.querySelector(".projects-container");
	const projectListDOM = projectsContainer.querySelector("ul");

	const newTodoBtn = document.getElementById("new-todo-btn");
	const addTodoForm = document.getElementById("addTodoForm");
	const closeFormBtn = document.getElementById("closeFormBtn");
	const todoForm = document.getElementById("todoForm");

	const overlay = document.getElementById("overlay");

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
		const description = document.getElementById("todoDescription").value;
		const dueDate = document.getElementById("dueDate").value;

		const newTodo = new _todo_js__WEBPACK_IMPORTED_MODULE_1__["default"](title, description, dueDate, false);

		_storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].projects[newTodoBtn.dataset.value].addNewTodo(newTodo);
		display(newTodoBtn.dataset.value);

		todoForm.reset();
		addTodoForm.style.display = "none";
		overlay.style.display = "none";
	});

	const newProjectBtn = document.getElementById("new-project-btn");
	const addProjectForm = document.getElementById("addProjectForm");
	const closeProjectFormBtn = document.getElementById("closeProjectFormBtn");
	const projectForm = document.getElementById("projectForm");

	newProjectBtn.addEventListener("click", () => {
		addProjectForm.style.display = "block";
		overlay.style.display = "block";
	});

	closeProjectFormBtn.addEventListener("click", () => {
		addProjectForm.style.display = "none";
		overlay.style.display = "none";
	});

	function openEditTodoForm(todo, project) {
		editTodoForm.style.display = "block";
		overlay.style.display = "block";

		const editTodoTitleInput = document.getElementById("editTodoTitle");
		const editTodoDescriptionInput = document.getElementById(
			"editTodoDescription"
		);
		const editDueDateInput = document.getElementById("editDueDate");

		editTodoTitleInput.value = todo.title;
		editTodoDescriptionInput.value = todo.description;
		editDueDateInput.value = todo.dueDate;

		editTodoForm
			.querySelector("form")
			.addEventListener("submit", (event) => {
				event.preventDefault();

				const updatedTodo = {
					title: editTodoTitleInput.value,
					description: editTodoDescriptionInput.value,
					dueDate: editDueDateInput.value,
				};

				project.updateTodo(todo, updatedTodo);
				display(newTodoBtn.dataset.value);

				editTodoForm.style.display = "none";
				overlay.style.display = "none";
			});
	}

	const editTodoForm = document.getElementById("editTodoForm");
	const closeEditFormBtn = document.getElementById("closeEditFormBtn");

	closeEditFormBtn.addEventListener("click", () => {
		editTodoForm.style.display = "none";
		overlay.style.display = "none";
	});

	projectForm.addEventListener("submit", (event) => {
		event.preventDefault();

		const title = document.getElementById("projectTitle").value;
		const description = document.getElementById("projectDescription").value;

		const newProject = new _project_js__WEBPACK_IMPORTED_MODULE_2__["default"](title, description, []);

		_storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].projects.push(newProject);
		display(_storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].projects.length - 1);

		projectForm.reset();
		addProjectForm.style.display = "none";
		overlay.style.display = "none";
	});

	function createtodoElement(todo, project) {
		const todoElement = document.createElement("li");
		todoElement.className = "todo";
		if (todo.completed) {
			todoElement.classList.add("completed");
		}

		const leftDiv = document.createElement("div");
		leftDiv.className = "left";

		const checkboxInput = document.createElement("input");
		checkboxInput.type = "checkbox";
		checkboxInput.className = "checkbox";
		checkboxInput.checked = todo.completed;
		checkboxInput.addEventListener("change", () => {
			todo.toggleCompleted();
			todoElement.classList.toggle("completed", todo.completed);
		});

		const todoNameDiv = document.createElement("div");
		todoNameDiv.className = "todo-name";
		todoNameDiv.textContent = todo.title;

		leftDiv.appendChild(checkboxInput);
		leftDiv.appendChild(todoNameDiv);

		const rightDiv = document.createElement("div");
		rightDiv.className = "right";

		const detailsButton = document.createElement("button");
		detailsButton.className = "details";
		detailsButton.textContent = "Description"; // Change text content
		detailsButton.dataset.description = todo.description; // Set description as a data attribute

		const dateDiv = document.createElement("div");
		dateDiv.className = "date";
		dateDiv.textContent = todo.dueDate;

		const btnContainerDiv = document.createElement("div");
		btnContainerDiv.className = "btn-container";

		const editButton = document.createElement("button");
		editButton.className = "edit";
		editButton.textContent = "Edit";
		editButton.addEventListener("click", (event) => {
			openEditTodoForm(todo, project);
		});

		const deleteButton = document.createElement("button");
		deleteButton.className = "delete";
		deleteButton.textContent = "Delete";
		deleteButton.addEventListener("click", (event) => {
			project.removeTodo(todo);
			display(newTodoBtn.dataset.value);
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
		projectItem.classList.add("project-list-element");

		const projectName = document.createElement("div");
		projectName.textContent = project.title;
		projectName.classList.add("project-name");
		projectItem.appendChild(projectName);

		const projectDescription = document.createElement("div");
		projectDescription.classList.add("project-description");
		projectDescription.textContent = project.description;
		projectItem.appendChild(projectDescription);

		const deleteButton = document.createElement("button");
		deleteButton.textContent = "X";
		deleteButton.classList.add("delete-project-btn");
		projectItem.appendChild(deleteButton);

		projectListDOM.appendChild(projectItem);

		projectItem.addEventListener("click", () => {
			display(index);
			newTodoBtn.dataset.value = index;
		});
		deleteButton.addEventListener("click", (event) => {
			event.stopPropagation();
			_storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].projects.splice(index, 1);
			display(newTodoBtn.dataset.value);
		});
	}

	const homeProjectHeader = document.querySelector(".sidebar h2");
	homeProjectHeader.addEventListener("click", () => {
		display(null);
		newTodoBtn.dataset.value = null;
	});

	function display(projectIndex) {
		projectListDOM.innerHTML = "";
		_storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].projects.forEach((project, index) => {
			createProjectElement(project, index);
		});
		todoList.innerHTML = "";

		if (projectIndex === null) {
			_storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].projects.forEach((project) => {
				project.todos.forEach((todo) => {
					createtodoElement(todo, project);
				});
			});
			newTodoBtn.style.display = "none";
		} else {
			const currentProject = _storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].projects[projectIndex];
			currentProject.todos.forEach((todo) => {
				createtodoElement(todo, currentProject);
			});
			newTodoBtn.style.display = "block";
		}
	}

	return { display };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DomManipulation);


/***/ }),

/***/ "./src/modules/project.js":
/*!********************************!*\
  !*** ./src/modules/project.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Project)
/* harmony export */ });
class Project {
	constructor(title, description, todos) {
		this.title = title;
		this.description = description;
		this.todos = todos;
	}
	addNewTodo(todo) {
		this.todos.push(todo);
	}
	removeTodo(todo) {
		this.todos.splice(this.todos.indexOf(todo), 1);
	}
	updateTodo(todo, newTodo) {
		this.todos.splice(this.todos.indexOf(todo), 1, newTodo);
	}
}


/***/ }),

/***/ "./src/modules/storage.js":
/*!********************************!*\
  !*** ./src/modules/storage.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const Storage = (() => {
	const projects = [
		{
			title: "One Project Very long long long long",
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Storage);


/***/ }),

/***/ "./src/modules/todo.js":
/*!*****************************!*\
  !*** ./src/modules/todo.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Todo)
/* harmony export */ });
class Todo {
	constructor(title, details, dueDate, completed) {
		this.title = title;
		this.details = details;
		this.dueDate = dueDate;
		this.completed = completed;
	}
	toggleCompleted() {
		this.completed = !this.completed;
	}
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***********************!*\
  !*** ./src/script.js ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/dom */ "./src/modules/dom.js");

_modules_dom__WEBPACK_IMPORTED_MODULE_0__["default"].display(null);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRztBQUNIO0FBQ0EsVUFBVTtBQUNWLENBQUM7QUFDRCxpRUFBZSxPQUFPLEVBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ25FUjtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDVkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ040QztBQUM1QyxvREFBZSIsInNvdXJjZXMiOlsid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvZG9tLmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvcHJvamVjdC5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy90b2RvLmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29kaW4tdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29kaW4tdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvc2NyaXB0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTdG9yYWdlIGZyb20gXCIuL3N0b3JhZ2UuanNcIjtcbmltcG9ydCBUb2RvIGZyb20gXCIuL3RvZG8uanNcIjtcbmltcG9ydCBQcm9qZWN0IGZyb20gXCIuL3Byb2plY3QuanNcIjtcbmNvbnN0IERvbU1hbmlwdWxhdGlvbiA9ICgoKSA9PiB7XG5cdGNvbnN0IHRvZG9MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLWxpc3RcIik7XG5cdGNvbnN0IHByb2plY3RzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0cy1jb250YWluZXJcIik7XG5cdGNvbnN0IHByb2plY3RMaXN0RE9NID0gcHJvamVjdHNDb250YWluZXIucXVlcnlTZWxlY3RvcihcInVsXCIpO1xuXG5cdGNvbnN0IG5ld1RvZG9CdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5ldy10b2RvLWJ0blwiKTtcblx0Y29uc3QgYWRkVG9kb0Zvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZFRvZG9Gb3JtXCIpO1xuXHRjb25zdCBjbG9zZUZvcm1CdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNsb3NlRm9ybUJ0blwiKTtcblx0Y29uc3QgdG9kb0Zvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvZG9Gb3JtXCIpO1xuXG5cdGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm92ZXJsYXlcIik7XG5cblx0bmV3VG9kb0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdGFkZFRvZG9Gb3JtLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG5cdFx0b3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuXHR9KTtcblxuXHRjbG9zZUZvcm1CdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblx0XHRhZGRUb2RvRm9ybS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cdFx0b3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cdH0pO1xuXG5cdHRvZG9Gb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGV2ZW50KSA9PiB7XG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuXHRcdGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b2RvVGl0bGVcIikudmFsdWU7XG5cdFx0Y29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvZG9EZXNjcmlwdGlvblwiKS52YWx1ZTtcblx0XHRjb25zdCBkdWVEYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkdWVEYXRlXCIpLnZhbHVlO1xuXG5cdFx0Y29uc3QgbmV3VG9kbyA9IG5ldyBUb2RvKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgZmFsc2UpO1xuXG5cdFx0U3RvcmFnZS5wcm9qZWN0c1tuZXdUb2RvQnRuLmRhdGFzZXQudmFsdWVdLmFkZE5ld1RvZG8obmV3VG9kbyk7XG5cdFx0ZGlzcGxheShuZXdUb2RvQnRuLmRhdGFzZXQudmFsdWUpO1xuXG5cdFx0dG9kb0Zvcm0ucmVzZXQoKTtcblx0XHRhZGRUb2RvRm9ybS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cdFx0b3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cdH0pO1xuXG5cdGNvbnN0IG5ld1Byb2plY3RCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5ldy1wcm9qZWN0LWJ0blwiKTtcblx0Y29uc3QgYWRkUHJvamVjdEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZFByb2plY3RGb3JtXCIpO1xuXHRjb25zdCBjbG9zZVByb2plY3RGb3JtQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjbG9zZVByb2plY3RGb3JtQnRuXCIpO1xuXHRjb25zdCBwcm9qZWN0Rm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdEZvcm1cIik7XG5cblx0bmV3UHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdGFkZFByb2plY3RGb3JtLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG5cdFx0b3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuXHR9KTtcblxuXHRjbG9zZVByb2plY3RGb3JtQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0YWRkUHJvamVjdEZvcm0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXHRcdG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXHR9KTtcblxuXHRmdW5jdGlvbiBvcGVuRWRpdFRvZG9Gb3JtKHRvZG8sIHByb2plY3QpIHtcblx0XHRlZGl0VG9kb0Zvcm0uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcblx0XHRvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG5cblx0XHRjb25zdCBlZGl0VG9kb1RpdGxlSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVkaXRUb2RvVGl0bGVcIik7XG5cdFx0Y29uc3QgZWRpdFRvZG9EZXNjcmlwdGlvbklucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG5cdFx0XHRcImVkaXRUb2RvRGVzY3JpcHRpb25cIlxuXHRcdCk7XG5cdFx0Y29uc3QgZWRpdER1ZURhdGVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZWRpdER1ZURhdGVcIik7XG5cblx0XHRlZGl0VG9kb1RpdGxlSW5wdXQudmFsdWUgPSB0b2RvLnRpdGxlO1xuXHRcdGVkaXRUb2RvRGVzY3JpcHRpb25JbnB1dC52YWx1ZSA9IHRvZG8uZGVzY3JpcHRpb247XG5cdFx0ZWRpdER1ZURhdGVJbnB1dC52YWx1ZSA9IHRvZG8uZHVlRGF0ZTtcblxuXHRcdGVkaXRUb2RvRm9ybVxuXHRcdFx0LnF1ZXJ5U2VsZWN0b3IoXCJmb3JtXCIpXG5cdFx0XHQuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZlbnQpID0+IHtcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0XHRjb25zdCB1cGRhdGVkVG9kbyA9IHtcblx0XHRcdFx0XHR0aXRsZTogZWRpdFRvZG9UaXRsZUlucHV0LnZhbHVlLFxuXHRcdFx0XHRcdGRlc2NyaXB0aW9uOiBlZGl0VG9kb0Rlc2NyaXB0aW9uSW5wdXQudmFsdWUsXG5cdFx0XHRcdFx0ZHVlRGF0ZTogZWRpdER1ZURhdGVJbnB1dC52YWx1ZSxcblx0XHRcdFx0fTtcblxuXHRcdFx0XHRwcm9qZWN0LnVwZGF0ZVRvZG8odG9kbywgdXBkYXRlZFRvZG8pO1xuXHRcdFx0XHRkaXNwbGF5KG5ld1RvZG9CdG4uZGF0YXNldC52YWx1ZSk7XG5cblx0XHRcdFx0ZWRpdFRvZG9Gb3JtLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblx0XHRcdFx0b3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cdFx0XHR9KTtcblx0fVxuXG5cdGNvbnN0IGVkaXRUb2RvRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZWRpdFRvZG9Gb3JtXCIpO1xuXHRjb25zdCBjbG9zZUVkaXRGb3JtQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjbG9zZUVkaXRGb3JtQnRuXCIpO1xuXG5cdGNsb3NlRWRpdEZvcm1CdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblx0XHRlZGl0VG9kb0Zvcm0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXHRcdG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXHR9KTtcblxuXHRwcm9qZWN0Rm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChldmVudCkgPT4ge1xuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRjb25zdCB0aXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdFRpdGxlXCIpLnZhbHVlO1xuXHRcdGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0RGVzY3JpcHRpb25cIikudmFsdWU7XG5cblx0XHRjb25zdCBuZXdQcm9qZWN0ID0gbmV3IFByb2plY3QodGl0bGUsIGRlc2NyaXB0aW9uLCBbXSk7XG5cblx0XHRTdG9yYWdlLnByb2plY3RzLnB1c2gobmV3UHJvamVjdCk7XG5cdFx0ZGlzcGxheShTdG9yYWdlLnByb2plY3RzLmxlbmd0aCAtIDEpO1xuXG5cdFx0cHJvamVjdEZvcm0ucmVzZXQoKTtcblx0XHRhZGRQcm9qZWN0Rm9ybS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cdFx0b3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cdH0pO1xuXG5cdGZ1bmN0aW9uIGNyZWF0ZXRvZG9FbGVtZW50KHRvZG8sIHByb2plY3QpIHtcblx0XHRjb25zdCB0b2RvRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcblx0XHR0b2RvRWxlbWVudC5jbGFzc05hbWUgPSBcInRvZG9cIjtcblx0XHRpZiAodG9kby5jb21wbGV0ZWQpIHtcblx0XHRcdHRvZG9FbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJjb21wbGV0ZWRcIik7XG5cdFx0fVxuXG5cdFx0Y29uc3QgbGVmdERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0bGVmdERpdi5jbGFzc05hbWUgPSBcImxlZnRcIjtcblxuXHRcdGNvbnN0IGNoZWNrYm94SW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG5cdFx0Y2hlY2tib3hJbnB1dC50eXBlID0gXCJjaGVja2JveFwiO1xuXHRcdGNoZWNrYm94SW5wdXQuY2xhc3NOYW1lID0gXCJjaGVja2JveFwiO1xuXHRcdGNoZWNrYm94SW5wdXQuY2hlY2tlZCA9IHRvZG8uY29tcGxldGVkO1xuXHRcdGNoZWNrYm94SW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoKSA9PiB7XG5cdFx0XHR0b2RvLnRvZ2dsZUNvbXBsZXRlZCgpO1xuXHRcdFx0dG9kb0VsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZShcImNvbXBsZXRlZFwiLCB0b2RvLmNvbXBsZXRlZCk7XG5cdFx0fSk7XG5cblx0XHRjb25zdCB0b2RvTmFtZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0dG9kb05hbWVEaXYuY2xhc3NOYW1lID0gXCJ0b2RvLW5hbWVcIjtcblx0XHR0b2RvTmFtZURpdi50ZXh0Q29udGVudCA9IHRvZG8udGl0bGU7XG5cblx0XHRsZWZ0RGl2LmFwcGVuZENoaWxkKGNoZWNrYm94SW5wdXQpO1xuXHRcdGxlZnREaXYuYXBwZW5kQ2hpbGQodG9kb05hbWVEaXYpO1xuXG5cdFx0Y29uc3QgcmlnaHREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdHJpZ2h0RGl2LmNsYXNzTmFtZSA9IFwicmlnaHRcIjtcblxuXHRcdGNvbnN0IGRldGFpbHNCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXHRcdGRldGFpbHNCdXR0b24uY2xhc3NOYW1lID0gXCJkZXRhaWxzXCI7XG5cdFx0ZGV0YWlsc0J1dHRvbi50ZXh0Q29udGVudCA9IFwiRGVzY3JpcHRpb25cIjsgLy8gQ2hhbmdlIHRleHQgY29udGVudFxuXHRcdGRldGFpbHNCdXR0b24uZGF0YXNldC5kZXNjcmlwdGlvbiA9IHRvZG8uZGVzY3JpcHRpb247IC8vIFNldCBkZXNjcmlwdGlvbiBhcyBhIGRhdGEgYXR0cmlidXRlXG5cblx0XHRjb25zdCBkYXRlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRkYXRlRGl2LmNsYXNzTmFtZSA9IFwiZGF0ZVwiO1xuXHRcdGRhdGVEaXYudGV4dENvbnRlbnQgPSB0b2RvLmR1ZURhdGU7XG5cblx0XHRjb25zdCBidG5Db250YWluZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdGJ0bkNvbnRhaW5lckRpdi5jbGFzc05hbWUgPSBcImJ0bi1jb250YWluZXJcIjtcblxuXHRcdGNvbnN0IGVkaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXHRcdGVkaXRCdXR0b24uY2xhc3NOYW1lID0gXCJlZGl0XCI7XG5cdFx0ZWRpdEJ1dHRvbi50ZXh0Q29udGVudCA9IFwiRWRpdFwiO1xuXHRcdGVkaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuXHRcdFx0b3BlbkVkaXRUb2RvRm9ybSh0b2RvLCBwcm9qZWN0KTtcblx0XHR9KTtcblxuXHRcdGNvbnN0IGRlbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cdFx0ZGVsZXRlQnV0dG9uLmNsYXNzTmFtZSA9IFwiZGVsZXRlXCI7XG5cdFx0ZGVsZXRlQnV0dG9uLnRleHRDb250ZW50ID0gXCJEZWxldGVcIjtcblx0XHRkZWxldGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuXHRcdFx0cHJvamVjdC5yZW1vdmVUb2RvKHRvZG8pO1xuXHRcdFx0ZGlzcGxheShuZXdUb2RvQnRuLmRhdGFzZXQudmFsdWUpO1xuXHRcdH0pO1xuXG5cdFx0YnRuQ29udGFpbmVyRGl2LmFwcGVuZENoaWxkKGVkaXRCdXR0b24pO1xuXHRcdGJ0bkNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZChkZWxldGVCdXR0b24pO1xuXG5cdFx0cmlnaHREaXYuYXBwZW5kQ2hpbGQoZGV0YWlsc0J1dHRvbik7XG5cdFx0cmlnaHREaXYuYXBwZW5kQ2hpbGQoZGF0ZURpdik7XG5cdFx0cmlnaHREaXYuYXBwZW5kQ2hpbGQoYnRuQ29udGFpbmVyRGl2KTtcblxuXHRcdHRvZG9FbGVtZW50LmFwcGVuZENoaWxkKGxlZnREaXYpO1xuXHRcdHRvZG9FbGVtZW50LmFwcGVuZENoaWxkKHJpZ2h0RGl2KTtcblxuXHRcdHRvZG9MaXN0LmFwcGVuZENoaWxkKHRvZG9FbGVtZW50KTtcblx0fVxuXG5cdGZ1bmN0aW9uIGNyZWF0ZVByb2plY3RFbGVtZW50KHByb2plY3QsIGluZGV4KSB7XG5cdFx0Y29uc3QgcHJvamVjdEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG5cdFx0cHJvamVjdEl0ZW0uY2xhc3NMaXN0LmFkZChcInByb2plY3QtbGlzdC1lbGVtZW50XCIpO1xuXG5cdFx0Y29uc3QgcHJvamVjdE5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdHByb2plY3ROYW1lLnRleHRDb250ZW50ID0gcHJvamVjdC50aXRsZTtcblx0XHRwcm9qZWN0TmFtZS5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC1uYW1lXCIpO1xuXHRcdHByb2plY3RJdGVtLmFwcGVuZENoaWxkKHByb2plY3ROYW1lKTtcblxuXHRcdGNvbnN0IHByb2plY3REZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0cHJvamVjdERlc2NyaXB0aW9uLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LWRlc2NyaXB0aW9uXCIpO1xuXHRcdHByb2plY3REZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IHByb2plY3QuZGVzY3JpcHRpb247XG5cdFx0cHJvamVjdEl0ZW0uYXBwZW5kQ2hpbGQocHJvamVjdERlc2NyaXB0aW9uKTtcblxuXHRcdGNvbnN0IGRlbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cdFx0ZGVsZXRlQnV0dG9uLnRleHRDb250ZW50ID0gXCJYXCI7XG5cdFx0ZGVsZXRlQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJkZWxldGUtcHJvamVjdC1idG5cIik7XG5cdFx0cHJvamVjdEl0ZW0uYXBwZW5kQ2hpbGQoZGVsZXRlQnV0dG9uKTtcblxuXHRcdHByb2plY3RMaXN0RE9NLmFwcGVuZENoaWxkKHByb2plY3RJdGVtKTtcblxuXHRcdHByb2plY3RJdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0XHRkaXNwbGF5KGluZGV4KTtcblx0XHRcdG5ld1RvZG9CdG4uZGF0YXNldC52YWx1ZSA9IGluZGV4O1xuXHRcdH0pO1xuXHRcdGRlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdFN0b3JhZ2UucHJvamVjdHMuc3BsaWNlKGluZGV4LCAxKTtcblx0XHRcdGRpc3BsYXkobmV3VG9kb0J0bi5kYXRhc2V0LnZhbHVlKTtcblx0XHR9KTtcblx0fVxuXG5cdGNvbnN0IGhvbWVQcm9qZWN0SGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyIGgyXCIpO1xuXHRob21lUHJvamVjdEhlYWRlci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdGRpc3BsYXkobnVsbCk7XG5cdFx0bmV3VG9kb0J0bi5kYXRhc2V0LnZhbHVlID0gbnVsbDtcblx0fSk7XG5cblx0ZnVuY3Rpb24gZGlzcGxheShwcm9qZWN0SW5kZXgpIHtcblx0XHRwcm9qZWN0TGlzdERPTS5pbm5lckhUTUwgPSBcIlwiO1xuXHRcdFN0b3JhZ2UucHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCwgaW5kZXgpID0+IHtcblx0XHRcdGNyZWF0ZVByb2plY3RFbGVtZW50KHByb2plY3QsIGluZGV4KTtcblx0XHR9KTtcblx0XHR0b2RvTGlzdC5pbm5lckhUTUwgPSBcIlwiO1xuXG5cdFx0aWYgKHByb2plY3RJbmRleCA9PT0gbnVsbCkge1xuXHRcdFx0U3RvcmFnZS5wcm9qZWN0cy5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG5cdFx0XHRcdHByb2plY3QudG9kb3MuZm9yRWFjaCgodG9kbykgPT4ge1xuXHRcdFx0XHRcdGNyZWF0ZXRvZG9FbGVtZW50KHRvZG8sIHByb2plY3QpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdFx0bmV3VG9kb0J0bi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnN0IGN1cnJlbnRQcm9qZWN0ID0gU3RvcmFnZS5wcm9qZWN0c1twcm9qZWN0SW5kZXhdO1xuXHRcdFx0Y3VycmVudFByb2plY3QudG9kb3MuZm9yRWFjaCgodG9kbykgPT4ge1xuXHRcdFx0XHRjcmVhdGV0b2RvRWxlbWVudCh0b2RvLCBjdXJyZW50UHJvamVjdCk7XG5cdFx0XHR9KTtcblx0XHRcdG5ld1RvZG9CdG4uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4geyBkaXNwbGF5IH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBEb21NYW5pcHVsYXRpb247XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9qZWN0IHtcblx0Y29uc3RydWN0b3IodGl0bGUsIGRlc2NyaXB0aW9uLCB0b2Rvcykge1xuXHRcdHRoaXMudGl0bGUgPSB0aXRsZTtcblx0XHR0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG5cdFx0dGhpcy50b2RvcyA9IHRvZG9zO1xuXHR9XG5cdGFkZE5ld1RvZG8odG9kbykge1xuXHRcdHRoaXMudG9kb3MucHVzaCh0b2RvKTtcblx0fVxuXHRyZW1vdmVUb2RvKHRvZG8pIHtcblx0XHR0aGlzLnRvZG9zLnNwbGljZSh0aGlzLnRvZG9zLmluZGV4T2YodG9kbyksIDEpO1xuXHR9XG5cdHVwZGF0ZVRvZG8odG9kbywgbmV3VG9kbykge1xuXHRcdHRoaXMudG9kb3Muc3BsaWNlKHRoaXMudG9kb3MuaW5kZXhPZih0b2RvKSwgMSwgbmV3VG9kbyk7XG5cdH1cbn1cbiIsImNvbnN0IFN0b3JhZ2UgPSAoKCkgPT4ge1xuXHRjb25zdCBwcm9qZWN0cyA9IFtcblx0XHR7XG5cdFx0XHR0aXRsZTogXCJPbmUgUHJvamVjdCBWZXJ5IGxvbmcgbG9uZyBsb25nIGxvbmdcIixcblx0XHRcdGRlc2NyaXB0aW9uOiBcIlByb2plY3QgRGVzY3JpcHRpb25cIixcblx0XHRcdHRvZG9zOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aXRsZTogXCJ0b2RvIDFcIixcblx0XHRcdFx0XHRkZXNjcmlwdGlvbjogXCJ0b2RvIERlc2NyaXB0aW9uIDFcIixcblx0XHRcdFx0XHRkdWVEYXRlOiBcIjIwMjMtMDgtMTVcIixcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRpdGxlOiBcInRvZG8gMlwiLFxuXHRcdFx0XHRcdGRlc2NyaXB0aW9uOiBcInRvZG8gRGVzY3JpcHRpb24gMlwiLFxuXHRcdFx0XHRcdGR1ZURhdGU6IFwiMjAyMy0wOC0yMFwiLFxuXHRcdFx0XHR9LFxuXHRcdFx0XSxcblx0XHRcdGFkZE5ld1RvZG8odG9kbykge1xuXHRcdFx0XHR0aGlzLnRvZG9zLnB1c2godG9kbyk7XG5cdFx0XHR9LFxuXHRcdFx0cmVtb3ZlVG9kbyh0b2RvKSB7XG5cdFx0XHRcdGNvbnN0IGluZGV4ID0gdGhpcy50b2Rvcy5pbmRleE9mKHRvZG8pO1xuXHRcdFx0XHRpZiAoaW5kZXggIT09IC0xKSB7XG5cdFx0XHRcdFx0dGhpcy50b2Rvcy5zcGxpY2UoaW5kZXgsIDEpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0dXBkYXRlVG9kbyh0b2RvLCBuZXdUb2RvKSB7XG5cdFx0XHRcdGNvbnN0IGluZGV4ID0gdGhpcy50b2Rvcy5pbmRleE9mKHRvZG8pO1xuXHRcdFx0XHRpZiAoaW5kZXggIT09IC0xKSB7XG5cdFx0XHRcdFx0dGhpcy50b2Rvcy5zcGxpY2UoaW5kZXgsIDEsIG5ld1RvZG8pO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0dGl0bGU6IFwiVHdvIFByb2plY3RcIixcblx0XHRcdGRlc2NyaXB0aW9uOiBcIlByb2plY3QgRGVzY3JpcHRpb25cIixcblx0XHRcdHRvZG9zOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aXRsZTogXCJ0b2RvIDItMVwiLFxuXHRcdFx0XHRcdGRlc2NyaXB0aW9uOiBcInRvZG8gRGVzY3JpcHRpb24gMVwiLFxuXHRcdFx0XHRcdGR1ZURhdGU6IFwiMjAyMy0wOC0xNVwiLFxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGl0bGU6IFwidG9kbyAyLTJcIixcblx0XHRcdFx0XHRkZXNjcmlwdGlvbjogXCJ0b2RvIERlc2NyaXB0aW9uIDJcIixcblx0XHRcdFx0XHRkdWVEYXRlOiBcIjIwMjMtMDgtMjBcIixcblx0XHRcdFx0fSxcblx0XHRcdF0sXG5cdFx0XHRhZGROZXdUb2RvKHRvZG8pIHtcblx0XHRcdFx0dGhpcy50b2Rvcy5wdXNoKHRvZG8pO1xuXHRcdFx0fSxcblx0XHRcdHJlbW92ZVRvZG8odG9kbykge1xuXHRcdFx0XHRjb25zdCBpbmRleCA9IHRoaXMudG9kb3MuaW5kZXhPZih0b2RvKTtcblx0XHRcdFx0aWYgKGluZGV4ICE9PSAtMSkge1xuXHRcdFx0XHRcdHRoaXMudG9kb3Muc3BsaWNlKGluZGV4LCAxKTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdHVwZGF0ZVRvZG8odG9kbywgbmV3VG9kbykge1xuXHRcdFx0XHRjb25zdCBpbmRleCA9IHRoaXMudG9kb3MuaW5kZXhPZih0b2RvKTtcblx0XHRcdFx0aWYgKGluZGV4ICE9PSAtMSkge1xuXHRcdFx0XHRcdHRoaXMudG9kb3Muc3BsaWNlKGluZGV4LCAxLCBuZXdUb2RvKTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHR9LFxuXHRdO1xuXHRyZXR1cm4geyBwcm9qZWN0cyB9O1xufSkoKTtcbmV4cG9ydCBkZWZhdWx0IFN0b3JhZ2U7XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBUb2RvIHtcblx0Y29uc3RydWN0b3IodGl0bGUsIGRldGFpbHMsIGR1ZURhdGUsIGNvbXBsZXRlZCkge1xuXHRcdHRoaXMudGl0bGUgPSB0aXRsZTtcblx0XHR0aGlzLmRldGFpbHMgPSBkZXRhaWxzO1xuXHRcdHRoaXMuZHVlRGF0ZSA9IGR1ZURhdGU7XG5cdFx0dGhpcy5jb21wbGV0ZWQgPSBjb21wbGV0ZWQ7XG5cdH1cblx0dG9nZ2xlQ29tcGxldGVkKCkge1xuXHRcdHRoaXMuY29tcGxldGVkID0gIXRoaXMuY29tcGxldGVkO1xuXHR9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBEb21NYW5pcHVsYXRpb24gZnJvbSBcIi4vbW9kdWxlcy9kb21cIjtcbkRvbU1hbmlwdWxhdGlvbi5kaXNwbGF5KG51bGwpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/domManipulation.js":
/*!****************************************!*\
  !*** ./src/modules/domManipulation.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage.js */ "./src/modules/storage.js");
/* harmony import */ var _eventListeners_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./eventListeners.js */ "./src/modules/eventListeners.js");



const DomManipulation = (() => {
	const todoList = document.querySelector(".todo-list");
	const projectsContainer = document.querySelector(".projects-container");
	const projectListDOM = projectsContainer.querySelector("ul");

	const overlay = document.getElementById("overlay");

	const newTodoBtn = document.getElementById("new-todo-btn");
	const newProjectBtn = document.getElementById("new-project-btn");

	const todoForm = document.getElementById("todoForm");
	const formCancelBtn = document.getElementById("formCancelBtn");

	function editTodoForm(todo, project) {
		todoForm.style.display = "block";
		overlay.style.display = "block";

		const editTodoTitleInput = document.getElementById("todoTitle");
		const editTodoDetailsInput = document.getElementById("todoDetails");
		const editTodoDueDateInput = document.getElementById("todoDueDate");

		editTodoTitleInput.value = todo.title;
		editTodoDetailsInput.value = todo.details;
		editTodoDueDateInput.value = todo.dueDate;

		_eventListeners_js__WEBPACK_IMPORTED_MODULE_1__["default"].attachEditFormSubmitListener(
			todoForm,
			editTodoTitleInput,
			editTodoDetailsInput,
			editTodoDueDateInput,
			project,
			todo,
			newTodoBtn,
			formCancelBtn
		);
	}

	_eventListeners_js__WEBPACK_IMPORTED_MODULE_1__["default"].attachTodoFormListeners(newTodoBtn, overlay)
		.attachProjectFormListeners(newProjectBtn, newTodoBtn, overlay)
		.attachHomeListener(newTodoBtn);

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
			_storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].saveProjectsToLocalStorage(_storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].projects);
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
		detailsButton.textContent = "Details";
		detailsButton.dataset.details = todo.details;

		const dateDiv = document.createElement("div");
		dateDiv.className = "date";
		dateDiv.textContent = todo.dueDate;

		const btnContainerDiv = document.createElement("div");
		btnContainerDiv.className = "btn-container";

		const editButton = document.createElement("button");
		editButton.className = "edit";
		editButton.textContent = "Edit";
		editButton.addEventListener("click", (event) => {
			editTodoForm(todo, project);
		});

		const deleteButton = document.createElement("button");
		deleteButton.className = "delete";
		deleteButton.textContent = "Delete";
		deleteButton.addEventListener("click", (event) => {
			project.removeTodo(todo);
			if (
				newTodoBtn.dataset.value == "null" ||
				newTodoBtn.dataset.value == null
			) {
				display(null);
			} else {
				display(newTodoBtn.dataset.value);
			}
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
			if (_storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].projects.length === 0) {
				display(null);
			} else display(newTodoBtn.dataset.value);
		});
	}

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
		_storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].saveProjectsToLocalStorage(_storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].projects);
	}

	return { display };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DomManipulation);


/***/ }),

/***/ "./src/modules/eventListeners.js":
/*!***************************************!*\
  !*** ./src/modules/eventListeners.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage.js */ "./src/modules/storage.js");
/* harmony import */ var _todo_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./todo.js */ "./src/modules/todo.js");
/* harmony import */ var _project_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./project.js */ "./src/modules/project.js");
/* harmony import */ var _domManipulation_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./domManipulation.js */ "./src/modules/domManipulation.js");





const EventListeners = (() => {
	const eventListeners = {};

	eventListeners.attachTodoFormListeners = (newTodoBtn, overlay) => {
		newTodoBtn.addEventListener("click", () => {
			todoForm.style.display = "block";
			overlay.style.display = "block";
		});

		formCancelBtn.addEventListener("click", () => {
			todoForm.style.display = "none";
			overlay.style.display = "none";
		});

		todoForm.querySelector("form").addEventListener("submit", (event) => {
			event.preventDefault();

			const title = document.getElementById("todoTitle").value;
			const details = document.getElementById("todoDetails").value;
			const dueDate = document.getElementById("todoDueDate").value;

			const newTodo = new _todo_js__WEBPACK_IMPORTED_MODULE_1__["default"](title, details, dueDate, false);

			_storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].projects[newTodoBtn.dataset.value].addNewTodo(newTodo);
			_domManipulation_js__WEBPACK_IMPORTED_MODULE_3__["default"].display(newTodoBtn.dataset.value);
			todoForm.querySelector("form").reset();
			todoForm.style.display = "none";
			overlay.style.display = "none";
		});

		return eventListeners;
	};

	eventListeners.attachProjectFormListeners = (
		newProjectBtn,
		newTodoBtn,
		overlay
	) => {
		newProjectBtn.addEventListener("click", () => {
			addProjectForm.style.display = "block";
			overlay.style.display = "block";
		});

		closeProjectFormBtn.addEventListener("click", () => {
			addProjectForm.style.display = "none";
			overlay.style.display = "none";
		});

		projectForm.addEventListener("submit", (event) => {
			event.preventDefault();

			const title = document.getElementById("projectTitle").value;
			const description =
				document.getElementById("projectDescription").value;

			const newProject = new _project_js__WEBPACK_IMPORTED_MODULE_2__["default"](title, description, []);
			_storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].projects.push(newProject);
			_domManipulation_js__WEBPACK_IMPORTED_MODULE_3__["default"].display(_storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].projects.length - 1);

			newTodoBtn.dataset.value = _storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].projects.length - 1;

			projectForm.reset();
			addProjectForm.style.display = "none";
			overlay.style.display = "none";
		});

		return eventListeners;
	};

	eventListeners.attachHomeListener = (newTodoBtn) => {
		const homeProjectHeader = document.querySelector(".sidebar h2");
		homeProjectHeader.addEventListener("click", () => {
			newTodoBtn.dataset.value = null;
			_domManipulation_js__WEBPACK_IMPORTED_MODULE_3__["default"].display(null);
		});
	};

	eventListeners.attachEditFormSubmitListener = (
		todoForm,
		editTodoTitleInput,
		editTodoDetailsInput,
		editDueDateInput,
		project,
		todo,
		newTodoBtn,
		formCancelBtn
	) => {
		todoForm.querySelector("form").addEventListener("submit", (event) => {
			event.preventDefault();

			const updatedTodo = {
				title: editTodoTitleInput.value,
				details: editTodoDetailsInput.value,
				dueDate: editDueDateInput.value,
				completed: todo.completed,
			};
			project.updateTodo(todo, updatedTodo);
			_domManipulation_js__WEBPACK_IMPORTED_MODULE_3__["default"].display(newTodoBtn.dataset.value);

			todoForm.style.display = "none";
			overlay.style.display = "none";
		});
		formCancelBtn.addEventListener("click", () => {
			todoForm.style.display = "none";
			overlay.style.display = "none";
		});

		return eventListeners;
	};

	return eventListeners;
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EventListeners);


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
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project */ "./src/modules/project.js");
/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./todo */ "./src/modules/todo.js");


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
		const projectInstance = new _project__WEBPACK_IMPORTED_MODULE_0__["default"](
			projectData.title,
			projectData.description,
			[]
		);

		projectData.todos.forEach((todoData) => {
			const todoInstance = new _todo__WEBPACK_IMPORTED_MODULE_1__["default"](
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

	toJSON() {
		return {
			title: this.title,
			details: this.details,
			dueDate: this.dueDate,
			completed: this.completed,
		};
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
/* harmony import */ var _modules_domManipulation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/domManipulation */ "./src/modules/domManipulation.js");

_modules_domManipulation__WEBPACK_IMPORTED_MODULE_0__["default"].display(null);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2ZnQztBQUNOO0FBQzFCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4QkFBOEIsZ0RBQU87QUFDckM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw0QkFBNEIsNkNBQUk7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQsaUVBQWUsT0FBTyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUM5Q1I7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ3BCQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTndEO0FBQ3hELGdFQUFlIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9kb21NYW5pcHVsYXRpb24uanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9ldmVudExpc3RlbmVycy5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3Byb2plY3QuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9zdG9yYWdlLmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvdG9kby5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL3NjcmlwdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU3RvcmFnZSBmcm9tIFwiLi9zdG9yYWdlLmpzXCI7XG5pbXBvcnQgRXZlbnRMaXN0ZW5lcnMgZnJvbSBcIi4vZXZlbnRMaXN0ZW5lcnMuanNcIjtcblxuY29uc3QgRG9tTWFuaXB1bGF0aW9uID0gKCgpID0+IHtcblx0Y29uc3QgdG9kb0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8tbGlzdFwiKTtcblx0Y29uc3QgcHJvamVjdHNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3RzLWNvbnRhaW5lclwiKTtcblx0Y29uc3QgcHJvamVjdExpc3RET00gPSBwcm9qZWN0c0NvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwidWxcIik7XG5cblx0Y29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib3ZlcmxheVwiKTtcblxuXHRjb25zdCBuZXdUb2RvQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuZXctdG9kby1idG5cIik7XG5cdGNvbnN0IG5ld1Byb2plY3RCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5ldy1wcm9qZWN0LWJ0blwiKTtcblxuXHRjb25zdCB0b2RvRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG9kb0Zvcm1cIik7XG5cdGNvbnN0IGZvcm1DYW5jZWxCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZvcm1DYW5jZWxCdG5cIik7XG5cblx0ZnVuY3Rpb24gZWRpdFRvZG9Gb3JtKHRvZG8sIHByb2plY3QpIHtcblx0XHR0b2RvRm9ybS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuXHRcdG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcblxuXHRcdGNvbnN0IGVkaXRUb2RvVGl0bGVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG9kb1RpdGxlXCIpO1xuXHRcdGNvbnN0IGVkaXRUb2RvRGV0YWlsc0lucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b2RvRGV0YWlsc1wiKTtcblx0XHRjb25zdCBlZGl0VG9kb0R1ZURhdGVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG9kb0R1ZURhdGVcIik7XG5cblx0XHRlZGl0VG9kb1RpdGxlSW5wdXQudmFsdWUgPSB0b2RvLnRpdGxlO1xuXHRcdGVkaXRUb2RvRGV0YWlsc0lucHV0LnZhbHVlID0gdG9kby5kZXRhaWxzO1xuXHRcdGVkaXRUb2RvRHVlRGF0ZUlucHV0LnZhbHVlID0gdG9kby5kdWVEYXRlO1xuXG5cdFx0RXZlbnRMaXN0ZW5lcnMuYXR0YWNoRWRpdEZvcm1TdWJtaXRMaXN0ZW5lcihcblx0XHRcdHRvZG9Gb3JtLFxuXHRcdFx0ZWRpdFRvZG9UaXRsZUlucHV0LFxuXHRcdFx0ZWRpdFRvZG9EZXRhaWxzSW5wdXQsXG5cdFx0XHRlZGl0VG9kb0R1ZURhdGVJbnB1dCxcblx0XHRcdHByb2plY3QsXG5cdFx0XHR0b2RvLFxuXHRcdFx0bmV3VG9kb0J0bixcblx0XHRcdGZvcm1DYW5jZWxCdG5cblx0XHQpO1xuXHR9XG5cblx0RXZlbnRMaXN0ZW5lcnMuYXR0YWNoVG9kb0Zvcm1MaXN0ZW5lcnMobmV3VG9kb0J0biwgb3ZlcmxheSlcblx0XHQuYXR0YWNoUHJvamVjdEZvcm1MaXN0ZW5lcnMobmV3UHJvamVjdEJ0biwgbmV3VG9kb0J0biwgb3ZlcmxheSlcblx0XHQuYXR0YWNoSG9tZUxpc3RlbmVyKG5ld1RvZG9CdG4pO1xuXG5cdGZ1bmN0aW9uIGNyZWF0ZXRvZG9FbGVtZW50KHRvZG8sIHByb2plY3QpIHtcblx0XHRjb25zdCB0b2RvRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcblx0XHR0b2RvRWxlbWVudC5jbGFzc05hbWUgPSBcInRvZG9cIjtcblx0XHRpZiAodG9kby5jb21wbGV0ZWQpIHtcblx0XHRcdHRvZG9FbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJjb21wbGV0ZWRcIik7XG5cdFx0fVxuXG5cdFx0Y29uc3QgbGVmdERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0bGVmdERpdi5jbGFzc05hbWUgPSBcImxlZnRcIjtcblxuXHRcdGNvbnN0IGNoZWNrYm94SW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG5cdFx0Y2hlY2tib3hJbnB1dC50eXBlID0gXCJjaGVja2JveFwiO1xuXHRcdGNoZWNrYm94SW5wdXQuY2xhc3NOYW1lID0gXCJjaGVja2JveFwiO1xuXHRcdGNoZWNrYm94SW5wdXQuY2hlY2tlZCA9IHRvZG8uY29tcGxldGVkO1xuXHRcdGNoZWNrYm94SW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoKSA9PiB7XG5cdFx0XHR0b2RvLnRvZ2dsZUNvbXBsZXRlZCgpO1xuXHRcdFx0dG9kb0VsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZShcImNvbXBsZXRlZFwiLCB0b2RvLmNvbXBsZXRlZCk7XG5cdFx0XHRTdG9yYWdlLnNhdmVQcm9qZWN0c1RvTG9jYWxTdG9yYWdlKFN0b3JhZ2UucHJvamVjdHMpO1xuXHRcdH0pO1xuXG5cdFx0Y29uc3QgdG9kb05hbWVEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdHRvZG9OYW1lRGl2LmNsYXNzTmFtZSA9IFwidG9kby1uYW1lXCI7XG5cdFx0dG9kb05hbWVEaXYudGV4dENvbnRlbnQgPSB0b2RvLnRpdGxlO1xuXG5cdFx0bGVmdERpdi5hcHBlbmRDaGlsZChjaGVja2JveElucHV0KTtcblx0XHRsZWZ0RGl2LmFwcGVuZENoaWxkKHRvZG9OYW1lRGl2KTtcblxuXHRcdGNvbnN0IHJpZ2h0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRyaWdodERpdi5jbGFzc05hbWUgPSBcInJpZ2h0XCI7XG5cblx0XHRjb25zdCBkZXRhaWxzQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcblx0XHRkZXRhaWxzQnV0dG9uLmNsYXNzTmFtZSA9IFwiZGV0YWlsc1wiO1xuXHRcdGRldGFpbHNCdXR0b24udGV4dENvbnRlbnQgPSBcIkRldGFpbHNcIjtcblx0XHRkZXRhaWxzQnV0dG9uLmRhdGFzZXQuZGV0YWlscyA9IHRvZG8uZGV0YWlscztcblxuXHRcdGNvbnN0IGRhdGVEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdGRhdGVEaXYuY2xhc3NOYW1lID0gXCJkYXRlXCI7XG5cdFx0ZGF0ZURpdi50ZXh0Q29udGVudCA9IHRvZG8uZHVlRGF0ZTtcblxuXHRcdGNvbnN0IGJ0bkNvbnRhaW5lckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0YnRuQ29udGFpbmVyRGl2LmNsYXNzTmFtZSA9IFwiYnRuLWNvbnRhaW5lclwiO1xuXG5cdFx0Y29uc3QgZWRpdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cdFx0ZWRpdEJ1dHRvbi5jbGFzc05hbWUgPSBcImVkaXRcIjtcblx0XHRlZGl0QnV0dG9uLnRleHRDb250ZW50ID0gXCJFZGl0XCI7XG5cdFx0ZWRpdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG5cdFx0XHRlZGl0VG9kb0Zvcm0odG9kbywgcHJvamVjdCk7XG5cdFx0fSk7XG5cblx0XHRjb25zdCBkZWxldGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXHRcdGRlbGV0ZUJ1dHRvbi5jbGFzc05hbWUgPSBcImRlbGV0ZVwiO1xuXHRcdGRlbGV0ZUJ1dHRvbi50ZXh0Q29udGVudCA9IFwiRGVsZXRlXCI7XG5cdFx0ZGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcblx0XHRcdHByb2plY3QucmVtb3ZlVG9kbyh0b2RvKTtcblx0XHRcdGlmIChcblx0XHRcdFx0bmV3VG9kb0J0bi5kYXRhc2V0LnZhbHVlID09IFwibnVsbFwiIHx8XG5cdFx0XHRcdG5ld1RvZG9CdG4uZGF0YXNldC52YWx1ZSA9PSBudWxsXG5cdFx0XHQpIHtcblx0XHRcdFx0ZGlzcGxheShudWxsKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGRpc3BsYXkobmV3VG9kb0J0bi5kYXRhc2V0LnZhbHVlKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdGJ0bkNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZChlZGl0QnV0dG9uKTtcblx0XHRidG5Db250YWluZXJEaXYuYXBwZW5kQ2hpbGQoZGVsZXRlQnV0dG9uKTtcblxuXHRcdHJpZ2h0RGl2LmFwcGVuZENoaWxkKGRldGFpbHNCdXR0b24pO1xuXHRcdHJpZ2h0RGl2LmFwcGVuZENoaWxkKGRhdGVEaXYpO1xuXHRcdHJpZ2h0RGl2LmFwcGVuZENoaWxkKGJ0bkNvbnRhaW5lckRpdik7XG5cblx0XHR0b2RvRWxlbWVudC5hcHBlbmRDaGlsZChsZWZ0RGl2KTtcblx0XHR0b2RvRWxlbWVudC5hcHBlbmRDaGlsZChyaWdodERpdik7XG5cblx0XHR0b2RvTGlzdC5hcHBlbmRDaGlsZCh0b2RvRWxlbWVudCk7XG5cdH1cblxuXHRmdW5jdGlvbiBjcmVhdGVQcm9qZWN0RWxlbWVudChwcm9qZWN0LCBpbmRleCkge1xuXHRcdGNvbnN0IHByb2plY3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuXHRcdHByb2plY3RJdGVtLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LWxpc3QtZWxlbWVudFwiKTtcblxuXHRcdGNvbnN0IHByb2plY3ROYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRwcm9qZWN0TmFtZS50ZXh0Q29udGVudCA9IHByb2plY3QudGl0bGU7XG5cdFx0cHJvamVjdE5hbWUuY2xhc3NMaXN0LmFkZChcInByb2plY3QtbmFtZVwiKTtcblx0XHRwcm9qZWN0SXRlbS5hcHBlbmRDaGlsZChwcm9qZWN0TmFtZSk7XG5cblx0XHRjb25zdCBwcm9qZWN0RGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdHByb2plY3REZXNjcmlwdGlvbi5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC1kZXNjcmlwdGlvblwiKTtcblx0XHRwcm9qZWN0RGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBwcm9qZWN0LmRlc2NyaXB0aW9uO1xuXHRcdHByb2plY3RJdGVtLmFwcGVuZENoaWxkKHByb2plY3REZXNjcmlwdGlvbik7XG5cblx0XHRjb25zdCBkZWxldGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXHRcdGRlbGV0ZUJ1dHRvbi50ZXh0Q29udGVudCA9IFwiWFwiO1xuXHRcdGRlbGV0ZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiZGVsZXRlLXByb2plY3QtYnRuXCIpO1xuXHRcdHByb2plY3RJdGVtLmFwcGVuZENoaWxkKGRlbGV0ZUJ1dHRvbik7XG5cblx0XHRwcm9qZWN0TGlzdERPTS5hcHBlbmRDaGlsZChwcm9qZWN0SXRlbSk7XG5cblx0XHRwcm9qZWN0SXRlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdFx0ZGlzcGxheShpbmRleCk7XG5cdFx0XHRuZXdUb2RvQnRuLmRhdGFzZXQudmFsdWUgPSBpbmRleDtcblx0XHR9KTtcblx0XHRkZWxldGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuXHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRTdG9yYWdlLnByb2plY3RzLnNwbGljZShpbmRleCwgMSk7XG5cdFx0XHRpZiAoU3RvcmFnZS5wcm9qZWN0cy5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0ZGlzcGxheShudWxsKTtcblx0XHRcdH0gZWxzZSBkaXNwbGF5KG5ld1RvZG9CdG4uZGF0YXNldC52YWx1ZSk7XG5cdFx0fSk7XG5cdH1cblxuXHRmdW5jdGlvbiBkaXNwbGF5KHByb2plY3RJbmRleCkge1xuXHRcdHByb2plY3RMaXN0RE9NLmlubmVySFRNTCA9IFwiXCI7XG5cdFx0U3RvcmFnZS5wcm9qZWN0cy5mb3JFYWNoKChwcm9qZWN0LCBpbmRleCkgPT4ge1xuXHRcdFx0Y3JlYXRlUHJvamVjdEVsZW1lbnQocHJvamVjdCwgaW5kZXgpO1xuXHRcdH0pO1xuXHRcdHRvZG9MaXN0LmlubmVySFRNTCA9IFwiXCI7XG5cblx0XHRpZiAocHJvamVjdEluZGV4ID09PSBudWxsKSB7XG5cdFx0XHRTdG9yYWdlLnByb2plY3RzLmZvckVhY2goKHByb2plY3QpID0+IHtcblx0XHRcdFx0cHJvamVjdC50b2Rvcy5mb3JFYWNoKCh0b2RvKSA9PiB7XG5cdFx0XHRcdFx0Y3JlYXRldG9kb0VsZW1lbnQodG9kbywgcHJvamVjdCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0XHRuZXdUb2RvQnRuLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc3QgY3VycmVudFByb2plY3QgPSBTdG9yYWdlLnByb2plY3RzW3Byb2plY3RJbmRleF07XG5cdFx0XHRjdXJyZW50UHJvamVjdC50b2Rvcy5mb3JFYWNoKCh0b2RvKSA9PiB7XG5cdFx0XHRcdGNyZWF0ZXRvZG9FbGVtZW50KHRvZG8sIGN1cnJlbnRQcm9qZWN0KTtcblx0XHRcdH0pO1xuXHRcdFx0bmV3VG9kb0J0bi5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuXHRcdH1cblx0XHRTdG9yYWdlLnNhdmVQcm9qZWN0c1RvTG9jYWxTdG9yYWdlKFN0b3JhZ2UucHJvamVjdHMpO1xuXHR9XG5cblx0cmV0dXJuIHsgZGlzcGxheSB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgRG9tTWFuaXB1bGF0aW9uO1xuIiwiaW1wb3J0IFN0b3JhZ2UgZnJvbSBcIi4vc3RvcmFnZS5qc1wiO1xuaW1wb3J0IFRvZG8gZnJvbSBcIi4vdG9kby5qc1wiO1xuaW1wb3J0IFByb2plY3QgZnJvbSBcIi4vcHJvamVjdC5qc1wiO1xuaW1wb3J0IERvbU1hbmlwdWxhdGlvbiBmcm9tIFwiLi9kb21NYW5pcHVsYXRpb24uanNcIjtcblxuY29uc3QgRXZlbnRMaXN0ZW5lcnMgPSAoKCkgPT4ge1xuXHRjb25zdCBldmVudExpc3RlbmVycyA9IHt9O1xuXG5cdGV2ZW50TGlzdGVuZXJzLmF0dGFjaFRvZG9Gb3JtTGlzdGVuZXJzID0gKG5ld1RvZG9CdG4sIG92ZXJsYXkpID0+IHtcblx0XHRuZXdUb2RvQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0XHR0b2RvRm9ybS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuXHRcdFx0b3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuXHRcdH0pO1xuXG5cdFx0Zm9ybUNhbmNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdFx0dG9kb0Zvcm0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXHRcdFx0b3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cdFx0fSk7XG5cblx0XHR0b2RvRm9ybS5xdWVyeVNlbGVjdG9yKFwiZm9ybVwiKS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChldmVudCkgPT4ge1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0Y29uc3QgdGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvZG9UaXRsZVwiKS52YWx1ZTtcblx0XHRcdGNvbnN0IGRldGFpbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvZG9EZXRhaWxzXCIpLnZhbHVlO1xuXHRcdFx0Y29uc3QgZHVlRGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG9kb0R1ZURhdGVcIikudmFsdWU7XG5cblx0XHRcdGNvbnN0IG5ld1RvZG8gPSBuZXcgVG9kbyh0aXRsZSwgZGV0YWlscywgZHVlRGF0ZSwgZmFsc2UpO1xuXG5cdFx0XHRTdG9yYWdlLnByb2plY3RzW25ld1RvZG9CdG4uZGF0YXNldC52YWx1ZV0uYWRkTmV3VG9kbyhuZXdUb2RvKTtcblx0XHRcdERvbU1hbmlwdWxhdGlvbi5kaXNwbGF5KG5ld1RvZG9CdG4uZGF0YXNldC52YWx1ZSk7XG5cdFx0XHR0b2RvRm9ybS5xdWVyeVNlbGVjdG9yKFwiZm9ybVwiKS5yZXNldCgpO1xuXHRcdFx0dG9kb0Zvcm0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXHRcdFx0b3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gZXZlbnRMaXN0ZW5lcnM7XG5cdH07XG5cblx0ZXZlbnRMaXN0ZW5lcnMuYXR0YWNoUHJvamVjdEZvcm1MaXN0ZW5lcnMgPSAoXG5cdFx0bmV3UHJvamVjdEJ0bixcblx0XHRuZXdUb2RvQnRuLFxuXHRcdG92ZXJsYXlcblx0KSA9PiB7XG5cdFx0bmV3UHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdFx0YWRkUHJvamVjdEZvcm0uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcblx0XHRcdG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcblx0XHR9KTtcblxuXHRcdGNsb3NlUHJvamVjdEZvcm1CdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblx0XHRcdGFkZFByb2plY3RGb3JtLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblx0XHRcdG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXHRcdH0pO1xuXG5cdFx0cHJvamVjdEZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZlbnQpID0+IHtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0VGl0bGVcIikudmFsdWU7XG5cdFx0XHRjb25zdCBkZXNjcmlwdGlvbiA9XG5cdFx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdERlc2NyaXB0aW9uXCIpLnZhbHVlO1xuXG5cdFx0XHRjb25zdCBuZXdQcm9qZWN0ID0gbmV3IFByb2plY3QodGl0bGUsIGRlc2NyaXB0aW9uLCBbXSk7XG5cdFx0XHRTdG9yYWdlLnByb2plY3RzLnB1c2gobmV3UHJvamVjdCk7XG5cdFx0XHREb21NYW5pcHVsYXRpb24uZGlzcGxheShTdG9yYWdlLnByb2plY3RzLmxlbmd0aCAtIDEpO1xuXG5cdFx0XHRuZXdUb2RvQnRuLmRhdGFzZXQudmFsdWUgPSBTdG9yYWdlLnByb2plY3RzLmxlbmd0aCAtIDE7XG5cblx0XHRcdHByb2plY3RGb3JtLnJlc2V0KCk7XG5cdFx0XHRhZGRQcm9qZWN0Rm9ybS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cdFx0XHRvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblx0XHR9KTtcblxuXHRcdHJldHVybiBldmVudExpc3RlbmVycztcblx0fTtcblxuXHRldmVudExpc3RlbmVycy5hdHRhY2hIb21lTGlzdGVuZXIgPSAobmV3VG9kb0J0bikgPT4ge1xuXHRcdGNvbnN0IGhvbWVQcm9qZWN0SGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyIGgyXCIpO1xuXHRcdGhvbWVQcm9qZWN0SGVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0XHRuZXdUb2RvQnRuLmRhdGFzZXQudmFsdWUgPSBudWxsO1xuXHRcdFx0RG9tTWFuaXB1bGF0aW9uLmRpc3BsYXkobnVsbCk7XG5cdFx0fSk7XG5cdH07XG5cblx0ZXZlbnRMaXN0ZW5lcnMuYXR0YWNoRWRpdEZvcm1TdWJtaXRMaXN0ZW5lciA9IChcblx0XHR0b2RvRm9ybSxcblx0XHRlZGl0VG9kb1RpdGxlSW5wdXQsXG5cdFx0ZWRpdFRvZG9EZXRhaWxzSW5wdXQsXG5cdFx0ZWRpdER1ZURhdGVJbnB1dCxcblx0XHRwcm9qZWN0LFxuXHRcdHRvZG8sXG5cdFx0bmV3VG9kb0J0bixcblx0XHRmb3JtQ2FuY2VsQnRuXG5cdCkgPT4ge1xuXHRcdHRvZG9Gb3JtLnF1ZXJ5U2VsZWN0b3IoXCJmb3JtXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGV2ZW50KSA9PiB7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHRjb25zdCB1cGRhdGVkVG9kbyA9IHtcblx0XHRcdFx0dGl0bGU6IGVkaXRUb2RvVGl0bGVJbnB1dC52YWx1ZSxcblx0XHRcdFx0ZGV0YWlsczogZWRpdFRvZG9EZXRhaWxzSW5wdXQudmFsdWUsXG5cdFx0XHRcdGR1ZURhdGU6IGVkaXREdWVEYXRlSW5wdXQudmFsdWUsXG5cdFx0XHRcdGNvbXBsZXRlZDogdG9kby5jb21wbGV0ZWQsXG5cdFx0XHR9O1xuXHRcdFx0cHJvamVjdC51cGRhdGVUb2RvKHRvZG8sIHVwZGF0ZWRUb2RvKTtcblx0XHRcdERvbU1hbmlwdWxhdGlvbi5kaXNwbGF5KG5ld1RvZG9CdG4uZGF0YXNldC52YWx1ZSk7XG5cblx0XHRcdHRvZG9Gb3JtLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblx0XHRcdG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXHRcdH0pO1xuXHRcdGZvcm1DYW5jZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblx0XHRcdHRvZG9Gb3JtLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblx0XHRcdG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIGV2ZW50TGlzdGVuZXJzO1xuXHR9O1xuXG5cdHJldHVybiBldmVudExpc3RlbmVycztcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IEV2ZW50TGlzdGVuZXJzO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvamVjdCB7XG5cdGNvbnN0cnVjdG9yKHRpdGxlLCBkZXNjcmlwdGlvbiwgdG9kb3MpIHtcblx0XHR0aGlzLnRpdGxlID0gdGl0bGU7XG5cdFx0dGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuXHRcdHRoaXMudG9kb3MgPSB0b2Rvcztcblx0fVxuXHRhZGROZXdUb2RvKHRvZG8pIHtcblx0XHR0aGlzLnRvZG9zLnB1c2godG9kbyk7XG5cdH1cblx0cmVtb3ZlVG9kbyh0b2RvKSB7XG5cdFx0dGhpcy50b2Rvcy5zcGxpY2UodGhpcy50b2Rvcy5pbmRleE9mKHRvZG8pLCAxKTtcblx0fVxuXHR1cGRhdGVUb2RvKHRvZG8sIG5ld1RvZG8pIHtcblx0XHR0aGlzLnRvZG9zLnNwbGljZSh0aGlzLnRvZG9zLmluZGV4T2YodG9kbyksIDEsIG5ld1RvZG8pO1xuXHR9XG59XG4iLCJpbXBvcnQgUHJvamVjdCBmcm9tIFwiLi9wcm9qZWN0XCI7XG5pbXBvcnQgVG9kbyBmcm9tIFwiLi90b2RvXCI7XG5jb25zdCBTdG9yYWdlID0gKCgpID0+IHtcblx0bGV0IHByb2plY3RzID0gW107XG5cblx0Y29uc3Qgc2F2ZVByb2plY3RzVG9Mb2NhbFN0b3JhZ2UgPSAocHJvamVjdERpc3BsYXllZCkgPT4ge1xuXHRcdHByb2plY3RzID0gcHJvamVjdERpc3BsYXllZDtcblx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInByb2plY3RzXCIsIEpTT04uc3RyaW5naWZ5KHByb2plY3RzKSk7XG5cdH07XG5cblx0Y29uc3QgbG9hZFByb2plY3RzRnJvbUxvY2FsU3RvcmFnZSA9ICgpID0+IHtcblx0XHRjb25zdCBzYXZlZFByb2plY3RzID1cblx0XHRcdEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJwcm9qZWN0c1wiKSkgfHwgW107XG5cdFx0cHJvamVjdHMgPSBzYXZlZFByb2plY3RzLm1hcCgocHJvamVjdERhdGEpID0+XG5cdFx0XHRyZWNyZWF0ZVByb2plY3RJbnN0YW5jZShwcm9qZWN0RGF0YSlcblx0XHQpO1xuXHR9O1xuXG5cdGNvbnN0IHJlY3JlYXRlUHJvamVjdEluc3RhbmNlID0gKHByb2plY3REYXRhKSA9PiB7XG5cdFx0Y29uc3QgcHJvamVjdEluc3RhbmNlID0gbmV3IFByb2plY3QoXG5cdFx0XHRwcm9qZWN0RGF0YS50aXRsZSxcblx0XHRcdHByb2plY3REYXRhLmRlc2NyaXB0aW9uLFxuXHRcdFx0W11cblx0XHQpO1xuXG5cdFx0cHJvamVjdERhdGEudG9kb3MuZm9yRWFjaCgodG9kb0RhdGEpID0+IHtcblx0XHRcdGNvbnN0IHRvZG9JbnN0YW5jZSA9IG5ldyBUb2RvKFxuXHRcdFx0XHR0b2RvRGF0YS50aXRsZSxcblx0XHRcdFx0dG9kb0RhdGEuZGV0YWlscyxcblx0XHRcdFx0dG9kb0RhdGEuZHVlRGF0ZSxcblx0XHRcdFx0dG9kb0RhdGEuY29tcGxldGVkXG5cdFx0XHQpO1xuXHRcdFx0cHJvamVjdEluc3RhbmNlLmFkZE5ld1RvZG8odG9kb0luc3RhbmNlKTtcblx0XHR9KTtcblxuXHRcdHJldHVybiBwcm9qZWN0SW5zdGFuY2U7XG5cdH07XG5cblx0bG9hZFByb2plY3RzRnJvbUxvY2FsU3RvcmFnZSgpO1xuXHRyZXR1cm4ge1xuXHRcdHByb2plY3RzLFxuXHRcdHNhdmVQcm9qZWN0c1RvTG9jYWxTdG9yYWdlLFxuXHRcdGxvYWRQcm9qZWN0c0Zyb21Mb2NhbFN0b3JhZ2UsXG5cdH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBTdG9yYWdlO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9kbyB7XG5cdGNvbnN0cnVjdG9yKHRpdGxlLCBkZXRhaWxzLCBkdWVEYXRlLCBjb21wbGV0ZWQpIHtcblx0XHR0aGlzLnRpdGxlID0gdGl0bGU7XG5cdFx0dGhpcy5kZXRhaWxzID0gZGV0YWlscztcblx0XHR0aGlzLmR1ZURhdGUgPSBkdWVEYXRlO1xuXHRcdHRoaXMuY29tcGxldGVkID0gY29tcGxldGVkO1xuXHR9XG5cblx0dG9nZ2xlQ29tcGxldGVkKCkge1xuXHRcdHRoaXMuY29tcGxldGVkID0gIXRoaXMuY29tcGxldGVkO1xuXHR9XG5cblx0dG9KU09OKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHR0aXRsZTogdGhpcy50aXRsZSxcblx0XHRcdGRldGFpbHM6IHRoaXMuZGV0YWlscyxcblx0XHRcdGR1ZURhdGU6IHRoaXMuZHVlRGF0ZSxcblx0XHRcdGNvbXBsZXRlZDogdGhpcy5jb21wbGV0ZWQsXG5cdFx0fTtcblx0fVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgRG9tTWFuaXB1bGF0aW9uIGZyb20gXCIuL21vZHVsZXMvZG9tTWFuaXB1bGF0aW9uXCI7XG5Eb21NYW5pcHVsYXRpb24uZGlzcGxheShudWxsKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
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

	const editTodoForm = document.getElementById("editTodoForm");
	const closeEditFormBtn = document.getElementById("closeEditFormBtn");

	function openEditTodoForm(todo, project) {
		editTodoForm.style.display = "block";
		overlay.style.display = "block";

		const editTodoTitleInput = document.getElementById("editTodoTitle");
		const editTodoDetailsInput = document.getElementById("editTodoDetails");
		const editDueDateInput = document.getElementById("editDueDate");

		editTodoTitleInput.value = todo.title;
		editTodoDetailsInput.value = todo.details;
		editDueDateInput.value = todo.dueDate;

		_eventListeners_js__WEBPACK_IMPORTED_MODULE_1__["default"].attachEditFormSubmitListener(
			editTodoForm,
			editTodoTitleInput,
			editTodoDetailsInput,
			editDueDateInput,
			project,
			todo,
			newTodoBtn,
			closeEditFormBtn
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
			openEditTodoForm(todo, project);
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
			const details = document.getElementById("todoDetails").value;
			const dueDate = document.getElementById("dueDate").value;

			const newTodo = new _todo_js__WEBPACK_IMPORTED_MODULE_1__["default"](title, details, dueDate, false);

			_storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].projects[newTodoBtn.dataset.value].addNewTodo(newTodo);
			_domManipulation_js__WEBPACK_IMPORTED_MODULE_3__["default"].display(newTodoBtn.dataset.value);

			todoForm.reset();
			addTodoForm.style.display = "none";
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
		editTodoForm,
		editTodoTitleInput,
		editTodoDetailsInput,
		editDueDateInput,
		project,
		todo,
		newTodoBtn,
		closeEditFormBtn
	) => {
		editTodoForm
			.querySelector("form")
			.addEventListener("submit", (event) => {
				event.preventDefault();

				const updatedTodo = {
					title: editTodoTitleInput.value,
					details: editTodoDetailsInput.value,
					dueDate: editDueDateInput.value,
					completed: todo.completed,
				};
				project.updateTodo(todo, updatedTodo);
				_domManipulation_js__WEBPACK_IMPORTED_MODULE_3__["default"].display(newTodoBtn.dataset.value);

				editTodoForm.style.display = "none";
				overlay.style.display = "none";
			});
		closeEditFormBtn.addEventListener("click", () => {
			editTodoForm.style.display = "none";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZmdDO0FBQ047QUFDMUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhCQUE4QixnREFBTztBQUNyQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDRCQUE0Qiw2Q0FBSTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCxpRUFBZSxPQUFPLEVBQUM7Ozs7Ozs7Ozs7Ozs7OztBQzlDUjtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDcEJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOd0Q7QUFDeEQsZ0VBQWUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2RvbU1hbmlwdWxhdGlvbi5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2V2ZW50TGlzdGVuZXJzLmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvcHJvamVjdC5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy90b2RvLmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29kaW4tdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29kaW4tdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvc2NyaXB0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTdG9yYWdlIGZyb20gXCIuL3N0b3JhZ2UuanNcIjtcbmltcG9ydCBFdmVudExpc3RlbmVycyBmcm9tIFwiLi9ldmVudExpc3RlbmVycy5qc1wiO1xuXG5jb25zdCBEb21NYW5pcHVsYXRpb24gPSAoKCkgPT4ge1xuXHRjb25zdCB0b2RvTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1saXN0XCIpO1xuXHRjb25zdCBwcm9qZWN0c0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdHMtY29udGFpbmVyXCIpO1xuXHRjb25zdCBwcm9qZWN0TGlzdERPTSA9IHByb2plY3RzQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCJ1bFwiKTtcblxuXHRjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvdmVybGF5XCIpO1xuXG5cdGNvbnN0IG5ld1RvZG9CdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5ldy10b2RvLWJ0blwiKTtcblx0Y29uc3QgbmV3UHJvamVjdEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmV3LXByb2plY3QtYnRuXCIpO1xuXG5cdGNvbnN0IGVkaXRUb2RvRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZWRpdFRvZG9Gb3JtXCIpO1xuXHRjb25zdCBjbG9zZUVkaXRGb3JtQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjbG9zZUVkaXRGb3JtQnRuXCIpO1xuXG5cdGZ1bmN0aW9uIG9wZW5FZGl0VG9kb0Zvcm0odG9kbywgcHJvamVjdCkge1xuXHRcdGVkaXRUb2RvRm9ybS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuXHRcdG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcblxuXHRcdGNvbnN0IGVkaXRUb2RvVGl0bGVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZWRpdFRvZG9UaXRsZVwiKTtcblx0XHRjb25zdCBlZGl0VG9kb0RldGFpbHNJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZWRpdFRvZG9EZXRhaWxzXCIpO1xuXHRcdGNvbnN0IGVkaXREdWVEYXRlSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVkaXREdWVEYXRlXCIpO1xuXG5cdFx0ZWRpdFRvZG9UaXRsZUlucHV0LnZhbHVlID0gdG9kby50aXRsZTtcblx0XHRlZGl0VG9kb0RldGFpbHNJbnB1dC52YWx1ZSA9IHRvZG8uZGV0YWlscztcblx0XHRlZGl0RHVlRGF0ZUlucHV0LnZhbHVlID0gdG9kby5kdWVEYXRlO1xuXG5cdFx0RXZlbnRMaXN0ZW5lcnMuYXR0YWNoRWRpdEZvcm1TdWJtaXRMaXN0ZW5lcihcblx0XHRcdGVkaXRUb2RvRm9ybSxcblx0XHRcdGVkaXRUb2RvVGl0bGVJbnB1dCxcblx0XHRcdGVkaXRUb2RvRGV0YWlsc0lucHV0LFxuXHRcdFx0ZWRpdER1ZURhdGVJbnB1dCxcblx0XHRcdHByb2plY3QsXG5cdFx0XHR0b2RvLFxuXHRcdFx0bmV3VG9kb0J0bixcblx0XHRcdGNsb3NlRWRpdEZvcm1CdG5cblx0XHQpO1xuXHR9XG5cblx0RXZlbnRMaXN0ZW5lcnMuYXR0YWNoVG9kb0Zvcm1MaXN0ZW5lcnMobmV3VG9kb0J0biwgb3ZlcmxheSlcblx0XHQuYXR0YWNoUHJvamVjdEZvcm1MaXN0ZW5lcnMobmV3UHJvamVjdEJ0biwgbmV3VG9kb0J0biwgb3ZlcmxheSlcblx0XHQuYXR0YWNoSG9tZUxpc3RlbmVyKG5ld1RvZG9CdG4pO1xuXG5cdGZ1bmN0aW9uIGNyZWF0ZXRvZG9FbGVtZW50KHRvZG8sIHByb2plY3QpIHtcblx0XHRjb25zdCB0b2RvRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcblx0XHR0b2RvRWxlbWVudC5jbGFzc05hbWUgPSBcInRvZG9cIjtcblx0XHRpZiAodG9kby5jb21wbGV0ZWQpIHtcblx0XHRcdHRvZG9FbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJjb21wbGV0ZWRcIik7XG5cdFx0fVxuXG5cdFx0Y29uc3QgbGVmdERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0bGVmdERpdi5jbGFzc05hbWUgPSBcImxlZnRcIjtcblxuXHRcdGNvbnN0IGNoZWNrYm94SW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG5cdFx0Y2hlY2tib3hJbnB1dC50eXBlID0gXCJjaGVja2JveFwiO1xuXHRcdGNoZWNrYm94SW5wdXQuY2xhc3NOYW1lID0gXCJjaGVja2JveFwiO1xuXHRcdGNoZWNrYm94SW5wdXQuY2hlY2tlZCA9IHRvZG8uY29tcGxldGVkO1xuXHRcdGNoZWNrYm94SW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoKSA9PiB7XG5cdFx0XHR0b2RvLnRvZ2dsZUNvbXBsZXRlZCgpO1xuXHRcdFx0dG9kb0VsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZShcImNvbXBsZXRlZFwiLCB0b2RvLmNvbXBsZXRlZCk7XG5cdFx0XHRTdG9yYWdlLnNhdmVQcm9qZWN0c1RvTG9jYWxTdG9yYWdlKFN0b3JhZ2UucHJvamVjdHMpO1xuXHRcdH0pO1xuXG5cdFx0Y29uc3QgdG9kb05hbWVEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdHRvZG9OYW1lRGl2LmNsYXNzTmFtZSA9IFwidG9kby1uYW1lXCI7XG5cdFx0dG9kb05hbWVEaXYudGV4dENvbnRlbnQgPSB0b2RvLnRpdGxlO1xuXG5cdFx0bGVmdERpdi5hcHBlbmRDaGlsZChjaGVja2JveElucHV0KTtcblx0XHRsZWZ0RGl2LmFwcGVuZENoaWxkKHRvZG9OYW1lRGl2KTtcblxuXHRcdGNvbnN0IHJpZ2h0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRyaWdodERpdi5jbGFzc05hbWUgPSBcInJpZ2h0XCI7XG5cblx0XHRjb25zdCBkZXRhaWxzQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcblx0XHRkZXRhaWxzQnV0dG9uLmNsYXNzTmFtZSA9IFwiZGV0YWlsc1wiO1xuXHRcdGRldGFpbHNCdXR0b24udGV4dENvbnRlbnQgPSBcIkRldGFpbHNcIjtcblx0XHRkZXRhaWxzQnV0dG9uLmRhdGFzZXQuZGV0YWlscyA9IHRvZG8uZGV0YWlscztcblxuXHRcdGNvbnN0IGRhdGVEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdGRhdGVEaXYuY2xhc3NOYW1lID0gXCJkYXRlXCI7XG5cdFx0ZGF0ZURpdi50ZXh0Q29udGVudCA9IHRvZG8uZHVlRGF0ZTtcblxuXHRcdGNvbnN0IGJ0bkNvbnRhaW5lckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0YnRuQ29udGFpbmVyRGl2LmNsYXNzTmFtZSA9IFwiYnRuLWNvbnRhaW5lclwiO1xuXG5cdFx0Y29uc3QgZWRpdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cdFx0ZWRpdEJ1dHRvbi5jbGFzc05hbWUgPSBcImVkaXRcIjtcblx0XHRlZGl0QnV0dG9uLnRleHRDb250ZW50ID0gXCJFZGl0XCI7XG5cdFx0ZWRpdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG5cdFx0XHRvcGVuRWRpdFRvZG9Gb3JtKHRvZG8sIHByb2plY3QpO1xuXHRcdH0pO1xuXG5cdFx0Y29uc3QgZGVsZXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcblx0XHRkZWxldGVCdXR0b24uY2xhc3NOYW1lID0gXCJkZWxldGVcIjtcblx0XHRkZWxldGVCdXR0b24udGV4dENvbnRlbnQgPSBcIkRlbGV0ZVwiO1xuXHRcdGRlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG5cdFx0XHRwcm9qZWN0LnJlbW92ZVRvZG8odG9kbyk7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdG5ld1RvZG9CdG4uZGF0YXNldC52YWx1ZSA9PSBcIm51bGxcIiB8fFxuXHRcdFx0XHRuZXdUb2RvQnRuLmRhdGFzZXQudmFsdWUgPT0gbnVsbFxuXHRcdFx0KSB7XG5cdFx0XHRcdGRpc3BsYXkobnVsbCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRkaXNwbGF5KG5ld1RvZG9CdG4uZGF0YXNldC52YWx1ZSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRidG5Db250YWluZXJEaXYuYXBwZW5kQ2hpbGQoZWRpdEJ1dHRvbik7XG5cdFx0YnRuQ29udGFpbmVyRGl2LmFwcGVuZENoaWxkKGRlbGV0ZUJ1dHRvbik7XG5cblx0XHRyaWdodERpdi5hcHBlbmRDaGlsZChkZXRhaWxzQnV0dG9uKTtcblx0XHRyaWdodERpdi5hcHBlbmRDaGlsZChkYXRlRGl2KTtcblx0XHRyaWdodERpdi5hcHBlbmRDaGlsZChidG5Db250YWluZXJEaXYpO1xuXG5cdFx0dG9kb0VsZW1lbnQuYXBwZW5kQ2hpbGQobGVmdERpdik7XG5cdFx0dG9kb0VsZW1lbnQuYXBwZW5kQ2hpbGQocmlnaHREaXYpO1xuXG5cdFx0dG9kb0xpc3QuYXBwZW5kQ2hpbGQodG9kb0VsZW1lbnQpO1xuXHR9XG5cblx0ZnVuY3Rpb24gY3JlYXRlUHJvamVjdEVsZW1lbnQocHJvamVjdCwgaW5kZXgpIHtcblx0XHRjb25zdCBwcm9qZWN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcblx0XHRwcm9qZWN0SXRlbS5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC1saXN0LWVsZW1lbnRcIik7XG5cblx0XHRjb25zdCBwcm9qZWN0TmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0cHJvamVjdE5hbWUudGV4dENvbnRlbnQgPSBwcm9qZWN0LnRpdGxlO1xuXHRcdHByb2plY3ROYW1lLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LW5hbWVcIik7XG5cdFx0cHJvamVjdEl0ZW0uYXBwZW5kQ2hpbGQocHJvamVjdE5hbWUpO1xuXG5cdFx0Y29uc3QgcHJvamVjdERlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRwcm9qZWN0RGVzY3JpcHRpb24uY2xhc3NMaXN0LmFkZChcInByb2plY3QtZGVzY3JpcHRpb25cIik7XG5cdFx0cHJvamVjdERlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gcHJvamVjdC5kZXNjcmlwdGlvbjtcblx0XHRwcm9qZWN0SXRlbS5hcHBlbmRDaGlsZChwcm9qZWN0RGVzY3JpcHRpb24pO1xuXG5cdFx0Y29uc3QgZGVsZXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcblx0XHRkZWxldGVCdXR0b24udGV4dENvbnRlbnQgPSBcIlhcIjtcblx0XHRkZWxldGVCdXR0b24uY2xhc3NMaXN0LmFkZChcImRlbGV0ZS1wcm9qZWN0LWJ0blwiKTtcblx0XHRwcm9qZWN0SXRlbS5hcHBlbmRDaGlsZChkZWxldGVCdXR0b24pO1xuXG5cdFx0cHJvamVjdExpc3RET00uYXBwZW5kQ2hpbGQocHJvamVjdEl0ZW0pO1xuXG5cdFx0cHJvamVjdEl0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblx0XHRcdGRpc3BsYXkoaW5kZXgpO1xuXHRcdFx0bmV3VG9kb0J0bi5kYXRhc2V0LnZhbHVlID0gaW5kZXg7XG5cdFx0fSk7XG5cdFx0ZGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0U3RvcmFnZS5wcm9qZWN0cy5zcGxpY2UoaW5kZXgsIDEpO1xuXHRcdFx0aWYgKFN0b3JhZ2UucHJvamVjdHMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdGRpc3BsYXkobnVsbCk7XG5cdFx0XHR9IGVsc2UgZGlzcGxheShuZXdUb2RvQnRuLmRhdGFzZXQudmFsdWUpO1xuXHRcdH0pO1xuXHR9XG5cblx0ZnVuY3Rpb24gZGlzcGxheShwcm9qZWN0SW5kZXgpIHtcblx0XHRwcm9qZWN0TGlzdERPTS5pbm5lckhUTUwgPSBcIlwiO1xuXHRcdFN0b3JhZ2UucHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCwgaW5kZXgpID0+IHtcblx0XHRcdGNyZWF0ZVByb2plY3RFbGVtZW50KHByb2plY3QsIGluZGV4KTtcblx0XHR9KTtcblx0XHR0b2RvTGlzdC5pbm5lckhUTUwgPSBcIlwiO1xuXG5cdFx0aWYgKHByb2plY3RJbmRleCA9PT0gbnVsbCkge1xuXHRcdFx0U3RvcmFnZS5wcm9qZWN0cy5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG5cdFx0XHRcdHByb2plY3QudG9kb3MuZm9yRWFjaCgodG9kbykgPT4ge1xuXHRcdFx0XHRcdGNyZWF0ZXRvZG9FbGVtZW50KHRvZG8sIHByb2plY3QpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdFx0bmV3VG9kb0J0bi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnN0IGN1cnJlbnRQcm9qZWN0ID0gU3RvcmFnZS5wcm9qZWN0c1twcm9qZWN0SW5kZXhdO1xuXHRcdFx0Y3VycmVudFByb2plY3QudG9kb3MuZm9yRWFjaCgodG9kbykgPT4ge1xuXHRcdFx0XHRjcmVhdGV0b2RvRWxlbWVudCh0b2RvLCBjdXJyZW50UHJvamVjdCk7XG5cdFx0XHR9KTtcblx0XHRcdG5ld1RvZG9CdG4uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcblx0XHR9XG5cdFx0U3RvcmFnZS5zYXZlUHJvamVjdHNUb0xvY2FsU3RvcmFnZShTdG9yYWdlLnByb2plY3RzKTtcblx0fVxuXG5cdHJldHVybiB7IGRpc3BsYXkgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IERvbU1hbmlwdWxhdGlvbjtcbiIsImltcG9ydCBTdG9yYWdlIGZyb20gXCIuL3N0b3JhZ2UuanNcIjtcbmltcG9ydCBUb2RvIGZyb20gXCIuL3RvZG8uanNcIjtcbmltcG9ydCBQcm9qZWN0IGZyb20gXCIuL3Byb2plY3QuanNcIjtcbmltcG9ydCBEb21NYW5pcHVsYXRpb24gZnJvbSBcIi4vZG9tTWFuaXB1bGF0aW9uLmpzXCI7XG5cbmNvbnN0IEV2ZW50TGlzdGVuZXJzID0gKCgpID0+IHtcblx0Y29uc3QgZXZlbnRMaXN0ZW5lcnMgPSB7fTtcblxuXHRldmVudExpc3RlbmVycy5hdHRhY2hUb2RvRm9ybUxpc3RlbmVycyA9IChuZXdUb2RvQnRuLCBvdmVybGF5KSA9PiB7XG5cdFx0bmV3VG9kb0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdFx0YWRkVG9kb0Zvcm0uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcblx0XHRcdG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcblx0XHR9KTtcblxuXHRcdGNsb3NlRm9ybUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdFx0YWRkVG9kb0Zvcm0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXHRcdFx0b3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cdFx0fSk7XG5cblx0XHR0b2RvRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChldmVudCkgPT4ge1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0Y29uc3QgdGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvZG9UaXRsZVwiKS52YWx1ZTtcblx0XHRcdGNvbnN0IGRldGFpbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvZG9EZXRhaWxzXCIpLnZhbHVlO1xuXHRcdFx0Y29uc3QgZHVlRGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZHVlRGF0ZVwiKS52YWx1ZTtcblxuXHRcdFx0Y29uc3QgbmV3VG9kbyA9IG5ldyBUb2RvKHRpdGxlLCBkZXRhaWxzLCBkdWVEYXRlLCBmYWxzZSk7XG5cblx0XHRcdFN0b3JhZ2UucHJvamVjdHNbbmV3VG9kb0J0bi5kYXRhc2V0LnZhbHVlXS5hZGROZXdUb2RvKG5ld1RvZG8pO1xuXHRcdFx0RG9tTWFuaXB1bGF0aW9uLmRpc3BsYXkobmV3VG9kb0J0bi5kYXRhc2V0LnZhbHVlKTtcblxuXHRcdFx0dG9kb0Zvcm0ucmVzZXQoKTtcblx0XHRcdGFkZFRvZG9Gb3JtLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblx0XHRcdG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIGV2ZW50TGlzdGVuZXJzO1xuXHR9O1xuXG5cdGV2ZW50TGlzdGVuZXJzLmF0dGFjaFByb2plY3RGb3JtTGlzdGVuZXJzID0gKFxuXHRcdG5ld1Byb2plY3RCdG4sXG5cdFx0bmV3VG9kb0J0bixcblx0XHRvdmVybGF5XG5cdCkgPT4ge1xuXHRcdG5ld1Byb2plY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblx0XHRcdGFkZFByb2plY3RGb3JtLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG5cdFx0XHRvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG5cdFx0fSk7XG5cblx0XHRjbG9zZVByb2plY3RGb3JtQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0XHRhZGRQcm9qZWN0Rm9ybS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cdFx0XHRvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblx0XHR9KTtcblxuXHRcdHByb2plY3RGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGV2ZW50KSA9PiB7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHRjb25zdCB0aXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdFRpdGxlXCIpLnZhbHVlO1xuXHRcdFx0Y29uc3QgZGVzY3JpcHRpb24gPVxuXHRcdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3REZXNjcmlwdGlvblwiKS52YWx1ZTtcblxuXHRcdFx0Y29uc3QgbmV3UHJvamVjdCA9IG5ldyBQcm9qZWN0KHRpdGxlLCBkZXNjcmlwdGlvbiwgW10pO1xuXHRcdFx0U3RvcmFnZS5wcm9qZWN0cy5wdXNoKG5ld1Byb2plY3QpO1xuXHRcdFx0RG9tTWFuaXB1bGF0aW9uLmRpc3BsYXkoU3RvcmFnZS5wcm9qZWN0cy5sZW5ndGggLSAxKTtcblxuXHRcdFx0bmV3VG9kb0J0bi5kYXRhc2V0LnZhbHVlID0gU3RvcmFnZS5wcm9qZWN0cy5sZW5ndGggLSAxO1xuXG5cdFx0XHRwcm9qZWN0Rm9ybS5yZXNldCgpO1xuXHRcdFx0YWRkUHJvamVjdEZvcm0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXHRcdFx0b3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gZXZlbnRMaXN0ZW5lcnM7XG5cdH07XG5cblx0ZXZlbnRMaXN0ZW5lcnMuYXR0YWNoSG9tZUxpc3RlbmVyID0gKG5ld1RvZG9CdG4pID0+IHtcblx0XHRjb25zdCBob21lUHJvamVjdEhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhciBoMlwiKTtcblx0XHRob21lUHJvamVjdEhlYWRlci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdFx0bmV3VG9kb0J0bi5kYXRhc2V0LnZhbHVlID0gbnVsbDtcblx0XHRcdERvbU1hbmlwdWxhdGlvbi5kaXNwbGF5KG51bGwpO1xuXHRcdH0pO1xuXHR9O1xuXG5cdGV2ZW50TGlzdGVuZXJzLmF0dGFjaEVkaXRGb3JtU3VibWl0TGlzdGVuZXIgPSAoXG5cdFx0ZWRpdFRvZG9Gb3JtLFxuXHRcdGVkaXRUb2RvVGl0bGVJbnB1dCxcblx0XHRlZGl0VG9kb0RldGFpbHNJbnB1dCxcblx0XHRlZGl0RHVlRGF0ZUlucHV0LFxuXHRcdHByb2plY3QsXG5cdFx0dG9kbyxcblx0XHRuZXdUb2RvQnRuLFxuXHRcdGNsb3NlRWRpdEZvcm1CdG5cblx0KSA9PiB7XG5cdFx0ZWRpdFRvZG9Gb3JtXG5cdFx0XHQucXVlcnlTZWxlY3RvcihcImZvcm1cIilcblx0XHRcdC5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChldmVudCkgPT4ge1xuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHRcdGNvbnN0IHVwZGF0ZWRUb2RvID0ge1xuXHRcdFx0XHRcdHRpdGxlOiBlZGl0VG9kb1RpdGxlSW5wdXQudmFsdWUsXG5cdFx0XHRcdFx0ZGV0YWlsczogZWRpdFRvZG9EZXRhaWxzSW5wdXQudmFsdWUsXG5cdFx0XHRcdFx0ZHVlRGF0ZTogZWRpdER1ZURhdGVJbnB1dC52YWx1ZSxcblx0XHRcdFx0XHRjb21wbGV0ZWQ6IHRvZG8uY29tcGxldGVkLFxuXHRcdFx0XHR9O1xuXHRcdFx0XHRwcm9qZWN0LnVwZGF0ZVRvZG8odG9kbywgdXBkYXRlZFRvZG8pO1xuXHRcdFx0XHREb21NYW5pcHVsYXRpb24uZGlzcGxheShuZXdUb2RvQnRuLmRhdGFzZXQudmFsdWUpO1xuXG5cdFx0XHRcdGVkaXRUb2RvRm9ybS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cdFx0XHRcdG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXHRcdFx0fSk7XG5cdFx0Y2xvc2VFZGl0Rm9ybUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdFx0ZWRpdFRvZG9Gb3JtLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblx0XHRcdG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIGV2ZW50TGlzdGVuZXJzO1xuXHR9O1xuXG5cdHJldHVybiBldmVudExpc3RlbmVycztcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IEV2ZW50TGlzdGVuZXJzO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvamVjdCB7XG5cdGNvbnN0cnVjdG9yKHRpdGxlLCBkZXNjcmlwdGlvbiwgdG9kb3MpIHtcblx0XHR0aGlzLnRpdGxlID0gdGl0bGU7XG5cdFx0dGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuXHRcdHRoaXMudG9kb3MgPSB0b2Rvcztcblx0fVxuXHRhZGROZXdUb2RvKHRvZG8pIHtcblx0XHR0aGlzLnRvZG9zLnB1c2godG9kbyk7XG5cdH1cblx0cmVtb3ZlVG9kbyh0b2RvKSB7XG5cdFx0dGhpcy50b2Rvcy5zcGxpY2UodGhpcy50b2Rvcy5pbmRleE9mKHRvZG8pLCAxKTtcblx0fVxuXHR1cGRhdGVUb2RvKHRvZG8sIG5ld1RvZG8pIHtcblx0XHR0aGlzLnRvZG9zLnNwbGljZSh0aGlzLnRvZG9zLmluZGV4T2YodG9kbyksIDEsIG5ld1RvZG8pO1xuXHR9XG59XG4iLCJpbXBvcnQgUHJvamVjdCBmcm9tIFwiLi9wcm9qZWN0XCI7XG5pbXBvcnQgVG9kbyBmcm9tIFwiLi90b2RvXCI7XG5jb25zdCBTdG9yYWdlID0gKCgpID0+IHtcblx0bGV0IHByb2plY3RzID0gW107XG5cblx0Y29uc3Qgc2F2ZVByb2plY3RzVG9Mb2NhbFN0b3JhZ2UgPSAocHJvamVjdERpc3BsYXllZCkgPT4ge1xuXHRcdHByb2plY3RzID0gcHJvamVjdERpc3BsYXllZDtcblx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInByb2plY3RzXCIsIEpTT04uc3RyaW5naWZ5KHByb2plY3RzKSk7XG5cdH07XG5cblx0Y29uc3QgbG9hZFByb2plY3RzRnJvbUxvY2FsU3RvcmFnZSA9ICgpID0+IHtcblx0XHRjb25zdCBzYXZlZFByb2plY3RzID1cblx0XHRcdEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJwcm9qZWN0c1wiKSkgfHwgW107XG5cdFx0cHJvamVjdHMgPSBzYXZlZFByb2plY3RzLm1hcCgocHJvamVjdERhdGEpID0+XG5cdFx0XHRyZWNyZWF0ZVByb2plY3RJbnN0YW5jZShwcm9qZWN0RGF0YSlcblx0XHQpO1xuXHR9O1xuXG5cdGNvbnN0IHJlY3JlYXRlUHJvamVjdEluc3RhbmNlID0gKHByb2plY3REYXRhKSA9PiB7XG5cdFx0Y29uc3QgcHJvamVjdEluc3RhbmNlID0gbmV3IFByb2plY3QoXG5cdFx0XHRwcm9qZWN0RGF0YS50aXRsZSxcblx0XHRcdHByb2plY3REYXRhLmRlc2NyaXB0aW9uLFxuXHRcdFx0W11cblx0XHQpO1xuXG5cdFx0cHJvamVjdERhdGEudG9kb3MuZm9yRWFjaCgodG9kb0RhdGEpID0+IHtcblx0XHRcdGNvbnN0IHRvZG9JbnN0YW5jZSA9IG5ldyBUb2RvKFxuXHRcdFx0XHR0b2RvRGF0YS50aXRsZSxcblx0XHRcdFx0dG9kb0RhdGEuZGV0YWlscyxcblx0XHRcdFx0dG9kb0RhdGEuZHVlRGF0ZSxcblx0XHRcdFx0dG9kb0RhdGEuY29tcGxldGVkXG5cdFx0XHQpO1xuXHRcdFx0cHJvamVjdEluc3RhbmNlLmFkZE5ld1RvZG8odG9kb0luc3RhbmNlKTtcblx0XHR9KTtcblxuXHRcdHJldHVybiBwcm9qZWN0SW5zdGFuY2U7XG5cdH07XG5cblx0bG9hZFByb2plY3RzRnJvbUxvY2FsU3RvcmFnZSgpO1xuXHRyZXR1cm4ge1xuXHRcdHByb2plY3RzLFxuXHRcdHNhdmVQcm9qZWN0c1RvTG9jYWxTdG9yYWdlLFxuXHRcdGxvYWRQcm9qZWN0c0Zyb21Mb2NhbFN0b3JhZ2UsXG5cdH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBTdG9yYWdlO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9kbyB7XG5cdGNvbnN0cnVjdG9yKHRpdGxlLCBkZXRhaWxzLCBkdWVEYXRlLCBjb21wbGV0ZWQpIHtcblx0XHR0aGlzLnRpdGxlID0gdGl0bGU7XG5cdFx0dGhpcy5kZXRhaWxzID0gZGV0YWlscztcblx0XHR0aGlzLmR1ZURhdGUgPSBkdWVEYXRlO1xuXHRcdHRoaXMuY29tcGxldGVkID0gY29tcGxldGVkO1xuXHR9XG5cblx0dG9nZ2xlQ29tcGxldGVkKCkge1xuXHRcdHRoaXMuY29tcGxldGVkID0gIXRoaXMuY29tcGxldGVkO1xuXHR9XG5cblx0dG9KU09OKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHR0aXRsZTogdGhpcy50aXRsZSxcblx0XHRcdGRldGFpbHM6IHRoaXMuZGV0YWlscyxcblx0XHRcdGR1ZURhdGU6IHRoaXMuZHVlRGF0ZSxcblx0XHRcdGNvbXBsZXRlZDogdGhpcy5jb21wbGV0ZWQsXG5cdFx0fTtcblx0fVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgRG9tTWFuaXB1bGF0aW9uIGZyb20gXCIuL21vZHVsZXMvZG9tTWFuaXB1bGF0aW9uXCI7XG5Eb21NYW5pcHVsYXRpb24uZGlzcGxheShudWxsKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
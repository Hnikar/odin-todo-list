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
		Detailsteners.attachEditFormSubmitListener(
			editTodoForm,
			editTodoTitleInput,
			editTodoDetailsInput,
			editDueDateInput,
			project,
			todo,
			newTodoBtn
		);
	}

	_eventListeners_js__WEBPACK_IMPORTED_MODULE_1__["default"].attachTodoFormListeners(newTodoBtn, overlay)
		.attachProjectFormListeners(newProjectBtn, newTodoBtn, overlay)
		.attachEditFormListeners(editTodoForm, closeEditFormBtn)
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
			console.log(newTodoBtn.dataset.value);
			if (newTodoBtn.dataset.value == "null") {
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
			console.log(_storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].projects.length - 1);
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

	eventListeners.attachEditFormListeners = (
		editTodoForm,
		closeEditFormBtn
	) => {
		closeEditFormBtn.addEventListener("click", () => {
			editTodoForm.style.display = "none";
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
		newTodoBtn
	) => {
		editTodoForm
			.querySelector("form")
			.addEventListener("submit", (event) => {
				event.preventDefault();

				const updatedTodo = {
					title: editTodoTitleInput.value,
					Details: editTodoDetailsInput.value,
					dueDate: editDueDateInput.value,
				};

				project.updateTodo(todo, updatedTodo);
				_domManipulation_js__WEBPACK_IMPORTED_MODULE_3__["default"].display(newTodoBtn.dataset.value);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7Ozs7Ozs7OztBQ2hJZjtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNmZ0M7QUFDTjtBQUMxQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOEJBQThCLGdEQUFPO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNEJBQTRCLDZDQUFJO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVELGlFQUFlLE9BQU8sRUFBQzs7Ozs7Ozs7Ozs7Ozs7O0FDOUNSO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUNwQkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ053RDtBQUN4RCxnRUFBZSIsInNvdXJjZXMiOlsid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvZG9tTWFuaXB1bGF0aW9uLmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvZXZlbnRMaXN0ZW5lcnMuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9wcm9qZWN0LmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3RvZG8uanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9zY3JpcHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFN0b3JhZ2UgZnJvbSBcIi4vc3RvcmFnZS5qc1wiO1xuaW1wb3J0IEV2ZW50TGlzdGVuZXJzIGZyb20gXCIuL2V2ZW50TGlzdGVuZXJzLmpzXCI7XG5cbmNvbnN0IERvbU1hbmlwdWxhdGlvbiA9ICgoKSA9PiB7XG5cdGNvbnN0IHRvZG9MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLWxpc3RcIik7XG5cdGNvbnN0IHByb2plY3RzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0cy1jb250YWluZXJcIik7XG5cdGNvbnN0IHByb2plY3RMaXN0RE9NID0gcHJvamVjdHNDb250YWluZXIucXVlcnlTZWxlY3RvcihcInVsXCIpO1xuXG5cdGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm92ZXJsYXlcIik7XG5cblx0Y29uc3QgbmV3VG9kb0J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmV3LXRvZG8tYnRuXCIpO1xuXHRjb25zdCBuZXdQcm9qZWN0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuZXctcHJvamVjdC1idG5cIik7XG5cblx0Y29uc3QgZWRpdFRvZG9Gb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlZGl0VG9kb0Zvcm1cIik7XG5cdGNvbnN0IGNsb3NlRWRpdEZvcm1CdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNsb3NlRWRpdEZvcm1CdG5cIik7XG5cblx0ZnVuY3Rpb24gb3BlbkVkaXRUb2RvRm9ybSh0b2RvLCBwcm9qZWN0KSB7XG5cdFx0ZWRpdFRvZG9Gb3JtLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG5cdFx0b3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuXG5cdFx0Y29uc3QgZWRpdFRvZG9UaXRsZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlZGl0VG9kb1RpdGxlXCIpO1xuXHRcdGNvbnN0IGVkaXRUb2RvRGV0YWlsc0lucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlZGl0VG9kb0RldGFpbHNcIik7XG5cdFx0Y29uc3QgZWRpdER1ZURhdGVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZWRpdER1ZURhdGVcIik7XG5cblx0XHRlZGl0VG9kb1RpdGxlSW5wdXQudmFsdWUgPSB0b2RvLnRpdGxlO1xuXHRcdGVkaXRUb2RvRGV0YWlsc0lucHV0LnZhbHVlID0gdG9kby5kZXRhaWxzO1xuXHRcdGVkaXREdWVEYXRlSW5wdXQudmFsdWUgPSB0b2RvLmR1ZURhdGU7XG5cdFx0RGV0YWlsc3RlbmVycy5hdHRhY2hFZGl0Rm9ybVN1Ym1pdExpc3RlbmVyKFxuXHRcdFx0ZWRpdFRvZG9Gb3JtLFxuXHRcdFx0ZWRpdFRvZG9UaXRsZUlucHV0LFxuXHRcdFx0ZWRpdFRvZG9EZXRhaWxzSW5wdXQsXG5cdFx0XHRlZGl0RHVlRGF0ZUlucHV0LFxuXHRcdFx0cHJvamVjdCxcblx0XHRcdHRvZG8sXG5cdFx0XHRuZXdUb2RvQnRuXG5cdFx0KTtcblx0fVxuXG5cdEV2ZW50TGlzdGVuZXJzLmF0dGFjaFRvZG9Gb3JtTGlzdGVuZXJzKG5ld1RvZG9CdG4sIG92ZXJsYXkpXG5cdFx0LmF0dGFjaFByb2plY3RGb3JtTGlzdGVuZXJzKG5ld1Byb2plY3RCdG4sIG5ld1RvZG9CdG4sIG92ZXJsYXkpXG5cdFx0LmF0dGFjaEVkaXRGb3JtTGlzdGVuZXJzKGVkaXRUb2RvRm9ybSwgY2xvc2VFZGl0Rm9ybUJ0bilcblx0XHQuYXR0YWNoSG9tZUxpc3RlbmVyKG5ld1RvZG9CdG4pO1xuXG5cdGZ1bmN0aW9uIGNyZWF0ZXRvZG9FbGVtZW50KHRvZG8sIHByb2plY3QpIHtcblx0XHRjb25zdCB0b2RvRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcblx0XHR0b2RvRWxlbWVudC5jbGFzc05hbWUgPSBcInRvZG9cIjtcblx0XHRpZiAodG9kby5jb21wbGV0ZWQpIHtcblx0XHRcdHRvZG9FbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJjb21wbGV0ZWRcIik7XG5cdFx0fVxuXG5cdFx0Y29uc3QgbGVmdERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0bGVmdERpdi5jbGFzc05hbWUgPSBcImxlZnRcIjtcblxuXHRcdGNvbnN0IGNoZWNrYm94SW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG5cdFx0Y2hlY2tib3hJbnB1dC50eXBlID0gXCJjaGVja2JveFwiO1xuXHRcdGNoZWNrYm94SW5wdXQuY2xhc3NOYW1lID0gXCJjaGVja2JveFwiO1xuXHRcdGNoZWNrYm94SW5wdXQuY2hlY2tlZCA9IHRvZG8uY29tcGxldGVkO1xuXHRcdGNoZWNrYm94SW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoKSA9PiB7XG5cdFx0XHR0b2RvLnRvZ2dsZUNvbXBsZXRlZCgpO1xuXHRcdFx0dG9kb0VsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZShcImNvbXBsZXRlZFwiLCB0b2RvLmNvbXBsZXRlZCk7XG5cdFx0XHRTdG9yYWdlLnNhdmVQcm9qZWN0c1RvTG9jYWxTdG9yYWdlKFN0b3JhZ2UucHJvamVjdHMpO1xuXHRcdH0pO1xuXG5cdFx0Y29uc3QgdG9kb05hbWVEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdHRvZG9OYW1lRGl2LmNsYXNzTmFtZSA9IFwidG9kby1uYW1lXCI7XG5cdFx0dG9kb05hbWVEaXYudGV4dENvbnRlbnQgPSB0b2RvLnRpdGxlO1xuXG5cdFx0bGVmdERpdi5hcHBlbmRDaGlsZChjaGVja2JveElucHV0KTtcblx0XHRsZWZ0RGl2LmFwcGVuZENoaWxkKHRvZG9OYW1lRGl2KTtcblxuXHRcdGNvbnN0IHJpZ2h0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRyaWdodERpdi5jbGFzc05hbWUgPSBcInJpZ2h0XCI7XG5cblx0XHRjb25zdCBkZXRhaWxzQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcblx0XHRkZXRhaWxzQnV0dG9uLmNsYXNzTmFtZSA9IFwiZGV0YWlsc1wiO1xuXHRcdGRldGFpbHNCdXR0b24udGV4dENvbnRlbnQgPSBcIkRldGFpbHNcIjtcblx0XHRkZXRhaWxzQnV0dG9uLmRhdGFzZXQuZGV0YWlscyA9IHRvZG8uZGV0YWlscztcblxuXHRcdGNvbnN0IGRhdGVEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdGRhdGVEaXYuY2xhc3NOYW1lID0gXCJkYXRlXCI7XG5cdFx0ZGF0ZURpdi50ZXh0Q29udGVudCA9IHRvZG8uZHVlRGF0ZTtcblxuXHRcdGNvbnN0IGJ0bkNvbnRhaW5lckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0YnRuQ29udGFpbmVyRGl2LmNsYXNzTmFtZSA9IFwiYnRuLWNvbnRhaW5lclwiO1xuXG5cdFx0Y29uc3QgZWRpdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cdFx0ZWRpdEJ1dHRvbi5jbGFzc05hbWUgPSBcImVkaXRcIjtcblx0XHRlZGl0QnV0dG9uLnRleHRDb250ZW50ID0gXCJFZGl0XCI7XG5cdFx0ZWRpdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG5cdFx0XHRvcGVuRWRpdFRvZG9Gb3JtKHRvZG8sIHByb2plY3QpO1xuXHRcdH0pO1xuXG5cdFx0Y29uc3QgZGVsZXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcblx0XHRkZWxldGVCdXR0b24uY2xhc3NOYW1lID0gXCJkZWxldGVcIjtcblx0XHRkZWxldGVCdXR0b24udGV4dENvbnRlbnQgPSBcIkRlbGV0ZVwiO1xuXHRcdGRlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG5cdFx0XHRwcm9qZWN0LnJlbW92ZVRvZG8odG9kbyk7XG5cdFx0XHRjb25zb2xlLmxvZyhuZXdUb2RvQnRuLmRhdGFzZXQudmFsdWUpO1xuXHRcdFx0aWYgKG5ld1RvZG9CdG4uZGF0YXNldC52YWx1ZSA9PSBcIm51bGxcIikge1xuXHRcdFx0XHRkaXNwbGF5KG51bGwpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZGlzcGxheShuZXdUb2RvQnRuLmRhdGFzZXQudmFsdWUpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0YnRuQ29udGFpbmVyRGl2LmFwcGVuZENoaWxkKGVkaXRCdXR0b24pO1xuXHRcdGJ0bkNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZChkZWxldGVCdXR0b24pO1xuXG5cdFx0cmlnaHREaXYuYXBwZW5kQ2hpbGQoZGV0YWlsc0J1dHRvbik7XG5cdFx0cmlnaHREaXYuYXBwZW5kQ2hpbGQoZGF0ZURpdik7XG5cdFx0cmlnaHREaXYuYXBwZW5kQ2hpbGQoYnRuQ29udGFpbmVyRGl2KTtcblxuXHRcdHRvZG9FbGVtZW50LmFwcGVuZENoaWxkKGxlZnREaXYpO1xuXHRcdHRvZG9FbGVtZW50LmFwcGVuZENoaWxkKHJpZ2h0RGl2KTtcblxuXHRcdHRvZG9MaXN0LmFwcGVuZENoaWxkKHRvZG9FbGVtZW50KTtcblx0fVxuXG5cdGZ1bmN0aW9uIGNyZWF0ZVByb2plY3RFbGVtZW50KHByb2plY3QsIGluZGV4KSB7XG5cdFx0Y29uc3QgcHJvamVjdEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG5cdFx0cHJvamVjdEl0ZW0uY2xhc3NMaXN0LmFkZChcInByb2plY3QtbGlzdC1lbGVtZW50XCIpO1xuXG5cdFx0Y29uc3QgcHJvamVjdE5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdHByb2plY3ROYW1lLnRleHRDb250ZW50ID0gcHJvamVjdC50aXRsZTtcblx0XHRwcm9qZWN0TmFtZS5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC1uYW1lXCIpO1xuXHRcdHByb2plY3RJdGVtLmFwcGVuZENoaWxkKHByb2plY3ROYW1lKTtcblxuXHRcdGNvbnN0IHByb2plY3REZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0cHJvamVjdERlc2NyaXB0aW9uLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LWRlc2NyaXB0aW9uXCIpO1xuXHRcdHByb2plY3REZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IHByb2plY3QuZGVzY3JpcHRpb247XG5cdFx0cHJvamVjdEl0ZW0uYXBwZW5kQ2hpbGQocHJvamVjdERlc2NyaXB0aW9uKTtcblxuXHRcdGNvbnN0IGRlbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cdFx0ZGVsZXRlQnV0dG9uLnRleHRDb250ZW50ID0gXCJYXCI7XG5cdFx0ZGVsZXRlQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJkZWxldGUtcHJvamVjdC1idG5cIik7XG5cdFx0cHJvamVjdEl0ZW0uYXBwZW5kQ2hpbGQoZGVsZXRlQnV0dG9uKTtcblxuXHRcdHByb2plY3RMaXN0RE9NLmFwcGVuZENoaWxkKHByb2plY3RJdGVtKTtcblxuXHRcdHByb2plY3RJdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0XHRkaXNwbGF5KGluZGV4KTtcblx0XHRcdG5ld1RvZG9CdG4uZGF0YXNldC52YWx1ZSA9IGluZGV4O1xuXHRcdH0pO1xuXHRcdGRlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdFN0b3JhZ2UucHJvamVjdHMuc3BsaWNlKGluZGV4LCAxKTtcblx0XHRcdGNvbnNvbGUubG9nKFN0b3JhZ2UucHJvamVjdHMubGVuZ3RoIC0gMSk7XG5cdFx0XHRpZiAoU3RvcmFnZS5wcm9qZWN0cy5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0ZGlzcGxheShudWxsKTtcblx0XHRcdH0gZWxzZSBkaXNwbGF5KG5ld1RvZG9CdG4uZGF0YXNldC52YWx1ZSk7XG5cdFx0fSk7XG5cdH1cblxuXHRmdW5jdGlvbiBkaXNwbGF5KHByb2plY3RJbmRleCkge1xuXHRcdHByb2plY3RMaXN0RE9NLmlubmVySFRNTCA9IFwiXCI7XG5cdFx0U3RvcmFnZS5wcm9qZWN0cy5mb3JFYWNoKChwcm9qZWN0LCBpbmRleCkgPT4ge1xuXHRcdFx0Y3JlYXRlUHJvamVjdEVsZW1lbnQocHJvamVjdCwgaW5kZXgpO1xuXHRcdH0pO1xuXHRcdHRvZG9MaXN0LmlubmVySFRNTCA9IFwiXCI7XG5cblx0XHRpZiAocHJvamVjdEluZGV4ID09PSBudWxsKSB7XG5cdFx0XHRTdG9yYWdlLnByb2plY3RzLmZvckVhY2goKHByb2plY3QpID0+IHtcblx0XHRcdFx0cHJvamVjdC50b2Rvcy5mb3JFYWNoKCh0b2RvKSA9PiB7XG5cdFx0XHRcdFx0Y3JlYXRldG9kb0VsZW1lbnQodG9kbywgcHJvamVjdCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0XHRuZXdUb2RvQnRuLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc3QgY3VycmVudFByb2plY3QgPSBTdG9yYWdlLnByb2plY3RzW3Byb2plY3RJbmRleF07XG5cdFx0XHRjdXJyZW50UHJvamVjdC50b2Rvcy5mb3JFYWNoKCh0b2RvKSA9PiB7XG5cdFx0XHRcdGNyZWF0ZXRvZG9FbGVtZW50KHRvZG8sIGN1cnJlbnRQcm9qZWN0KTtcblx0XHRcdH0pO1xuXHRcdFx0bmV3VG9kb0J0bi5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuXHRcdH1cblx0XHRTdG9yYWdlLnNhdmVQcm9qZWN0c1RvTG9jYWxTdG9yYWdlKFN0b3JhZ2UucHJvamVjdHMpO1xuXHR9XG5cblx0cmV0dXJuIHsgZGlzcGxheSB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgRG9tTWFuaXB1bGF0aW9uO1xuIiwiaW1wb3J0IFN0b3JhZ2UgZnJvbSBcIi4vc3RvcmFnZS5qc1wiO1xuaW1wb3J0IFRvZG8gZnJvbSBcIi4vdG9kby5qc1wiO1xuaW1wb3J0IFByb2plY3QgZnJvbSBcIi4vcHJvamVjdC5qc1wiO1xuaW1wb3J0IERvbU1hbmlwdWxhdGlvbiBmcm9tIFwiLi9kb21NYW5pcHVsYXRpb24uanNcIjtcblxuY29uc3QgRXZlbnRMaXN0ZW5lcnMgPSAoKCkgPT4ge1xuXHRjb25zdCBldmVudExpc3RlbmVycyA9IHt9O1xuXG5cdGV2ZW50TGlzdGVuZXJzLmF0dGFjaFRvZG9Gb3JtTGlzdGVuZXJzID0gKG5ld1RvZG9CdG4sIG92ZXJsYXkpID0+IHtcblx0XHRuZXdUb2RvQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0XHRhZGRUb2RvRm9ybS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuXHRcdFx0b3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuXHRcdH0pO1xuXG5cdFx0Y2xvc2VGb3JtQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0XHRhZGRUb2RvRm9ybS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cdFx0XHRvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblx0XHR9KTtcblxuXHRcdHRvZG9Gb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGV2ZW50KSA9PiB7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHRjb25zdCB0aXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG9kb1RpdGxlXCIpLnZhbHVlO1xuXHRcdFx0Y29uc3QgZGV0YWlscyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG9kb0RldGFpbHNcIikudmFsdWU7XG5cdFx0XHRjb25zdCBkdWVEYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkdWVEYXRlXCIpLnZhbHVlO1xuXG5cdFx0XHRjb25zdCBuZXdUb2RvID0gbmV3IFRvZG8odGl0bGUsIGRldGFpbHMsIGR1ZURhdGUsIGZhbHNlKTtcblxuXHRcdFx0U3RvcmFnZS5wcm9qZWN0c1tuZXdUb2RvQnRuLmRhdGFzZXQudmFsdWVdLmFkZE5ld1RvZG8obmV3VG9kbyk7XG5cdFx0XHREb21NYW5pcHVsYXRpb24uZGlzcGxheShuZXdUb2RvQnRuLmRhdGFzZXQudmFsdWUpO1xuXG5cdFx0XHR0b2RvRm9ybS5yZXNldCgpO1xuXHRcdFx0YWRkVG9kb0Zvcm0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXHRcdFx0b3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gZXZlbnRMaXN0ZW5lcnM7XG5cdH07XG5cblx0ZXZlbnRMaXN0ZW5lcnMuYXR0YWNoUHJvamVjdEZvcm1MaXN0ZW5lcnMgPSAoXG5cdFx0bmV3UHJvamVjdEJ0bixcblx0XHRuZXdUb2RvQnRuLFxuXHRcdG92ZXJsYXlcblx0KSA9PiB7XG5cdFx0bmV3UHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdFx0YWRkUHJvamVjdEZvcm0uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcblx0XHRcdG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcblx0XHR9KTtcblxuXHRcdGNsb3NlUHJvamVjdEZvcm1CdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblx0XHRcdGFkZFByb2plY3RGb3JtLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblx0XHRcdG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXHRcdH0pO1xuXG5cdFx0cHJvamVjdEZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZlbnQpID0+IHtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0VGl0bGVcIikudmFsdWU7XG5cdFx0XHRjb25zdCBkZXNjcmlwdGlvbiA9XG5cdFx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdERlc2NyaXB0aW9uXCIpLnZhbHVlO1xuXG5cdFx0XHRjb25zdCBuZXdQcm9qZWN0ID0gbmV3IFByb2plY3QodGl0bGUsIGRlc2NyaXB0aW9uLCBbXSk7XG5cdFx0XHRTdG9yYWdlLnByb2plY3RzLnB1c2gobmV3UHJvamVjdCk7XG5cdFx0XHREb21NYW5pcHVsYXRpb24uZGlzcGxheShTdG9yYWdlLnByb2plY3RzLmxlbmd0aCAtIDEpO1xuXG5cdFx0XHRuZXdUb2RvQnRuLmRhdGFzZXQudmFsdWUgPSBTdG9yYWdlLnByb2plY3RzLmxlbmd0aCAtIDE7XG5cblx0XHRcdHByb2plY3RGb3JtLnJlc2V0KCk7XG5cdFx0XHRhZGRQcm9qZWN0Rm9ybS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cdFx0XHRvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblx0XHR9KTtcblxuXHRcdHJldHVybiBldmVudExpc3RlbmVycztcblx0fTtcblxuXHRldmVudExpc3RlbmVycy5hdHRhY2hFZGl0Rm9ybUxpc3RlbmVycyA9IChcblx0XHRlZGl0VG9kb0Zvcm0sXG5cdFx0Y2xvc2VFZGl0Rm9ybUJ0blxuXHQpID0+IHtcblx0XHRjbG9zZUVkaXRGb3JtQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0XHRlZGl0VG9kb0Zvcm0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXHRcdFx0b3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gZXZlbnRMaXN0ZW5lcnM7XG5cdH07XG5cblx0ZXZlbnRMaXN0ZW5lcnMuYXR0YWNoSG9tZUxpc3RlbmVyID0gKG5ld1RvZG9CdG4pID0+IHtcblx0XHRjb25zdCBob21lUHJvamVjdEhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhciBoMlwiKTtcblx0XHRob21lUHJvamVjdEhlYWRlci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdFx0bmV3VG9kb0J0bi5kYXRhc2V0LnZhbHVlID0gbnVsbDtcblx0XHRcdERvbU1hbmlwdWxhdGlvbi5kaXNwbGF5KG51bGwpO1xuXHRcdH0pO1xuXHR9O1xuXG5cdGV2ZW50TGlzdGVuZXJzLmF0dGFjaEVkaXRGb3JtU3VibWl0TGlzdGVuZXIgPSAoXG5cdFx0ZWRpdFRvZG9Gb3JtLFxuXHRcdGVkaXRUb2RvVGl0bGVJbnB1dCxcblx0XHRlZGl0VG9kb0RldGFpbHNJbnB1dCxcblx0XHRlZGl0RHVlRGF0ZUlucHV0LFxuXHRcdHByb2plY3QsXG5cdFx0dG9kbyxcblx0XHRuZXdUb2RvQnRuXG5cdCkgPT4ge1xuXHRcdGVkaXRUb2RvRm9ybVxuXHRcdFx0LnF1ZXJ5U2VsZWN0b3IoXCJmb3JtXCIpXG5cdFx0XHQuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZlbnQpID0+IHtcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0XHRjb25zdCB1cGRhdGVkVG9kbyA9IHtcblx0XHRcdFx0XHR0aXRsZTogZWRpdFRvZG9UaXRsZUlucHV0LnZhbHVlLFxuXHRcdFx0XHRcdERldGFpbHM6IGVkaXRUb2RvRGV0YWlsc0lucHV0LnZhbHVlLFxuXHRcdFx0XHRcdGR1ZURhdGU6IGVkaXREdWVEYXRlSW5wdXQudmFsdWUsXG5cdFx0XHRcdH07XG5cblx0XHRcdFx0cHJvamVjdC51cGRhdGVUb2RvKHRvZG8sIHVwZGF0ZWRUb2RvKTtcblx0XHRcdFx0RG9tTWFuaXB1bGF0aW9uLmRpc3BsYXkobmV3VG9kb0J0bi5kYXRhc2V0LnZhbHVlKTtcblxuXHRcdFx0XHRlZGl0VG9kb0Zvcm0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXHRcdFx0XHRvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblx0XHRcdH0pO1xuXG5cdFx0cmV0dXJuIGV2ZW50TGlzdGVuZXJzO1xuXHR9O1xuXG5cdHJldHVybiBldmVudExpc3RlbmVycztcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IEV2ZW50TGlzdGVuZXJzO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvamVjdCB7XG5cdGNvbnN0cnVjdG9yKHRpdGxlLCBkZXNjcmlwdGlvbiwgdG9kb3MpIHtcblx0XHR0aGlzLnRpdGxlID0gdGl0bGU7XG5cdFx0dGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuXHRcdHRoaXMudG9kb3MgPSB0b2Rvcztcblx0fVxuXHRhZGROZXdUb2RvKHRvZG8pIHtcblx0XHR0aGlzLnRvZG9zLnB1c2godG9kbyk7XG5cdH1cblx0cmVtb3ZlVG9kbyh0b2RvKSB7XG5cdFx0dGhpcy50b2Rvcy5zcGxpY2UodGhpcy50b2Rvcy5pbmRleE9mKHRvZG8pLCAxKTtcblx0fVxuXHR1cGRhdGVUb2RvKHRvZG8sIG5ld1RvZG8pIHtcblx0XHR0aGlzLnRvZG9zLnNwbGljZSh0aGlzLnRvZG9zLmluZGV4T2YodG9kbyksIDEsIG5ld1RvZG8pO1xuXHR9XG59XG4iLCJpbXBvcnQgUHJvamVjdCBmcm9tIFwiLi9wcm9qZWN0XCI7XG5pbXBvcnQgVG9kbyBmcm9tIFwiLi90b2RvXCI7XG5jb25zdCBTdG9yYWdlID0gKCgpID0+IHtcblx0bGV0IHByb2plY3RzID0gW107XG5cblx0Y29uc3Qgc2F2ZVByb2plY3RzVG9Mb2NhbFN0b3JhZ2UgPSAocHJvamVjdERpc3BsYXllZCkgPT4ge1xuXHRcdHByb2plY3RzID0gcHJvamVjdERpc3BsYXllZDtcblx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInByb2plY3RzXCIsIEpTT04uc3RyaW5naWZ5KHByb2plY3RzKSk7XG5cdH07XG5cblx0Y29uc3QgbG9hZFByb2plY3RzRnJvbUxvY2FsU3RvcmFnZSA9ICgpID0+IHtcblx0XHRjb25zdCBzYXZlZFByb2plY3RzID1cblx0XHRcdEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJwcm9qZWN0c1wiKSkgfHwgW107XG5cdFx0cHJvamVjdHMgPSBzYXZlZFByb2plY3RzLm1hcCgocHJvamVjdERhdGEpID0+XG5cdFx0XHRyZWNyZWF0ZVByb2plY3RJbnN0YW5jZShwcm9qZWN0RGF0YSlcblx0XHQpO1xuXHR9O1xuXG5cdGNvbnN0IHJlY3JlYXRlUHJvamVjdEluc3RhbmNlID0gKHByb2plY3REYXRhKSA9PiB7XG5cdFx0Y29uc3QgcHJvamVjdEluc3RhbmNlID0gbmV3IFByb2plY3QoXG5cdFx0XHRwcm9qZWN0RGF0YS50aXRsZSxcblx0XHRcdHByb2plY3REYXRhLmRlc2NyaXB0aW9uLFxuXHRcdFx0W11cblx0XHQpO1xuXG5cdFx0cHJvamVjdERhdGEudG9kb3MuZm9yRWFjaCgodG9kb0RhdGEpID0+IHtcblx0XHRcdGNvbnN0IHRvZG9JbnN0YW5jZSA9IG5ldyBUb2RvKFxuXHRcdFx0XHR0b2RvRGF0YS50aXRsZSxcblx0XHRcdFx0dG9kb0RhdGEuZGV0YWlscyxcblx0XHRcdFx0dG9kb0RhdGEuZHVlRGF0ZSxcblx0XHRcdFx0dG9kb0RhdGEuY29tcGxldGVkXG5cdFx0XHQpO1xuXHRcdFx0cHJvamVjdEluc3RhbmNlLmFkZE5ld1RvZG8odG9kb0luc3RhbmNlKTtcblx0XHR9KTtcblxuXHRcdHJldHVybiBwcm9qZWN0SW5zdGFuY2U7XG5cdH07XG5cblx0bG9hZFByb2plY3RzRnJvbUxvY2FsU3RvcmFnZSgpO1xuXHRyZXR1cm4ge1xuXHRcdHByb2plY3RzLFxuXHRcdHNhdmVQcm9qZWN0c1RvTG9jYWxTdG9yYWdlLFxuXHRcdGxvYWRQcm9qZWN0c0Zyb21Mb2NhbFN0b3JhZ2UsXG5cdH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBTdG9yYWdlO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9kbyB7XG5cdGNvbnN0cnVjdG9yKHRpdGxlLCBkZXRhaWxzLCBkdWVEYXRlLCBjb21wbGV0ZWQpIHtcblx0XHR0aGlzLnRpdGxlID0gdGl0bGU7XG5cdFx0dGhpcy5kZXRhaWxzID0gZGV0YWlscztcblx0XHR0aGlzLmR1ZURhdGUgPSBkdWVEYXRlO1xuXHRcdHRoaXMuY29tcGxldGVkID0gY29tcGxldGVkO1xuXHR9XG5cblx0dG9nZ2xlQ29tcGxldGVkKCkge1xuXHRcdHRoaXMuY29tcGxldGVkID0gIXRoaXMuY29tcGxldGVkO1xuXHR9XG5cblx0dG9KU09OKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHR0aXRsZTogdGhpcy50aXRsZSxcblx0XHRcdGRldGFpbHM6IHRoaXMuZGV0YWlscyxcblx0XHRcdGR1ZURhdGU6IHRoaXMuZHVlRGF0ZSxcblx0XHRcdGNvbXBsZXRlZDogdGhpcy5jb21wbGV0ZWQsXG5cdFx0fTtcblx0fVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgRG9tTWFuaXB1bGF0aW9uIGZyb20gXCIuL21vZHVsZXMvZG9tTWFuaXB1bGF0aW9uXCI7XG5Eb21NYW5pcHVsYXRpb24uZGlzcGxheShudWxsKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
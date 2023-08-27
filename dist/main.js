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
		.attachProjectFormListeners(newProjectBtn, overlay)
		.attachEditFormListeners(editTodoForm, closeEditFormBtn)
		.attachHomeListener(newTodoBtn);

	function createtodoElement(todo, project) {
		const todoElement = document.createElement("li");
		todoElement.className = "todo";
		if (todo.completed) {
			todoElement.classList.add("completed");
		}
		console.log(todo);

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
			if (_storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].projects.length - 1 <= 0) display(null);
			else display(_storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].projects.length - 1);
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

	eventListeners.attachProjectFormListeners = (newProjectBtn, overlay) => {
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
			_domManipulation_js__WEBPACK_IMPORTED_MODULE_3__["default"].display(null);
			newTodoBtn.dataset.value = null;
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
		console.log(projects);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQW1DO0FBQ2M7O0FBRWpEO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUMsMERBQWM7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUcsbURBQU8sNEJBQTRCLG1EQUFPO0FBQzdDLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTyxtREFBTztBQUNkLGdCQUFnQixtREFBTztBQUN2QixHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHLG1EQUFPO0FBQ1Y7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBLEVBQUUsbURBQU87QUFDVDtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBLEdBQUcsbURBQU87QUFDVjtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSiwwQkFBMEIsbURBQU87QUFDakM7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsRUFBRSxtREFBTyw0QkFBNEIsbURBQU87QUFDNUM7O0FBRUEsVUFBVTtBQUNWLENBQUM7O0FBRUQsaUVBQWUsZUFBZSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOUtJO0FBQ047QUFDTTtBQUNnQjs7QUFFbkQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSx1QkFBdUIsZ0RBQUk7O0FBRTNCLEdBQUcsbURBQU87QUFDVixHQUFHLDJEQUFlOztBQUVsQjtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsMEJBQTBCLG1EQUFPO0FBQ2pDLEdBQUcsbURBQU87QUFDVixHQUFHLDJEQUFlLFNBQVMsbURBQU87O0FBRWxDO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHLDJEQUFlO0FBQ2xCO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJLDJEQUFlOztBQUVuQjtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRCxpRUFBZSxjQUFjLEVBQUM7Ozs7Ozs7Ozs7Ozs7OztBQzFIZjtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNmZ0M7QUFDTjtBQUMxQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4QkFBOEIsZ0RBQU87QUFDckM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw0QkFBNEIsNkNBQUk7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQsaUVBQWUsT0FBTyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUMvQ1I7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ3BCQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTndEO0FBQ3hELGdFQUFlIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9kb21NYW5pcHVsYXRpb24uanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9ldmVudExpc3RlbmVycy5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3Byb2plY3QuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9zdG9yYWdlLmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvdG9kby5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL3NjcmlwdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU3RvcmFnZSBmcm9tIFwiLi9zdG9yYWdlLmpzXCI7XG5pbXBvcnQgRXZlbnRMaXN0ZW5lcnMgZnJvbSBcIi4vZXZlbnRMaXN0ZW5lcnMuanNcIjtcblxuY29uc3QgRG9tTWFuaXB1bGF0aW9uID0gKCgpID0+IHtcblx0Y29uc3QgdG9kb0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8tbGlzdFwiKTtcblx0Y29uc3QgcHJvamVjdHNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3RzLWNvbnRhaW5lclwiKTtcblx0Y29uc3QgcHJvamVjdExpc3RET00gPSBwcm9qZWN0c0NvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwidWxcIik7XG5cblx0Y29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib3ZlcmxheVwiKTtcblxuXHRjb25zdCBuZXdUb2RvQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuZXctdG9kby1idG5cIik7XG5cdGNvbnN0IG5ld1Byb2plY3RCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5ldy1wcm9qZWN0LWJ0blwiKTtcblxuXHRjb25zdCBlZGl0VG9kb0Zvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVkaXRUb2RvRm9ybVwiKTtcblx0Y29uc3QgY2xvc2VFZGl0Rm9ybUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2xvc2VFZGl0Rm9ybUJ0blwiKTtcblxuXHRmdW5jdGlvbiBvcGVuRWRpdFRvZG9Gb3JtKHRvZG8sIHByb2plY3QpIHtcblx0XHRlZGl0VG9kb0Zvcm0uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcblx0XHRvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG5cblx0XHRjb25zdCBlZGl0VG9kb1RpdGxlSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVkaXRUb2RvVGl0bGVcIik7XG5cdFx0Y29uc3QgZWRpdFRvZG9EZXRhaWxzSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVkaXRUb2RvRGV0YWlsc1wiKTtcblx0XHRjb25zdCBlZGl0RHVlRGF0ZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlZGl0RHVlRGF0ZVwiKTtcblxuXHRcdGVkaXRUb2RvVGl0bGVJbnB1dC52YWx1ZSA9IHRvZG8udGl0bGU7XG5cdFx0ZWRpdFRvZG9EZXRhaWxzSW5wdXQudmFsdWUgPSB0b2RvLmRldGFpbHM7XG5cdFx0ZWRpdER1ZURhdGVJbnB1dC52YWx1ZSA9IHRvZG8uZHVlRGF0ZTtcblx0XHREZXRhaWxzdGVuZXJzLmF0dGFjaEVkaXRGb3JtU3VibWl0TGlzdGVuZXIoXG5cdFx0XHRlZGl0VG9kb0Zvcm0sXG5cdFx0XHRlZGl0VG9kb1RpdGxlSW5wdXQsXG5cdFx0XHRlZGl0VG9kb0RldGFpbHNJbnB1dCxcblx0XHRcdGVkaXREdWVEYXRlSW5wdXQsXG5cdFx0XHRwcm9qZWN0LFxuXHRcdFx0dG9kbyxcblx0XHRcdG5ld1RvZG9CdG5cblx0XHQpO1xuXHR9XG5cblx0RXZlbnRMaXN0ZW5lcnMuYXR0YWNoVG9kb0Zvcm1MaXN0ZW5lcnMobmV3VG9kb0J0biwgb3ZlcmxheSlcblx0XHQuYXR0YWNoUHJvamVjdEZvcm1MaXN0ZW5lcnMobmV3UHJvamVjdEJ0biwgb3ZlcmxheSlcblx0XHQuYXR0YWNoRWRpdEZvcm1MaXN0ZW5lcnMoZWRpdFRvZG9Gb3JtLCBjbG9zZUVkaXRGb3JtQnRuKVxuXHRcdC5hdHRhY2hIb21lTGlzdGVuZXIobmV3VG9kb0J0bik7XG5cblx0ZnVuY3Rpb24gY3JlYXRldG9kb0VsZW1lbnQodG9kbywgcHJvamVjdCkge1xuXHRcdGNvbnN0IHRvZG9FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuXHRcdHRvZG9FbGVtZW50LmNsYXNzTmFtZSA9IFwidG9kb1wiO1xuXHRcdGlmICh0b2RvLmNvbXBsZXRlZCkge1xuXHRcdFx0dG9kb0VsZW1lbnQuY2xhc3NMaXN0LmFkZChcImNvbXBsZXRlZFwiKTtcblx0XHR9XG5cdFx0Y29uc29sZS5sb2codG9kbyk7XG5cblx0XHRjb25zdCBsZWZ0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRsZWZ0RGl2LmNsYXNzTmFtZSA9IFwibGVmdFwiO1xuXG5cdFx0Y29uc3QgY2hlY2tib3hJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcblx0XHRjaGVja2JveElucHV0LnR5cGUgPSBcImNoZWNrYm94XCI7XG5cdFx0Y2hlY2tib3hJbnB1dC5jbGFzc05hbWUgPSBcImNoZWNrYm94XCI7XG5cdFx0Y2hlY2tib3hJbnB1dC5jaGVja2VkID0gdG9kby5jb21wbGV0ZWQ7XG5cdFx0Y2hlY2tib3hJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsICgpID0+IHtcblx0XHRcdHRvZG8udG9nZ2xlQ29tcGxldGVkKCk7XG5cdFx0XHR0b2RvRWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKFwiY29tcGxldGVkXCIsIHRvZG8uY29tcGxldGVkKTtcblx0XHRcdFN0b3JhZ2Uuc2F2ZVByb2plY3RzVG9Mb2NhbFN0b3JhZ2UoU3RvcmFnZS5wcm9qZWN0cyk7XG5cdFx0fSk7XG5cblx0XHRjb25zdCB0b2RvTmFtZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0dG9kb05hbWVEaXYuY2xhc3NOYW1lID0gXCJ0b2RvLW5hbWVcIjtcblx0XHR0b2RvTmFtZURpdi50ZXh0Q29udGVudCA9IHRvZG8udGl0bGU7XG5cblx0XHRsZWZ0RGl2LmFwcGVuZENoaWxkKGNoZWNrYm94SW5wdXQpO1xuXHRcdGxlZnREaXYuYXBwZW5kQ2hpbGQodG9kb05hbWVEaXYpO1xuXG5cdFx0Y29uc3QgcmlnaHREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdHJpZ2h0RGl2LmNsYXNzTmFtZSA9IFwicmlnaHRcIjtcblxuXHRcdGNvbnN0IGRldGFpbHNCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXHRcdGRldGFpbHNCdXR0b24uY2xhc3NOYW1lID0gXCJkZXRhaWxzXCI7XG5cdFx0ZGV0YWlsc0J1dHRvbi50ZXh0Q29udGVudCA9IFwiRGV0YWlsc1wiO1xuXHRcdGRldGFpbHNCdXR0b24uZGF0YXNldC5kZXRhaWxzID0gdG9kby5kZXRhaWxzO1xuXG5cdFx0Y29uc3QgZGF0ZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0ZGF0ZURpdi5jbGFzc05hbWUgPSBcImRhdGVcIjtcblx0XHRkYXRlRGl2LnRleHRDb250ZW50ID0gdG9kby5kdWVEYXRlO1xuXG5cdFx0Y29uc3QgYnRuQ29udGFpbmVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRidG5Db250YWluZXJEaXYuY2xhc3NOYW1lID0gXCJidG4tY29udGFpbmVyXCI7XG5cblx0XHRjb25zdCBlZGl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcblx0XHRlZGl0QnV0dG9uLmNsYXNzTmFtZSA9IFwiZWRpdFwiO1xuXHRcdGVkaXRCdXR0b24udGV4dENvbnRlbnQgPSBcIkVkaXRcIjtcblx0XHRlZGl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcblx0XHRcdG9wZW5FZGl0VG9kb0Zvcm0odG9kbywgcHJvamVjdCk7XG5cdFx0fSk7XG5cblx0XHRjb25zdCBkZWxldGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXHRcdGRlbGV0ZUJ1dHRvbi5jbGFzc05hbWUgPSBcImRlbGV0ZVwiO1xuXHRcdGRlbGV0ZUJ1dHRvbi50ZXh0Q29udGVudCA9IFwiRGVsZXRlXCI7XG5cdFx0ZGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcblx0XHRcdHByb2plY3QucmVtb3ZlVG9kbyh0b2RvKTtcblx0XHRcdGlmIChTdG9yYWdlLnByb2plY3RzLmxlbmd0aCAtIDEgPD0gMCkgZGlzcGxheShudWxsKTtcblx0XHRcdGVsc2UgZGlzcGxheShTdG9yYWdlLnByb2plY3RzLmxlbmd0aCAtIDEpO1xuXHRcdH0pO1xuXG5cdFx0YnRuQ29udGFpbmVyRGl2LmFwcGVuZENoaWxkKGVkaXRCdXR0b24pO1xuXHRcdGJ0bkNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZChkZWxldGVCdXR0b24pO1xuXG5cdFx0cmlnaHREaXYuYXBwZW5kQ2hpbGQoZGV0YWlsc0J1dHRvbik7XG5cdFx0cmlnaHREaXYuYXBwZW5kQ2hpbGQoZGF0ZURpdik7XG5cdFx0cmlnaHREaXYuYXBwZW5kQ2hpbGQoYnRuQ29udGFpbmVyRGl2KTtcblxuXHRcdHRvZG9FbGVtZW50LmFwcGVuZENoaWxkKGxlZnREaXYpO1xuXHRcdHRvZG9FbGVtZW50LmFwcGVuZENoaWxkKHJpZ2h0RGl2KTtcblxuXHRcdHRvZG9MaXN0LmFwcGVuZENoaWxkKHRvZG9FbGVtZW50KTtcblx0fVxuXG5cdGZ1bmN0aW9uIGNyZWF0ZVByb2plY3RFbGVtZW50KHByb2plY3QsIGluZGV4KSB7XG5cdFx0Y29uc3QgcHJvamVjdEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG5cdFx0cHJvamVjdEl0ZW0uY2xhc3NMaXN0LmFkZChcInByb2plY3QtbGlzdC1lbGVtZW50XCIpO1xuXG5cdFx0Y29uc3QgcHJvamVjdE5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdHByb2plY3ROYW1lLnRleHRDb250ZW50ID0gcHJvamVjdC50aXRsZTtcblx0XHRwcm9qZWN0TmFtZS5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC1uYW1lXCIpO1xuXHRcdHByb2plY3RJdGVtLmFwcGVuZENoaWxkKHByb2plY3ROYW1lKTtcblxuXHRcdGNvbnN0IHByb2plY3REZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0cHJvamVjdERlc2NyaXB0aW9uLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LWRlc2NyaXB0aW9uXCIpO1xuXHRcdHByb2plY3REZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IHByb2plY3QuZGVzY3JpcHRpb247XG5cdFx0cHJvamVjdEl0ZW0uYXBwZW5kQ2hpbGQocHJvamVjdERlc2NyaXB0aW9uKTtcblxuXHRcdGNvbnN0IGRlbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cdFx0ZGVsZXRlQnV0dG9uLnRleHRDb250ZW50ID0gXCJYXCI7XG5cdFx0ZGVsZXRlQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJkZWxldGUtcHJvamVjdC1idG5cIik7XG5cdFx0cHJvamVjdEl0ZW0uYXBwZW5kQ2hpbGQoZGVsZXRlQnV0dG9uKTtcblxuXHRcdHByb2plY3RMaXN0RE9NLmFwcGVuZENoaWxkKHByb2plY3RJdGVtKTtcblxuXHRcdHByb2plY3RJdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0XHRkaXNwbGF5KGluZGV4KTtcblx0XHRcdG5ld1RvZG9CdG4uZGF0YXNldC52YWx1ZSA9IGluZGV4O1xuXHRcdH0pO1xuXHRcdGRlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdFN0b3JhZ2UucHJvamVjdHMuc3BsaWNlKGluZGV4LCAxKTtcblx0XHRcdGRpc3BsYXkobmV3VG9kb0J0bi5kYXRhc2V0LnZhbHVlKTtcblx0XHR9KTtcblx0fVxuXG5cdGZ1bmN0aW9uIGRpc3BsYXkocHJvamVjdEluZGV4KSB7XG5cdFx0cHJvamVjdExpc3RET00uaW5uZXJIVE1MID0gXCJcIjtcblx0XHRTdG9yYWdlLnByb2plY3RzLmZvckVhY2goKHByb2plY3QsIGluZGV4KSA9PiB7XG5cdFx0XHRjcmVhdGVQcm9qZWN0RWxlbWVudChwcm9qZWN0LCBpbmRleCk7XG5cdFx0fSk7XG5cdFx0dG9kb0xpc3QuaW5uZXJIVE1MID0gXCJcIjtcblxuXHRcdGlmIChwcm9qZWN0SW5kZXggPT09IG51bGwpIHtcblx0XHRcdFN0b3JhZ2UucHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xuXHRcdFx0XHRwcm9qZWN0LnRvZG9zLmZvckVhY2goKHRvZG8pID0+IHtcblx0XHRcdFx0XHRjcmVhdGV0b2RvRWxlbWVudCh0b2RvLCBwcm9qZWN0KTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHRcdG5ld1RvZG9CdG4uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCBjdXJyZW50UHJvamVjdCA9IFN0b3JhZ2UucHJvamVjdHNbcHJvamVjdEluZGV4XTtcblx0XHRcdGN1cnJlbnRQcm9qZWN0LnRvZG9zLmZvckVhY2goKHRvZG8pID0+IHtcblx0XHRcdFx0Y3JlYXRldG9kb0VsZW1lbnQodG9kbywgY3VycmVudFByb2plY3QpO1xuXHRcdFx0fSk7XG5cdFx0XHRuZXdUb2RvQnRuLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG5cdFx0fVxuXHRcdFN0b3JhZ2Uuc2F2ZVByb2plY3RzVG9Mb2NhbFN0b3JhZ2UoU3RvcmFnZS5wcm9qZWN0cyk7XG5cdH1cblxuXHRyZXR1cm4geyBkaXNwbGF5IH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBEb21NYW5pcHVsYXRpb247XG4iLCJpbXBvcnQgU3RvcmFnZSBmcm9tIFwiLi9zdG9yYWdlLmpzXCI7XG5pbXBvcnQgVG9kbyBmcm9tIFwiLi90b2RvLmpzXCI7XG5pbXBvcnQgUHJvamVjdCBmcm9tIFwiLi9wcm9qZWN0LmpzXCI7XG5pbXBvcnQgRG9tTWFuaXB1bGF0aW9uIGZyb20gXCIuL2RvbU1hbmlwdWxhdGlvbi5qc1wiO1xuXG5jb25zdCBFdmVudExpc3RlbmVycyA9ICgoKSA9PiB7XG5cdGNvbnN0IGV2ZW50TGlzdGVuZXJzID0ge307XG5cblx0ZXZlbnRMaXN0ZW5lcnMuYXR0YWNoVG9kb0Zvcm1MaXN0ZW5lcnMgPSAobmV3VG9kb0J0biwgb3ZlcmxheSkgPT4ge1xuXHRcdG5ld1RvZG9CdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblx0XHRcdGFkZFRvZG9Gb3JtLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG5cdFx0XHRvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG5cdFx0fSk7XG5cblx0XHRjbG9zZUZvcm1CdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblx0XHRcdGFkZFRvZG9Gb3JtLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblx0XHRcdG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXHRcdH0pO1xuXG5cdFx0dG9kb0Zvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZlbnQpID0+IHtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b2RvVGl0bGVcIikudmFsdWU7XG5cdFx0XHRjb25zdCBkZXRhaWxzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b2RvRGV0YWlsc1wiKS52YWx1ZTtcblx0XHRcdGNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImR1ZURhdGVcIikudmFsdWU7XG5cblx0XHRcdGNvbnN0IG5ld1RvZG8gPSBuZXcgVG9kbyh0aXRsZSwgZGV0YWlscywgZHVlRGF0ZSwgZmFsc2UpO1xuXG5cdFx0XHRTdG9yYWdlLnByb2plY3RzW25ld1RvZG9CdG4uZGF0YXNldC52YWx1ZV0uYWRkTmV3VG9kbyhuZXdUb2RvKTtcblx0XHRcdERvbU1hbmlwdWxhdGlvbi5kaXNwbGF5KG5ld1RvZG9CdG4uZGF0YXNldC52YWx1ZSk7XG5cblx0XHRcdHRvZG9Gb3JtLnJlc2V0KCk7XG5cdFx0XHRhZGRUb2RvRm9ybS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cdFx0XHRvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblx0XHR9KTtcblxuXHRcdHJldHVybiBldmVudExpc3RlbmVycztcblx0fTtcblxuXHRldmVudExpc3RlbmVycy5hdHRhY2hQcm9qZWN0Rm9ybUxpc3RlbmVycyA9IChuZXdQcm9qZWN0QnRuLCBvdmVybGF5KSA9PiB7XG5cdFx0bmV3UHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdFx0YWRkUHJvamVjdEZvcm0uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcblx0XHRcdG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcblx0XHR9KTtcblxuXHRcdGNsb3NlUHJvamVjdEZvcm1CdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblx0XHRcdGFkZFByb2plY3RGb3JtLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblx0XHRcdG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXHRcdH0pO1xuXG5cdFx0cHJvamVjdEZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZlbnQpID0+IHtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0VGl0bGVcIikudmFsdWU7XG5cdFx0XHRjb25zdCBkZXNjcmlwdGlvbiA9XG5cdFx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdERlc2NyaXB0aW9uXCIpLnZhbHVlO1xuXG5cdFx0XHRjb25zdCBuZXdQcm9qZWN0ID0gbmV3IFByb2plY3QodGl0bGUsIGRlc2NyaXB0aW9uLCBbXSk7XG5cdFx0XHRTdG9yYWdlLnByb2plY3RzLnB1c2gobmV3UHJvamVjdCk7XG5cdFx0XHREb21NYW5pcHVsYXRpb24uZGlzcGxheShTdG9yYWdlLnByb2plY3RzLmxlbmd0aCAtIDEpO1xuXG5cdFx0XHRwcm9qZWN0Rm9ybS5yZXNldCgpO1xuXHRcdFx0YWRkUHJvamVjdEZvcm0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXHRcdFx0b3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gZXZlbnRMaXN0ZW5lcnM7XG5cdH07XG5cblx0ZXZlbnRMaXN0ZW5lcnMuYXR0YWNoRWRpdEZvcm1MaXN0ZW5lcnMgPSAoXG5cdFx0ZWRpdFRvZG9Gb3JtLFxuXHRcdGNsb3NlRWRpdEZvcm1CdG5cblx0KSA9PiB7XG5cdFx0Y2xvc2VFZGl0Rm9ybUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdFx0ZWRpdFRvZG9Gb3JtLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblx0XHRcdG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIGV2ZW50TGlzdGVuZXJzO1xuXHR9O1xuXG5cdGV2ZW50TGlzdGVuZXJzLmF0dGFjaEhvbWVMaXN0ZW5lciA9IChuZXdUb2RvQnRuKSA9PiB7XG5cdFx0Y29uc3QgaG9tZVByb2plY3RIZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXIgaDJcIik7XG5cdFx0aG9tZVByb2plY3RIZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblx0XHRcdERvbU1hbmlwdWxhdGlvbi5kaXNwbGF5KG51bGwpO1xuXHRcdFx0bmV3VG9kb0J0bi5kYXRhc2V0LnZhbHVlID0gbnVsbDtcblx0XHR9KTtcblx0fTtcblxuXHRldmVudExpc3RlbmVycy5hdHRhY2hFZGl0Rm9ybVN1Ym1pdExpc3RlbmVyID0gKFxuXHRcdGVkaXRUb2RvRm9ybSxcblx0XHRlZGl0VG9kb1RpdGxlSW5wdXQsXG5cdFx0ZWRpdFRvZG9EZXRhaWxzSW5wdXQsXG5cdFx0ZWRpdER1ZURhdGVJbnB1dCxcblx0XHRwcm9qZWN0LFxuXHRcdHRvZG8sXG5cdFx0bmV3VG9kb0J0blxuXHQpID0+IHtcblx0XHRlZGl0VG9kb0Zvcm1cblx0XHRcdC5xdWVyeVNlbGVjdG9yKFwiZm9ybVwiKVxuXHRcdFx0LmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGV2ZW50KSA9PiB7XG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdFx0Y29uc3QgdXBkYXRlZFRvZG8gPSB7XG5cdFx0XHRcdFx0dGl0bGU6IGVkaXRUb2RvVGl0bGVJbnB1dC52YWx1ZSxcblx0XHRcdFx0XHREZXRhaWxzOiBlZGl0VG9kb0RldGFpbHNJbnB1dC52YWx1ZSxcblx0XHRcdFx0XHRkdWVEYXRlOiBlZGl0RHVlRGF0ZUlucHV0LnZhbHVlLFxuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdHByb2plY3QudXBkYXRlVG9kbyh0b2RvLCB1cGRhdGVkVG9kbyk7XG5cdFx0XHRcdERvbU1hbmlwdWxhdGlvbi5kaXNwbGF5KG5ld1RvZG9CdG4uZGF0YXNldC52YWx1ZSk7XG5cblx0XHRcdFx0ZWRpdFRvZG9Gb3JtLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblx0XHRcdFx0b3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cdFx0XHR9KTtcblxuXHRcdHJldHVybiBldmVudExpc3RlbmVycztcblx0fTtcblxuXHRyZXR1cm4gZXZlbnRMaXN0ZW5lcnM7XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBFdmVudExpc3RlbmVycztcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2plY3Qge1xuXHRjb25zdHJ1Y3Rvcih0aXRsZSwgZGVzY3JpcHRpb24sIHRvZG9zKSB7XG5cdFx0dGhpcy50aXRsZSA9IHRpdGxlO1xuXHRcdHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcblx0XHR0aGlzLnRvZG9zID0gdG9kb3M7XG5cdH1cblx0YWRkTmV3VG9kbyh0b2RvKSB7XG5cdFx0dGhpcy50b2Rvcy5wdXNoKHRvZG8pO1xuXHR9XG5cdHJlbW92ZVRvZG8odG9kbykge1xuXHRcdHRoaXMudG9kb3Muc3BsaWNlKHRoaXMudG9kb3MuaW5kZXhPZih0b2RvKSwgMSk7XG5cdH1cblx0dXBkYXRlVG9kbyh0b2RvLCBuZXdUb2RvKSB7XG5cdFx0dGhpcy50b2Rvcy5zcGxpY2UodGhpcy50b2Rvcy5pbmRleE9mKHRvZG8pLCAxLCBuZXdUb2RvKTtcblx0fVxufVxuIiwiaW1wb3J0IFByb2plY3QgZnJvbSBcIi4vcHJvamVjdFwiO1xuaW1wb3J0IFRvZG8gZnJvbSBcIi4vdG9kb1wiO1xuY29uc3QgU3RvcmFnZSA9ICgoKSA9PiB7XG5cdGxldCBwcm9qZWN0cyA9IFtdO1xuXG5cdGNvbnN0IHNhdmVQcm9qZWN0c1RvTG9jYWxTdG9yYWdlID0gKHByb2plY3REaXNwbGF5ZWQpID0+IHtcblx0XHRwcm9qZWN0cyA9IHByb2plY3REaXNwbGF5ZWQ7XG5cdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwcm9qZWN0c1wiLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0cykpO1xuXHR9O1xuXG5cdGNvbnN0IGxvYWRQcm9qZWN0c0Zyb21Mb2NhbFN0b3JhZ2UgPSAoKSA9PiB7XG5cdFx0Y29uc3Qgc2F2ZWRQcm9qZWN0cyA9XG5cdFx0XHRKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwicHJvamVjdHNcIikpIHx8IFtdO1xuXHRcdHByb2plY3RzID0gc2F2ZWRQcm9qZWN0cy5tYXAoKHByb2plY3REYXRhKSA9PlxuXHRcdFx0cmVjcmVhdGVQcm9qZWN0SW5zdGFuY2UocHJvamVjdERhdGEpXG5cdFx0KTtcblx0XHRjb25zb2xlLmxvZyhwcm9qZWN0cyk7XG5cdH07XG5cblx0Y29uc3QgcmVjcmVhdGVQcm9qZWN0SW5zdGFuY2UgPSAocHJvamVjdERhdGEpID0+IHtcblx0XHRjb25zdCBwcm9qZWN0SW5zdGFuY2UgPSBuZXcgUHJvamVjdChcblx0XHRcdHByb2plY3REYXRhLnRpdGxlLFxuXHRcdFx0cHJvamVjdERhdGEuZGVzY3JpcHRpb24sXG5cdFx0XHRbXVxuXHRcdCk7XG5cblx0XHRwcm9qZWN0RGF0YS50b2Rvcy5mb3JFYWNoKCh0b2RvRGF0YSkgPT4ge1xuXHRcdFx0Y29uc3QgdG9kb0luc3RhbmNlID0gbmV3IFRvZG8oXG5cdFx0XHRcdHRvZG9EYXRhLnRpdGxlLFxuXHRcdFx0XHR0b2RvRGF0YS5kZXRhaWxzLFxuXHRcdFx0XHR0b2RvRGF0YS5kdWVEYXRlLFxuXHRcdFx0XHR0b2RvRGF0YS5jb21wbGV0ZWRcblx0XHRcdCk7XG5cdFx0XHRwcm9qZWN0SW5zdGFuY2UuYWRkTmV3VG9kbyh0b2RvSW5zdGFuY2UpO1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHByb2plY3RJbnN0YW5jZTtcblx0fTtcblxuXHRsb2FkUHJvamVjdHNGcm9tTG9jYWxTdG9yYWdlKCk7XG5cdHJldHVybiB7XG5cdFx0cHJvamVjdHMsXG5cdFx0c2F2ZVByb2plY3RzVG9Mb2NhbFN0b3JhZ2UsXG5cdFx0bG9hZFByb2plY3RzRnJvbUxvY2FsU3RvcmFnZSxcblx0fTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IFN0b3JhZ2U7XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBUb2RvIHtcblx0Y29uc3RydWN0b3IodGl0bGUsIGRldGFpbHMsIGR1ZURhdGUsIGNvbXBsZXRlZCkge1xuXHRcdHRoaXMudGl0bGUgPSB0aXRsZTtcblx0XHR0aGlzLmRldGFpbHMgPSBkZXRhaWxzO1xuXHRcdHRoaXMuZHVlRGF0ZSA9IGR1ZURhdGU7XG5cdFx0dGhpcy5jb21wbGV0ZWQgPSBjb21wbGV0ZWQ7XG5cdH1cblxuXHR0b2dnbGVDb21wbGV0ZWQoKSB7XG5cdFx0dGhpcy5jb21wbGV0ZWQgPSAhdGhpcy5jb21wbGV0ZWQ7XG5cdH1cblxuXHR0b0pTT04oKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHRpdGxlOiB0aGlzLnRpdGxlLFxuXHRcdFx0ZGV0YWlsczogdGhpcy5kZXRhaWxzLFxuXHRcdFx0ZHVlRGF0ZTogdGhpcy5kdWVEYXRlLFxuXHRcdFx0Y29tcGxldGVkOiB0aGlzLmNvbXBsZXRlZCxcblx0XHR9O1xuXHR9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBEb21NYW5pcHVsYXRpb24gZnJvbSBcIi4vbW9kdWxlcy9kb21NYW5pcHVsYXRpb25cIjtcbkRvbU1hbmlwdWxhdGlvbi5kaXNwbGF5KG51bGwpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
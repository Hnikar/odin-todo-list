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

		const newTodo = {
			title: title,
			description: description,
			dueDate: dueDate,
		};

		_storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].projects[newTodoBtn.dataset.value].addNewTodo(newTodo);
		DomManipulation.display(newTodoBtn.dataset.value);

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
				DomManipulation.display(newTodoBtn.dataset.value);

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

		const newProject = {
			title: title,
			description: description,
			todos: [],
			addNewTodo(todo) {
				this.todos.push(todo);
			},
			removeTodo(todo) {
				const index = this.todos.indexOf(todo);
				this.todos.splice(index, 1);
			},
			updateTodo(todo, newTodo) {
				const index = this.todos.indexOf(todo);
				this.todos.splice(index, 1, newTodo);
			},
		};

		_storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].projects.push(newProject);
		DomManipulation.display(_storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].projects.length - 1);

		projectForm.reset();
		addProjectForm.style.display = "none";
		overlay.style.display = "none";
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

		const projectName = document.createElement("span");
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
			DomManipulation.display(newTodoBtn.dataset.value);
		});
	}

	const homeProjectHeader = document.querySelector(".sidebar h2");
	homeProjectHeader.addEventListener("click", () => {
		DomManipulation.display(null);
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Storage);


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBbUM7O0FBRW5DO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEVBQUUsbURBQU87QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQSxFQUFFLG1EQUFPO0FBQ1QsMEJBQTBCLG1EQUFPOztBQUVqQztBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHLG1EQUFPO0FBQ1Y7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQSxFQUFFLG1EQUFPO0FBQ1Q7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQSxHQUFHLG1EQUFPO0FBQ1Y7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0osMEJBQTBCLG1EQUFPO0FBQ2pDO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBLFVBQVU7QUFDVixDQUFDOztBQUVELGlFQUFlLGVBQWUsRUFBQzs7Ozs7Ozs7Ozs7Ozs7O0FDaFEvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRztBQUNIO0FBQ0EsVUFBVTtBQUNWLENBQUM7QUFDRCxpRUFBZSxPQUFPLEVBQUM7Ozs7Ozs7VUNuRXZCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNONEM7QUFDNUMsb0RBQWUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2RvbS5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9zY3JpcHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFN0b3JhZ2UgZnJvbSBcIi4vc3RvcmFnZS5qc1wiO1xuXG5jb25zdCBEb21NYW5pcHVsYXRpb24gPSAoKCkgPT4ge1xuXHRjb25zdCB0b2RvTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1saXN0XCIpO1xuXHRjb25zdCBwcm9qZWN0c0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdHMtY29udGFpbmVyXCIpO1xuXHRjb25zdCBwcm9qZWN0TGlzdERPTSA9IHByb2plY3RzQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCJ1bFwiKTtcblxuXHRjb25zdCBuZXdUb2RvQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuZXctdG9kby1idG5cIik7XG5cdGNvbnN0IGFkZFRvZG9Gb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGRUb2RvRm9ybVwiKTtcblx0Y29uc3QgY2xvc2VGb3JtQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjbG9zZUZvcm1CdG5cIik7XG5cdGNvbnN0IHRvZG9Gb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b2RvRm9ybVwiKTtcblxuXHRjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvdmVybGF5XCIpO1xuXG5cdG5ld1RvZG9CdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblx0XHRhZGRUb2RvRm9ybS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuXHRcdG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcblx0fSk7XG5cblx0Y2xvc2VGb3JtQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0YWRkVG9kb0Zvcm0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXHRcdG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXHR9KTtcblxuXHR0b2RvRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChldmVudCkgPT4ge1xuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRjb25zdCB0aXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG9kb1RpdGxlXCIpLnZhbHVlO1xuXHRcdGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b2RvRGVzY3JpcHRpb25cIikudmFsdWU7XG5cdFx0Y29uc3QgZHVlRGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZHVlRGF0ZVwiKS52YWx1ZTtcblxuXHRcdGNvbnN0IG5ld1RvZG8gPSB7XG5cdFx0XHR0aXRsZTogdGl0bGUsXG5cdFx0XHRkZXNjcmlwdGlvbjogZGVzY3JpcHRpb24sXG5cdFx0XHRkdWVEYXRlOiBkdWVEYXRlLFxuXHRcdH07XG5cblx0XHRTdG9yYWdlLnByb2plY3RzW25ld1RvZG9CdG4uZGF0YXNldC52YWx1ZV0uYWRkTmV3VG9kbyhuZXdUb2RvKTtcblx0XHREb21NYW5pcHVsYXRpb24uZGlzcGxheShuZXdUb2RvQnRuLmRhdGFzZXQudmFsdWUpO1xuXG5cdFx0dG9kb0Zvcm0ucmVzZXQoKTtcblx0XHRhZGRUb2RvRm9ybS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cdFx0b3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cdH0pO1xuXG5cdGNvbnN0IG5ld1Byb2plY3RCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5ldy1wcm9qZWN0LWJ0blwiKTtcblx0Y29uc3QgYWRkUHJvamVjdEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZFByb2plY3RGb3JtXCIpO1xuXHRjb25zdCBjbG9zZVByb2plY3RGb3JtQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjbG9zZVByb2plY3RGb3JtQnRuXCIpO1xuXHRjb25zdCBwcm9qZWN0Rm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdEZvcm1cIik7XG5cblx0bmV3UHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdGFkZFByb2plY3RGb3JtLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG5cdFx0b3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuXHR9KTtcblxuXHRjbG9zZVByb2plY3RGb3JtQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0YWRkUHJvamVjdEZvcm0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXHRcdG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXHR9KTtcblxuXHRmdW5jdGlvbiBvcGVuRWRpdFRvZG9Gb3JtKHRvZG8sIHByb2plY3QpIHtcblx0XHRlZGl0VG9kb0Zvcm0uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcblx0XHRvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG5cblx0XHRjb25zdCBlZGl0VG9kb1RpdGxlSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVkaXRUb2RvVGl0bGVcIik7XG5cdFx0Y29uc3QgZWRpdFRvZG9EZXNjcmlwdGlvbklucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG5cdFx0XHRcImVkaXRUb2RvRGVzY3JpcHRpb25cIlxuXHRcdCk7XG5cdFx0Y29uc3QgZWRpdER1ZURhdGVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZWRpdER1ZURhdGVcIik7XG5cblx0XHRlZGl0VG9kb1RpdGxlSW5wdXQudmFsdWUgPSB0b2RvLnRpdGxlO1xuXHRcdGVkaXRUb2RvRGVzY3JpcHRpb25JbnB1dC52YWx1ZSA9IHRvZG8uZGVzY3JpcHRpb247XG5cdFx0ZWRpdER1ZURhdGVJbnB1dC52YWx1ZSA9IHRvZG8uZHVlRGF0ZTtcblxuXHRcdGVkaXRUb2RvRm9ybVxuXHRcdFx0LnF1ZXJ5U2VsZWN0b3IoXCJmb3JtXCIpXG5cdFx0XHQuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZlbnQpID0+IHtcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0XHRjb25zdCB1cGRhdGVkVG9kbyA9IHtcblx0XHRcdFx0XHR0aXRsZTogZWRpdFRvZG9UaXRsZUlucHV0LnZhbHVlLFxuXHRcdFx0XHRcdGRlc2NyaXB0aW9uOiBlZGl0VG9kb0Rlc2NyaXB0aW9uSW5wdXQudmFsdWUsXG5cdFx0XHRcdFx0ZHVlRGF0ZTogZWRpdER1ZURhdGVJbnB1dC52YWx1ZSxcblx0XHRcdFx0fTtcblxuXHRcdFx0XHRwcm9qZWN0LnVwZGF0ZVRvZG8odG9kbywgdXBkYXRlZFRvZG8pO1xuXHRcdFx0XHREb21NYW5pcHVsYXRpb24uZGlzcGxheShuZXdUb2RvQnRuLmRhdGFzZXQudmFsdWUpO1xuXG5cdFx0XHRcdGVkaXRUb2RvRm9ybS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cdFx0XHRcdG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXHRcdFx0fSk7XG5cdH1cblxuXHRjb25zdCBlZGl0VG9kb0Zvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVkaXRUb2RvRm9ybVwiKTtcblx0Y29uc3QgY2xvc2VFZGl0Rm9ybUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2xvc2VFZGl0Rm9ybUJ0blwiKTtcblxuXHRjbG9zZUVkaXRGb3JtQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0ZWRpdFRvZG9Gb3JtLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblx0XHRvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblx0fSk7XG5cblx0cHJvamVjdEZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZlbnQpID0+IHtcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0Y29uc3QgdGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3RUaXRsZVwiKS52YWx1ZTtcblx0XHRjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdERlc2NyaXB0aW9uXCIpLnZhbHVlO1xuXG5cdFx0Y29uc3QgbmV3UHJvamVjdCA9IHtcblx0XHRcdHRpdGxlOiB0aXRsZSxcblx0XHRcdGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvbixcblx0XHRcdHRvZG9zOiBbXSxcblx0XHRcdGFkZE5ld1RvZG8odG9kbykge1xuXHRcdFx0XHR0aGlzLnRvZG9zLnB1c2godG9kbyk7XG5cdFx0XHR9LFxuXHRcdFx0cmVtb3ZlVG9kbyh0b2RvKSB7XG5cdFx0XHRcdGNvbnN0IGluZGV4ID0gdGhpcy50b2Rvcy5pbmRleE9mKHRvZG8pO1xuXHRcdFx0XHR0aGlzLnRvZG9zLnNwbGljZShpbmRleCwgMSk7XG5cdFx0XHR9LFxuXHRcdFx0dXBkYXRlVG9kbyh0b2RvLCBuZXdUb2RvKSB7XG5cdFx0XHRcdGNvbnN0IGluZGV4ID0gdGhpcy50b2Rvcy5pbmRleE9mKHRvZG8pO1xuXHRcdFx0XHR0aGlzLnRvZG9zLnNwbGljZShpbmRleCwgMSwgbmV3VG9kbyk7XG5cdFx0XHR9LFxuXHRcdH07XG5cblx0XHRTdG9yYWdlLnByb2plY3RzLnB1c2gobmV3UHJvamVjdCk7XG5cdFx0RG9tTWFuaXB1bGF0aW9uLmRpc3BsYXkoU3RvcmFnZS5wcm9qZWN0cy5sZW5ndGggLSAxKTtcblxuXHRcdHByb2plY3RGb3JtLnJlc2V0KCk7XG5cdFx0YWRkUHJvamVjdEZvcm0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXHRcdG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXHR9KTtcblxuXHRmdW5jdGlvbiBjcmVhdGV0b2RvRWxlbWVudCh0b2RvLCBwcm9qZWN0KSB7XG5cdFx0Y29uc3QgdG9kb0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG5cdFx0dG9kb0VsZW1lbnQuY2xhc3NOYW1lID0gXCJ0b2RvXCI7XG5cblx0XHRjb25zdCBsZWZ0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRsZWZ0RGl2LmNsYXNzTmFtZSA9IFwibGVmdFwiO1xuXG5cdFx0Y29uc3QgY2hlY2tib3hEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdGNoZWNrYm94RGl2LmNsYXNzTmFtZSA9IFwiY2hlY2tib3hcIjtcblx0XHRjaGVja2JveERpdi50ZXh0Q29udGVudCA9IFwi4pyU77iPXCI7XG5cblx0XHRjb25zdCB0b2RvTmFtZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0dG9kb05hbWVEaXYuY2xhc3NOYW1lID0gXCJ0b2RvLW5hbWVcIjtcblx0XHR0b2RvTmFtZURpdi50ZXh0Q29udGVudCA9IHRvZG8udGl0bGU7XG5cblx0XHRsZWZ0RGl2LmFwcGVuZENoaWxkKGNoZWNrYm94RGl2KTtcblx0XHRsZWZ0RGl2LmFwcGVuZENoaWxkKHRvZG9OYW1lRGl2KTtcblxuXHRcdGNvbnN0IHJpZ2h0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRyaWdodERpdi5jbGFzc05hbWUgPSBcInJpZ2h0XCI7XG5cblx0XHRjb25zdCBkZXRhaWxzQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcblx0XHRkZXRhaWxzQnV0dG9uLmNsYXNzTmFtZSA9IFwiZGV0YWlsc1wiO1xuXHRcdGRldGFpbHNCdXR0b24udGV4dENvbnRlbnQgPSB0b2RvLmRlc2NyaXB0aW9uO1xuXG5cdFx0Y29uc3QgZGF0ZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0ZGF0ZURpdi5jbGFzc05hbWUgPSBcImRhdGVcIjtcblx0XHRkYXRlRGl2LnRleHRDb250ZW50ID0gdG9kby5kdWVEYXRlO1xuXG5cdFx0Y29uc3QgYnRuQ29udGFpbmVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRidG5Db250YWluZXJEaXYuY2xhc3NOYW1lID0gXCJidG4tY29udGFpbmVyXCI7XG5cblx0XHRjb25zdCBlZGl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcblx0XHRlZGl0QnV0dG9uLmNsYXNzTmFtZSA9IFwiZWRpdFwiO1xuXHRcdGVkaXRCdXR0b24udGV4dENvbnRlbnQgPSBcIkVkaXRcIjtcblx0XHRlZGl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcblx0XHRcdG9wZW5FZGl0VG9kb0Zvcm0odG9kbywgcHJvamVjdCk7XG5cdFx0fSk7XG5cblx0XHRjb25zdCBkZWxldGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXHRcdGRlbGV0ZUJ1dHRvbi5jbGFzc05hbWUgPSBcImRlbGV0ZVwiO1xuXHRcdGRlbGV0ZUJ1dHRvbi50ZXh0Q29udGVudCA9IFwiRGVsZXRlXCI7XG5cdFx0ZGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcblx0XHRcdHByb2plY3QucmVtb3ZlVG9kbyh0b2RvKTtcblx0XHRcdGRpc3BsYXkobmV3VG9kb0J0bi5kYXRhc2V0LnZhbHVlKTtcblx0XHR9KTtcblxuXHRcdGJ0bkNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZChlZGl0QnV0dG9uKTtcblx0XHRidG5Db250YWluZXJEaXYuYXBwZW5kQ2hpbGQoZGVsZXRlQnV0dG9uKTtcblxuXHRcdHJpZ2h0RGl2LmFwcGVuZENoaWxkKGRldGFpbHNCdXR0b24pO1xuXHRcdHJpZ2h0RGl2LmFwcGVuZENoaWxkKGRhdGVEaXYpO1xuXHRcdHJpZ2h0RGl2LmFwcGVuZENoaWxkKGJ0bkNvbnRhaW5lckRpdik7XG5cblx0XHR0b2RvRWxlbWVudC5hcHBlbmRDaGlsZChsZWZ0RGl2KTtcblx0XHR0b2RvRWxlbWVudC5hcHBlbmRDaGlsZChyaWdodERpdik7XG5cblx0XHR0b2RvTGlzdC5hcHBlbmRDaGlsZCh0b2RvRWxlbWVudCk7XG5cdH1cblxuXHRmdW5jdGlvbiBjcmVhdGVQcm9qZWN0RWxlbWVudChwcm9qZWN0LCBpbmRleCkge1xuXHRcdGNvbnN0IHByb2plY3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuXHRcdHByb2plY3RJdGVtLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LWxpc3QtZWxlbWVudFwiKTtcblxuXHRcdGNvbnN0IHByb2plY3ROYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG5cdFx0cHJvamVjdE5hbWUudGV4dENvbnRlbnQgPSBwcm9qZWN0LnRpdGxlO1xuXHRcdHByb2plY3ROYW1lLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LW5hbWVcIik7XG5cdFx0cHJvamVjdEl0ZW0uYXBwZW5kQ2hpbGQocHJvamVjdE5hbWUpO1xuXG5cdFx0Y29uc3QgcHJvamVjdERlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRwcm9qZWN0RGVzY3JpcHRpb24uY2xhc3NMaXN0LmFkZChcInByb2plY3QtZGVzY3JpcHRpb25cIik7XG5cdFx0cHJvamVjdERlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gcHJvamVjdC5kZXNjcmlwdGlvbjtcblx0XHRwcm9qZWN0SXRlbS5hcHBlbmRDaGlsZChwcm9qZWN0RGVzY3JpcHRpb24pO1xuXG5cdFx0Y29uc3QgZGVsZXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcblx0XHRkZWxldGVCdXR0b24udGV4dENvbnRlbnQgPSBcIlhcIjtcblx0XHRkZWxldGVCdXR0b24uY2xhc3NMaXN0LmFkZChcImRlbGV0ZS1wcm9qZWN0LWJ0blwiKTtcblx0XHRwcm9qZWN0SXRlbS5hcHBlbmRDaGlsZChkZWxldGVCdXR0b24pO1xuXG5cdFx0cHJvamVjdExpc3RET00uYXBwZW5kQ2hpbGQocHJvamVjdEl0ZW0pO1xuXG5cdFx0cHJvamVjdEl0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblx0XHRcdGRpc3BsYXkoaW5kZXgpO1xuXHRcdFx0bmV3VG9kb0J0bi5kYXRhc2V0LnZhbHVlID0gaW5kZXg7XG5cdFx0fSk7XG5cdFx0ZGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0U3RvcmFnZS5wcm9qZWN0cy5zcGxpY2UoaW5kZXgsIDEpO1xuXHRcdFx0RG9tTWFuaXB1bGF0aW9uLmRpc3BsYXkobmV3VG9kb0J0bi5kYXRhc2V0LnZhbHVlKTtcblx0XHR9KTtcblx0fVxuXG5cdGNvbnN0IGhvbWVQcm9qZWN0SGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyIGgyXCIpO1xuXHRob21lUHJvamVjdEhlYWRlci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdERvbU1hbmlwdWxhdGlvbi5kaXNwbGF5KG51bGwpO1xuXHRcdG5ld1RvZG9CdG4uZGF0YXNldC52YWx1ZSA9IG51bGw7XG5cdH0pO1xuXG5cdGZ1bmN0aW9uIGRpc3BsYXkocHJvamVjdEluZGV4KSB7XG5cdFx0cHJvamVjdExpc3RET00uaW5uZXJIVE1MID0gXCJcIjtcblx0XHRTdG9yYWdlLnByb2plY3RzLmZvckVhY2goKHByb2plY3QsIGluZGV4KSA9PiB7XG5cdFx0XHRjcmVhdGVQcm9qZWN0RWxlbWVudChwcm9qZWN0LCBpbmRleCk7XG5cdFx0fSk7XG5cdFx0dG9kb0xpc3QuaW5uZXJIVE1MID0gXCJcIjtcblxuXHRcdGlmIChwcm9qZWN0SW5kZXggPT09IG51bGwpIHtcblx0XHRcdFN0b3JhZ2UucHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xuXHRcdFx0XHRwcm9qZWN0LnRvZG9zLmZvckVhY2goKHRvZG8pID0+IHtcblx0XHRcdFx0XHRjcmVhdGV0b2RvRWxlbWVudCh0b2RvLCBwcm9qZWN0KTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHRcdG5ld1RvZG9CdG4uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCBjdXJyZW50UHJvamVjdCA9IFN0b3JhZ2UucHJvamVjdHNbcHJvamVjdEluZGV4XTtcblx0XHRcdGN1cnJlbnRQcm9qZWN0LnRvZG9zLmZvckVhY2goKHRvZG8pID0+IHtcblx0XHRcdFx0Y3JlYXRldG9kb0VsZW1lbnQodG9kbywgY3VycmVudFByb2plY3QpO1xuXHRcdFx0fSk7XG5cdFx0XHRuZXdUb2RvQnRuLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHsgZGlzcGxheSB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgRG9tTWFuaXB1bGF0aW9uO1xuIiwiY29uc3QgU3RvcmFnZSA9ICgoKSA9PiB7XG5cdGNvbnN0IHByb2plY3RzID0gW1xuXHRcdHtcblx0XHRcdHRpdGxlOiBcIk9uZSBQcm9qZWN0XCIsXG5cdFx0XHRkZXNjcmlwdGlvbjogXCJQcm9qZWN0IERlc2NyaXB0aW9uXCIsXG5cdFx0XHR0b2RvczogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGl0bGU6IFwidG9kbyAxXCIsXG5cdFx0XHRcdFx0ZGVzY3JpcHRpb246IFwidG9kbyBEZXNjcmlwdGlvbiAxXCIsXG5cdFx0XHRcdFx0ZHVlRGF0ZTogXCIyMDIzLTA4LTE1XCIsXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aXRsZTogXCJ0b2RvIDJcIixcblx0XHRcdFx0XHRkZXNjcmlwdGlvbjogXCJ0b2RvIERlc2NyaXB0aW9uIDJcIixcblx0XHRcdFx0XHRkdWVEYXRlOiBcIjIwMjMtMDgtMjBcIixcblx0XHRcdFx0fSxcblx0XHRcdF0sXG5cdFx0XHRhZGROZXdUb2RvKHRvZG8pIHtcblx0XHRcdFx0dGhpcy50b2Rvcy5wdXNoKHRvZG8pO1xuXHRcdFx0fSxcblx0XHRcdHJlbW92ZVRvZG8odG9kbykge1xuXHRcdFx0XHRjb25zdCBpbmRleCA9IHRoaXMudG9kb3MuaW5kZXhPZih0b2RvKTtcblx0XHRcdFx0aWYgKGluZGV4ICE9PSAtMSkge1xuXHRcdFx0XHRcdHRoaXMudG9kb3Muc3BsaWNlKGluZGV4LCAxKTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdHVwZGF0ZVRvZG8odG9kbywgbmV3VG9kbykge1xuXHRcdFx0XHRjb25zdCBpbmRleCA9IHRoaXMudG9kb3MuaW5kZXhPZih0b2RvKTtcblx0XHRcdFx0aWYgKGluZGV4ICE9PSAtMSkge1xuXHRcdFx0XHRcdHRoaXMudG9kb3Muc3BsaWNlKGluZGV4LCAxLCBuZXdUb2RvKTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHR9LFxuXHRcdHtcblx0XHRcdHRpdGxlOiBcIlR3byBQcm9qZWN0XCIsXG5cdFx0XHRkZXNjcmlwdGlvbjogXCJQcm9qZWN0IERlc2NyaXB0aW9uXCIsXG5cdFx0XHR0b2RvczogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGl0bGU6IFwidG9kbyAyLTFcIixcblx0XHRcdFx0XHRkZXNjcmlwdGlvbjogXCJ0b2RvIERlc2NyaXB0aW9uIDFcIixcblx0XHRcdFx0XHRkdWVEYXRlOiBcIjIwMjMtMDgtMTVcIixcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRpdGxlOiBcInRvZG8gMi0yXCIsXG5cdFx0XHRcdFx0ZGVzY3JpcHRpb246IFwidG9kbyBEZXNjcmlwdGlvbiAyXCIsXG5cdFx0XHRcdFx0ZHVlRGF0ZTogXCIyMDIzLTA4LTIwXCIsXG5cdFx0XHRcdH0sXG5cdFx0XHRdLFxuXHRcdFx0YWRkTmV3VG9kbyh0b2RvKSB7XG5cdFx0XHRcdHRoaXMudG9kb3MucHVzaCh0b2RvKTtcblx0XHRcdH0sXG5cdFx0XHRyZW1vdmVUb2RvKHRvZG8pIHtcblx0XHRcdFx0Y29uc3QgaW5kZXggPSB0aGlzLnRvZG9zLmluZGV4T2YodG9kbyk7XG5cdFx0XHRcdGlmIChpbmRleCAhPT0gLTEpIHtcblx0XHRcdFx0XHR0aGlzLnRvZG9zLnNwbGljZShpbmRleCwgMSk7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHR1cGRhdGVUb2RvKHRvZG8sIG5ld1RvZG8pIHtcblx0XHRcdFx0Y29uc3QgaW5kZXggPSB0aGlzLnRvZG9zLmluZGV4T2YodG9kbyk7XG5cdFx0XHRcdGlmIChpbmRleCAhPT0gLTEpIHtcblx0XHRcdFx0XHR0aGlzLnRvZG9zLnNwbGljZShpbmRleCwgMSwgbmV3VG9kbyk7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0fSxcblx0XTtcblx0cmV0dXJuIHsgcHJvamVjdHMgfTtcbn0pKCk7XG5leHBvcnQgZGVmYXVsdCBTdG9yYWdlO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgRG9tTWFuaXB1bGF0aW9uIGZyb20gXCIuL21vZHVsZXMvZG9tXCI7XG5Eb21NYW5pcHVsYXRpb24uZGlzcGxheShudWxsKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
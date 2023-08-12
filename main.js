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
/* harmony import */ var _todo_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todo.js */ "./src/modules/todo.js");
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./storage.js */ "./src/modules/storage.js");
/* harmony import */ var _project_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./project.js */ "./src/modules/project.js");




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
		_storage_js__WEBPACK_IMPORTED_MODULE_1__["default"].projects[newTodoBtn.dataset.value].addNewTodo(newTodo);
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
				this.todos.splice(index, 1);
			},
			updateTodo(todo, newTodo) {
				const index = this.todos.indexOf(todo);
				this.todos.splice(index, 1, newTodo);
			},
		};
		_storage_js__WEBPACK_IMPORTED_MODULE_1__["default"].projects.push(newProject);
		newTodoBtn.dataset.value = _storage_js__WEBPACK_IMPORTED_MODULE_1__["default"].projects.length - 1;
		display(_storage_js__WEBPACK_IMPORTED_MODULE_1__["default"].projects.length - 1);
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
		_storage_js__WEBPACK_IMPORTED_MODULE_1__["default"].projects.forEach((project, index) => {
			createProjectElement(project, index);
		});
		todoList.innerHTML = "";
		const currentProject = _storage_js__WEBPACK_IMPORTED_MODULE_1__["default"].projects[projectIndex];
		currentProject.todos.forEach((todo) => {
			createtodoElement(todo, currentProject);
		});
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
	constructor(title, description, todoList, index) {
		this.title = title;
		this.description = description;
		if (todoList === null) this.todoList = [];
		else this.todoList = todos;
		this.index = index;
	}
	addNewTodo(todo) {
		this.todoList.push(todo);
	}
	removeTodo(todo) {
		this.todoList.splice(this.todoList.indexOf(todo), 1);
	}
	updateTodo(todo, newTodo) {
		this.todoList.splice(this.todoList.indexOf(todo), 1, newTodo);
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
	constructor(title, details, dueDate, priority) {
		this.title = title;
		this.details = details;
		this.dueDate = dueDate;
		this.priority = priority;
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

_modules_dom__WEBPACK_IMPORTED_MODULE_0__["default"].display(0);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFtQjtBQUNnQjtBQUNiOztBQUV0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsbURBQU87QUFDVDtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsRUFBRSxtREFBTztBQUNULDZCQUE2QixtREFBTztBQUNwQyxVQUFVLG1EQUFPO0FBQ2pCLEVBQUU7O0FBRUY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQSxFQUFFLG1EQUFPO0FBQ1Q7QUFDQSxHQUFHO0FBQ0g7QUFDQSx5QkFBeUIsbURBQU87QUFDaEM7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQSxVQUFVO0FBQ1YsQ0FBQzs7QUFFRCxpRUFBZSxlQUFlLEVBQUM7Ozs7Ozs7Ozs7Ozs7OztBQzlIaEI7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLEdBQUc7QUFDSDtBQUNBLFVBQVU7QUFDVixDQUFDO0FBQ0QsaUVBQWUsT0FBTyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUNuRVI7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ1BBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNONEM7QUFDNUMsb0RBQWUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2RvbS5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3Byb2plY3QuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9zdG9yYWdlLmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvdG9kby5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL3NjcmlwdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXCIuL3RvZG8uanNcIjtcbmltcG9ydCBTdG9yYWdlIGZyb20gXCIuL3N0b3JhZ2UuanNcIjtcbmltcG9ydCBcIi4vcHJvamVjdC5qc1wiO1xuXG5jb25zdCBEb21NYW5pcHVsYXRpb24gPSAoKCkgPT4ge1xuXHRjb25zdCB0b2RvTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1saXN0XCIpO1xuXHRjb25zdCBwcm9qZWN0c0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdHMtY29udGFpbmVyXCIpO1xuXHRjb25zdCBwcm9qZWN0TGlzdERPTSA9IHByb2plY3RzQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCJ1bFwiKTtcblxuXHRjb25zdCBuZXdUb2RvQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuZXctdG9kby1idG5cIik7XG5cdG5ld1RvZG9CdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblx0XHRjb25zdCBuZXdUb2RvID0ge1xuXHRcdFx0dGl0bGU6IFwiTmV3IFRvZG9cIixcblx0XHRcdGRlc2NyaXB0aW9uOiBcIlRvZG8gRGVzY3JpcHRpb25cIixcblx0XHRcdGR1ZURhdGU6IFwiMjAyMy0wOC0xNVwiLFxuXHRcdH07XG5cdFx0U3RvcmFnZS5wcm9qZWN0c1tuZXdUb2RvQnRuLmRhdGFzZXQudmFsdWVdLmFkZE5ld1RvZG8obmV3VG9kbyk7XG5cdFx0ZGlzcGxheShuZXdUb2RvQnRuLmRhdGFzZXQudmFsdWUpO1xuXHR9KTtcblxuXHRjb25zdCBuZXdQcm9qZWN0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuZXctcHJvamVjdC1idG5cIik7XG5cdG5ld1Byb2plY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblx0XHRjb25zdCBuZXdQcm9qZWN0ID0ge1xuXHRcdFx0dGl0bGU6IFwiT25lIFByb2plY3RcIixcblx0XHRcdGRlc2NyaXB0aW9uOiBcIlByb2plY3QgRGVzY3JpcHRpb25cIixcblx0XHRcdHRvZG9zOiBbXSxcblx0XHRcdGFkZE5ld1RvZG8odG9kbykge1xuXHRcdFx0XHR0aGlzLnRvZG9zLnB1c2godG9kbyk7XG5cdFx0XHR9LFxuXHRcdFx0cmVtb3ZlVG9kbyh0b2RvKSB7XG5cdFx0XHRcdGNvbnN0IGluZGV4ID0gdGhpcy50b2Rvcy5pbmRleE9mKHRvZG8pO1xuXHRcdFx0XHR0aGlzLnRvZG9zLnNwbGljZShpbmRleCwgMSk7XG5cdFx0XHR9LFxuXHRcdFx0dXBkYXRlVG9kbyh0b2RvLCBuZXdUb2RvKSB7XG5cdFx0XHRcdGNvbnN0IGluZGV4ID0gdGhpcy50b2Rvcy5pbmRleE9mKHRvZG8pO1xuXHRcdFx0XHR0aGlzLnRvZG9zLnNwbGljZShpbmRleCwgMSwgbmV3VG9kbyk7XG5cdFx0XHR9LFxuXHRcdH07XG5cdFx0U3RvcmFnZS5wcm9qZWN0cy5wdXNoKG5ld1Byb2plY3QpO1xuXHRcdG5ld1RvZG9CdG4uZGF0YXNldC52YWx1ZSA9IFN0b3JhZ2UucHJvamVjdHMubGVuZ3RoIC0gMTtcblx0XHRkaXNwbGF5KFN0b3JhZ2UucHJvamVjdHMubGVuZ3RoIC0gMSk7XG5cdH0pO1xuXG5cdGZ1bmN0aW9uIGNyZWF0ZXRvZG9FbGVtZW50KHRvZG8sIHByb2plY3QpIHtcblx0XHRjb25zdCB0b2RvRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcblx0XHR0b2RvRWxlbWVudC5jbGFzc05hbWUgPSBcInRvZG9cIjtcblxuXHRcdGNvbnN0IGxlZnREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdGxlZnREaXYuY2xhc3NOYW1lID0gXCJsZWZ0XCI7XG5cblx0XHRjb25zdCBjaGVja2JveERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0Y2hlY2tib3hEaXYuY2xhc3NOYW1lID0gXCJjaGVja2JveFwiO1xuXHRcdGNoZWNrYm94RGl2LnRleHRDb250ZW50ID0gXCLinJTvuI9cIjtcblxuXHRcdGNvbnN0IHRvZG9OYW1lRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHR0b2RvTmFtZURpdi5jbGFzc05hbWUgPSBcInRvZG8tbmFtZVwiO1xuXHRcdHRvZG9OYW1lRGl2LnRleHRDb250ZW50ID0gdG9kby50aXRsZTtcblxuXHRcdGxlZnREaXYuYXBwZW5kQ2hpbGQoY2hlY2tib3hEaXYpO1xuXHRcdGxlZnREaXYuYXBwZW5kQ2hpbGQodG9kb05hbWVEaXYpO1xuXG5cdFx0Y29uc3QgcmlnaHREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdHJpZ2h0RGl2LmNsYXNzTmFtZSA9IFwicmlnaHRcIjtcblxuXHRcdGNvbnN0IGRldGFpbHNCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXHRcdGRldGFpbHNCdXR0b24uY2xhc3NOYW1lID0gXCJkZXRhaWxzXCI7XG5cdFx0ZGV0YWlsc0J1dHRvbi50ZXh0Q29udGVudCA9IHRvZG8uZGVzY3JpcHRpb247XG5cblx0XHRjb25zdCBkYXRlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRkYXRlRGl2LmNsYXNzTmFtZSA9IFwiZGF0ZVwiO1xuXHRcdGRhdGVEaXYudGV4dENvbnRlbnQgPSB0b2RvLmR1ZURhdGU7XG5cblx0XHRjb25zdCBidG5Db250YWluZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdGJ0bkNvbnRhaW5lckRpdi5jbGFzc05hbWUgPSBcImJ0bi1jb250YWluZXJcIjtcblxuXHRcdGNvbnN0IGVkaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXHRcdGVkaXRCdXR0b24uY2xhc3NOYW1lID0gXCJlZGl0XCI7XG5cdFx0ZWRpdEJ1dHRvbi50ZXh0Q29udGVudCA9IFwiRWRpdFwiO1xuXG5cdFx0Y29uc3QgZGVsZXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcblx0XHRkZWxldGVCdXR0b24uY2xhc3NOYW1lID0gXCJkZWxldGVcIjtcblx0XHRkZWxldGVCdXR0b24udGV4dENvbnRlbnQgPSBcIkRlbGV0ZVwiO1xuXHRcdGRlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG5cdFx0XHRwcm9qZWN0LnJlbW92ZVRvZG8odG9kbyk7XG5cdFx0XHRkaXNwbGF5KG5ld1RvZG9CdG4uZGF0YXNldC52YWx1ZSk7XG5cdFx0fSk7XG5cblx0XHRidG5Db250YWluZXJEaXYuYXBwZW5kQ2hpbGQoZWRpdEJ1dHRvbik7XG5cdFx0YnRuQ29udGFpbmVyRGl2LmFwcGVuZENoaWxkKGRlbGV0ZUJ1dHRvbik7XG5cblx0XHRyaWdodERpdi5hcHBlbmRDaGlsZChkZXRhaWxzQnV0dG9uKTtcblx0XHRyaWdodERpdi5hcHBlbmRDaGlsZChkYXRlRGl2KTtcblx0XHRyaWdodERpdi5hcHBlbmRDaGlsZChidG5Db250YWluZXJEaXYpO1xuXG5cdFx0dG9kb0VsZW1lbnQuYXBwZW5kQ2hpbGQobGVmdERpdik7XG5cdFx0dG9kb0VsZW1lbnQuYXBwZW5kQ2hpbGQocmlnaHREaXYpO1xuXG5cdFx0dG9kb0xpc3QuYXBwZW5kQ2hpbGQodG9kb0VsZW1lbnQpO1xuXHR9XG5cblx0ZnVuY3Rpb24gY3JlYXRlUHJvamVjdEVsZW1lbnQocHJvamVjdCwgaW5kZXgpIHtcblx0XHRjb25zdCBwcm9qZWN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcblx0XHRwcm9qZWN0SXRlbS50ZXh0Q29udGVudCA9IHByb2plY3QudGl0bGU7XG5cdFx0cHJvamVjdExpc3RET00uYXBwZW5kQ2hpbGQocHJvamVjdEl0ZW0pO1xuXHRcdHByb2plY3RJdGVtLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LWxpc3QtZWxlbWVudFwiKTtcblx0XHRwcm9qZWN0SXRlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdFx0ZGlzcGxheShpbmRleCk7XG5cdFx0XHRuZXdUb2RvQnRuLmRhdGFzZXQudmFsdWUgPSBpbmRleDtcblx0XHR9KTtcblx0fVxuXG5cdGZ1bmN0aW9uIGRpc3BsYXkocHJvamVjdEluZGV4KSB7XG5cdFx0cHJvamVjdExpc3RET00uaW5uZXJIVE1MID0gXCJcIjtcblx0XHRTdG9yYWdlLnByb2plY3RzLmZvckVhY2goKHByb2plY3QsIGluZGV4KSA9PiB7XG5cdFx0XHRjcmVhdGVQcm9qZWN0RWxlbWVudChwcm9qZWN0LCBpbmRleCk7XG5cdFx0fSk7XG5cdFx0dG9kb0xpc3QuaW5uZXJIVE1MID0gXCJcIjtcblx0XHRjb25zdCBjdXJyZW50UHJvamVjdCA9IFN0b3JhZ2UucHJvamVjdHNbcHJvamVjdEluZGV4XTtcblx0XHRjdXJyZW50UHJvamVjdC50b2Rvcy5mb3JFYWNoKCh0b2RvKSA9PiB7XG5cdFx0XHRjcmVhdGV0b2RvRWxlbWVudCh0b2RvLCBjdXJyZW50UHJvamVjdCk7XG5cdFx0fSk7XG5cdH1cblxuXHRyZXR1cm4geyBkaXNwbGF5IH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBEb21NYW5pcHVsYXRpb247XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9qZWN0IHtcblx0Y29uc3RydWN0b3IodGl0bGUsIGRlc2NyaXB0aW9uLCB0b2RvTGlzdCwgaW5kZXgpIHtcblx0XHR0aGlzLnRpdGxlID0gdGl0bGU7XG5cdFx0dGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuXHRcdGlmICh0b2RvTGlzdCA9PT0gbnVsbCkgdGhpcy50b2RvTGlzdCA9IFtdO1xuXHRcdGVsc2UgdGhpcy50b2RvTGlzdCA9IHRvZG9zO1xuXHRcdHRoaXMuaW5kZXggPSBpbmRleDtcblx0fVxuXHRhZGROZXdUb2RvKHRvZG8pIHtcblx0XHR0aGlzLnRvZG9MaXN0LnB1c2godG9kbyk7XG5cdH1cblx0cmVtb3ZlVG9kbyh0b2RvKSB7XG5cdFx0dGhpcy50b2RvTGlzdC5zcGxpY2UodGhpcy50b2RvTGlzdC5pbmRleE9mKHRvZG8pLCAxKTtcblx0fVxuXHR1cGRhdGVUb2RvKHRvZG8sIG5ld1RvZG8pIHtcblx0XHR0aGlzLnRvZG9MaXN0LnNwbGljZSh0aGlzLnRvZG9MaXN0LmluZGV4T2YodG9kbyksIDEsIG5ld1RvZG8pO1xuXHR9XG59XG4iLCJjb25zdCBTdG9yYWdlID0gKCgpID0+IHtcblx0Y29uc3QgcHJvamVjdHMgPSBbXG5cdFx0e1xuXHRcdFx0dGl0bGU6IFwiT25lIFByb2plY3RcIixcblx0XHRcdGRlc2NyaXB0aW9uOiBcIlByb2plY3QgRGVzY3JpcHRpb25cIixcblx0XHRcdHRvZG9zOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aXRsZTogXCJ0b2RvIDFcIixcblx0XHRcdFx0XHRkZXNjcmlwdGlvbjogXCJ0b2RvIERlc2NyaXB0aW9uIDFcIixcblx0XHRcdFx0XHRkdWVEYXRlOiBcIjIwMjMtMDgtMTVcIixcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRpdGxlOiBcInRvZG8gMlwiLFxuXHRcdFx0XHRcdGRlc2NyaXB0aW9uOiBcInRvZG8gRGVzY3JpcHRpb24gMlwiLFxuXHRcdFx0XHRcdGR1ZURhdGU6IFwiMjAyMy0wOC0yMFwiLFxuXHRcdFx0XHR9LFxuXHRcdFx0XSxcblx0XHRcdGFkZE5ld1RvZG8odG9kbykge1xuXHRcdFx0XHR0aGlzLnRvZG9zLnB1c2godG9kbyk7XG5cdFx0XHR9LFxuXHRcdFx0cmVtb3ZlVG9kbyh0b2RvKSB7XG5cdFx0XHRcdGNvbnN0IGluZGV4ID0gdGhpcy50b2Rvcy5pbmRleE9mKHRvZG8pO1xuXHRcdFx0XHRpZiAoaW5kZXggIT09IC0xKSB7XG5cdFx0XHRcdFx0dGhpcy50b2Rvcy5zcGxpY2UoaW5kZXgsIDEpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0dXBkYXRlVG9kbyh0b2RvLCBuZXdUb2RvKSB7XG5cdFx0XHRcdGNvbnN0IGluZGV4ID0gdGhpcy50b2Rvcy5pbmRleE9mKHRvZG8pO1xuXHRcdFx0XHRpZiAoaW5kZXggIT09IC0xKSB7XG5cdFx0XHRcdFx0dGhpcy50b2Rvcy5zcGxpY2UoaW5kZXgsIDEsIG5ld1RvZG8pO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0dGl0bGU6IFwiVHdvIFByb2plY3RcIixcblx0XHRcdGRlc2NyaXB0aW9uOiBcIlByb2plY3QgRGVzY3JpcHRpb25cIixcblx0XHRcdHRvZG9zOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aXRsZTogXCJ0b2RvIDItMVwiLFxuXHRcdFx0XHRcdGRlc2NyaXB0aW9uOiBcInRvZG8gRGVzY3JpcHRpb24gMVwiLFxuXHRcdFx0XHRcdGR1ZURhdGU6IFwiMjAyMy0wOC0xNVwiLFxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGl0bGU6IFwidG9kbyAyLTJcIixcblx0XHRcdFx0XHRkZXNjcmlwdGlvbjogXCJ0b2RvIERlc2NyaXB0aW9uIDJcIixcblx0XHRcdFx0XHRkdWVEYXRlOiBcIjIwMjMtMDgtMjBcIixcblx0XHRcdFx0fSxcblx0XHRcdF0sXG5cdFx0XHRhZGROZXdUb2RvKHRvZG8pIHtcblx0XHRcdFx0dGhpcy50b2Rvcy5wdXNoKHRvZG8pO1xuXHRcdFx0fSxcblx0XHRcdHJlbW92ZVRvZG8odG9kbykge1xuXHRcdFx0XHRjb25zdCBpbmRleCA9IHRoaXMudG9kb3MuaW5kZXhPZih0b2RvKTtcblx0XHRcdFx0aWYgKGluZGV4ICE9PSAtMSkge1xuXHRcdFx0XHRcdHRoaXMudG9kb3Muc3BsaWNlKGluZGV4LCAxKTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdHVwZGF0ZVRvZG8odG9kbywgbmV3VG9kbykge1xuXHRcdFx0XHRjb25zdCBpbmRleCA9IHRoaXMudG9kb3MuaW5kZXhPZih0b2RvKTtcblx0XHRcdFx0aWYgKGluZGV4ICE9PSAtMSkge1xuXHRcdFx0XHRcdHRoaXMudG9kb3Muc3BsaWNlKGluZGV4LCAxLCBuZXdUb2RvKTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHR9LFxuXHRdO1xuXHRyZXR1cm4geyBwcm9qZWN0cyB9O1xufSkoKTtcbmV4cG9ydCBkZWZhdWx0IFN0b3JhZ2U7XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBUb2RvIHtcblx0Y29uc3RydWN0b3IodGl0bGUsIGRldGFpbHMsIGR1ZURhdGUsIHByaW9yaXR5KSB7XG5cdFx0dGhpcy50aXRsZSA9IHRpdGxlO1xuXHRcdHRoaXMuZGV0YWlscyA9IGRldGFpbHM7XG5cdFx0dGhpcy5kdWVEYXRlID0gZHVlRGF0ZTtcblx0XHR0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XG5cdH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IERvbU1hbmlwdWxhdGlvbiBmcm9tIFwiLi9tb2R1bGVzL2RvbVwiO1xuRG9tTWFuaXB1bGF0aW9uLmRpc3BsYXkoMCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
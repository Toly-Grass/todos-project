// generate todos array
let todosObjects = getSavedTodos();

const filters = {
	searchText: '',
	hideFilter: false
};

// build todos <div> section and rerender it as needed
const renderTodos = function(todosObjects, filters) {
	let filteredTodosObjects = todosObjects.filter(function(todo) {
		return todo.text.toLowerCase().includes(filters.searchText);
	});

	if (filters.hideFilter) {
		filteredTodosObjects = filteredTodosObjects.filter(function(todo) {
			return !todo.completed;
		});
	}

	document.querySelector('#todos-div').innerHTML = '';

	const notCompleted_h3 = notCompletedTodosCount(todosObjects);
	document.querySelector('#todos-div').appendChild(notCompleted_h3);

	filteredTodosObjects.forEach(function(todo) {
		const todo_P = generateTodoDOM(todo);
		document.querySelector('#todos-div').appendChild(todo_P);
	});
};

renderTodos(todosObjects, filters);

// add event listener to the input element that responsible for filter todos
document.querySelector('#filter-todo').addEventListener('input', function(e) {
	filters.searchText = e.target.value;
	renderTodos(todosObjects, filters);
});

// add event listener that responsible for add new todo
document.querySelector('#addTodo-form').addEventListener('submit', function(e) {
	e.preventDefault();
	let newTodoInput = e.target.elements.newTodo;
	todosObjects.push({
        id: uuidv4(),
		text: newTodoInput.value,
		completed: false
	});
	newTodoInput.value = '';
	saveTodos(todosObjects);
	renderTodos(todosObjects, filters);
});

// add event listener that responsible for hide completed todos checkbox
document.querySelector('#hide-checkbox').addEventListener('change', function(e) {
	if (e.target.checked) {
		filters.hideFilter = true;
		renderTodos(todosObjects, filters);
	} else {
		filters.hideFilter = false;
		renderTodos(todosObjects, filters);
	}
});

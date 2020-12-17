// function to get saved todos from localstorage
const getSavedTodos = function() {
	const todosJSON = localStorage.getItem('todos');
	if (todosJSON !== null) {
		return JSON.parse(todosJSON);
	} else {
		return [];
	}
};

// function to get the number of not completed todos
const notCompletedTodosCount = function(todos) {
	const notCompleted_h3 = document.createElement('h3');
	const notCompletedCount = todos.filter(function(todo) {
		return !todo.completed;
	}).length;
	notCompleted_h3.textContent = `You have ${notCompletedCount} todos left`;
	return notCompleted_h3;
};

// function to remove todo by its id
const removeTodo = function(id) {
	const findedIndex = todosObjects.findIndex(function(todo) {
		return todo.id === id;
	});

	if (findedIndex > -1) {
		todosObjects.splice(findedIndex, 1);
	}
};

// function to reverse todo.completed for a specific todo
const toggleTodo = function(id) {
	const findedIndex = todosObjects.findIndex(function(todo) {
		return todo.id === id;
	});

	if (findedIndex > -1) {
		todosObjects[findedIndex].completed = !todosObjects[findedIndex].completed;
	}
};

// function to get the DOM element for an individual todo
const generateTodoDOM = function(todo) {
	const todos_div = document.createElement('div');
	const todo_checkbox = document.createElement('input');
	const todo_text = document.createElement('span');
	const todo_removeBTN = document.createElement('button');

	// setup todo checkbox
	todo_checkbox.setAttribute('type', 'checkbox');
	todos_div.appendChild(todo_checkbox);
	todo_checkbox.checked = todo.completed;
	todo_checkbox.addEventListener('change', function() {
		toggleTodo(todo.id);
		saveTodos(todosObjects);
		renderTodos(todosObjects, filters);
	});

	// setup todo text
	todo_text.textContent = ' ' + todo.text + ' ';
	todos_div.appendChild(todo_text);

	// setup todo remove button
	todo_removeBTN.textContent = 'x';
	todos_div.appendChild(todo_removeBTN);
	todo_removeBTN.addEventListener('click', function() {
		removeTodo(todo.id);
		saveTodos(todosObjects);
		renderTodos(todosObjects, filters);
	});

	return todos_div;
};

// function to save todos to localstorage
const saveTodos = function(todos) {
	localStorage.setItem('todos', JSON.stringify(todos));
};

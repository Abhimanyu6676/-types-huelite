"use strict";
function graphql(query, variables) {
    if (variables === void 0) { variables = {}; }
    return fetch('/admin/api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            variables: variables,
            query: query,
        }),
    }).then(function (result) {
        return result.json();
    });
}
var GET_TODOS = "\n    query GetTodos {\n      allTodos {\n        name\n        id\n      }\n    }\n  ";
var ADD_TODO = "\n    mutation AddTodo($name: String!) {\n      createTodo(data: { name: $name }) {\n        name\n        id\n      }\n    }\n  ";
var REMOVE_TODO = "\n    mutation RemoveTodo($id: ID!) {\n      deleteTodo(id: $id) {\n        name\n        id\n      }\n    }\n  ";
var DELETE_ICON = "<svg viewBox=\"0 0 14 16\" class=\"delete-icon\">\n  <title>Delete this item</title>\n  <path\n    fillRule=\"evenodd\"\n    d=\"M11 2H9c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1H2c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1v9c0 .55.45 1 1 1h7c.55 0 1-.45 1-1V5c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm-1 12H3V5h1v8h1V5h1v8h1V5h1v8h1V5h1v9zm1-10H2V3h9v1z\"\n  />\n</svg>";
function addTodo(event) {
    event.preventDefault();
    var form = event.target;
    // Find the 'add-item' input element
    var element = form.elements['add-item'];
    if (element) {
        graphql(ADD_TODO, { name: element.value }).then(fetchData);
    }
    // Clear the form
    form.reset();
}
function removeTodo(todo) {
    graphql(REMOVE_TODO, { id: todo.id }).then(fetchData);
}
function createToDoItem(todo) {
    // Create the remove button
    var removeItemButton = document.createElement('button');
    removeItemButton.classList.add('remove-item', 'js-remove-todo-button');
    removeItemButton.innerHTML = DELETE_ICON;
    // Attach an event to remove the todo
    removeItemButton.addEventListener('click', function () {
        removeTodo(todo);
    });
    // Create the list item
    var listItem = document.createElement('li');
    listItem.classList.add('list-item');
    // Add text to the listItem
    listItem.innerHTML = todo.name;
    // append the remove item button
    listItem.appendChild(removeItemButton);
    return listItem;
}
function createList(data) {
    // Create the list
    var list = document.createElement('ul');
    list.classList.add('list');
    data.allTodos.forEach(function (todo) {
        list.appendChild(createToDoItem(todo));
    });
    return list;
}
function fetchData() {
    graphql(GET_TODOS)
        .then(function (result) {
        // Clear any existing elements from the list
        document.querySelector('.results').innerHTML = '';
        // Recreate the list and append it to the .results div
        var list = createList(result.data);
        document.querySelector('.results').appendChild(list);
    })
        .catch(function (error) {
        console.log(error);
        document.querySelector('.results').innerHTML = '<p>Error</p>';
    });
}
// Replace the script tag with the app
document.getElementById('todo-app').parentNode.innerHTML = "\n<div class=\"app\">\n  <h1 class=\"main-heading\">Welcome to Keystone&nbsp;5!</h1>\n  <p class=\"intro-text\">\n    Here's a simple demo app that lets you add/remove todo items. Create a few entries, then go\n    check them out from your <a href=\"/admin\">Keystone 5 Admin UI</a>!\n  </p>\n  <hr class=\"divider\" />\n  <div class=\"form-wrapper\">\n    <h2 class=\"app-heading\">To-Do List</h2>\n    <div>\n      <form class=\"js-add-todo-form\">\n        <input required name=\"add-item\" placeholder=\"Add new item\" class=\"form-input add-item\" />\n      </form>\n    </div>\n    <div class=\"results\">\n      <p>Loading...</p>\n    </div>\n  </div>\n</div>";
// Add event listener to the form
document.querySelector('.js-add-todo-form').addEventListener('submit', addTodo);
// Fetch the initial data
fetchData();

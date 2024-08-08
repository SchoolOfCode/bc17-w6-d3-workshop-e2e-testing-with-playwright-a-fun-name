// imports all helper functions from local location
import * as apiHelpers from "./api-helpers.js";

// gets access to html nodes from the dom
const form = document.querySelector("form"); // Selects the first <form> element in the document and stores it in the `form` variable.
const todoList = document.querySelector("#todo-list"); // !! Selects the element with the ID `todo-list` and stores it in the `todoList` variable.

// adding eventListener for a submit event to the form
form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevents the default behavior of form submission, which usually causes a page reload.

    const formData = new FormData(event.target); // Creates a `FormData` object from the form's data (i.e., the data submitted by the user).
    const inputs = Object.fromEntries(formData); // Converts the FormData object into a plain object where the keys are the form's input names and the values are the input values.

    // Calls the `createTodo` helper function to create a new todo item using the form data
    const result = await apiHelpers.createTodo({
        task: inputs.task, // Uses the `task` input value from the form data as the task description.
        completed: false, // Sets the initial completion status of the task to `false`.
    });

    // Creates a new DOM element for the todo item and appends it to the todo list
    const todoItem = createViewFromTodo(result.payload); // Calls `createViewFromTodo` to create an HTML element based on the created todo item.
    todoList.append(todoItem); // Appends the new todo item element to the `todoList` element in the DOM.

    // Resets the form to its initial state
    event.target.reset(); // Clears the form inputs after the todo item is added.
});

// Function to create a DOM element representing a todo item
function createViewFromTodo(todo) {
    // Creates the container for the todo item
    const container = document.createElement("li"); // Creates a new <li> element to represent the todo item.
    container.classList.add("container"); // Adds the "container" class to the <li> element.

    // Creates the checkbox for the todo item
    const checkbox = document.createElement("input"); // Creates a new <input> element for the checkbox.
    checkbox.type = "checkbox"; // Sets the input type to "checkbox".

    // Adds an event listener for changes to the checkbox state
    checkbox.addEventListener("change", async (e) => {
        // Updates the todo item's completion status via an API call
        await apiHelpers.updateTodoById(todo.id, {
            task: todo.task, // Keeps the task description the same.
            completed: e.target.checked, // Sets the completed status based on the checkbox's checked state.
        });
        // Toggles the "completed" class based on whether the task is completed
        container.classList.toggle("completed", e.target.checked); // Adds or removes the "completed" class to the <li> based on the checkbox state.
    });

    // Creates a label for the checkbox with the task description
    const label = document.createElement("label"); // Creates a new <label> element.
    label.append(checkbox, todo.task); // Appends the checkbox and the task description to the label.

    // Creates a delete button for the todo item
    const deleteButton = document.createElement("button"); // Creates a new <button> element for deleting the todo item.
    deleteButton.textContent = "Delete"; // Sets the button's text to "Delete".

    // Adds an event listener to the delete button
    deleteButton.addEventListener("click", async () => {
        // Deletes the todo item via an API call
        await apiHelpers.deleteTodoById(todo.id); // Calls the API helper to delete the todo item by its ID.
        container.remove(); // Removes the todo item from the DOM.
    });
    deleteButton.classList.add("delete"); // Adds the "delete" class to the delete button.

    // Appends the label and delete button to the container
    container.append(label, deleteButton); // Appends the label and delete button to the <li> container element.

    return container; // Returns the constructed <li> element representing the todo item.
}

// Function to refresh and display all todos
async function refreshTodos() {
    // Retrieves all todo items from the API
    const result = await apiHelpers.getTodos(); // Calls the API helper to fetch all todo items.

    // Creates DOM elements for each todo item and appends them to the todo list
    const todoItems = result.payload.map(createViewFromTodo); // Maps each todo item to a corresponding DOM element using `createViewFromTodo`.
    todoList.append(...todoItems); // Appends all created todo item elements to the `todoList` in one operation.
}

// Calls `refreshTodos` to load and display all todos when the page first loads
await refreshTodos(); // Waits for the `refreshTodos` function to complete, ensuring all existing todo items are displayed on the page.

// gets todos from database
export async function getTodos() {
  const response = await fetch("/api/todos");
  const body = await response.json();
  return body;
}
// creates A todoItem to send to database
export async function createTodo(todo) {
  const response = await fetch("/api/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      task: todo.task,
      completed: todo.completed,
    }),
  });
  const body = await response.json();
  return body;
}
// gets todoItem from database to update it by ID
export async function updateTodoById(idToDelete, updates) {
  const response = await fetch(`/api/todos/${idToDelete}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      task: updates.task,
      completed: updates.completed,
    }),
  });
  const body = await response.json();
  return body;
}
// gets todoItem from database to delete it by ID
export async function deleteTodoById(idToDelete) {
  const response = await fetch(`/api/todos/${idToDelete}`, {
    method: "DELETE",
  });
  const body = await response.json();
  return body;
}

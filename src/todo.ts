export interface Todo {
  getTodo: () => string;
  setTodo: (callback: ((previous: string) => string) | string) => void;
  createTodo: (newTodoText: string) => void;
  updateTodo: (updatedTodoText: string) => void;
  deleteTodo: () => void;
}

function setupTodo(): Todo {
  let todo: string = "";

  function getTodo(): string {
    return todo;
  }

  function setTodo(callback: ((previous: string) => string) | string): void {
    if (!callback) {
      return;
    }

    if (typeof callback === "string") {
      todo = callback;
      return;
    }

    if (typeof callback === "function") {
      todo = callback(todo);
      return;
    }
  }

  function createTodo(newTodoText: string): void {
    if (!newTodoText.trim()) {
      return;
    }

    setTodo(newTodoText);
  }

  function updateTodo(updatedTodoText: string): void {
    const todo = getTodo();
    if (!updatedTodoText.trim() || todo === updatedTodoText) {
      return;
    }

    setTodo(updatedTodoText);
  }

  function deleteTodo(): void {
    setTodo("");
  }

  return { getTodo, setTodo, createTodo, updateTodo, deleteTodo };
}

export default setupTodo;

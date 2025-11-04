export interface T {
  text: string;
  isCompleted: boolean;
}

export interface Todo {
  getTodo: () => T;
  setTodo: (callback: ((previous: T) => T) | T) => void;
  createTodo: (newTodoText: string) => void;
  updateTodo: (updatedTodoText: string) => void;
  deleteTodo: () => void;
}

function setupTodo(): Todo {
  let todo: T = {
    text: "",
    isCompleted: false,
  };

  function getTodo(): T {
    return todo;
  }

  function setTodo(callback: ((previous: T) => T) | T): void {
    if (!callback) {
      return;
    }

    if (
      typeof callback === "object" &&
      "text" in callback &&
      "isCompleted" in callback
    ) {
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

    setTodo({
      text: newTodoText,
      isCompleted: false,
    });
  }

  function updateTodo(updatedTodoText: string): void {
    const todo = getTodo();
    if (!updatedTodoText.trim() || todo.text === updatedTodoText) {
      return;
    }

    setTodo({
      text: updatedTodoText,
      isCompleted: false,
    });
  }

  function deleteTodo(): void {
    setTodo({
      text: "",
      isCompleted: false,
    });
  }

  return { getTodo, setTodo, createTodo, updateTodo, deleteTodo };
}

export default setupTodo;

function setupTodos() {
  let todos: Array<string> = [];

  function getTodos(): Array<string> {
    return todos;
  }

  function setTodos(
    callback: Array<string> | ((previous: Array<string>) => Array<string>),
  ): void {
    if (!callback || (Array.isArray(callback) && callback.length === 0)) {
      return;
    }

    if (Array.isArray(callback) && callback.length > 0) {
      todos = callback;
    }

    if (typeof callback === "function") {
      todos = callback(todos);
    }
  }

  function pushTodo(newTodo: string): number {
    return todos.push(newTodo);
  }

  return { getTodos, setTodos, pushTodo };
}

const Todos = setupTodos();

export default Todos;

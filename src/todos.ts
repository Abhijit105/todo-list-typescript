function setupTodos() {
  let todos: {
    previous: Array<string>;
    current: Array<string>;
  } = {
    previous: [],
    current: [],
  };
  const todosDivEl = document.querySelector(".todos");

  function getTodos(): Array<string> {
    return todos.current;
  }

  function setTodos(
    callback: Array<string> | ((previous: Array<string>) => Array<string>),
  ): void {
    if (!callback || (Array.isArray(callback) && callback.length === 0)) {
      return;
    }

    todos.previous = todos.current.slice();

    if (Array.isArray(callback) && callback.length > 0) {
      todos.current = callback;
    }

    if (typeof callback === "function") {
      todos.current = callback(todos.current);
    }
  }

  function pushTodo(newTodo: string): number {
    todos.previous = todos.current.slice();
    return todos.current.push(newTodo);
  }

  function removeTodo(index: number): void {
    todos.previous = todos.current.slice();
    setTodos(
      (previous: Array<string>): Array<string> =>
        previous.filter((_: string, i: number) => i !== index),
    );
    renderTodos();
  }

  function renderTodos(): void {
    if (!todos || !Array.isArray(todos.current) || todos.current.length === 0) {
      return;
    }

    if (
      todos.current.length === todos.previous.length &&
      todos.current.every(
        (todo: string, index: number) => todo === todos.previous[index],
      )
    ) {
      return;
    }

    todosDivEl!.innerHTML = "";

    todos.current.forEach((todo: string, index: number): void => {
      const todoDivEl = document.createElement("div");
      todoDivEl!.setAttribute("class", "todo");
      const todoTextPEl = document.createElement("p");
      todoTextPEl.setAttribute("class", "todo-text");
      todoTextPEl!.textContent = todo;
      const todoDeleteBtn = document.createElement("button");
      todoDeleteBtn.setAttribute("class", "btn");
      todoDeleteBtn.setAttribute("id", "todo-delete");
      todoDeleteBtn.textContent = "Delete";
      todoDeleteBtn.addEventListener("click", () => removeTodo(index));
      todoDivEl!.append(todoTextPEl, todoDeleteBtn);
      todosDivEl!.appendChild(todoDivEl);
    });
  }

  return { getTodos, setTodos, pushTodo, renderTodos, removeTodo };
}

const Todos = setupTodos();

export default Todos;

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

  function editTodo(index: number): void {
    if (index === null || index === undefined) {
      return;
    }

    renderTodos(index);
  }

  function removeTodo(index: number): void {
    todos.previous = todos.current.slice();
    setTodos(
      (previous: Array<string>): Array<string> =>
        previous.filter((_: string, i: number): boolean => i !== index),
    );
    renderTodos();
  }

  function renderTodos(editIndex?: number): void {
    if (!todos || !Array.isArray(todos.current)) {
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

    if (todos.current.length === 0) {
      return;
    }

    todos.current.forEach((todo: string, index: number): void => {
      if (
        typeof editIndex === "number" &&
        editIndex >= 0 &&
        editIndex < todos.current.length
      ) {
        const todoDivEl = document.createElement("div");
        todoDivEl!.setAttribute("class", "todo");
        const todoTextarea = document.createElement("textarea");
        todoTextarea!.setAttribute("class", "todo-textarea");
        const todoUpdateBtn = document.createElement("button");
        todoUpdateBtn!.setAttribute("class", "btn");
        todoUpdateBtn!.textContent = "Update";
        todoUpdateBtn!.addEventListener("click", () => {
          // @ts-ignore
          const todoText = todoTextarea!.value as string;
          if (todoText === todos.current[index]) {
            return;
          }

          todos.previous = todos.current.slice();
          setTodos(
            (previous: Array<string>): Array<string> =>
              previous.map((todo: string, i: number): string =>
                index !== i ? todo : todoText,
              ),
          );
          renderTodos();
        });
        todoDivEl.append(todoTextarea, todoUpdateBtn);
        todosDivEl!.append(todoDivEl);
        return;
      }

      const todoDivEl = document.createElement("div");
      todoDivEl!.setAttribute("class", "todo");
      const todoTextPEl = document.createElement("p");
      todoTextPEl.setAttribute("class", "todo-text");
      todoTextPEl!.textContent = todo;
      const todoButtonsDivEl = document.createElement("div");
      todoButtonsDivEl!.setAttribute("class", "todo-buttons");
      const todoEditBtn = document.createElement("button");
      todoEditBtn.setAttribute("class", "btn");
      todoEditBtn.setAttribute("id", "todo-edit");
      todoEditBtn.textContent = "Edit";
      todoEditBtn.addEventListener("click", () => editTodo(index));
      const todoDeleteBtn = document.createElement("button");
      todoDeleteBtn.setAttribute("class", "btn");
      todoDeleteBtn.setAttribute("id", "todo-delete");
      todoDeleteBtn.textContent = "Delete";
      todoDeleteBtn.addEventListener("click", () => removeTodo(index));
      todoButtonsDivEl.append(todoEditBtn, todoDeleteBtn);
      todoDivEl!.append(todoTextPEl, todoButtonsDivEl);
      todosDivEl!.appendChild(todoDivEl);
    });
  }

  return { getTodos, setTodos, pushTodo, renderTodos, editTodo, removeTodo };
}

const Todos = setupTodos();

export default Todos;

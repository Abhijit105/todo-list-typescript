import setupTodo from "./todo.ts";
import type { Todo } from "./todo.ts";

function setupTodos() {
  let todos: {
    previous: Array<Todo>;
    current: Array<Todo>;
  } = {
    previous: [],
    current: [],
  };
  const todosDivEl = document.querySelector(".todos");

  function getTodos(): Array<Todo> {
    return todos.current;
  }

  function setTodos(
    callback: Array<Todo> | ((previous: Array<Todo>) => Array<Todo>),
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

  function pushTodo(newTodoText: string): number {
    todos.previous = todos.current.slice();
    const newTodo = setupTodo();
    newTodo.createTodo(newTodoText);
    return todos.current.push(newTodo);
  }

  function editTodo(index: number): void {
    if (index === null || index === undefined) {
      return;
    }

    renderTodos(index);
  }

  function removeTodo(index: number): void {
    setTodos(
      (previous: Array<Todo>): Array<Todo> =>
        previous.filter((_: Todo, i: number): boolean => i !== index),
    );
    renderTodos();
  }

  function renderTodos(editIndex?: number): void {
    if (!todos || !Array.isArray(todos.current)) {
      return;
    }

    if (
      todos.current.length === todos.previous.length &&
      todos.current.every((todo: Todo, index: number) => {
        console.log(todo === todos.previous[index]);
        return todo === todos.previous[index];
      })
    ) {
      console.log("shit");
      return;
    }

    todosDivEl!.innerHTML = "";

    if (todos.current.length === 0) {
      return;
    }

    todos.current.forEach((todo: Todo, index: number): void => {
      if (
        typeof editIndex === "number" &&
        editIndex >= 0 &&
        editIndex < todos.current.length &&
        editIndex === index
      ) {
        const todoDivEl = document.createElement("div");
        todoDivEl!.setAttribute("class", "todo");
        const todoTextarea = document.createElement("textarea");
        todoTextarea!.setAttribute("class", "todo-textarea");
        todoTextarea!.value = todo.getTodo();
        todoTextarea!.addEventListener("keydown", (event) => {
          if (event.key === "Enter") {
            // @ts-ignore
            const todoText = todoTextarea!.value as string;
            todos.current[index].updateTodo(todoText);
            renderTodos();
          } else if (event.key === "Escape") {
            renderTodos();
          }
        });
        const todoButtonsDivEl = document.createElement("div");
        todoButtonsDivEl!.setAttribute("class", "todo-buttons");
        const todoUpdateBtn = document.createElement("button");
        todoUpdateBtn!.setAttribute("class", "btn");
        todoUpdateBtn!.textContent = "Update";
        todoUpdateBtn!.addEventListener("click", (): void => {
          // @ts-ignore
          const todoText = todoTextarea!.value as string;
          todos.current[index].updateTodo(todoText);
          renderTodos();
        });
        const todoCancelBtn = document.createElement("button");
        todoCancelBtn!.setAttribute("class", "btn");
        todoCancelBtn!.textContent = "Cancel";
        todoCancelBtn!.addEventListener("click", (): void => {
          renderTodos();
        });
        todoButtonsDivEl!.append(todoUpdateBtn, todoCancelBtn);
        todoDivEl.append(todoTextarea, todoButtonsDivEl);
        todosDivEl!.append(todoDivEl);
        return;
      }

      const todoDivEl = document.createElement("div");
      todoDivEl!.setAttribute("class", "todo");
      const todoTextPEl = document.createElement("p");
      todoTextPEl.setAttribute("class", "todo-text");
      todoTextPEl!.textContent = todo.getTodo();
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

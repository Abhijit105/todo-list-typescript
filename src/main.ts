import Todos from "./todos.ts";

const { getTodos, setTodos, pushTodo, renderTodos } = Todos;

const todoTextarea = document.getElementById("todo-textarea");
const todoAddBtn = document.getElementById("todo-add");

const handleAddTodo = function (): void {
  if (!todoTextarea) {
    return;
  }

  // @ts-ignore
  const todoText = todoTextarea.value as string;
  if (!todoText.trim()) {
    return;
  }

  const todos = getTodos();
  if (todos.includes(todoText)) {
    return;
  }

  pushTodo(todoText);
  renderTodos();
  // @ts-ignore
  todoTextarea!.value = "";
  todoTextarea!.blur();
};

todoAddBtn!.addEventListener("click", handleAddTodo);
todoTextarea!.addEventListener("keydown", (event: KeyboardEvent) => {
  const { key } = event;
  if (key === "Enter") {
    handleAddTodo();
  }
});

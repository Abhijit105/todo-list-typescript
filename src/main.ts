import Todos from "./todos.ts";

const { getTodos, setTodos, pushTodo } = Todos;

const todosDivEl = document.querySelector(".todos");
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

  pushTodo(todoText);
};

todoAddBtn!.addEventListener("click", handleAddTodo);
todoTextarea!.addEventListener("keydown", (event: KeyboardEvent) => {
  const { key } = event;
  if (key === "Enter") {
    handleAddTodo();
  }
});

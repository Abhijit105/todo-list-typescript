import { createTodoTextareaEl } from "./view.ts";

const mainEl = document.querySelector("main");

function init(): void {
  if (!mainEl) {
    return;
  }

  const todoTextareaElAttributes = {
    type: "text",
    name: "todo",
    id: "todo-input",
    class: "todo-input",
  };
  createTodoTextareaEl(mainEl, todoTextareaElAttributes);
}

init();

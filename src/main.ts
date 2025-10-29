import { createTodoInputEl } from "./view.ts";

const mainEl = document.querySelector("main");

function init(): void {
  if (!mainEl) {
    return;
  }

  const todoInputEl = createTodoInputEl(mainEl);
}

init();

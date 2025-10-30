import { createTodoAddDivEl } from "./view.ts";

const mainEl = document.querySelector("main");
const todoAddDivEl = createTodoAddDivEl();

function init(): void {
  if (!mainEl) {
    return;
  }

  if (todoAddDivEl) {
    mainEl!.appendChild(todoAddDivEl);
  }
}

init();

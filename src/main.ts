import { createEl } from "./view.ts";

const mainEl = document.querySelector("main");

function init(): void {
  if (!mainEl) {
    return;
  }

  const todoAddElAttributes = {
    class: "todo-add",
  };
  const todoAddEl = createEl(mainEl, "div", todoAddElAttributes);

  const todoTextareaElAttributes = {
    type: "text",
    name: "todo",
    id: "todo-input",
    class: "todo-input",
  };
  createEl(todoAddEl, "textarea", todoTextareaElAttributes);

  const todoBtnAttributes = {
    class: "btn",
  };
  createEl(todoAddEl, "button", todoBtnAttributes, "Add Todo");
}

init();

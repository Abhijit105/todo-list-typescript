function createEl(
  elementTag: string,
):
  | ((
      parent?: HTMLElement | null,
      attributes?: Record<string, string>,
      textContent?: string,
    ) => HTMLElement)
  | null {
  if (!elementTag) {
    return null;
  }

  return function (
    parent?: HTMLElement | null,
    attributes?: Record<string, string>,
    textContent?: string,
  ): HTMLElement {
    const el = document.createElement(elementTag);
    if (attributes) {
      for (const key of Object.keys(attributes)) {
        el.setAttribute(key, attributes[key]);
      }
    }

    if (textContent) {
      el!.textContent = textContent;
    }

    if (parent) {
      parent.appendChild(el);
    }

    return el;
  };
}

const createDivEl = createEl("div");
const createTextarea = createEl("textarea");
const createBtn = createEl("button");

function createTodoAddDivEl(): HTMLElement | null {
  if (!createDivEl || !createTextarea || !createBtn) {
    return null;
  }

  const todoAddDivElAttributes = {
    class: "todo-add",
  };
  const todoAddDivEl = createDivEl(null, todoAddDivElAttributes);

  const todoAddTextareaAttributes = {
    class: "todo-textarea",
    id: "todo-textarea",
  };
  createTextarea(todoAddDivEl, todoAddTextareaAttributes);

  const todoAddBtnAttributes = {
    class: "btn",
    id: "todo-btn",
  };
  createBtn(todoAddDivEl, todoAddBtnAttributes, "Add");

  return todoAddDivEl;
}

export { createTodoAddDivEl };

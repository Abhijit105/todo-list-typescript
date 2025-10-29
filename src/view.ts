function createTodoInputEl(
  parent: HTMLElement,
  attributes?: Record<string, string>,
  textContent?: string,
): HTMLElement {
  const todoInputEl = document.createElement("input");

  if (attributes) {
    for (const key of Object.keys(attributes)) {
      todoInputEl.setAttribute(key, attributes[key]);
    }
  }

  if (textContent) {
    todoInputEl!.textContent = textContent;
  }

  parent.appendChild(todoInputEl);
  return todoInputEl;
}

export { createTodoInputEl };

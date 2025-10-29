function createTodoInputEl(
  parent: HTMLElement,
  attributes?: Record<string, string>,
): void {
  const todoInputEl = document.createElement("input");
  if (attributes) {
    for (const key of Object.keys(attributes)) {
      todoInputEl.setAttribute(key, attributes[key]);
    }
  }

  parent.appendChild(todoInputEl);
}

export { createTodoInputEl };

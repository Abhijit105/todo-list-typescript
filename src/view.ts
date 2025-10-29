function createTodoTextareaEl(
  parent: HTMLElement,
  attributes?: Record<string, string>,
  textContent?: string,
): HTMLElement {
  const el = document.createElement("textarea");

  if (attributes) {
    for (const key of Object.keys(attributes)) {
      el.setAttribute(key, attributes[key]);
    }
  }

  if (textContent) {
    el!.textContent = textContent;
  }

  parent.appendChild(el);
  return el;
}

export { createTodoTextareaEl };

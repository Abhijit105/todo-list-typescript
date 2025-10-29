function createEl(
  parent: HTMLElement | null,
  elementTag: string,
  attributes?: Record<string, string>,
  textContent?: string,
): HTMLElement | null {
  if (!parent || !elementTag) {
    return null;
  }

  const el = document.createElement(elementTag);
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

export { createEl };

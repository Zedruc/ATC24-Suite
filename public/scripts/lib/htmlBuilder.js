function buildHtmlFromTree(element) {
  let created = document.createElement(element.type);

  if (element?.class) created.className = element.class;
  if (element?.text) created.textContent = element.text;

  if (element?.attributes?.length > 0) {
    for (const attribute of element.attributes) {
      created.setAttribute(attribute.name, attribute.value);
    }
  }

  if (element?.children?.length > 0) {
    for (const child of element.children) {
      let newChild = buildHtmlFromTree(child);
      created.appendChild(newChild);
    }
  }

  return created;
}

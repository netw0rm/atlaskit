function setupComponent(Component) {
  const component = new Component();
  document.body.appendChild(component);
  return component;
}

function tearDownComponent(component) {
  document.body.removeChild(component);
}

export { setupComponent, tearDownComponent };

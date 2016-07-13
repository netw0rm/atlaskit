const ReactDOM = window.ReactDOM;

export function getWebComponent(reactComponent) {
  if (!reactComponent) {
    return null;
  }

  return ReactDOM.findDOMNode(reactComponent);
}

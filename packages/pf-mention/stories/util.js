import ReactDOM from 'react-dom';

export function getWebComponent(reactComponent) {
  if (!reactComponent) {
    return null;
  }

  return ReactDOM.findDOMNode(reactComponent); // eslint-disable-line react/no-find-dom-node
}

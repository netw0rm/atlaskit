import ReactDOM from 'react-dom';

// eslint-disable-next-line import/prefer-default-export
export function getWebComponent(reactComponent) {
  if (!reactComponent) {
    return null;
  }

  return ReactDOM.findDOMNode(reactComponent); // eslint-disable-line react/no-find-dom-node
}

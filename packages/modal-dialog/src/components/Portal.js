import { createElement, Children, Component } from 'react';
import { render } from 'react-dom'; // eslint-disable-line

function FirstChild({ children }) {
  const childArr = Children.toArray(children);
  return childArr[0] || null;
}

export default class Portal extends Component {
  portalElement = null // eslint-disable-line react/sort-comp
  componentDidMount() {
    const node = document.createElement('span');
    document.body.appendChild(node);
    this.portalElement = node;
    this.componentDidUpdate();
  }
  componentDidUpdate() {
    render(
      createElement(FirstChild, this.props),
      this.portalElement
    );
  }
  componentWillUnmount() {
    document.body.removeChild(this.portalElement);
  }
  render() {
    return null;
  }
}

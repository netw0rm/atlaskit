import React, { PropTypes, PureComponent } from 'react';
import ReactDOM from 'react-dom';

/*
 * Simple implementation of popup while waiting for ak-inline-dialog
 */
export default class Popup extends PureComponent {
  static propTypes = {
    target: PropTypes.string.isRequired,
    relativePosition: PropTypes.oneOf(['above', 'below', 'auto']),
    offsetX: PropTypes.number,
    offsetY: PropTypes.number,
    zIndex: PropTypes.number,
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node,
    ]),
  };

  static defaultProps = {
    relativePosition: 'auto',
    offsetX: 0,
    offsetY: 0,
    zIndex: 0,
  };

  componentDidMount() {
    this.popup = document.createElement('div');
    document.body.appendChild(this.popup);
    this.popup.style.position = 'absolute';
    this.applyAbsolutePosition();
    this.renderContent();
  }

  componentDidUpdate() {
    this.renderContent();
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.popup);
    document.body.removeChild(this.popup);
  }

  // Internal
  applyBelowPosition() {
    const targetNode = document.querySelector(this.props.target);
    const box = targetNode.getBoundingClientRect();
    const top = box.bottom + this.props.offsetY;
    const left = box.left + this.props.offsetX;
    this.popup.style.top = `${top}px`;
    this.popup.style.bottom = '';
    this.popup.style.left = `${left}px`;
  }

  applyAbovePosition() {
    const targetNode = document.querySelector(this.props.target);
    const box = targetNode.getBoundingClientRect();
    const bottom = (window.innerHeight - box.top) + this.props.offsetY;
    const left = box.left + this.props.offsetX;
    this.popup.style.top = '';
    this.popup.style.bottom = `${bottom}px`;
    this.popup.style.left = `${left}px`;
  }

  applyAbsolutePosition() {
    if (this.props.relativePosition === 'above') {
      this.applyAbovePosition();
    } else if (this.props.relativePosition === 'below') {
      this.applyBelowPosition();
    } else {
      const targetNode = document.querySelector(this.props.target);
      const box = targetNode.getBoundingClientRect();
      const viewPortHeight = window.innerHeight;
      if (box.top < viewPortHeight / 2) {
        this.applyBelowPosition();
      } else {
        this.applyAbovePosition();
      }
    }
    if (this.props.zIndex) {
      this.popup.style.zIndex = this.props.zIndex;
    }
  }

  renderContent() {
    ReactDOM.render(this.props.children, this.popup);
  }

  render() {
    // Placeholder element for react to render inplace
    return <div />;
  }
}

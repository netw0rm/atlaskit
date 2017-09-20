// @flow
import { PureComponent } from 'react';

const target = document.body;

let scrollLocksActive = 0;
const styleKeys = ['boxSizing', 'height', 'overflow', 'paddingRight', 'position'];
const originalStyles = {};
styleKeys.forEach(key => (originalStyles[key] = target.style[key]));

const lockStyles = {
  boxSizing: 'border-box', // account for possible `width: 100%;` declaration on body
  height: '100%',
  overflow: 'hidden',
  position: 'relative',
};

function applyScrollLock() {
  // apply the target padding if this is the first scroll lock applied
  if (scrollLocksActive < 1) {
    const newPaddingRight = (window.innerWidth - document.body.clientWidth)
      + parseInt(originalStyles.paddingRight, 10) || 0;
    Object.keys(lockStyles).forEach(rule => (target.style[rule] = lockStyles[rule]));
    target.style.paddingRight = `${newPaddingRight}px`;
  }
  scrollLocksActive++;
}

function removeScrollLock() {
  scrollLocksActive = Math.max(scrollLocksActive - 1, 0);
  if (scrollLocksActive < 1) {
    styleKeys.forEach(rule => (target.style[rule] = originalStyles[rule]));
  }
}

export default class ScrollLock extends PureComponent {
  componentDidMount() {
    applyScrollLock(this.props);
  }
  componentWillUnmount() {
    removeScrollLock();
  }
  render() {
    return null;
  }
}

// @flow
import { PureComponent } from 'react';

const STYLE_KEYS = ['boxSizing', 'height', 'overflow', 'paddingRight', 'position'];
const LOCK_STYLES = {
  boxSizing: 'border-box', // account for possible declaration `width: 100%;` on body
  overflow: 'hidden',
  position: 'relative',
  height: '100%',
};

let activeScrollLocks = 0;

export default class ScrollLock extends PureComponent {
  originalStyles = {} // eslint-disable-line react/sort-comp
  componentDidMount() {
    const target = document.body;

    // store any styles already applied to the body
    STYLE_KEYS.forEach(key => {
      const val = target.style[key];
      this.originalStyles[key] = val;
    });

    // apply the target padding if this is the first scroll lock
    if (activeScrollLocks < 1) {
      const currentPadding = parseInt(this.originalStyles.paddingRight, 10);
      const adjustedPadding = (window.innerWidth - document.body.clientWidth) + currentPadding || 0;

      Object.keys(LOCK_STYLES).forEach(key => {
        const val = LOCK_STYLES[key];
        target.style[key] = val;
      });

      target.style.paddingRight = `${adjustedPadding}px`;
    }

    // increment active scroll locks
    activeScrollLocks++;
  }
  componentWillUnmount() {
    const target = document.body;

    // safely decrement active scroll locks
    activeScrollLocks = Math.max(activeScrollLocks - 1, 0);

    // reapply original body styles, if any
    if (activeScrollLocks < 1) {
      STYLE_KEYS.forEach(key => {
        const val = this.originalStyles[key];
        target.style[key] = val;
      });
    }
  }
  render() {
    return null;
  }
}

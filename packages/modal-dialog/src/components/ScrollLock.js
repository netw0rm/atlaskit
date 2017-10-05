// @flow
import { PureComponent } from 'react';

const STYLE_KEYS = ['boxSizing', 'height', 'overflow', 'paddingRight', 'position'];
const LOCK_STYLES = {
  boxSizing: 'border-box', // account for possible declaration `width: 100%;` on body
  overflow: 'hidden',
  position: 'relative',
  height: '100%',
};

type Props = {
  /**
    Account for scrollbars; add padding to stop content jumping around when
    overflow is hidden on the body.
  */
  detectScrollbars?: boolean,
};

export default class ScrollLock extends PureComponent {
  props: Props // eslint-disable-line react/sort-comp
  originalStyles = {}
  static defaultProps = { detectScrollbars: true }
  componentDidMount() {
    const target = document.body;
    const scrollbarWidth = window.innerWidth - document.body.clientWidth;

    // keep any styles already applied to the body
    STYLE_KEYS.forEach(key => (this.originalStyles[key] = target.style[key]));

    if (this.props.detectScrollbars) {
      target.style.paddingRight = `${scrollbarWidth}px`;
    }

    Object.keys(LOCK_STYLES).forEach(rule => {
      const val = LOCK_STYLES[rule];
      target.style[rule] = val;
    });
  }
  componentWillUnmount() {
    const target = document.body;

    // reapply original body styles, if any
    STYLE_KEYS.forEach(rule => (target.style[rule] = this.originalStyles[rule]));
  }
  render() {
    return null;
  }
}

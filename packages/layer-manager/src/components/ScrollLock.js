// @flow
import { PureComponent } from 'react';

type Props = {
  /**
    Account for scrollbars; add padding to stop content jumping around when
    overflow is hidden on the body.
  */
  detectScrollbars?: boolean,
};

const styles = {
  boxSizing: 'border-box', // account for possible `width: 100%;` declaration on body
  overflow: 'hidden',
  position: 'relative',
  height: '100%',
};
const styleKeys = Object.keys(styles);

export default class ScrollLock extends PureComponent {
  props: Props // eslint-disable-line react/sort-comp
  target = document.body
  static defaultProps = { detectScrollbars: true }
  componentDidMount() {
    const scrollbarWidth = window.innerWidth - document.body.clientWidth;

    if (this.props.detectScrollbars) {
      this.target.style.paddingRight = `${scrollbarWidth}px`;
    }

    styleKeys.forEach(rule => {
      const val = styles[rule];
      this.target.style[rule] = val;
    });
  }
  componentWillUnmount() {
    if (this.props.detectScrollbars) {
      this.target.style.paddingRight = '';
    }
    styleKeys.forEach(rule => (this.target.style[rule] = ''));
  }
  render() {
    return null;
  }
}

// @flow
import { PureComponent } from 'react';

type Props = {
  /**
    Account for scrollbars; add padding to stop content jumping around when
    overflow is hidden on the body.
  */
  detectScrollbars?: boolean,
};

export default class ScrollLock extends PureComponent {
  props: Props // eslint-disable-line react/sort-comp
  defaultProps = { detectScrollbars: true }
  target = document.body
  componentDidMount() {
    const scrollbarWidth = window.innerWidth - document.body.clientWidth;
    if (this.props.detectScrollbars) {
      this.target.style.paddingRight = `${scrollbarWidth}px`;
    }

    this.target.style.overflowY = 'hidden';
  }
  componentWillUnmount() {
    if (this.props.detectScrollbars) {
      this.target.style.paddingRight = '';
    }

    this.target.style.overflowY = '';
  }
  render() {
    return null;
  }
}

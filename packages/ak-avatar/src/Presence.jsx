import React, { PureComponent, PropTypes } from 'react';
import presences from './internal/icons';
import values from './internal/presences';

export default class Presence extends PureComponent {
  static displayName = 'Presence';
  static propTypes = {
    children: PropTypes.element,
    presence: PropTypes.oneOf(values),
  }

  static defaultProps = {
    presence: 'none',
  }

  render() {
    if (this.props.children) {
      return this.props.children;
    }
    const PresenceToDisplay = presences[this.props.presence];
    return (<PresenceToDisplay />);
  }
}

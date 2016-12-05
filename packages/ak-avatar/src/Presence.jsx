import React, { PureComponent, PropTypes } from 'react';
import presences from './internal/icons';
import values from './internal/presences';

/* eslint-disable react/prefer-stateless-function */
export default class Presence extends PureComponent {
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

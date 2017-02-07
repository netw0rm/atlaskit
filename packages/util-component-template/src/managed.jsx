import React, { PureComponent, PropTypes } from 'react';
import Greeting from './unmanaged';

export default class extends PureComponent {
  static propTypes = {
    name: PropTypes.string,
  }

  onSpeak = (greeting) => {
    // eslint-disable-next-line no-alert
    window.alert(greeting);
    // could also fire a callback here to let
    // consumers know that this event occured
  }

  render() {
    return (
      <Greeting
        name={this.props.name}
        onSpeak={this.onSpeak}
      />
    );
  }
}

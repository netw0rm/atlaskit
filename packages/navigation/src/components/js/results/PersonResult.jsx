import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Avatar from '@atlaskit/avatar';

import { AkNavigationItem } from '../../../../src';

export default class PersonResult extends PureComponent {
  static propTypes = {
    avatarUrl: PropTypes.string,
    name: PropTypes.string.isRequired,
    mentionName: PropTypes.string,
    mentionPrefix: PropTypes.string,
    presenceMessage: PropTypes.string,
    presenceState: PropTypes.oneOf(['none', 'online', 'busy', 'offline']),
  }

  static defaultProps = {
    mentionPrefix: '@',
    presenceState: 'none',
  }

  getMention = () => (
    this.props.mentionName
      ? `${this.props.mentionPrefix}${this.props.mentionName}`
      : null
  );

  render() {
    const userAvatar = (
      <Avatar
        presence={this.props.presenceState}
        src={this.props.avatarUrl}
      />);

    return (
      <AkNavigationItem
        caption={this.getMention()}
        subText={this.props.presenceMessage}
        text={this.props.name}
        icon={userAvatar}
      />
    );
  }
}

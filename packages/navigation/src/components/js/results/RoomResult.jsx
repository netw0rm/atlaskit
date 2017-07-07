import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Avatar from '@atlaskit/avatar';
import LockFilledIcon from '@atlaskit/icon/glyph/lock-filled';
import WorldIcon from '@atlaskit/icon/glyph/world';

import PrivacyIconOuter from '../../styled/PrivacyIconOuter';
import { AkNavigationItem } from '../../../../src';

const privacyIcons = {
  none: null,
  private: <LockFilledIcon label="Private group" size="small" />,
  public: <WorldIcon label="Public group" size="small" />,
};

export default class RoomResult extends PureComponent {
  static propTypes = {
    avatarUrl: PropTypes.string,
    isSelected: PropTypes.bool,
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    privacy: PropTypes.oneOf(['none', 'private', 'public']),
    topic: PropTypes.string,
  }

  static defaultProps = {
    isSelected: false,
    onClick: () => {},
    privacy: 'none',
  }

  getPrivacyIcon = key => (
    privacyIcons[key]
      ? <PrivacyIconOuter>{privacyIcons[key]}</PrivacyIconOuter>
      : null
  );

  render() {
    const roomIcon = (
      <Avatar
        src={this.props.avatarUrl}
        appearance="square"
        icon={this.getPrivacyIcon(this.props.privacy)}
      />
    );
    return (
      <AkNavigationItem
        icon={roomIcon}
        isSelected={this.props.isSelected}
        onClick={() => this.props.onClick(this.props)}
        subText={this.props.topic}
        text={this.props.name}
      />
    );
  }
}

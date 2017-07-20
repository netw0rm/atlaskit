import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Avatar from '@atlaskit/avatar';

import ResultBase from './ResultBase';

const noOp = () => {};

// ===================================================================
// If adding a prop or feature that may be useful to all result types,
// add it to ResultBase instead
// ===================================================================

export default class RoomResult extends PureComponent {
  static propTypes = {
    href: PropTypes.string,
    avatarUrl: PropTypes.string,
    isHoverStylesDisabled: PropTypes.bool,
    isSelected: PropTypes.bool,
    isTabbingDisabled: PropTypes.bool,
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    privacy: PropTypes.oneOf(['none', 'private', 'public']),
    resultId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    topic: PropTypes.string,
    type: PropTypes.string.isRequired,
  }

  static defaultProps = {
    isHoverStylesDisabled: false,
    isSelected: false,
    isTabbingDisabled: false,
    onClick: noOp,
    onMouseEnter: noOp,
    onMouseLeave: noOp,
    privacy: 'none',
  }

  getAvatar = () => (
    <Avatar
      src={this.props.avatarUrl}
      appearance="square"
      status={this.props.privacy.toLowerCase() === 'private' ? 'locked' : null}
    />
  )

  render() {
    const {
      href,
      isHoverStylesDisabled,
      isSelected,
      isTabbingDisabled,
      name,
      onClick,
      onMouseEnter,
      onMouseLeave,
      resultId,
      topic,
      type,
    } = this.props;
    return (
      <ResultBase
        href={href}
        icon={this.getAvatar()}
        isHoverStylesDisabled={isHoverStylesDisabled}
        isSelected={isSelected}
        isTabbingDisabled={isTabbingDisabled}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        resultId={resultId}
        subText={topic}
        text={name}
        type={type}
      />
    );
  }
}

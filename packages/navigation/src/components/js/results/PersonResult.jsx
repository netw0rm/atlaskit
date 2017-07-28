import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Avatar from '@atlaskit/avatar';

import ResultBase from './ResultBase';

const noOp = () => {};

// ===================================================================
// If adding a prop or feature that may be useful to all result types,
// add it to ResultBase instead
// ===================================================================

export default class PersonResult extends PureComponent {
  static propTypes = {
    avatarUrl: PropTypes.string,
    href: PropTypes.string,
    isHoverStylesDisabled: PropTypes.bool,
    isSelected: PropTypes.bool,
    isTabbingDisabled: PropTypes.bool,
    mentionName: PropTypes.string,
    mentionPrefix: PropTypes.string,
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    presenceMessage: PropTypes.string,
    presenceState: PropTypes.oneOf(['online', 'busy', 'offline']),
    resultId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    type: PropTypes.string.isRequired,
  }

  static defaultProps = {
    isHoverStylesDisabled: false,
    isSelected: false,
    isTabbingDisabled: false,
    mentionPrefix: '@',
    onClick: noOp,
    onMouseEnter: noOp,
    onMouseLeave: noOp,
  }

  getMention = () => (
    this.props.mentionName
      ? `${this.props.mentionPrefix}${this.props.mentionName}`
      : null
  );

  getAvatar = () => (
    <Avatar
      presence={this.props.presenceState}
      src={this.props.avatarUrl}
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
      presenceMessage,
      resultId,
      type,
    } = this.props;
    return (
      <ResultBase
        caption={this.getMention()}
        href={href}
        icon={this.getAvatar()}
        isHoverStylesDisabled={isHoverStylesDisabled}
        isSelected={isSelected}
        isTabbingDisabled={isTabbingDisabled}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        resultId={resultId}
        subText={presenceMessage}
        text={name}
        type={type}
      />
    );
  }
}

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Avatar from '@atlaskit/avatar';

import ResultBase from './ResultBase';

const noOp = () => {};

const PERSON_RESULT_TYPE = 'person';

// ===================================================================
// If adding a prop or feature that may be useful to all result types,
// add it to ResultBase instead
// ===================================================================

export default class PersonResult extends PureComponent {
  static propTypes = {
    avatarUrl: PropTypes.string,
    href: PropTypes.string,
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
    type: PropTypes.string,
  }

  static defaultProps = {
    isSelected: false,
    isTabbingDisabled: false,
    mentionPrefix: '@',
    onClick: noOp,
    onMouseEnter: noOp,
    onMouseLeave: noOp,
    type: PERSON_RESULT_TYPE,
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

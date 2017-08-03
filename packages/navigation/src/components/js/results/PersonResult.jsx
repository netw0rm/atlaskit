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
    mentionName: PropTypes.string,
    mentionPrefix: PropTypes.string,
    name: PropTypes.string.isRequired,
    presenceMessage: PropTypes.string,
    presenceState: PropTypes.oneOf(['online', 'busy', 'offline']),
    resultId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    type: PropTypes.string,
  }

  static defaultProps = {
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
  );

  render() {
    const {
      name,
      presenceMessage,
      ...resultBaseProps
    } = this.props;
    return (
      <ResultBase
        {...resultBaseProps}
        caption={this.getMention()}
        icon={this.getAvatar()}
        subText={presenceMessage}
        text={name}
      />
    );
  }
}

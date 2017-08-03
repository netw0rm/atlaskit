import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Avatar from '@atlaskit/avatar';

import ResultBase from './ResultBase';

// ===================================================================
// If adding a prop or feature that may be useful to all result types,
// add it to ResultBase instead
// ===================================================================

/**
 * Generic result type for Atlassian containers.
 */
export default class AtlassianContainerResult extends PureComponent {
  static propTypes = {
    avatarUrl: PropTypes.string,
    isPrivate: PropTypes.bool,
    subText: PropTypes.string,
    name: PropTypes.string.isRequired,
  }

  getAvatar = () => (
    <Avatar
      src={this.props.avatarUrl}
      appearance="square"
      status={this.props.isPrivate ? 'locked' : null}
    />
  )

  render() {
    const {
      name,
      subText,
      ...resultBaseProps
    } = this.props;
    return (
      <ResultBase
        {...resultBaseProps}
        icon={this.getAvatar()}
        subText={subText}
        text={name}
      />
    );
  }
}

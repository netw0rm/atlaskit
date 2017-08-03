import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Avatar from '@atlaskit/avatar';

import ResultBase from './ResultBase';

// ===================================================================
// If adding a prop or feature that may be useful to all result types,
// add it to ResultBase instead
// ===================================================================

/**
 * Generic result type for Atlassian objects.
 */
export default class AtlassianObjectResult extends PureComponent {
  static propTypes = {
    avatarUrl: PropTypes.string,
    containerName: PropTypes.string.isRequired,
    isPrivate: PropTypes.boolean,
    objectKey: PropTypes.string,
    name: PropTypes.string.isRequired,
  }

  getAvatar = () => (
    <Avatar
      src={this.props.avatarUrl}
      appearance="square"
      status={this.props.isPrivate && 'locked'}
    />
  )

  render() {
    const {
      containerName,
      objectKey,
      name,
      ...resultBaseProps
    } = this.props;
    return (
      <ResultBase
        {...resultBaseProps}
        icon={this.getAvatar()}
        subText={`${objectKey ? `${objectKey} ` : ''}in ${containerName}`}
        text={name}
      />
    );
  }
}

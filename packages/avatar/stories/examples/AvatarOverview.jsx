import React, { PureComponent } from 'react';
import Avatar from '@atlaskit/avatar';


export default class extends PureComponent {
  render() {
    return (
      <Avatar
        src="https://design.atlassian.com/images/avatars/project-128.png"
        presence="online"
        size="large"
      />
    );
  }
}

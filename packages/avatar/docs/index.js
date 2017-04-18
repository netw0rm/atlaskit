import React, { PureComponent } from 'react';
import Avatar from '../src';

export default class Docs extends PureComponent {
  render() {
    return (
      <div>
        <div>
          Avatars represent users, and may also include a presence (online /
          offline / etc) indicator.
        </div>
        <div>
          <Avatar />
        </div>
      </div>
    );
  }
}

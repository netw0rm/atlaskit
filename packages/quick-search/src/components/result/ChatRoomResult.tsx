import * as React from 'react';
import LockCircleIcon from '@atlaskit/icon/glyph/lock-circle';
import WorldIcon from '@atlaskit/icon/glyph/world';
import { AkAvatar } from '@atlaskit/avatar';
import { Result } from './Result';

interface Props {
  /**
   * A URL to the room's avatar.
   */
  avatarUrl: string;

  /**
   * Privacy state of the room.
   */
  privacy?: 'private' | 'public';

  /**
   * Name of the room.
   */
  name: string;

  /**
   * A callback to execute when the result is selected.
   */
  onClick: () => void;
}

export class ChatRoomResult extends React.PureComponent<Props, {}> {
  render() {
    return (
      <Result
        avatar={this.avatar()}
        body={this.props.name}
        onClick={this.props.onClick}
      />
    );
  }

  private avatar(): React.ReactElement<any> {
    if (this.props.avatarUrl) {
      return <AkAvatar src={this.props.avatarUrl} size="small" />;
    } else if (this.props.privacy === 'private') {
      return <LockCircleIcon label="Private room" />;
    } else {
      return <WorldIcon label="Public room" />;
    }
  }
}

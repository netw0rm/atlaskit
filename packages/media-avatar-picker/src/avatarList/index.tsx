import * as React from 'react';
import {PureComponent} from 'react';

import {CardImageView} from '@atlaskit/media-card';
import {AvatarListWrapper} from './styled';

export interface Avatar {
  dataURI: string;
}

export interface SelectableAvatar {
  avatar: Avatar;
  selected: boolean;
}

export interface AvatarListProps {
  avatars: Array<SelectableAvatar>;
  onItemClick?: (avatar: Avatar) => void;
}

const DEFAULT_AVATAR_DIMENSIONS = {
  height: 40,
  width: 40,
};

export default class AvatarList extends PureComponent<AvatarListProps, {}> {
  static defaultProps = {
    avatars: []
  };

  render() {
    const {avatars} = this.props;

    const cards = avatars.map(
      (avatar, idx) => {
        const elementKey = `predefined-avatar-${idx}`;
        return (<li key={elementKey}>
          <CardImageView
            mediaType="image"
            dataURI={avatar.avatar.dataURI}
            selectable
            selected={avatar.selected}
            dimensions={DEFAULT_AVATAR_DIMENSIONS}
            onClick={this.createOnItemClickHandler(avatar)}
          />
        </li>);
      }
    );

    return (
      <AvatarListWrapper>
        <ul>
          {cards}
        </ul>
      </AvatarListWrapper>
    );
  }

  createOnItemClickHandler(avatar: SelectableAvatar): (event: Event) => void {
    return () => {
      const { onItemClick } = this.props;
      if (onItemClick) {
        onItemClick(avatar.avatar);
      }
    };
  }
}

import * as React from 'react';
import {PureComponent} from 'react';

import {CardImageView} from '@atlaskit/media-card';
import {AvatarListWrapper} from './styled';

export interface Avatar {
  dataURI: string;
  selected: boolean;
}

export interface AvatarListProps {
  avatars: Array<Avatar>;
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
      avatar => {
        return (<li>
          <CardImageView
            mediaType="image"
            dataURI={avatar.dataURI}
            selectable
            selected={avatar.selected}
            dimensions={DEFAULT_AVATAR_DIMENSIONS}
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
}

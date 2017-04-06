import * as React from 'react';
import {PureComponent} from 'react';

import {Avatar, default as AvatarList} from '../avatarList';

import EditorMoreIcon from '@atlaskit/icon/glyph/editor/more';
import Button from '@atlaskit/button';
import {PredefinedAvatarsWrapper} from './styled';

export interface PredefinedAvatarListProps {
  avatars: Array<Avatar>;
}

export class ShowMoreButton extends PureComponent<{}, {}> {
  render() {
    return (
      <Button
        className="show-more-button"
        iconAfter={<EditorMoreIcon label="" size="large"/>}
      />
    );
  }
}

export default class PredefinedAvatarList extends PureComponent<PredefinedAvatarListProps, {}> {
  static defaultProps = {
    avatars: []
  };

  render() {
    const {avatars} = this.props;

    return (
      <PredefinedAvatarsWrapper>
        <AvatarList avatars={avatars}/>
        <ShowMoreButton />
      </PredefinedAvatarsWrapper>
    );
  }
}

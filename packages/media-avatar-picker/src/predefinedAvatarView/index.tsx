import * as React from 'react';
import {PureComponent} from 'react';

import {CardImageView} from '@atlaskit/media-card';
import {PredefinedAvatarViewWrapper} from './styled';
import {Avatar} from '../avatarList/index';

import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left';
import Button from '@atlaskit/button';

export interface BackBtnProps {
  onClick?: () => void;
}

class BackBtn extends PureComponent<BackBtnProps, {}> {
  render() {
    return (
      <Button
        className="back-button"
        iconAfter={<ArrowLeftIcon label="" />}
        onClick={this.props.onClick}
      />
    );
  }
}

export interface PredefinedAvatarViewProps {
  avatars: Array<Avatar>;
  onGoBack?: () => void;
  onAvatarSelected?: (avatar: Avatar) => void;
}

export interface PredefinedAvatarViewState {
  selectedAvatar?: Avatar;
}

const DEFAULT_AVATAR_DIMENSIONS = {
  height: 72,
  width: 72,
};

export default class PredefinedAvatarView extends PureComponent<PredefinedAvatarViewProps, PredefinedAvatarViewState> {
  static defaultProps = {
    avatars: []
  };

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const {avatars} = this.props;

    const cards = avatars.map(
      (avatar, idx) => {
        const elementKey = `predefined-avatar-${idx}`;
        return (<li key={elementKey}>
          <CardImageView
            mediaType="image"
            dataURI={avatar.dataURI}
            dimensions={DEFAULT_AVATAR_DIMENSIONS}
            onClick={this.createOnItemClickHandler(avatar)}
            selectable
            selected={avatar === this.state.selectedAvatar}
          />
        </li>);
      }
    );

    return (
      <PredefinedAvatarViewWrapper>
        <div className="header">
          <BackBtn onClick={this.props.onGoBack} /><div className="description">Default avatars</div>
        </div>
        <ul>
          {cards}
        </ul>
      </PredefinedAvatarViewWrapper>
    );
  }

  createOnItemClickHandler(avatar: Avatar): (event: Event) => void {
    return () => {
      const { onAvatarSelected } = this.props;
      if (onAvatarSelected) {
        onAvatarSelected(avatar);
      }

      this.setState(state => {
        return {...state, selectedAvatar: avatar};
      });
    };
  }
}

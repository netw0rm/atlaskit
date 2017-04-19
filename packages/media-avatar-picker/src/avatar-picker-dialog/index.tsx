import * as React from 'react';
import {PureComponent} from 'react';

import ModalDialog from '@atlaskit/modal-dialog';
import Button from '@atlaskit/button';

import {Avatar} from '../avatar-list';
import {ImageNavigator} from '../image-navigator';
import {PredefinedAvatarList} from '../predefined-avatar-list';

import {AvatarPickerViewWrapper} from './styled';
import {PredefinedAvatarView} from '../predefined-avatar-view';
import {tallImage} from '@atlaskit/media-test-helpers';

export interface AvatarPickerDialogProps {
  avatars: Array<Avatar>;
}

export enum Mode {
  Cropping,
  PredefinedAvatars,
}

export interface AvatarPickerDialogState {
  mode: Mode;
}

export class AvatarPickerDialog extends PureComponent<AvatarPickerDialogProps, AvatarPickerDialogState> {
  static defaultProps = {
    avatars: []
  };

  constructor() {
    super();

    this.state = {mode: Mode.Cropping};

    this.onShowMore = this.onShowMore.bind(this);
    this.onGoBack = this.onGoBack.bind(this);
  }

  render() {
    return (
      <ModalDialog
        width="352"
        header="Upload an avatar"
        footer={
          <div>
            <Button appearance="primary">Save</Button>
            <Button appearance="subtle-link">Cancel</Button>
          </div>
        }
        isOpen
      >
        <AvatarPickerViewWrapper>
          {this.renderContent()}
        </AvatarPickerViewWrapper>
      </ModalDialog>
    );
  }

  renderContent() {
    switch (this.state.mode) {
      case Mode.Cropping:
        return (
          <div className="cropping-wrapper">
            <div className="cropper">
              <ImageNavigator imageSource={tallImage}/>
            </div>
            <div className="predefined-avatars">
              <PredefinedAvatarList
                avatars={this.props.avatars.slice(0, 5)}
                onShowMore={this.onShowMore}
              />
            </div>
          </div>
        );
      case Mode.PredefinedAvatars:
        return (
          <div className="predefined-avatars-wrapper">
            <PredefinedAvatarView
              avatars={this.props.avatars}
              onGoBack={this.onGoBack}
            />
          </div>
        );
    }
  }

  onShowMore() {
    this.setState(state => {
      return {...state, mode: Mode.PredefinedAvatars};
    });
  }

  onGoBack() {
    this.setState(state => {
      return {...state, mode: Mode.Cropping};
    });
  }
}

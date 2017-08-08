import * as React from 'react';
import { PureComponent, SyntheticEvent } from 'react';
import {
  MentionProvider,
  ResourcedMention,
} from '@atlaskit/mention';

import { ProfilecardProvider } from './types';
import {
  default as AkProfilecardResourced,
  AkProfilecardTriggerActions,
} from '../../utils/profilecard';
import { MentionEventHandler } from '../Renderer';
import Popup from '../Popup';
import withOuterListeners from '../with-outer-listeners';

// tslint:disable:next-line variable-name
const ProfilecardResourcedWithListeners = withOuterListeners(AkProfilecardResourced);

export interface Props {
  id: string;
  text: string;
  accessLevel?: string;
  mentionProvider?: Promise<MentionProvider>;
  portal?: HTMLElement;
  profilecardProvider: ProfilecardProvider;
  onClick: MentionEventHandler;
  onMouseEnter: MentionEventHandler;
  onMouseLeave: MentionEventHandler;
}

export interface State {
  target: HTMLElement | null;
  visible: boolean;
}

export default class MentionWithProfileCard extends PureComponent<Props, State> {
  state: State = { target: null, visible: false };

  private handleRef = (target: HTMLElement | null) => {
    this.setState({ target });
  }

  private getActions(id: string, text: string, accessLevel?: string): AkProfilecardTriggerActions[] {
    const { profilecardProvider } = this.props;
    const actions = profilecardProvider.getActions(id, text, accessLevel);

    return actions.map((action) => {
      return {
        ...action,
        callback: (evt: SyntheticEvent<any>) => {
          this.setState({ visible: false });

          action.callback();
          evt.stopPropagation();
        }
      };
    });
  }

  private showProfilecard = () => {
    this.setState({ visible: true });
  }

  private hideProfilecard = () => {
    this.setState({ visible: false });
  }

  render() {
    const {
      accessLevel,
      id,
      mentionProvider,
      profilecardProvider,
      text,
      onClick,
      onMouseEnter,
      onMouseLeave,
      portal,
    } = this.props;

    const {
      target,
      visible,
    } = this.state;

    const {
      cloudId,
      resourceClient,
    } = profilecardProvider;

    return (
      <span
        ref={this.handleRef}
        onClick={this.showProfilecard}
      >
        <ResourcedMention
          id={id}
          text={text}
          accessLevel={accessLevel}
          mentionProvider={mentionProvider}
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
        {target && portal && visible && <Popup
          offset={[0, 8]}
          target={target}
          mountTo={portal}
        >
          <ProfilecardResourcedWithListeners
            handleClickOutside={this.hideProfilecard}
            handleEscapeKeydown={this.hideProfilecard}
            cloudId={cloudId}
            userId={id}
            resourceClient={resourceClient}
            actions={this.getActions(id, text, accessLevel)}
          />
        </Popup>}
      </span>
    );
  }
}

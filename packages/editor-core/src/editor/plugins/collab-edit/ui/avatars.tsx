import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import Spinner from '@atlaskit/spinner';
import WithPluginState from '../../../ui/WithPluginState';
import { EditorView } from '../../../../prosemirror';
import { EventDispatcher } from '../../../event-dispatcher';
import { pluginKey as collabEditPluginKey } from '../plugin';
import { getAvatarColor } from '../utils';

export interface Props {
  editorView?: EditorView;
  eventDispatcher?: EventDispatcher;
}

// tslint:disable-next-line:variable-name
const AvatarContainer: any = styled.div`
  position: absolute;
  right: 0;
`;

const itemAppear = keyframes`
0% {
  transform: scale(0);
}

50% {
  transform: scale(1.1);
}

100% {
  transform: scale(1);
}
`;

// tslint:disable-next-line:variable-name
const AvatarItem: any = styled.div`
  position: relative;
  align-self: center;

  & > div {
    animation: ${itemAppear} 500ms 1;
    animation-fill-mode: both;
  }

  &:before {
    content: '${(props: any) => props.avatar}';
    display: block;
    position: absolute;
    right: -2px;
    bottom: -2px;
    width: 13px;
    height: 6px;
    z-index: 10;
    border-radius: 3px;
    background: ${(props: any) => props.badgeColor};
    color: #fff;
    font-size: 9px;
    line-height: 0;
    padding-top: 7px;
    text-align: center;
    box-shadow: 0 0 1px #fff;


    animation: ${itemAppear} 250ms 1;
    animation-fill-mode: both;
    animation-delay: 400ms;
  }
`;

declare interface ItemProps {
  name: string;
  sessionId: string;
  email: string;
  src: string;
}

declare interface ItemState {
  Avatar?: React.ComponentClass<any>;
}

class Item extends React.Component<ItemProps, ItemState> {
  state: ItemState = {};

  componentDidMount () {
    require.ensure([], (require) => {
      // tslint:disable-next-line:variable-name
      const Avatar = require('@atlaskit/avatar').default;
      this.setState({ Avatar });
    });
  }

  render() {
    const { props } =  this;
    const { Avatar } = this.state;
    const color = getAvatarColor(props.sessionId).color.solid;
    const avatar = props.name.substr(0, 1).toUpperCase();

    return (
      <AvatarItem badgeColor={color} avatar={avatar}>
        {Avatar ? <Avatar {...props} /> : <Spinner />}
      </AvatarItem>
    );
  }
}

export interface State {
  AvatarGroup?: React.ComponentClass<any>;
}

export default class Avatars extends React.Component<Props, State> {
  state: State = {};

  componentDidMount () {
    require.ensure([], (require) => {
      const { AvatarGroup } = require('@atlaskit/avatar');
      this.setState({ AvatarGroup });
    });
  }

  private onAvatarClick = (data) => {
  }

  private renderAvatars = ({ data }) => {
    const { sessionId, activeParticipants } = data;
    const { AvatarGroup } = this.state;

    const avatars = activeParticipants.map(p => ({
      email: p.email,
      key: p.sessionId,
      name: p.name,
      src: p.avatar,
      sessionId: p.sessionId
    })).sort(p => p.sessionId === sessionId ? -1 : 1);

    return (
      <AvatarContainer>
        {AvatarGroup ?
          <AvatarGroup
            appearance="stack"
            size="medium"
            data={avatars}
            onAvatarClick={this.onAvatarClick}
            avatar={Item}
          /> : <Spinner />
        }
      </AvatarContainer>
    );
  }

  render() {
    const { eventDispatcher, editorView } = this.props;

    return (
      <WithPluginState
        editorView={editorView}
        eventDispatcher={eventDispatcher}
        plugins={{ data: collabEditPluginKey }}
        render={this.renderAvatars}
      />
    );
  }
}

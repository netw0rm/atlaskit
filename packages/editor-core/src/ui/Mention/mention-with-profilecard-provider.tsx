import * as React from 'react';
import { PureComponent } from 'react';
import {
  MentionProvider,
  ResourcedMention,
} from '@atlaskit/mention';

import { MentionEventHandlers } from '../Renderer';
import withProfilecard from './with-profilecard';
import { ProfilecardProvider } from './types';

export interface Props {
  id: string;
  text: string;
  accessLevel?: string;
  mentionProvider?: Promise<MentionProvider>;
  profilecardProvider?: Promise<ProfilecardProvider>;
  eventHandlers?: MentionEventHandlers;
}

export interface State {
  profilecardProvider: ProfilecardProvider | null;
}

const GENERIC_USER_IDS = ['HipChat', 'all', 'here'];
const noop = () => {};
// tslint:disable-next-line:variable-name
const ResourcedMentionWithProfilecard = withProfilecard(ResourcedMention);

export default class MentionWithProvider extends PureComponent<Props, State> {
  state: State = { profilecardProvider: null };

  constructor(props) {
    super(props);
    this.updateProfilecardProvider(props);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.profilecardProvider !== this.props.profilecardProvider) {
      this.updateProfilecardProvider(nextProps);
    }
  }

  private async updateProfilecardProvider(props: Props) {
    if (props.profilecardProvider) {
      try {
        const resolvedProfilecardProvider = await props.profilecardProvider;
        this.setState({ profilecardProvider: resolvedProfilecardProvider });
      } catch (err) {
        this.setState({ profilecardProvider: null });
      }
    } else {
      this.setState({ profilecardProvider: null });
    }
  }

  render() {
    const {
      accessLevel,
      eventHandlers,
      id,
      mentionProvider,
      text,
    } = this.props;

    const { profilecardProvider } = this.state;

    const actionHandlers = {};
    if (eventHandlers) {
      ['onClick', 'onMouseEnter', 'onMouseLeave'].forEach(handler => {
        actionHandlers[handler] = eventHandlers[handler] || noop;
      });
    }

    // tslint:disable-next-line:variable-name
    const MentionComponent = (profilecardProvider && GENERIC_USER_IDS.indexOf(id) === -1)
      ? ResourcedMentionWithProfilecard
      : ResourcedMention;

    return (
      <MentionComponent
        id={id}
        text={text}
        accessLevel={accessLevel}
        mentionProvider={mentionProvider}
        profilecardProvider={profilecardProvider}
        {...actionHandlers}
      />
    );
  }
}

import * as React from 'react';
import { PureComponent } from 'react';
import { MentionProvider } from '../../api/MentionResource';
import Mention, { MentionEventHandler } from './';

export interface Props {
  id: string;
  text: string;
  mentionProvider: Promise<MentionProvider>;
  nickname?: string;
  onClick?: MentionEventHandler;
  onMouseEnter?: MentionEventHandler;
  onMouseLeave?: MentionEventHandler;
}

export interface State {
  isHighlighted: boolean;
}

export default class ResourcedMention extends PureComponent<Props, State> {
  constructor(props)  {
    super(props);

    this.state = {
      isHighlighted: false
    };
  }

  componentWillMount() {
    this.handleMentionProvider(this.props);
  }

  componentWillReceiveProps(nextProps: Props) {
    const { props } = this;
    if (props.id !== nextProps.id || props.mentionProvider !== nextProps.mentionProvider) {
      this.handleMentionProvider(nextProps);
    }
  }

  private handleMentionProvider = (props: Props) => {
    const { id, mentionProvider } = props;
    mentionProvider.then(provider => {
      this.setState({
        isHighlighted: provider.shouldHighlightMention({ id })
      });
    });
  }

  render() {
    const { props, state } = this;

    return (
      <Mention
        id={props.id}
        text={props.text}
        nickname={props.nickname}
        isHighlighted={state.isHighlighted}
        onClick={props.onClick}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
      />
    );
  }
}

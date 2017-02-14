import { EmojiTypeAhead as AkEmojiTypeAhead } from '@atlaskit/emoji';
import * as React from 'react';
import { PureComponent } from 'react';
import { EmojisPluginState } from '../../plugins/emojis';

export interface Props {
  pluginState: EmojisPluginState;
  emojiService: any; // EmojiResource;
}

export interface State {
  query?: string;
  anchorElement?: HTMLElement;
}

export default class EmojiTypeAhead extends PureComponent<Props, State> {
  state: State = {};

  componentDidMount() {
    this.props.pluginState.subscribe(this.handlePluginStateChange);
    this.props.pluginState.onSelectPrevious = this.handleSelectPrevious;
    this.props.pluginState.onSelectNext = this.handleSelectNext;
    this.props.pluginState.onSelectCurrent = this.handleSelectCurrent;
  }

  componentWillUmount() {
    this.props.pluginState.unsubscribe(this.handlePluginStateChange);
  }

  private handlePluginStateChange = (state: EmojisPluginState) => {
    const { anchorElement, query } = state;
    this.setState({ anchorElement, query });
  }

  render() {
    const { anchorElement, query } = this.state;

    if (!query) {
      return <div/>;
    }

    return (
      <AkEmojiTypeAhead
        emojiService={this.props.emojiService}
        onSelection={this.handleSelectedEmoji}
        query={query}
        ref="typeAhead"
        target={anchorElement}
        position="auto"
      />
    );
  }

  private handleSelectedEmoji = (emojiId: any) => {
    this.props.pluginState.insertEmoji(emojiId);
  }

  private handleSelectPrevious = () => {
    const { typeAhead } = this.refs;
    if (typeAhead) {
      (typeAhead as AkEmojiTypeAhead).selectPrevious();
    }
  }

  private handleSelectNext = () => {
    const { typeAhead } = this.refs;
    if (typeAhead) {
      (typeAhead as AkEmojiTypeAhead).selectNext();
    }
  }

  private handleSelectCurrent = () => {
    const { typeAhead } = this.refs;
    if (typeAhead) {
      (typeAhead as AkEmojiTypeAhead).chooseCurrentSelection();
    }
  }
}

import { EmojiTypeAhead as AkEmojiTypeAhead } from '@atlaskit/emoji';
import * as React from 'react';
import { PureComponent } from 'react';
import { EmojisPluginState } from '../../plugins/emojis';

export interface Props {
  pluginState: EmojisPluginState;
  emojiService: any; // EmojiResource;
  reversePosition?: boolean;
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

    let style: any = {
      display: 'none'
    };

    if (anchorElement && query) {
      const rect = anchorElement.getBoundingClientRect();
      const parentRect = anchorElement.offsetParent.getBoundingClientRect();
      style = {
        display: 'block',
        position: 'absolute',
        left: (rect.left - parentRect.left),
        top: !this.props.reversePosition ? (rect.top - parentRect.top) + rect.height : null,
        bottom: this.props.reversePosition ? (window.innerHeight - parentRect.bottom) + 20 : null,
        zIndex: 1
      };
    }

    const typeAhead = (
      <AkEmojiTypeAhead
        emojiService={this.props.emojiService}
        onSelection={this.handleSelectedEmoji}
        query={query}
        ref="typeAhead"
      />
    );

    return (
      <div style={style}>
        {typeAhead}
      </div>
    );
  }

  private handleSelectedEmoji = (emoji: any) => {
    this.props.pluginState.insertEmoji(emoji);
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

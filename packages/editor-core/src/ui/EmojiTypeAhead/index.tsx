import { EmojiTypeAhead as AkEmojiTypeAhead } from '@atlaskit/emoji';
import * as React from 'react';
import { PureComponent } from 'react';
import { EmojiProvider } from '@atlaskit/emoji';
import { EmojiState } from '../../plugins/emojis';
import { akEditorFloatingPanelZIndex } from '../../styles';

export interface Props {
  pluginState: EmojiState;
  emojiProvider: Promise<EmojiProvider>;
  reversePosition?: boolean;
}

export interface State {
  query?: string;
  anchorElement?: HTMLElement;
  queryActive?: boolean;
}

const isEmojiTypeAhead = (typeAhead): typeAhead is AkEmojiTypeAhead => !!(typeAhead.count);

export default class EmojiTypeAhead extends PureComponent<Props, State> {
  state: State = {};

  componentDidMount() {
    const { pluginState } = this.props;
    pluginState.subscribe(this.handlePluginStateChange);
    pluginState.onSelectPrevious = this.handleSelectPrevious;
    pluginState.onSelectNext = this.handleSelectNext;
    pluginState.onSelectCurrent = this.handleSelectCurrent;
    pluginState.onTrySelectCurrent = this.handleTrySelectCurrent;
  }

  componentWillUmount() {
    this.props.pluginState.unsubscribe(this.handlePluginStateChange);
  }

  private handlePluginStateChange = (state: EmojiState) => {
    const { anchorElement, query, queryActive } = state;
    this.setState({ anchorElement, query, queryActive });
  }

  render() {
    const { anchorElement, query, queryActive } = this.state;

    let style: any = {
      display: 'none'
    };

    if (anchorElement && queryActive) {
      const rect = anchorElement.getBoundingClientRect();
      const parentRect = anchorElement.offsetParent.getBoundingClientRect();
      style = {
        display: 'block',
        position: 'absolute',
        left: (rect.left - parentRect.left),
        top: !this.props.reversePosition ? (rect.top - parentRect.top) + rect.height : null,
        bottom: this.props.reversePosition ? (window.innerHeight - parentRect.bottom) + 20 : null,
        zIndex: akEditorFloatingPanelZIndex
      };
    }

    const typeAhead = (
      <AkEmojiTypeAhead
        emojiProvider={this.props.emojiProvider}
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

  private handleSelectedEmoji = (emojiId: any, emoji: any) => {
    this.props.pluginState.insertEmoji(emojiId);
  }

  private handleSelectPrevious = (): boolean => {
    const { typeAhead } = this.refs;
    if (typeAhead) {
      (typeAhead as AkEmojiTypeAhead).selectPrevious();
    }

    return true;
  }

  private handleSelectNext = (): boolean => {
    const { typeAhead } = this.refs;
    if (typeAhead) {
      (typeAhead as AkEmojiTypeAhead).selectNext();
    }

    return true;
  }

  private handleSelectCurrent = (): boolean => {
    const { typeAhead } = this.refs;
    if (isEmojiTypeAhead(typeAhead) && typeAhead.count() > 0) {
      (typeAhead as AkEmojiTypeAhead).chooseCurrentSelection();
    } else {
      this.props.pluginState.dismiss();
    }

    return true;
  }

  private handleTrySelectCurrent = (): boolean => {
    const { typeAhead } = this.refs;
    if (isEmojiTypeAhead(typeAhead) && typeAhead.count() === 1) {
      (typeAhead as AkEmojiTypeAhead).chooseCurrentSelection();
      return true;
    }

    return false;
  }
}

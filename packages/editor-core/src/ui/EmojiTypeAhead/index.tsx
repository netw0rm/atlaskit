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
  typeAhead?: AkEmojiTypeAhead;

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
        ref={ref => {this.typeAhead = ref;}}
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
    if (this.typeAhead) {
      (this.typeAhead as AkEmojiTypeAhead).selectPrevious();
    }

    return true;
  }

  private handleSelectNext = (): boolean => {
    if (this.typeAhead) {
      (this.typeAhead as AkEmojiTypeAhead).selectNext();
    }

    return true;
  }

  private handleSelectCurrent = (): boolean => {
    if (isEmojiTypeAhead(this.typeAhead) && this.typeAhead.count() > 0) {
      (this.typeAhead as AkEmojiTypeAhead).chooseCurrentSelection();
    } else {
      this.props.pluginState.dismiss();
    }

    return true;
  }

  private handleTrySelectCurrent = (): boolean => {
    if (isEmojiTypeAhead(this.typeAhead) && this.typeAhead.count() === 1) {
      (this.typeAhead as AkEmojiTypeAhead).chooseCurrentSelection();
      return true;
    }

    return false;
  }
}

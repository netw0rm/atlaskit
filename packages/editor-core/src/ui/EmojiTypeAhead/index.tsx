import { EmojiTypeAhead as AkEmojiTypeAhead } from '@atlaskit/emoji';
import * as React from 'react';
import { PureComponent } from 'react';
import { EmojiProvider } from '@atlaskit/emoji';
import Popup from '../Popup';
import { EmojiState } from '../../plugins/emojis';

export interface Props {
  pluginState: EmojiState;
  emojiProvider: Promise<EmojiProvider>;
  reversePosition?: boolean;
  popupsBoundariesElement?: HTMLElement;
  popupsMountPoint?: HTMLElement;
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

  private handleEmojiTypeAheadRef = (ref) => {
    this.typeAhead = ref;
  }

  render() {
    const { anchorElement, query, queryActive } = this.state;
    const { popupsBoundariesElement, popupsMountPoint, emojiProvider } = this.props;

    if (!anchorElement || !queryActive) {
      return null;
    }

    return (
      <Popup
        target={anchorElement}
        fitHeight={350}
        fitWidth={350}
        boundariesElement={popupsBoundariesElement}
        mountTo={popupsMountPoint}
        offset={[0, 3]}
      >
        <AkEmojiTypeAhead
          emojiProvider={emojiProvider}
          onSelection={this.handleSelectedEmoji}
          query={query}
          ref={this.handleEmojiTypeAheadRef}
        />
      </Popup>
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
    if (this.getEmojisCount() > 0) {
      (this.typeAhead as AkEmojiTypeAhead).chooseCurrentSelection();
    } else {
      this.props.pluginState.dismiss();
    }

    return true;
  }

  private handleTrySelectCurrent = (): boolean => {
    const emojisCount = this.getEmojisCount();
    const { query } = this.state;
    if (emojisCount === 1) {
      (this.typeAhead as AkEmojiTypeAhead).chooseCurrentSelection();
      return true;
    } else if (emojisCount === 0 || !query) {
      this.props.pluginState.dismiss();
    }

    return false;
  }

  private getEmojisCount(): number {
    return isEmojiTypeAhead(this.typeAhead) && this.typeAhead.count() || 0;
  }
}

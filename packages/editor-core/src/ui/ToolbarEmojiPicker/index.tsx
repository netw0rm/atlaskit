import EmojiIcon from '@atlaskit/icon/glyph/editor/emoji';
import { akZIndexModal } from '@atlaskit/util-shared-styles';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { PureComponent } from 'react';
import ToolbarButton from '../ToolbarButton';
import { EmojiPicker as AkEmojiPicker, EmojiProvider } from '@atlaskit/emoji';
import * as styles from './styles';
import { EmojiState } from '../../plugins/emojis';

export interface Props {
  pluginState: EmojiState;
  emojiProvider: Promise<EmojiProvider>;
}

export interface State {
  isOpen: boolean;
  button?: HTMLElement;
}

export default class ToolbarEmojiPicker extends PureComponent<Props, State> {
  private pickerRef: any;

  state: State = {
    isOpen: false,
  };

  componentDidMount() {
    this.state.button = ReactDOM.findDOMNode(this.refs.button) as HTMLElement;
  }

  render() {
    const { isOpen, button } = this.state;
    return (
      <span className={styles.outerContainer}>
        <ToolbarButton
          selected={isOpen}
          onClick={this.toggleOpen}
          title={'Emoji'}
          iconBefore={<EmojiIcon label="Emoji" />}
          ref="button"
        />
        {!isOpen ? null :
          <AkEmojiPicker
            emojiProvider={this.props.emojiProvider}
            onSelection={this.handleSelectedEmoji}
            target={button}
            position="auto"
            zIndex={akZIndexModal}
            onPickerRef={this.onPickerRef}
          />
        }
      </span>
    );
  }

  private onPickerRef = (ref: any) => {
    if (ref) {
      document.addEventListener('click', this.handleClickOutside);
    } else {
      document.removeEventListener('click', this.handleClickOutside);
    }
    this.pickerRef = ref;
  }

  private handleSelectedEmoji = (emojiId: any, emoji: any) => {
    if (this.state.isOpen) {
      this.props.pluginState.insertEmoji(emojiId);
      this.close();
    }
  }

  private handleClickOutside = (e) => {
    const picker = ReactDOM.findDOMNode(this.pickerRef);
    if (!picker || !picker.contains(e.target)) {
      this.close();
    }
  }

  private toggleOpen = () => {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen,
    });
  }

  private close = () => {
    this.setState({
      isOpen: false,
    });
  }

}

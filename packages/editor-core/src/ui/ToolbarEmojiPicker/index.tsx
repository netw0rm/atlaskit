import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ToolbarButton, offsetY, marginRight } from './styles';
import { PureComponent } from 'react';
import { akZIndexModal } from '@atlaskit/util-shared-styles';
import { analyticsDecorator as analytics } from '../../analytics';
import EmojiIcon from '@atlaskit/icon/glyph/editor/emoji';
import { EmojiPicker as AkEmojiPicker, EmojiProvider, emojiPickerWidth, emojiPickerHeight } from '@atlaskit/emoji';
import { EmojiState } from '../../plugins/emojis';
import { EditorView } from '../../prosemirror';

type Position = 'above' | 'below';

export interface Props {
  pluginState: EmojiState;
  editorView: EditorView;
  emojiProvider: Promise<EmojiProvider>;
}

export interface State {
  button?: HTMLElement;
  disabled?: boolean;
  isOpen: boolean;
}

export default class ToolbarEmojiPicker extends PureComponent<Props, State> {
  private pickerRef: any;
  private button?: any;

  state: State = {
    isOpen: false,
  };

  componentDidMount() {
    this.state.button = ReactDOM.findDOMNode(this.button) as HTMLElement;
    this.props.pluginState.subscribe(this.handlePluginStateChange);

  }

  componentWillUnmount() {
    this.props.pluginState.unsubscribe(this.handlePluginStateChange);
  }

  render() {
    const { button, disabled, isOpen } = this.state;
    let position: Position = 'above';
    let offsetX: number = 0;
    if (button) {
      const buttonRect = button.getBoundingClientRect();
      position = this.getPosition(buttonRect);
      offsetX = this.getOffsetX(buttonRect);
    }

    return (
      <span>
        <ToolbarButton
          selected={isOpen}
          disabled={disabled}
          onClick={this.toggleOpen}
          iconBefore={<EmojiIcon label="Emoji" />}
          innerRef={this.handleButtonRef}
        />
        {!isOpen ? null :
          <AkEmojiPicker
            emojiProvider={this.props.emojiProvider}
            onSelection={this.handleSelectedEmoji}
            target={button}
            position={position}
            offsetX={offsetX}
            offsetY={offsetY}
            zIndex={akZIndexModal}
            onPickerRef={this.onPickerRef}
          />
        }
      </span>
    );
  }

  private handlePluginStateChange = (pluginState: EmojiState) => {
    this.setState({
      disabled: !pluginState.enabled
    });
  }

  private onPickerRef = (ref: any) => {
    if (ref) {
      document.addEventListener('click', this.handleClickOutside);
    } else {
      document.removeEventListener('click', this.handleClickOutside);
    }
    this.pickerRef = ref;
  }

  private close = () => {
    this.setState({
      isOpen: false,
    });
  }

  private toggleOpen = () => {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen,
    });
  }

  private handleClickOutside = (e) => {
    const picker = ReactDOM.findDOMNode(this.pickerRef);
    if (!picker || !picker.contains(e.target)) {
      this.close();
    }
  }

  private getPosition = (buttonRect: ClientRect): Position => {
    const bodyRect = document.body.getBoundingClientRect();
    const yPos: number = buttonRect.top - bodyRect.top;
    if (yPos - emojiPickerHeight < 0) {
      return 'below';
    }
    return 'above';
  }

  private getOffsetX = (buttonRect: ClientRect): number => {
    const editorRect = this.props.editorView.dom.getBoundingClientRect();
    return -(buttonRect.left + emojiPickerWidth - editorRect.right) - marginRight;
  }

  @analytics('atlassian.editor.emoji.button')
  private handleSelectedEmoji = (emojiId: any, emoji: any) => {
    if (this.state.isOpen) {
      this.props.pluginState.insertEmoji(emojiId);
      this.close();
    }
  }

  private handleButtonRef = (button: HTMLButtonElement | null) => {
    if (button instanceof HTMLButtonElement) {
      this.button = button;
    } else {
      this.button = undefined;
    }
  }
}

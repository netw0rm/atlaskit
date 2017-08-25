import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { PureComponent } from 'react';
import { analyticsDecorator as analytics } from '../../analytics';
import { EmojiState } from '../../plugins/emojis';
import { EditorView, PluginKey } from '../../prosemirror';
import EmojiIcon from '@atlaskit/icon/glyph/editor/emoji';
import { EmojiPicker as AkEmojiPicker, EmojiProvider, emojiPickerWidth } from '@atlaskit/emoji';
import Layer from '@atlaskit/layer';
import ToolbarButton from '../ToolbarButton';

const numButtons = 2; // Number of toolbar buttons between right edge of the emoji picker and the editor

export interface Props {
  editorView: EditorView;
  pluginKey: PluginKey;
  emojiProvider: Promise<EmojiProvider>;
}

export interface State {
  button?: HTMLElement;
  disabled?: boolean;
  isOpen: boolean;
}

export default class ToolbarEmojiPicker extends PureComponent<Props, State> {
  private pickerRef: any;
  private buttonRef: any;
  private pluginState?: EmojiState;

  state: State = {
    isOpen: false,
  };

  componentWillMount() {
    this.setPluginState(this.props);
  }

  componentDidMount() {
    this.state.button = ReactDOM.findDOMNode(this.buttonRef) as HTMLElement;
    if (this.pluginState) {
      this.pluginState.subscribe(this.handlePluginStateChange);
    }
  }

  componentDidUpdate() {
    const { button } = this.state;
    if (!button || !button.getBoundingClientRect().width) {
      this.state.button = ReactDOM.findDOMNode(this.buttonRef) as HTMLElement;
    }
  }

  componentWillUnmount() {
    if (this.pluginState) {
      this.pluginState.unsubscribe(this.handlePluginStateChange);
    }
  }


  private setPluginState(props: Props) {
    const { editorView, pluginKey } = props;

    if (!editorView) {
      return;
    }

    const pluginState = pluginKey.getState(editorView.state);

    if (pluginState) {
      this.pluginState = pluginState;
      pluginState.subscribe(this.handlePluginStateChange);
    }
  }

  private handlePluginStateChange = (pluginState: EmojiState) => {
    this.setState({
      disabled: !pluginState.enabled
    });
  }

  private handleButtonRef = (ref): void => {
    if (ref) {
      this.buttonRef = ref;
    } else {
      this.buttonRef = null;
    }
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

  private renderPopup() {
    const { disabled, isOpen } = this.state;
    if (disabled || !isOpen) {
      return null;
    }

    return (
      <div>
        <AkEmojiPicker
          emojiProvider={this.props.emojiProvider}
          onSelection={this.handleSelectedEmoji}
          onPickerRef={this.onPickerRef}
        />
      </div>
    );
  }

  render() {
    const { isOpen, disabled, button }  = this.state;
    const toolbarButton = (
      <ToolbarButton
        selected={isOpen}
        disabled={disabled}
        onClick={this.toggleOpen}
        iconBefore={<EmojiIcon label="Insert emoji (:)" />}
        ref={this.handleButtonRef}
        title="Insert emoji (:)"
      />
    );

    if (!button) {
      return toolbarButton;
    }

    return (
      <div>
        {this.renderTrigger(this.renderPopup(), toolbarButton)}
      </div>
    );
  }

  private renderTrigger(content, trigger) {
    const { button } = this.state;

    // Check already occurs in render() by needed for typescript
    if (!button) {
      return null;
    }

    const offset = `${this.getOffsetX(button.getBoundingClientRect())} 0`;
    return (
      <Layer
        content={content}
        position="top left"
        offset={offset}
      >
        {trigger}
      </Layer>
    );
  }

  private getOffsetX = (buttonRect: ClientRect): number => {
    return -(emojiPickerWidth - numButtons * buttonRect.width);
  }

  @analytics('atlassian.editor.emoji.button')
  private handleSelectedEmoji = (emojiId: any, emoji: any): boolean => {
    if (this.state.isOpen && this.pluginState) {
      this.pluginState.insertEmoji(emojiId);
      this.close();
      return true;
    }
    return false;
  }
}

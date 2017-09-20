import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { PureComponent } from 'react';
import { analyticsDecorator as analytics } from '../../analytics';
import { EmojiState } from '../../plugins/emojis';
import { EditorView, PluginKey } from '../../prosemirror';
import EmojiIcon from '@atlaskit/icon/glyph/editor/emoji';
import { EmojiPicker as AkEmojiPicker, EmojiProvider } from '@atlaskit/emoji';
import ToolbarButton from '../ToolbarButton';
import { pluginKey as themePluginKey } from '../../editor/plugins/theme';
import Popup from '../Popup';

export interface Props {
  editorView: EditorView;
  pluginKey: PluginKey;
  emojiProvider: Promise<EmojiProvider>;
  /**
   * The number of secondary toolbar buttons between and including ToolbarEmojiPicker and the right edge of the editor
   * This must be passed in by the integrator (e.g. SecondaryToolbar) that contains the buttons
   * TODO: Implement a better solution as part of ED-2565
   */
  numFollowingButtons: number;
  popupsMountPoint?: HTMLElement | undefined;
  popupsBoundariesElement?: HTMLElement | undefined;
}

export interface State {
  button?: HTMLElement;
  disabled?: boolean;
  isOpen: boolean;
}

/**
 * Checks if an element is detached (i.e. not in the current document)
 */
const isDetachedElement = (el) => !document.contains(el);

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
    // Ignore click events for detached elements.
    // Workaround for FS-1322 - where two onClicks fire - one when the upload button is
    // still in the document, and one once it's detached. Does not always occur, and
    // may be a side effect of a react render optimisation
    if (!picker || (!isDetachedElement(e.target) && !picker.contains(e.target))) {
      this.close();
    }
  }

  private renderPopup() {
    const { disabled, isOpen, button } = this.state;
    const { editorView, popupsMountPoint, popupsBoundariesElement, emojiProvider } = this.props;
    const themePluginState = editorView && themePluginKey.getState(editorView!.state);
    const theme = themePluginState && themePluginState.theme;
    if (disabled || !isOpen || !button) {
      return null;
    }

    return (
      <Popup
        target={button}
        fitHeight={350}
        fitWidth={350}
        offset={[0, 3]}
        mountTo={popupsMountPoint}
        boundariesElement={popupsBoundariesElement}
      >
        <AkEmojiPicker
          emojiProvider={emojiProvider}
          onSelection={this.handleSelectedEmoji}
          onPickerRef={this.onPickerRef}
          theme={theme}
        />
      </Popup>
    );
  }

  render() {
    const { isOpen, disabled }  = this.state;
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

    return (
      <div>
        {toolbarButton}
        {this.renderPopup()}
      </div>
    );
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

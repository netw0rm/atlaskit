import * as React from 'react';
import { PureComponent } from 'react';
import { analyticsDecorator as analytics } from '../../analytics';
import { EditorView, PluginKey } from '../../prosemirror';
import { TextColorState } from '../../plugins/text-color';
import DropdownList from '@atlaskit/droplist';
import ToolbarButton from '../ToolbarButton';
import Icon from '@atlaskit/icon';
import ExpandIcon from '@atlaskit/icon/glyph/editor/expand';
import TextColorIcon from '@atlaskit/icon/glyph/editor/text-color';
import ColorPalette from './ColorPalette';
import { ExpandIconWrap, TriggerWrapper } from './styles';

export interface Props {
  editorView: EditorView;
  pluginState: TextColorState;
  softBlurEditor: () => void;
  focusEditor: () => void;
}

export interface State {
  disabled?: boolean;
  isOpen: boolean;
  color?: string;
}

export const stateKey = new PluginKey('textColorPlugin');

export default class ToolbarTextColor extends PureComponent<Props, State> {
  state: State = {
    isOpen: false
  };

  componentDidMount() {
    this.props.pluginState.subscribe(this.handlePluginStateChange);
  }

  componentWillUmount() {
    this.props.pluginState.unsubscribe(this.handlePluginStateChange);
  }

  render() {
    const { disabled, isOpen, color } = this.state;

    return (
      <DropdownList
        isOpen={isOpen && !disabled}
        onOpenChange={this.handleOpenChange}
        appearance="tall"
        position="top left"
        trigger={
          <ToolbarButton
            disabled={disabled}
            selected={isOpen}
            title="Text color"
            onClick={this.toggleOpen}
            iconBefore={
              <TriggerWrapper>
                <Icon
                  primaryColor={this.getIconColor()}
                  label="Text color"
                  glyph={TextColorIcon}
                />
                <ExpandIconWrap>
                  <ExpandIcon label="expand-dropdown-menu" />
                </ExpandIconWrap>
              </TriggerWrapper>}
          />
        }
      >
        <ColorPalette
          palette={this.props.pluginState.palette}
          onClick={this.toggleTextColor}
          selectedColor={color}
        />
      </DropdownList>
    );
  }

  @analytics('atlassian.editor.format.textcolor.button')
  private toggleTextColor = (color) => {
    const { pluginState, editorView } = this.props;
    if (!this.state.disabled) {
      if (color === pluginState.defaultColor) {
        pluginState.removeTextColor(editorView.state, editorView.dispatch);
      } else {
        pluginState.toggleTextColor(editorView.state, editorView.dispatch, color);
      }
      this.toggleOpen();
    }
  }

  private toggleOpen = () => {
    this.handleOpenChange({ isOpen: !this.state.isOpen });
  }

  private handleOpenChange = ({isOpen}) => {
   if (!isOpen) {
     this.props.softBlurEditor();
    } else {
      this.props.focusEditor();
    }

    this.setState({ isOpen });
  }

  private handlePluginStateChange = (pluginState: TextColorState) => {
    const { color, disabled } = pluginState;
    this.setState({ color, disabled });
  }

  private getIconColor = (): string | undefined => {
    const { isOpen, color } = this.state;
    const isDefaultColor = this.props.pluginState.defaultColor === color;
    return isOpen || isDefaultColor ? undefined : color;
  }
}

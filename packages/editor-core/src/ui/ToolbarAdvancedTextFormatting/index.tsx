import * as React from 'react';
import { PureComponent } from 'react';
import { analyticsDecorator as analytics } from '../../analytics';
import { TextFormattingState } from '../../plugins/text-formatting';
import DropdownList from 'ak-droplist';
import Group from 'ak-droplist-group';
import Item from 'ak-droplist-item';
import ToolbarButton from '../ToolbarButton';
import AdvancedIcon from 'ak-icon/glyph/editor/advanced';
import { toggleCode, toggleStrikethrough, tooltip } from '../../keymaps';

export interface Props {
  pluginState: TextFormattingState | undefined;
}

export interface State {
  isOpen?: boolean;
  codeActive?: boolean;
  codeDisabled?: boolean;
  codeHidden?: boolean;
  strikeActive?: boolean;
  strikeDisabled?: boolean;
  strikeHidden?: boolean;
}

export default class ToolbarAdvancedTextFormatting extends PureComponent<Props, State> {
  state: State = {
    isOpen: false,
  };

  componentDidMount() {
    const { pluginState } = this.props;
    pluginState && pluginState.subscribe(this.handlePluginStateChange);
  }

  componentWillUmount() {
    const { pluginState } = this.props;
    pluginState && pluginState.unsubscribe(this.handlePluginStateChange);
  }

  render() {
    const {
      isOpen,
      codeActive,
      strikeActive,
      codeHidden,
      strikeHidden,
      codeDisabled,
      strikeDisabled,
    } = this.state;
    if (!codeHidden && !strikeHidden) {
      return (
        <DropdownList
          isOpen={isOpen}
          onOpenChange={this.toggleOpen}
          appearance="tall"
          position="top left"
          trigger={
            <ToolbarButton
              selected={isOpen}
              disabled={codeDisabled && strikeDisabled}
              iconBefore={<AdvancedIcon label="text-formatting" />}
            />
          }
        >
          <Group>
            <Item
              isActive={codeActive}
              isDisabled={codeDisabled}
              onActivate={this.handleCodeClick}
            >
              <span title={tooltip(toggleCode)}>
                Code
              </span>
            </Item>
            <Item
              isActive={strikeActive}
              isDisabled={strikeDisabled}
              onActivate={this.handleStrikeClick}
            >
              <span title={tooltip(toggleStrikethrough)}>
                Strikethrough
              </span>
            </Item>
          </Group>
        </DropdownList>
      );
    }
    return null;
  }

  private toggleOpen = () => {
    const isOpen = !this.state.isOpen;
    this.setState({
      isOpen,
    });
  }

  private handlePluginStateChange = (pluginState: TextFormattingState) => {
    this.setState({
      codeActive: pluginState.codeActive,
      codeDisabled: pluginState.codeDisabled,
      codeHidden: pluginState.codeHidden,
      strikeActive: pluginState.strikeActive,
      strikeDisabled: pluginState.strikeDisabled,
      strikeHidden: pluginState.strikeHidden,
    });
  }

  @analytics('atlassian.editor.format.code.button')
  private handleStrikeClick = () => {
    if (!this.state.codeDisabled) {
      const { pluginState } = this.props;
      pluginState && pluginState.toggleStrike();
      this.toggleOpen();
    }
  }

  @analytics('atlassian.editor.format.strikethrough.button')
  private handleCodeClick = () => {
    if (!this.state.codeDisabled) {
      const { pluginState } = this.props;
      pluginState && pluginState.toggleCode();
      this.toggleOpen();
    }
  }
};

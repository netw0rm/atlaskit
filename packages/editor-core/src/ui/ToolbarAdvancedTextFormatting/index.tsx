import * as React from 'react';
import { PureComponent } from 'react';
import Tooltip from '@atlaskit/tooltip';
import { analyticsDecorator as analytics } from '../../analytics';
import { ClearFormattingState } from '../../plugins/clear-formatting';
import { TextFormattingState } from '../../plugins/text-formatting';
import { EditorView } from '../../prosemirror';
import DropdownList from 'ak-droplist';
import Group from 'ak-droplist-group';
import Item from 'ak-droplist-item';
import ToolbarButton from '../ToolbarButton';
import AdvancedIcon from 'ak-icon/glyph/editor/advanced';
import { clearFormatting, toggleCode, toggleStrikethrough, tooltip } from '../../keymaps';

export interface Props {
  editorView: EditorView;
  pluginStateTextFormatting?: TextFormattingState | undefined;
  pluginStateClearFormatting?: ClearFormattingState | undefined;
}

export interface State {
  isOpen?: boolean;
  codeActive?: boolean;
  codeDisabled?: boolean;
  codeHidden?: boolean;
  strikeActive?: boolean;
  strikeDisabled?: boolean;
  strikeHidden?: boolean;
  clearFormattingDisabled?: boolean;
}

export default class ToolbarAdvancedTextFormatting extends PureComponent<Props, State> {
  state: State = {
    isOpen: false,
  };

  componentDidMount() {
    const { pluginStateTextFormatting, pluginStateClearFormatting } = this.props;

    if (pluginStateTextFormatting) {
      pluginStateTextFormatting.subscribe(this.handlePluginStateTextFormattingChange);
    }

    if (pluginStateClearFormatting) {
      pluginStateClearFormatting.subscribe(this.handlePluginStateClearFormattingChange);
    }
  }

  componentWillUmount() {
    const { pluginStateTextFormatting, pluginStateClearFormatting } = this.props;

    if (pluginStateTextFormatting) {
      pluginStateTextFormatting.unsubscribe(this.handlePluginStateTextFormattingChange);
    }

    if (pluginStateClearFormatting) {
      pluginStateClearFormatting.unsubscribe(this.handlePluginStateClearFormattingChange);
    }
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
      clearFormattingDisabled,
    } = this.state;

    const {
      pluginStateTextFormatting,
      pluginStateClearFormatting,
    } = this.props;

    if (pluginStateTextFormatting || pluginStateClearFormatting) {
      const codeElem = (
        <Tooltip position="right" description={tooltip(toggleCode)}>
          <Item
            isActive={codeActive}
            isDisabled={codeDisabled}
            onActivate={this.handleCodeClick}
          >
            <span>Monospace</span>
          </Item>
        </Tooltip>
      );

      const strikeThroughElem = (
        <Tooltip position="right" description={tooltip(toggleStrikethrough)}>
          <Item
            isActive={strikeActive}
            isDisabled={strikeDisabled}
            onActivate={this.handleStrikeClick}
          >
            <span>Strikethrough</span>
          </Item>
        </Tooltip>
      );

      const textFormattingElem = pluginStateTextFormatting
        ? (
          <Group>
            {codeHidden ? null : codeElem}
            {strikeHidden ? null : strikeThroughElem}
          </Group>
        )
        : null;

      const clearFormattingElem = pluginStateClearFormatting
        ? (
          <Group>
            <Tooltip position="right" description={tooltip(clearFormatting)}>
              <Item
                isDisabled={clearFormattingDisabled}
                onActivate={this.handleClearFormattingClick}
              >
                <span>Clear formatting</span>
              </Item>
            </Tooltip>
          </Group>
        )
        : null;

      return (
        <DropdownList
          isOpen={isOpen}
          onOpenChange={this.toggleOpen}
          appearance="tall"
          position="top left"
          trigger={
            <ToolbarButton
              selected={isOpen}
              disabled={codeDisabled && strikeDisabled && clearFormattingDisabled}
              iconBefore={<AdvancedIcon label="text-formatting" />}
            />
          }
        >
          {textFormattingElem}
          {clearFormattingElem}
        </DropdownList>
      );
    } else {
      return null;
    }
  }

  private toggleOpen = () => {
    const { codeDisabled, strikeDisabled, clearFormattingDisabled, isOpen } = this.state;

    if (!(codeDisabled && strikeDisabled && clearFormattingDisabled)) {
      this.setState({
        isOpen: !isOpen,
      });
    }
  }

  private handlePluginStateTextFormattingChange = (pluginState: TextFormattingState) => {
    this.setState({
      codeActive: pluginState.codeActive,
      codeDisabled: pluginState.codeDisabled,
      codeHidden: pluginState.codeHidden,
      strikeActive: pluginState.strikeActive,
      strikeDisabled: pluginState.strikeDisabled,
      strikeHidden: pluginState.strikeHidden,
    });
  }

  private handlePluginStateClearFormattingChange = (pluginState: ClearFormattingState) => {
    this.setState({
      clearFormattingDisabled: !pluginState.formattingIsPresent,
    });
  }

  @analytics('atlassian.editor.format.code.button')
  private handleStrikeClick = () => {
    if (!this.state.codeDisabled) {
      const { pluginStateTextFormatting } = this.props;
      pluginStateTextFormatting && pluginStateTextFormatting.toggleStrike(this.props.editorView);
      this.toggleOpen();
    }
  }

  @analytics('atlassian.editor.format.strikethrough.button')
  private handleCodeClick = () => {
    if (!this.state.codeDisabled) {
      const { pluginStateTextFormatting } = this.props;
      pluginStateTextFormatting && pluginStateTextFormatting.toggleCode(this.props.editorView);
      this.toggleOpen();
    }
  }

  @analytics('atlassian.editor.format.clear.button')
  private handleClearFormattingClick = () => {
    if (!this.state.clearFormattingDisabled) {
      const { pluginStateClearFormatting } = this.props;
      pluginStateClearFormatting && pluginStateClearFormatting.clearFormatting();
      this.toggleOpen();
    }
  }

};

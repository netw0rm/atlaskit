import * as React from 'react';
import { PureComponent } from 'react';
import Tooltip from '@atlaskit/tooltip';
import { analyticsDecorator as analytics } from '../../analytics';
import { TextFormattingState } from '../../plugins/text-formatting';
import { ClearFormattingState } from '../../plugins/clear-formatting';
import DropdownList from 'ak-droplist';
import Group from 'ak-droplist-group';
import Item from 'ak-droplist-item';
import ToolbarButton from '../ToolbarButton';
import AdvancedIcon from 'ak-icon/glyph/editor/advanced';
import ExpandIcon from 'ak-icon/glyph/editor/expand';
import { toggleCode, toggleStrikethrough, clearFormatting, tooltip } from '../../keymaps';
import * as styles from './styles';

export interface Props {
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
    pluginStateTextFormatting && pluginStateTextFormatting.subscribe(this.handlePluginStateTextFormattingChange);
    pluginStateClearFormatting && pluginStateClearFormatting.subscribe(this.handlePluginStateClearFormattingChange);
  }

  componentWillUmount() {
    const { pluginStateTextFormatting, pluginStateClearFormatting } = this.props;
    pluginStateTextFormatting && pluginStateTextFormatting.unsubscribe(this.handlePluginStateTextFormattingChange);
    pluginStateClearFormatting && pluginStateClearFormatting.unsubscribe(this.handlePluginStateClearFormattingChange);
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
              iconBefore={
                <div className={styles.triggerWrapper}>
                  <AdvancedIcon label="text-formatting" />
                  <div className={styles.expandIcon}>
                    <ExpandIcon label="expand-dropdown-menu" />
                  </div>
                </div>}
            />
          }
        >
          {pluginStateTextFormatting && <Group>
            {!codeHidden &&
              <Tooltip position="right" description={tooltip(toggleCode)}>
                <Item
                  isActive={codeActive}
                  isDisabled={codeDisabled}
                  onActivate={this.handleCodeClick}
                >
                  <span>Code</span>
                </Item>
              </Tooltip>}
            {!strikeHidden &&
              <Tooltip position="right" description={tooltip(toggleStrikethrough)}>
                <Item
                  isActive={strikeActive}
                  isDisabled={strikeDisabled}
                  onActivate={this.handleStrikeClick}
                >
                  <span>Strikethrough</span>
                </Item>
              </Tooltip>}
          </Group>}
          {pluginStateClearFormatting &&
            <Group>
              <Tooltip position="right" description={tooltip(clearFormatting)}>
                <Item
                  isDisabled={clearFormattingDisabled}
                  onActivate={this.handleClearFormattingClick}
                >
                  <span>Clear formatting</span>
                </Item>
              </Tooltip>
            </Group>}
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

  @analytics('atlassian.editor.format.strikethrough.button')
  private handleStrikeClick = () => {
    if (!this.state.strikeDisabled) {
      const { pluginStateTextFormatting } = this.props;
      pluginStateTextFormatting && pluginStateTextFormatting.toggleStrike();
      this.toggleOpen();
    }
  }

  @analytics('atlassian.editor.format.code.button')
  private handleCodeClick = () => {
    if (!this.state.codeDisabled) {
      const { pluginStateTextFormatting } = this.props;
      pluginStateTextFormatting && pluginStateTextFormatting.toggleCode();
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

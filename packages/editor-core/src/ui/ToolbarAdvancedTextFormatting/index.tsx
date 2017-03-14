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
import { toggleMonospace, toggleStrikethrough, clearFormatting, tooltip } from '../../keymaps';
import * as styles from './styles';

export interface Props {
  pluginStateTextFormatting?: TextFormattingState | undefined;
  pluginStateClearFormatting?: ClearFormattingState | undefined;
}

export interface State {
  isOpen?: boolean;
  monoActive?: boolean;
  monoDisabled?: boolean;
  monoHidden?: boolean;
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
      monoActive,
      strikeActive,
      monoHidden,
      strikeHidden,
      monoDisabled,
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
              disabled={monoDisabled && strikeDisabled && clearFormattingDisabled}
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
            {!monoHidden &&
              <Tooltip position="right" description={tooltip(toggleMonospace)}>
                <Item
                  isActive={monoActive}
                  isDisabled={monoDisabled}
                  onActivate={this.handleMonoClick}
                >
                  <span>Monospace</span>
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
    const { monoDisabled, strikeDisabled, clearFormattingDisabled, isOpen } = this.state;
    if (!(monoDisabled && strikeDisabled && clearFormattingDisabled)) {
      this.setState({
        isOpen: !isOpen,
      });
    }
  }

  private handlePluginStateTextFormattingChange = (pluginState: TextFormattingState) => {
    this.setState({
      monoActive: pluginState.monoActive,
      monoDisabled: pluginState.monoDisabled,
      monoHidden: pluginState.monoHidden,
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

  @analytics('atlassian.editor.format.monospace.button')
  private handleStrikeClick = () => {
    if (!this.state.monoDisabled) {
      const { pluginStateTextFormatting } = this.props;
      pluginStateTextFormatting && pluginStateTextFormatting.toggleStrike();
      this.toggleOpen();
    }
  }

  @analytics('atlassian.editor.format.strikethrough.button')
  private handleMonoClick = () => {
    if (!this.state.monoDisabled) {
      const { pluginStateTextFormatting } = this.props;
      pluginStateTextFormatting && pluginStateTextFormatting.toggleMono();
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

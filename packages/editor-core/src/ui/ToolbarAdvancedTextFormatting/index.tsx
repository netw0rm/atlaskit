import * as React from 'react';
import { PureComponent } from 'react';
import { analyticsDecorator as analytics } from '../../analytics';
import { TextFormattingState } from '../../plugins/text-formatting';
import DropdownList from 'ak-droplist';
import Group from 'ak-droplist-group';
import Item from 'ak-droplist-item';
import ToolbarButton from '../ToolbarButton';
import AdvancedIcon from 'ak-icon/glyph/editor/advanced';
import ExpandIcon from 'ak-icon/glyph/editor/expand';
import { toggleMonospace, toggleStrikethrough, tooltip } from '../../keymaps';
import * as styles from './styles';

export interface Props {
  pluginState: TextFormattingState | undefined;
}

export interface State {
  isOpen?: boolean;
  monoActive?: boolean;
  monoDisabled?: boolean;
  monoHidden?: boolean;
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
      monoActive,
      strikeActive,
      monoHidden,
      strikeHidden,
      monoDisabled,
      strikeDisabled,
    } = this.state;
    if (!monoHidden && !strikeHidden) {
      return (
        <DropdownList
          isOpen={isOpen}
          onOpenChange={this.toggleOpen}
          appearance="tall"
          position="top left"
          trigger={
            <ToolbarButton
              selected={isOpen}
              disabled={monoDisabled && strikeDisabled}
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
          <Group>
            <Item
              isActive={monoActive}
              isDisabled={monoDisabled}
              onActivate={this.handleMonoClick}
            >
              <span title={tooltip(toggleMonospace)}>
                Monospace
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
      monoActive: pluginState.monoActive,
      monoDisabled: pluginState.monoDisabled,
      monoHidden: pluginState.monoHidden,
      strikeActive: pluginState.strikeActive,
      strikeDisabled: pluginState.strikeDisabled,
      strikeHidden: pluginState.strikeHidden,
    });
  }

  @analytics('atlassian.editor.format.monospace.button')
  private handleStrikeClick = () => {
    if (!this.state.monoDisabled) {
      const { pluginState } = this.props;
      pluginState && pluginState.toggleStrike();
      this.toggleOpen();
    }
  }

  @analytics('atlassian.editor.format.strikethrough.button')
  private handleMonoClick = () => {
    if (!this.state.monoDisabled) {
      const { pluginState } = this.props;
      pluginState && pluginState.toggleMono();
      this.toggleOpen();
    }
  }
};

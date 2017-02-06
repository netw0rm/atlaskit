import * as React from 'react';
import { PureComponent } from 'react';
import { analyticsDecorator as analytics } from '../../analytics';
import { TextFormattingState } from '../../plugins/text-formatting';
import DropdownList from 'ak-droplist';
import Group from 'ak-droplist-group';
import Item from 'ak-droplist-item';
import ToolbarButton from '../ToolbarButton';
import WarningIcon from 'ak-icon/glyph/editor/warning';
import { toggleMonospace, toggleStrikethrough, tooltip } from '../../keymaps';

export interface Props {
  pluginState: TextFormattingState;
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

export default class ToolbarAdditionalTextFormatting extends PureComponent<Props, State> {
  state: State = {
    isOpen: false,
  };

  componentDidMount() {
    this.props.pluginState.subscribe(this.handlePluginStateChange);
  }

  componentWillUmount() {
    this.props.pluginState.unsubscribe(this.handlePluginStateChange);
  }

  private toggleOpen = () => {
    const isOpen = !this.state.isOpen;
    this.setState({
      isOpen,
    });
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
              iconBefore={<WarningIcon label="text-formatting" />}
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
      this.props.pluginState.toggleStrike();
    }
  }

  @analytics('atlassian.editor.format.strikethrough.button')
  private handleMonoClick = () => {
    if (!this.state.monoDisabled) {
      this.props.pluginState.toggleMono();
    }
  }
};

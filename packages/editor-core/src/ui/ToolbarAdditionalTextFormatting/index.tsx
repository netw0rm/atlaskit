import * as React from 'react';
import { PureComponent } from 'react';
import { analyticsDecorator as analytics } from '../../analytics';
import { TextFormattingState } from '../../plugins/text-formatting';
import DropdownList from 'ak-droplist';
import Group from 'ak-droplist-group';
import Item from 'ak-droplist-item';
import ToolbarButton from '../ToolbarButton';
import ItalicIcon from 'ak-icon/glyph/editor/italic';

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
    const { isOpen } = this.state;
    return (
      <DropdownList
        isOpen={isOpen}
        onOpenChange={this.toggleOpen}
        appearance="tall"
        position="top left"
        trigger={
          <ToolbarButton
            selected={isOpen}
            iconBefore={<ItalicIcon label="" />}
          />
        }
      >
        <Group>
          <Item
            isActive={false}
            onActivate={this.handleMonoClick}
          >
            <span title="test">
              Monospace
            </span>
          </Item>
          <Item
            isActive={false}
            onActivate={this.handleStrikeClick}
          >
            <span title="test">
              Strikethrough
            </span>
          </Item>
        </Group>
      </DropdownList>
    );
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

  @analytics('atlassian.editor.format.strong.button')
  private handleStrikeClick = () => {
    if (!this.state.monoDisabled) {
      this.props.pluginState.toggleStrike();
    }
  }

  @analytics('atlassian.editor.format.em.button')
  private handleMonoClick = () => {
    if (!this.state.monoDisabled) {
      this.props.pluginState.toggleMono();
    }
  }
};

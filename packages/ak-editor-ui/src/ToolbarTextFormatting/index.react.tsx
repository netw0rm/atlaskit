import React, { PureComponent } from 'react';
import BoldIcon from 'ak-icon/glyph/editor/bold';
import ItalicIcon from 'ak-icon/glyph/editor/italic';
import UnderlineIcon from 'ak-icon/glyph/editor/underline';
import CodeIcon from 'ak-icon/glyph/editor/code';
import { TextFormattingState } from 'ak-editor-plugin-text-formatting';
import IconButton from '../ToolbarIconButton/index.react';

interface Props {
  pluginState: TextFormattingState;
}

interface State {
  boldActive?: boolean;
  boldDisabled?: boolean;
  boldHidden?: boolean;
  italicActive?: boolean;
  italicDisabled?: boolean;
  italicHidden?: boolean;
  underlineActive?: boolean;
  underlineDisabled?: boolean;
  underlineHidden?: boolean;
}

export default class ToolbarTextFormatting extends PureComponent<Props, State> {
  state: State = {}

  componentDidMount() {
    this.props.pluginState.subscribe(this.handlePluginStateChange);
  }

  componentWillUmount() {
    this.props.pluginState.unsubscribe(this.handlePluginStateChange);
  }

  render() {
    return (
      <span>
        {this.state.boldHidden ? null :
        <IconButton
          onClick={this.handleBoldClick}
          selected={this.state.boldActive}
          disabled={this.state.boldDisabled}
          icon={<BoldIcon label='Bold' />}
        />
        }

        {this.state.italicHidden ? null :
        <IconButton
          onClick={this.handleItalicClick}
          selected={this.state.italicActive}
          disabled={this.state.italicDisabled}
          icon={<ItalicIcon label='Italic' />}
        />
        }

        {this.state.underlineHidden ? null :
        <IconButton
          onClick={this.handleUnderlineClick}
          selected={this.state.underlineActive}
          disabled={this.state.underlineDisabled}
          icon={<UnderlineIcon label='Underline' />}
        />
        }
      </span>
    );
  }

  private handlePluginStateChange = (pluginState: TextFormattingState) => {
    this.setState({
      boldActive: pluginState.strongActive,
      boldDisabled: pluginState.strongDisabled,
      italicActive: pluginState.emActive,
      italicDisabled: pluginState.emDisabled,
      underlineActive: pluginState.underlineActive,
      underlineDisabled: pluginState.underlineDisabled,
    });
  }

  private handleBoldClick = () => {
    if (!this.state.boldDisabled) {
      this.props.pluginState.toggleStrong();
    }
  }

  private handleItalicClick = () => {
    if (!this.state.italicDisabled) {
      this.props.pluginState.toggleEm();
    }
  }

  private handleUnderlineClick = () => {
    if (!this.state.underlineDisabled) {
      this.props.pluginState.toggleUnderline();
    }
  }
};

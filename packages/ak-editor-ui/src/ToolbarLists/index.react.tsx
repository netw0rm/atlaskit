import React, { PureComponent } from 'react';
import NumberListIcon from 'ak-icon/glyph/editor/list/number';
import BulletListIcon from 'ak-icon/glyph/editor/list/bullet';
import IconButton from '../ToolbarIconButton/index.react';
import { ListsState } from 'ak-editor-plugin-lists';

interface Props {
  pluginState: ListsState;
}

interface State {
  bulletListActive: boolean;
  bulletListDisabled: boolean;
  bulletListHidden: boolean;
  orderedListActive: boolean;
  orderedListDisabled: boolean;
  orderedListHidden: boolean;
}

export default class ToolbarTextFormatting extends PureComponent<Props, State> {
  state: State = {
    bulletListActive: false,
    bulletListDisabled: false,
    bulletListHidden: false,
    orderedListActive: false,
    orderedListDisabled: false,
    orderedListHidden: false,
  };

  componentDidMount() {
    this.props.pluginState.subscribe(this.handlePluginStateChange);
  }

  componentWillUnmount() {
    this.props.pluginState.unsubscribe(this.handlePluginStateChange);
  }

  render() {
    return (
      <span>
        {this.state.bulletListHidden ? null :
        <IconButton
          onClick={this.handleBulletListClick}
          selected={this.state.bulletListActive}
          disabled={this.state.bulletListDisabled}
          icon={<BulletListIcon label='Bullet list' />}
        />
        }

        {this.state.orderedListHidden ? null :
        <IconButton
          onClick={this.handleOrderedListClick}
          selected={this.state.orderedListActive}
          disabled={this.state.orderedListDisabled}
          icon={<NumberListIcon label='Ordered list' />}
        />
        }
      </span>
    );
  }

  private handlePluginStateChange = (pluginState: ListsState) => {
    this.setState({
      bulletListActive: pluginState.bulletListActive,
      bulletListDisabled: pluginState.bulletListDisabled,
      bulletListHidden: pluginState.bulletListHidden,
      orderedListActive: pluginState.orderedListActive,
      orderedListDisabled: pluginState.orderedListDisabled,
      orderedListHidden: pluginState.orderedListHidden,
    });
  }

  private handleBulletListClick = () => {
    if (!this.state.bulletListDisabled) {
      this.props.pluginState.toggleBulletList();
    }
  }

  private handleOrderedListClick = () => {
    if (!this.state.orderedListDisabled) {
      this.props.pluginState.toggleOrderedList();
    }
  }
};

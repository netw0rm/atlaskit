import * as React from 'react';
import { PureComponent } from 'react';
import NumberListIcon from 'ak-icon/glyph/editor/list/number';
import BulletListIcon from 'ak-icon/glyph/editor/list/bullet';
import IconButton from '../ToolbarIconButton';
import { ListsState } from '../../../src/plugins/lists';
import { decorator as analytics } from '../../analytics';

export interface Props {
  pluginState: ListsState;
}

export interface State {
  bulletListActive: boolean;
  bulletListDisabled: boolean;
  bulletListHidden: boolean;
  orderedListActive: boolean;
  orderedListDisabled: boolean;
  orderedListHidden: boolean;
}

export default class ToolbarLists extends PureComponent<Props, State> {
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

  @analytics('atlassian.editor.format.list.bullet.button')
  private handleBulletListClick = () => {
    if (!this.state.bulletListDisabled) {
      this.props.pluginState.toggleBulletList();
    }
  }

  @analytics('atlassian.editor.format.list.numbered.button')
  private handleOrderedListClick = () => {
    if (!this.state.orderedListDisabled) {
      this.props.pluginState.toggleOrderedList();
    }
  }
};

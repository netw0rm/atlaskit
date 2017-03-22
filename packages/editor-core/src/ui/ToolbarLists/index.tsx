import BulletListIcon from '@atlaskit/icon/glyph/editor/bullet-list';
import NumberListIcon from '@atlaskit/icon/glyph/editor/number-list';
import * as React from 'react';
import { PureComponent } from 'react';
import { analyticsDecorator as analytics } from '../../analytics';
import { toggleBulletList, toggleOrderedList, tooltip } from '../../keymaps';
import { ListsState } from '../../plugins/lists';
import { ListsState as FutureListsState } from '../../plugins/lists';
import ToolbarButton from '../ToolbarButton';
import { EditorView } from '../../prosemirror';

export interface Props {
  editorView?: EditorView;
  pluginState: ListsState | FutureListsState;
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
    if (this.props.editorView) {
      (this.props.pluginState as FutureListsState).subscribe(this.handleFuturePluginStateChange);
    } else {
      (this.props.pluginState as ListsState).subscribe(this.handlePluginStateChange);
    }
  }

  componentWillUnmount() {
    if (this.props.editorView) {
      (this.props.pluginState as FutureListsState).unsubscribe(this.handleFuturePluginStateChange);
    } else {
      (this.props.pluginState as ListsState).unsubscribe(this.handlePluginStateChange);
    }
  }

  render() {
    return (
      <span>
        {this.state.bulletListHidden ? null :
          <ToolbarButton
            onClick={this.handleBulletListClick}
            selected={this.state.bulletListActive}
            disabled={this.state.bulletListDisabled}
            title={tooltip(toggleBulletList)}
            iconBefore={<BulletListIcon label="" />}
          />
        }

        {this.state.orderedListHidden ? null :
          <ToolbarButton
            onClick={this.handleOrderedListClick}
            selected={this.state.orderedListActive}
            disabled={this.state.orderedListDisabled}
            title={tooltip(toggleOrderedList)}
            iconBefore={<NumberListIcon label="" />}
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

  private handleFuturePluginStateChange = (pluginState: FutureListsState) => {
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
      if (this.props.editorView) {
        (this.props.pluginState as FutureListsState).toggleBulletList(this.props.editorView);
      } else {
        (this.props.pluginState as ListsState).toggleBulletList();
      }
    }
  }

  @analytics('atlassian.editor.format.list.numbered.button')
  private handleOrderedListClick = () => {
    if (!this.state.orderedListDisabled) {
      if (this.props.editorView) {
        (this.props.pluginState as FutureListsState).toggleOrderedList(this.props.editorView);
      } else {
        (this.props.pluginState as ListsState).toggleOrderedList();
      }
    }
  }
};

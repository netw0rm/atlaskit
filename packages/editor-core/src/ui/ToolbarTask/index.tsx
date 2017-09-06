import TaskIcon from '@atlaskit/icon/glyph/editor/task';
import * as React from 'react';
import { PureComponent } from 'react';
import { analyticsDecorator as analytics } from '../../analytics';
import { EditorView } from '../../prosemirror';
import ToolbarButton from '../ToolbarButton';
import { changeToTaskDecision } from '../../plugins/tasks-and-decisions/commands';

export interface Props {
  editorView?: EditorView;
}

export interface State {
  disabled: boolean;
}

export default class ToolbarTask extends PureComponent<Props, State> {
  state: State = { disabled: false };

  render() {
    const { disabled } = this.state;

    return (
      <ToolbarButton
        onClick={this.handleInsertTask}
        disabled={disabled}
        title="Create action ([])"
        iconBefore={<TaskIcon label="Create action" />}
      />
    );
  }

  @analytics('atlassian.fabric.action.triggered.button')
  private handleInsertTask = (): boolean => {
    const { editorView } = this.props;
    if (!editorView) {
      return false;
    }
    changeToTaskDecision(editorView, 'taskList');
    return true;
  }
}

import { action, storiesOf } from '@kadira/storybook';
import * as React from 'react';
import { PureComponent } from 'react';
import { ReactRenderer as Renderer } from '@atlaskit/renderer';

import TaskList from '../src/components/TaskList';
import TaskItem from '../src/components/TaskItem';
import { document } from '../src/support/story-data';
import { MessageContainer } from './story-utils';

const dumpRef = (ref: HTMLElement) => {
  // tslint:disable-next-line:no-console
  console.log('Content HTML', ref && ref.outerHTML);
};

interface Props {
  render: (taskStates: Map<string, boolean>, onChangeListener: (taskId: string, done: boolean) => void) => JSX.Element;
}

interface State {
  tick: number;
}

class TaskStateManager extends PureComponent<Props,State> {
  private taskStates = new Map<string, boolean>();

  constructor(props) {
    super(props);
    this.state = {
      tick: 0
    };
  }

  private onChangeListener = (taskId, done) => {
    action('onChange');
    this.taskStates.set(taskId, done);
    this.setState({ tick: this.state.tick + 1 });
  }

  render() {
    return (
      <MessageContainer>
        {this.props.render(this.taskStates, this.onChangeListener)}
      </MessageContainer>
    );
  }
}

storiesOf('<TaskList/>', module)
  .add('Simple TaskList', () => (
    <TaskStateManager
      render={(taskStates, onChangeListener) => // tslint:disable-line:jsx-no-lambda
        <TaskList>
          <TaskItem contentRef={dumpRef} taskId="task-1" onChange={onChangeListener} isDone={taskStates.get('task-1')} >
            Hello <b>world</b>.
          </TaskItem>
          <TaskItem contentRef={dumpRef} taskId="task-2" onChange={onChangeListener} isDone={taskStates.get('task-2')}>
            <Renderer document={document} />
          </TaskItem>
          <TaskItem contentRef={dumpRef} taskId="task-3" onChange={onChangeListener} isDone={taskStates.get('task-3')}>
            Hello <b>world</b>.
          </TaskItem>
          <TaskItem contentRef={dumpRef} taskId="task-4" onChange={onChangeListener} isDone={taskStates.get('task-4')}>
            <Renderer document={document} />
          </TaskItem>
        </TaskList>
     }
    />
  ))
  .add('Single item TaskList', () => (
    <TaskStateManager
      render={(taskStates, onChangeListener) => // tslint:disable-line:jsx-no-lambda
      <TaskList>
        <TaskItem contentRef={dumpRef} taskId="task-5" onChange={action('onChange')}>
          Hello <b>world</b>.
        </TaskItem>
      </TaskList>
      }
    />
  ))
  .add('Empty TaskList', () => (
    <MessageContainer>
      <TaskList/>
    </MessageContainer>
  ))
;

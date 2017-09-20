import { storiesOf } from '@kadira/storybook';
import * as React from 'react';
import { ReactRenderer as Renderer } from '@atlaskit/editor-core/dist/es5/renderer';

import { TaskStateManager } from './story-utils';
import DecisionList from '../src/components/DecisionList';
import DecisionItem from '../src/components/DecisionItem';
import TaskList from '../src/components/TaskList';
import TaskItem from '../src/components/TaskItem';
import { document } from '../src/support/story-data';

const dumpRef = (ref: HTMLElement) => {
  // tslint:disable-next-line:no-console
  console.log('Content HTML', ref && ref.outerHTML);
};

storiesOf('Combinations', module)
  .add('Multiple Lists', () => (
    <div>
      <DecisionList>
        <DecisionItem contentRef={dumpRef}>
          Hello <b>world</b>.
        </DecisionItem>
        <DecisionItem contentRef={dumpRef}>
          <Renderer document={document} />
        </DecisionItem>
      </DecisionList>
      <TaskStateManager
        render={(taskStates, onChangeListener) => // tslint:disable-line:jsx-no-lambda
          <TaskList>
            <TaskItem contentRef={dumpRef} taskId="task-1" onChange={onChangeListener} isDone={taskStates.get('task-1')} >
              Hello <b>world</b>.
            </TaskItem>
            <TaskItem contentRef={dumpRef} taskId="task-2" onChange={onChangeListener} isDone={taskStates.get('task-2')}>
              <Renderer document={document} />
            </TaskItem>
          </TaskList>
      }
      />
      <DecisionList>
        <DecisionItem contentRef={dumpRef}>
          Hello <b>world</b>.
        </DecisionItem>
        <DecisionItem contentRef={dumpRef}>
          <Renderer document={document} />
        </DecisionItem>
      </DecisionList>
    </div>
  ))
;

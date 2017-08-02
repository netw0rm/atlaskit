import { action, storiesOf } from '@kadira/storybook';
import * as React from 'react';
import { ReactRenderer as Renderer } from '@atlaskit/editor-core/dist/es2015/renderer';

import TaskList from '../src/components/TaskList';
import TaskItem from '../src/components/TaskItem';
import { document } from './story-data';

const dumpRef = (ref: HTMLElement) => {
  // tslint:disable-next-line:no-console
  console.log('Content HTML', ref && ref.outerHTML);
};

storiesOf('<TaskList/>', module)
  .add('Simple TaskList', () => (
    <TaskList>
      <TaskItem contentRef={dumpRef} taskId="task-1" onChange={action('onChange')}>
        Hello <b>world</b>.
      </TaskItem>
      <TaskItem contentRef={dumpRef} taskId="task-2" onChange={action('onChange')}>
        <Renderer document={document} />
      </TaskItem>
      <TaskItem contentRef={dumpRef} taskId="task-3" onChange={action('onChange')}>
        Hello <b>world</b>.
      </TaskItem>
      <TaskItem contentRef={dumpRef} taskId="task-4" onChange={action('onChange')}>
        <Renderer document={document} />
      </TaskItem>
    </TaskList>
  ))
  .add('Single item TaskList', () => (
    <TaskList>
      <TaskItem contentRef={dumpRef} taskId="task-5" onChange={action('onChange')}>
        Hello <b>world</b>.
      </TaskItem>
    </TaskList>
  ))
  .add('Empty TaskList', () => (
    <TaskList/>
  ))
;

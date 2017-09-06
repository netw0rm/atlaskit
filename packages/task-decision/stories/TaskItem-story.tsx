import { action, storiesOf } from '@kadira/storybook';
import * as React from 'react';
import { ReactRenderer as Renderer } from '@atlaskit/editor-core/dist/es5/renderer';

import TaskItem from '../src/components/TaskItem';
import { document } from '../src/support/story-data';

const dumpRef = (ref: HTMLElement) => {
  // tslint:disable-next-line:no-console
  console.log('Content HTML', ref && ref.outerHTML);
};

storiesOf('<TaskItem/>', module)
  .add('Simple TaskItem', () => (
    <TaskItem taskId="task-1" contentRef={dumpRef} onChange={action('onChange')}>
      Hello <b>world</b>.
    </TaskItem>
  ))
  .add('Long TaskItem', () => (
    <TaskItem taskId="task-1" contentRef={dumpRef}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
      ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
      voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
      non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </TaskItem>
  ))
  .add('Simple Completed TaskItem ', () => (
    <TaskItem taskId="task-2" isDone={true} contentRef={dumpRef} onChange={action('onChange')}>
      <Renderer document={document} />
    </TaskItem>
  ))
  .add('Simple TaskItem with renderer', () => (
    <TaskItem taskId="task-3" contentRef={dumpRef} onChange={action('onChange')}>
      <Renderer document={document} />
    </TaskItem>
  ))
  .add('Simple TaskItem with placeholder', () => (
    <TaskItem taskId="task-1" contentRef={dumpRef} onChange={action('onChange')} showPlaceholder={true} />
  ))

  ;

import { storiesOf } from '@kadira/storybook';

import * as React from 'react';
import { name, version } from '../../package.json';
import { storyDecorator } from '../../src/test-helper';

import {
  TaskItem,
  TaskList,
} from '../../src/renderer/react/nodes';

storiesOf(name, module)
  .addDecorator(storyDecorator(version))
  .add('nodes/taskList', () => (
    <TaskList>
      <TaskItem localId="task-1">
        Hello <b>world</b>.
      </TaskItem>
      <TaskItem localId="task-2" state="DONE">
        This is a completed task.
      </TaskItem>
    </TaskList>
  ))
;

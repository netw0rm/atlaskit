import * as React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { TaskItem as AkTaskItem } from '@atlaskit/task-decision';
import TaskItem from '../../../../../src/renderer/react/nodes/taskItem';

describe('Renderer - React/Nodes/TaskItem', () => {
  const taskItem = shallow(<TaskItem localId="task-1">This is a task item</TaskItem>);

  it('should wrap content with <AkTaskItem>-tag', () => {
    expect(taskItem.is(AkTaskItem)).to.equal(true);
  });
});

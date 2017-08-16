import * as React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { ResourcedTaskItem as AkTaskItem } from '@atlaskit/task-decision';
import { storyData as taskDecisionStoryData } from '@atlaskit/task-decision/dist/es5/support';
import TaskItem from '../../../../../src/renderer/react/nodes/taskItem';
import ProviderFactory from '../../../../../src/providerFactory';

const providerFactory = new ProviderFactory();
providerFactory.setProvider('taskDecisionProvider', Promise.resolve(taskDecisionStoryData.getMockTaskDecisionResource()));


describe('Renderer - React/Nodes/TaskItem', () => {
  it('should wrap content with <AkTaskItem>-tag', () => {
    const taskItem = mount(<TaskItem localId="task-1">This is a task item</TaskItem>);
    expect(taskItem.find(AkTaskItem).length).to.equal(1);
  });

  it('should propogate accept TaskDecisionProvider', () => {
    const taskItem = mount(<TaskItem localId="task-1" providers={providerFactory}>This is a task item</TaskItem>);
    expect(taskItem.find(AkTaskItem).length).to.equal(1);
  });
});

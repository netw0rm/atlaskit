import * as React from 'react';
import { mount } from 'enzyme';
import { waitUntil } from '@atlaskit/util-common-test';
import ResourcedTaskItem from '../../../src/components/ResourcedTaskItem';
import TaskItem from '../../../src/components/TaskItem';

describe('<ResourcedTaskItem/>', () => {

  let provider;
  let component;

  beforeEach(() => {
    provider = {
      subscribe: jest.fn(),
      unsubscribe: jest.fn(),
      toggleTask: jest.fn(() => Promise.resolve(true))
    };
  });

  afterEach(() => {
    component.unmount();
  });

  it('should wrap TaskItem', () => {
    component = mount(
      <ResourcedTaskItem taskId="task-1" objectAri="objectAri" containerAri="containerAri">
        Hello World
      </ResourcedTaskItem>
    );
    expect(component.find(TaskItem).length).toEqual(1);
  });

  it('should subscribe to updates', () => {
    component = mount(
      <ResourcedTaskItem
        taskId="task-1"
        objectAri="objectAri"
        containerAri="containerAri"
        taskDecisionProvider={Promise.resolve(provider)}
      >
        Hello World
      </ResourcedTaskItem>
    );
    return waitUntil(() => provider.subscribe.mock.calls.length).then(() => {
      expect(provider.subscribe).toBeCalled();
    });
  });

  it('should update on subscription callback to updates', () => {
    component = mount(
      <ResourcedTaskItem
        taskId="task-1"
        objectAri="objectAri"
        containerAri="containerAri"
        taskDecisionProvider={Promise.resolve(provider)}
        isDone={false}
      >
        Hello World
      </ResourcedTaskItem>
    );
    return waitUntil(() => provider.subscribe.mock.calls.length).then(() => {
      expect(provider.subscribe).toBeCalled();
      expect(component.state('isDone')).toBe(false);
      const subscribeCallback = provider.subscribe.mock.calls[0][1];
      subscribeCallback('DONE');
      return waitUntil(() => component.state('isDone'));
    }).then(() => {
      expect(component.state('isDone')).toBe(true);
    });
  });

  it('should call "toggleTask" when toggled', () => {
    component = mount(
      <ResourcedTaskItem
        taskId="task-1"
        objectAri="objectAri"
        containerAri="containerAri"
        taskDecisionProvider={Promise.resolve(provider)}
      >
        Hello World
      </ResourcedTaskItem>
    );
    component.find('input').simulate('change');
    return waitUntil(() => provider.toggleTask.mock.calls.length).then(() => {
      expect(provider.toggleTask).toBeCalled();
    });
  });

});

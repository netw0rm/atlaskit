import * as React from 'react';
import { mount } from 'enzyme';
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
    component = mount(<ResourcedTaskItem taskId="task-1" objectAri="objectAri" containerAri="containerAri">Hello World</ResourcedTaskItem>);
    expect(component.find(TaskItem).length).toEqual(1);
  });

  it('should subscribe to updates', () => {
    component = mount(<ResourcedTaskItem taskId="task-1" objectAri="objectAri" containerAri="containerAri" taskDecisionProvider={provider}>Hello World</ResourcedTaskItem>);
    expect(provider.subscribe).toBeCalled();
  });

  it('should call "toggleTask" when toggled', () => {
    component = mount(<ResourcedTaskItem taskId="task-1" objectAri="objectAri" containerAri="containerAri" taskDecisionProvider={provider}>Hello World</ResourcedTaskItem>);
    component.find('input').simulate('change');
    expect(provider.toggleTask).toBeCalled();
  });

});

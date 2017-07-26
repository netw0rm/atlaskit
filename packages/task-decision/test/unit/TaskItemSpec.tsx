import * as React from 'react';
import { mount } from 'enzyme';
import TaskItem from '../../src/components/TaskItem';
import { ContentWrapper } from '../../src/styled/TaskItem';

describe('<TaskItem/>', () => {
  it('should render children', () => {
    const component = mount(
      <TaskItem taskId="task-1">Hello <b>world</b></TaskItem>
    );
    expect(component.find('b').length).toBe(1);
    expect(component.find(ContentWrapper).text()).toBe('Hello world');
  });

  it('should render callback with ref', () => {
    let contentRef: HTMLElement | undefined;
    const handleContentRef = ref => contentRef = ref;
    const component = mount(
      <TaskItem taskId="task-id" contentRef={handleContentRef}>Hello <b>world</b></TaskItem>
    );
    expect(component.find('b').length).toBe(1);
    expect(contentRef).not.toBe(undefined);
    expect(contentRef!.textContent).toBe('Hello world');
  });

  it('should call onChange when checkbox is clicked', () => {
    const spy = jest.fn();
    const component = mount(
      <TaskItem taskId="task-1" onChange={spy}>Hello <b>world</b></TaskItem>
    );
    component.find('input').simulate('change');
    expect(spy).toHaveBeenCalledWith('task-1', true);
  });
});

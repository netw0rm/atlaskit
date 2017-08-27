import * as React from 'react';
import * as sinon from 'sinon';
import { mount } from 'enzyme';
import TaskItem from '../../../src/components/TaskItem';
import { ContentWrapper } from '../../../src/styled/TaskItem';
import { Placeholder } from '../../../src/styled/Placeholder';

describe('<TaskItem/>', () => {
  it('should render children', () => {
    const component = mount(
      <TaskItem taskId="task-1">Hello <b>world</b></TaskItem>
    );
    expect(component.find('b').length).toEqual(1);
    expect(component.find(ContentWrapper).text()).toEqual('Hello world');
  });

  it('should render callback with ref', () => {
    let contentRef: HTMLElement | undefined;
    const handleContentRef = ref => contentRef = ref;
    const component = mount(
      <TaskItem taskId="task-id" contentRef={handleContentRef}>Hello <b>world</b></TaskItem>
    );
    expect(component.find('b').length).toEqual(1);
    expect(contentRef).not.toEqual(undefined);
    expect(contentRef!.textContent).toEqual('Hello world');
  });

  it('should call onChange when checkbox is clicked', () => {
    const spy = sinon.spy();
    const component = mount(
      <TaskItem taskId="task-1" onChange={spy}>Hello <b>world</b></TaskItem>
    );
    component.find('input').simulate('change');
    expect(spy.calledWith('task-1', true)).toEqual(true);
  });


  describe('showPlaceholder', () => {
    it('shoud render placeholder if task is empty', () => {
      const component = mount(<TaskItem taskId="task-1" showPlaceholder={true} />);
      expect(component.find(Placeholder).length).toEqual(1);
    });

    it('should not render placeholder deciision is not empy', () => {
      const component = mount(
        <TaskItem taskId="task-1" showPlaceholder={true}>Hello <b>world</b></TaskItem>
      );
      expect(component.find(Placeholder).length).toEqual(0);
    });
  });
});

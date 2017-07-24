import * as React from 'react';
import * as sinon from 'sinon';
import { mount } from 'enzyme';
import { expect } from 'chai';
import TaskItem from '../../../src/components/TaskItem';
import { ContentWrapper } from '../../../src/styled/TaskItem';

describe('<TaskItem/>', () => {
  it('should render children', () => {
    const component = mount(
      <TaskItem taskId="task-1">Hello <b>world</b></TaskItem>
    );
    expect(component.find('b').length).to.equal(1);
    expect(component.find(ContentWrapper).text()).to.equal('Hello world');
  });

  it('should render callback with ref', () => {
    let contentRef: HTMLElement | undefined;
    const handleContentRef = ref => contentRef = ref;
    const component = mount(
      <TaskItem taskId="task-id" contentRef={handleContentRef}>Hello <b>world</b></TaskItem>
    );
    expect(component.find('b').length).to.equal(1);
    expect(contentRef, 'Content ref defined').to.not.equal(undefined);
    expect(contentRef!.textContent).to.equal('Hello world');
  });

  it('should call onChange when checkbox is clicked', () => {
    const spy = sinon.spy();
    const component = mount(
      <TaskItem taskId="task-1" onChange={spy}>Hello <b>world</b></TaskItem>
    );
    component.find('input').simulate('change');
    expect(spy.calledWith('task-1', true)).to.equal(true);
  });
});

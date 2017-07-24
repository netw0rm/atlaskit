import * as React from 'react';
import { mount } from 'enzyme';
import DecisionItem, { ContentWrapper } from '../../../src/components/DecisionItem';

describe('<DecisionItem/>', () => {
  it('should render children', () => {
    const component = mount(
      <DecisionItem>Hello <b>world</b></DecisionItem>
    );
    expect(component.find('b').length).toBe(1);
    expect(component.find(ContentWrapper).text()).toBe('Hello world');
  });

  it('should render callback with ref', () => {
    let contentRef: HTMLElement | undefined;
    const handleContentRef = ref => contentRef = ref;
    const component = mount(
      <DecisionItem contentRef={handleContentRef}>Hello <b>world</b></DecisionItem>
    );
    expect(component.find('b').length).toBe(1);
    expect(contentRef).not.toBe(undefined);
    expect(contentRef!.textContent).toBe('Hello world');
  });
});

import * as React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import DecisionItem, { ContentWrapper } from '../../src/components/DecisionItem';

describe('<DecisionItem/>', () => {
  it('should render children', () => {
    const component = mount(
      <DecisionItem>Hello <b>world</b></DecisionItem>
    );
    expect(component.find('b').length).to.equal(1);
    expect(component.find(ContentWrapper).text()).to.equal('Hello world');
  });

  it('should render callback with ref', () => {
    let contentRef: HTMLElement | undefined;
    const handleContentRef = ref => contentRef = ref;
    const component = mount(
      <DecisionItem contentRef={handleContentRef}>Hello <b>world</b></DecisionItem>
    );
    expect(component.find('b').length).to.equal(1);
    expect(contentRef, 'Content ref defined').to.not.equal(undefined);
    expect(contentRef!.textContent).to.equal('Hello world');
  });
});

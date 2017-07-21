import * as React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import DecisionList from '../../src/components/DecisionList';
import DecisionItem from '../../src/components/DecisionItem';

describe('<DecisionList/>', () => {
  it('should render all DecisionItems', () => {
    const component = mount(
      <DecisionList>
        <DecisionItem>1</DecisionItem>
        <DecisionItem>2</DecisionItem>
      </DecisionList>
    );
    expect(component.find('li').length).to.equal(2);
    expect(component.find(DecisionItem).length).to.equal(2);
  });
  it('should render single DecisionItem', () => {
    const component = mount(
      <DecisionList>
        <DecisionItem>1</DecisionItem>
      </DecisionList>
    );
    expect(component.find('li').length).to.equal(1);
    expect(component.find(DecisionItem).length).to.equal(1);
  });
  it('shouldn\'t render list when no items', () => {
    const component = mount(
      <DecisionList/>
    );
    expect(component.find('ol').length).to.equal(0);
    expect(component.find('li').length).to.equal(0);
    expect(component.find(DecisionItem).length).to.equal(0);
  });
});

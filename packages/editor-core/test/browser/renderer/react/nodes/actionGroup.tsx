import * as React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import ActionGroup from '../../../../../src/renderer/react/nodes/actionGroup';

describe('Renderer - React/Nodes/ActionGroup', () => {
  it('should wrap content with <p>-tag with start prop', () => {
    const actionGroupWrapper = shallow(<ActionGroup localId="test">This is a action group</ActionGroup>);
    const decisionList = actionGroupWrapper.childAt(0);
    expect(actionGroupWrapper.is('p')).to.equal(true);
    expect(decisionList.text()).to.equal('This is a action group');
  });

  it('should not render if no children', () => {
    const actionGroupWrapper = shallow(<ActionGroup localId="test"/>);
    expect(actionGroupWrapper.isEmptyRender()).to.equal(true);
  });
});

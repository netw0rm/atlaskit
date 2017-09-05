import * as React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { DecisionItem as AkDecisionItem } from '@atlaskit/task-decision';
import DecisionItem from '../../../../../src/renderer/react/nodes/decisionItem';

describe('Renderer - React/Nodes/DecisionItem', () => {
  const listItem = shallow(<DecisionItem>This is a list item</DecisionItem>);

  it('should wrap content with <AkDecisionItem>-tag', () => {
    expect(listItem.is(AkDecisionItem)).to.equal(true);
  });

  it('should not render if no children', () => {
    const decisionItem = shallow(<DecisionItem/>);
    expect(decisionItem.isEmptyRender()).to.equal(true);
  });
});

import * as React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { DecisionList as AkDecisionList } from '@atlaskit/task-decision';
import DecisionList from '../../../../../src/renderer/react/nodes/decisionList';

describe('Renderer - React/Nodes/OrderedList', () => {
  it('should wrap content with <AkDecisionList>-tag with start prop', () => {
    const orderedList = shallow(<DecisionList>This is a decision list</DecisionList>);
    expect(orderedList.is(AkDecisionList)).to.equal(true);
  });
});

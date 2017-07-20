import * as React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { DecisionList as AkDecisionList } from '@atlaskit/task-decision';
import { DecisionList } from '../../../src/nodes/decision';

describe('<DecisionList/>', () => {
  const decisionList = shallow(<DecisionList>This is a decision list</DecisionList>);

  it('should wrap content with <ul>-tag', () => {
    expect(decisionList.is(AkDecisionList)).to.equal(true);
  });

});


import * as React from 'react';
import { mount } from 'enzyme';
import * as sinon from 'sinon';
import { waitUntil } from '@atlaskit/util-common-test';
import Button from '@atlaskit/button';

import { Query } from '../../../src/types';
import ResourcedDecisionList from '../../../src/components/ResourcedDecisionList';

import { getDecisionsResponse } from '../../../src/support/test-data';

const query: Query = {
  containerAri: 'cheese',
};

const validateDoc = (doc, itemCount: number) => {
  expect(doc.type).toEqual('doc');
  expect(doc.content.length).toBe(1);
  const decisionList = doc.content[0];
  expect(decisionList.type).toEqual('decisionList');
  const decisionItems = decisionList.content;
  expect(decisionItems.length).toBe(itemCount);
  decisionItems.forEach(item => {
    expect(item.type).toEqual('decisionItem');
  });
};

describe('<DecisionList/>', () => {
  const defaultResponse = getDecisionsResponse();
  let provider;
  let renderer;

  const resourcedDecisionListRendered = (renderCount?: number) => renderer.callCount === (renderCount || 1);

  beforeEach(() => {
    provider = {
      getDecisions: sinon.stub(),
    };
    renderer = sinon.stub();
    renderer.returns(<div/>);
  });

  it('should render generate document and pass to renderer', () => {
    provider.getDecisions.returns(Promise.resolve(defaultResponse));
    const component = mount(
      <ResourcedDecisionList initialQuery={query} taskDecisionProvider={provider} renderDocument={renderer} />
    );
    return waitUntil(() => resourcedDecisionListRendered(1)).then(() => {
      expect(renderer.callCount).toBe(1);
      const doc = renderer.firstCall.args[0];
      validateDoc(doc, defaultResponse.decisions.length);
      const moreButton = component.find(Button);
      expect(moreButton.length).toBe(0);
    });
  });

  it('should show more option if response contains nextQuery and call again on selection', () => {
    provider.getDecisions.onFirstCall().returns(Promise.resolve(getDecisionsResponse(true)));
    provider.getDecisions.onSecondCall().returns(Promise.resolve(defaultResponse));
    const component = mount(
      <ResourcedDecisionList initialQuery={query} taskDecisionProvider={provider} renderDocument={renderer} />
    );
    return waitUntil(() => resourcedDecisionListRendered(1)).then(() => {
      expect(renderer.callCount).toBe(1);
      const doc = renderer.firstCall.args[0];
      validateDoc(doc, defaultResponse.decisions.length);
      const moreButton = component.find(Button);
      expect(moreButton.length).toBe(1);
      moreButton.simulate('click');
      return waitUntil(() => resourcedDecisionListRendered(2));
    }).then(() => {
      // One for loading state change + 1 for result = +2 calls
      expect(renderer.callCount).toBe(3);
      const doc = renderer.thirdCall.args[0];
      validateDoc(doc, defaultResponse.decisions.length * 2);
      const moreButton = component.find(Button);
      expect(moreButton.length).toBe(0);
    });
  });
});

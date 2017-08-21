import * as React from 'react';
import { mount } from 'enzyme';
import * as sinon from 'sinon';
import { waitUntil } from '@atlaskit/util-common-test';
import Button from '@atlaskit/button';

import { Query } from '../../../src/types';
import ResourcedTaskList from '../../../src/components/ResourcedTaskList';

import { getTasksResponse } from '../../../src/support/test-data';

const query: Query = {
  containerAri: 'cheese',
};

const validateDoc = (doc, itemCount: number) => {
  expect(doc.type).toEqual('doc');
  expect(doc.content.length).toBe(1);
  const decisionList = doc.content[0];
  expect(decisionList.type).toEqual('taskList');
  const decisionItems = decisionList.content;
  expect(decisionItems.length).toBe(itemCount);
  decisionItems.forEach(item => {
    expect(item.type).toEqual('taskItem');
  });
};

describe('<ResourcedTaskList/>', () => {
  const defaultResponse = getTasksResponse();
  let provider;
  let renderer;

  const resourcedTaskListRendered = (renderCount?: number) => renderer.callCount === (renderCount || 1);

  beforeEach(() => {
    provider = {
      getTasks: sinon.stub(),
    };
    renderer = sinon.stub();
    renderer.returns(<div/>);
  });

  it('should render generate document and pass to renderer', () => {
    provider.getTasks.returns(Promise.resolve(defaultResponse));
    const component = mount(
      <ResourcedTaskList initialQuery={query} taskDecisionProvider={Promise.resolve(provider)} renderDocument={renderer} />
    );
    return waitUntil(() => resourcedTaskListRendered(1)).then(() => {
      expect(renderer.callCount).toBe(1);
      const doc = renderer.firstCall.args[0];
      validateDoc(doc, defaultResponse.tasks.length);
      const moreButton = component.find(Button);
      expect(moreButton.length).toBe(0);
    });
  });

  it('should show more option if response contains nextQuery and call again on selection', () => {
    provider.getTasks.onFirstCall().returns(Promise.resolve(getTasksResponse(true)));
    provider.getTasks.onSecondCall().returns(Promise.resolve(defaultResponse));
    const component = mount(
      <ResourcedTaskList initialQuery={query} taskDecisionProvider={Promise.resolve(provider)} renderDocument={renderer} />
    );
    return waitUntil(() => resourcedTaskListRendered(1)).then(() => {
      expect(renderer.callCount).toBe(1);
      const doc = renderer.firstCall.args[0];
      validateDoc(doc, defaultResponse.tasks.length);
      const moreButton = component.find(Button);
      expect(moreButton.length).toBe(1);
      moreButton.simulate('click');
      return waitUntil(() => resourcedTaskListRendered(2));
    }).then(() => {
      // One for loading state change + 1 for result = +2 calls
      expect(renderer.callCount).toBe(3);
      const doc = renderer.thirdCall.args[0];
      validateDoc(doc, defaultResponse.tasks.length * 2);
      const moreButton = component.find(Button);
      expect(moreButton.length).toBe(0);
    });
  });
});

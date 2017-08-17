import * as React from 'react';
import { mount } from 'enzyme';
import * as sinon from 'sinon';
import { waitUntil } from '@atlaskit/util-common-test';
import Button from '@atlaskit/button';

import { Item, Query } from '../../../src/types';
import { getFormattedDate } from '../../../src/util/date';
import ResourcedItemList from '../../../src/components/ResourcedItemList';
import DecisionItem from '../../../src/components/DecisionItem';
import ResourcedTaskItem from '../../../src/components/ResourcedTaskItem';

import { getItemsResponse } from '../../../src/support/test-data';

const query: Query = {
  containerAri: 'cheese',
};

const countType = (items: Item[], type: string) => items.filter(item => item.type === type).length;

const decisionItemsRendered = (component, count) => component.find(DecisionItem).length === count;

describe('<ResourcedItemList/>', () => {
  const defaultResponse = getItemsResponse();
  let provider;
  let renderer;

  beforeEach(() => {
    provider = {
      getItems: sinon.stub(),
      subscribe: sinon.stub(),
      unsubscribe: sinon.stub(),
    };
    renderer = sinon.stub();
    renderer.returns(<div/>);
  });

  describe('ungrouped', () => {
    it('should render both types of items', () => {
      provider.getItems.returns(Promise.resolve(defaultResponse));
      const component = mount(
        <ResourcedItemList initialQuery={query} taskDecisionProvider={Promise.resolve(provider)} renderDocument={renderer} />
      );
      const decisionCount = countType(defaultResponse.items, 'DECISION');
      const typeCount = countType(defaultResponse.items, 'TASK');
      return waitUntil(() => decisionItemsRendered(component, decisionCount)).then(() => {
        expect(component.find(DecisionItem).length).toBe(decisionCount);
        expect(component.find(ResourcedTaskItem).length).toBe(typeCount);
        const moreButton = component.find(Button);
        expect(moreButton.length).toBe(0);
      });
    });

    // it('should show more option if response contains nextQuery and call again on selection', () => {
    //   const firstResponse = getItemsResponse(true);
    //   const secondResponse = getItemsResponse(false, 1);
    //   provider.getItems.onFirstCall().returns(Promise.resolve(firstResponse));
    //   provider.getItems.onSecondCall().returns(Promise.resolve(secondResponse));
    //   const component = mount(
    //     <ResourcedItemList initialQuery={query} taskDecisionProvider={provider} renderDocument={renderer} />
    //   );
    //   const decisionCount = countType(defaultResponse.items, 'DECISION');
    //   const typeCount = countType(defaultResponse.items, 'TASK');
    //   return waitUntil(() => decisionItemsRendered(component, decisionCount)).then(() => {
    //     expect(component.find(DecisionItem).length).toBe(decisionCount);
    //     expect(component.find(ResourcedTaskItem).length).toBe(typeCount);
    //     const moreButton = component.find(Button);
    //     expect(moreButton.length).toBe(1);
    //     moreButton.simulate('click');
    //     return waitUntil(() => decisionItemsRendered(component, decisionCount * 2));
    //   }).then(() => {
    //     expect(component.find(DecisionItem).length).toBe(decisionCount * 2);
    //     expect(component.find(ResourcedTaskItem).length).toBe(typeCount * 2);
    //     const moreButton = component.find(Button);
    //     expect(moreButton.length).toBe(0);
    //   });
    // });
  });

  describe('group by', () => {
    const performDateTest = (testQuery: Query, dateField: string) => {
      const response = getItemsResponse({ groupByDateSize: 4, dateField });
      provider.getItems.returns(Promise.resolve(response));
      const component = mount(
        <ResourcedItemList initialQuery={testQuery} taskDecisionProvider={Promise.resolve(provider)} renderDocument={renderer} groupItems={true} />
      );
      const decisionCount = countType(defaultResponse.items, 'DECISION');
      const typeCount = countType(defaultResponse.items, 'TASK');
      expect(decisionCount).toBe(5);
      expect(typeCount).toBe(5);
      return waitUntil(() => decisionItemsRendered(component, decisionCount)).then(() => {
        expect(component.find(DecisionItem).length).toBe(decisionCount);
        expect(component.find(ResourcedTaskItem).length).toBe(typeCount);
        const moreButton = component.find(Button);
        expect(moreButton.length).toBe(0);

        const dateGroups = component.find('ol').find('li');
        expect(dateGroups.length).toBe(3);
        // Group 1 - Today
        const dateGroup1 = dateGroups.at(0);
        expect(dateGroup1.find('div').first().text()).toBe('Today');
        expect(dateGroup1.find(DecisionItem).length).toBe(4);

        // Group 2 - Yesterday
        const dateGroup2 = dateGroups.at(1);
        expect(dateGroup2.find('div').first().text()).toBe('Yesterday');
        expect(dateGroup2.find(DecisionItem).length).toBe(1);
        expect(dateGroup2.find(ResourcedTaskItem).length).toBe(3);

        // Group 3 - Two dates ahead
        const dateGroup3 = dateGroups.at(2);
        expect(dateGroup3.find('div').first().text()).toBe(getFormattedDate(response.items[8][dateField]));
        expect(dateGroup3.find(ResourcedTaskItem).length).toBe(2);
      });
    };

    it('should group by creationDate, by default', () => {
      const groupByQuery: Query = {
        ...query,
      };
      performDateTest(groupByQuery, 'creationDate');
    });

    it('should group by creationDate, when specified', () => {
      const groupByQuery: Query = {
        ...query,
        sortCriteria: 'creationDate',
      };
      performDateTest(groupByQuery, 'creationDate');
    });

    it('should group by lastUpdateDate, when specified', () => {
      const groupByQuery: Query = {
        ...query,
        sortCriteria: 'lastUpdateDate',
      };
      performDateTest(groupByQuery, 'lastUpdateDate');
    });
  });
});

import {
  DecisionResponse,
  ItemResponse,
  ServiceDecision,
  ServiceTask,
  TaskResponse,
} from '../types';

import {
  convertServiceDecisionResponseToDecisionResponse,
  convertServiceItemResponseToItemResponse,
  convertServiceTaskResponseToTaskResponse,
} from '../api/TaskDecisionUtils';

import {
  getServiceDecisionsResponse,
  getServiceItemsResponse,
  getServiceTasksResponse,
} from './story-data';

import * as moment from 'moment';

// Just a re-export, but we may change datasets between stories and test at some point.
export {
  getServiceDecisionsResponse,
  getServiceItemsResponse,
  getServiceTasksResponse,
};

export const getDecisionsResponse = (hasMore?: boolean): DecisionResponse => {
  let query;
  if (hasMore) {
    query = {
      containerAri: 'container1',
      limit: 10,
      cursor: 'cheese',
    };
  }
  return convertServiceDecisionResponseToDecisionResponse(getServiceDecisionsResponse(), query);
};

export const getTasksResponse = (hasMore?: boolean): TaskResponse => {
  let query;
  if (hasMore) {
    query = {
      containerAri: 'container1',
      limit: 10,
      cursor: 'cheese',
    };
  }
  return convertServiceTaskResponseToTaskResponse(getServiceTasksResponse(), query);
};

export interface GetItemsResponseOptions {
  hasMore?: boolean;
  idOffset?: number;
  dateField?: string;
  groupByDateSize?: number;
}

export const getItemsResponse = (options?: GetItemsResponseOptions): ItemResponse => {
  const { dateField, groupByDateSize, hasMore, idOffset } = options || {} as GetItemsResponseOptions;
  let query;

  const getDate = (index: number): Date => {
    const dayOffset = groupByDateSize ? Math.floor(index / groupByDateSize) : 0;
    const m = moment().subtract(dayOffset, 'day');
    if (idOffset) {
      m.subtract('month', idOffset);
    }
    return m.toDate();
  };

  if (hasMore) {
    query = {
      containerAri: 'container1',
      limit: 10,
      cursor: 'cheese',
    };
  }
  let itemResponse = convertServiceItemResponseToItemResponse(getServiceItemsResponse(), query);
  if (idOffset) {
    itemResponse = {
      items: itemResponse.items.map(item => ({
        ...item,
        localId: `${item.localId}-${idOffset}`
      })),
      nextQuery: itemResponse.nextQuery
    };
  }
  if (dateField && groupByDateSize) {
    itemResponse = {
      items: itemResponse.items.map((item, index) => ({
        ...item,
        [dateField]: getDate(index),
      })),
      nextQuery: itemResponse.nextQuery
    };
  }

  return itemResponse;
};

export const serviceDecision: ServiceDecision = getServiceDecisionsResponse().decisions[0];
export const serviceTask: ServiceTask = getServiceTasksResponse().tasks[0];

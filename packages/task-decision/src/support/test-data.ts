import {
  Decision,
  DecisionResponse,
  Item,
  ItemResponse,
  Meta,
  Query,
  ServiceDecision,
  ServiceTask,
  ServiceItemResponse,
  Task,
  TaskResponse,
} from '../types';

import {
  convertServiceDecisionResponseToDecisionResponse,
  convertServiceDecisionToDecision,
  convertServiceItemResponseToItemResponse,
  convertServiceTaskResponseToTaskResponse,
  convertServiceTaskToTask,
} from '../api/TaskDecisionUtils';

import {
  getServiceDecisionsResponse,
  getServiceItemsResponse,
  getServiceTasksResponse,
} from './story-data';

import { addMinutes, subDays, subMonths } from 'date-fns';

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
    let date = subDays(new Date(), dayOffset);
    if (idOffset) {
      date = subMonths(date, idOffset);
    }
    return date;
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

export const buildServiceDecision = (part: Partial<ServiceDecision>): ServiceDecision => {
  return {
    ...serviceDecision,
    ...part
  };
};

export const buildServiceTask = (part: Partial<ServiceTask>): ServiceTask => {
  return {
    ...serviceTask,
    ...part
  };
};

export const buildItemServiceResponse = (items: (ServiceTask | ServiceDecision)[], meta: Meta): ServiceItemResponse => {
  return {
    elements: items,
    meta,
  };
};

export const decision: Decision = convertServiceDecisionToDecision(serviceDecision);
export const task: Task = convertServiceTaskToTask(serviceTask);

export const buildDecision = (part: Partial<Decision>): Decision => {
  return {
    ...decision,
    ...part
  };
};

export const buildTask = (part: Partial<Task>): Task => {
  return {
    ...task,
    ...part
  };
};

export const buildItemResponse = (items: Item[], nextQuery?: Query): ItemResponse => {
  return {
    items,
    nextQuery
  };
};

export const content = (text: string): any => [
  {
    type: 'text',
    text,
  }
];

export const datePlus = (minutes: number): Date => addMinutes(new Date(), minutes);

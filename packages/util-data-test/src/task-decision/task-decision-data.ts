import { ServiceDecisionResponse, ServiceItemResponse, ServiceTaskResponse } from '@atlaskit/task-decision';

declare var require: {
  <T>(path: string): T;
};

export const getServiceDecisionsResponse = (): ServiceDecisionResponse => require('./sample-decisions.json') as ServiceDecisionResponse;
export const getServiceTasksResponse = (): ServiceTaskResponse => require('./sample-tasks.json') as ServiceTaskResponse;
export const getServiceItemsResponse = (): ServiceItemResponse => require('./sample-elements.json') as ServiceItemResponse;

import { ServiceDecisionResponse, ServiceItemResponse, ServiceTaskResponse } from '@atlaskit/task-decision';

declare var require: {
  <T>(path: string): T;
};

export const getServiceDecisionsResponse = (): ServiceDecisionResponse => require('../json-data/sample-decisions.json') as ServiceDecisionResponse;
export const getServiceTasksResponse = (): ServiceTaskResponse => require('../json-data/sample-tasks.json') as ServiceTaskResponse;
export const getServiceItemsResponse = (): ServiceItemResponse => require('../json-data/sample-elements.json') as ServiceItemResponse;

import { DecisionResponse, ServiceDecision, ServiceDecisionResponse } from '../types';
import { convertServiceDecisionResponseToDecisionResponse } from '../api/TaskDecisionUtils';

declare var require: {
    <T>(path: string): T;
};

export const getServiceDecisionsResponse = (): ServiceDecisionResponse => require('./sample-decisions.json') as ServiceDecisionResponse;

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

export const serviceDecision: ServiceDecision = getServiceDecisionsResponse().decisions[0];

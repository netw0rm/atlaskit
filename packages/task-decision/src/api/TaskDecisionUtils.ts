import { Decision, DecisionQuery, DecisionResponse, ServiceDecision, ServiceDecisionResponse } from '../types';

export const convertServiceDecisionToDecision = (serviceDecision: ServiceDecision): Decision => {
  const { creationDate, lastUpdateDate, rawContent, ...other } = serviceDecision;
  return {
    creationDate: new Date(creationDate),
    lastUpdateDate: new Date(lastUpdateDate),
    content: JSON.parse(rawContent),
    ...other,
  };
};

export const convertServiceDecisionResponseToDecisionResponse = (serviceDecisionResponse: ServiceDecisionResponse, query?: DecisionQuery): DecisionResponse => {
  const decisions = serviceDecisionResponse.decisions.map(convertServiceDecisionToDecision);
  let nextQuery: DecisionQuery | undefined;
  if (query && serviceDecisionResponse.meta && serviceDecisionResponse.meta.cursor) {
    nextQuery = {
      ...query,
      cursor: serviceDecisionResponse.meta.cursor,
    };
  }

  return {
    decisions,
    nextQuery,
  };
};

export const decisionsToDocument = (decisions: Decision[]): any => ({
  type: 'doc',
  version: 1,
  content: [
    {
      type: 'decisionList',
      content: decisions.map(decision => {
        const { content, localId, state } = decision;
        return {
          type: 'decisionItem',
          attrs: {
            localId,
            state,
          },
          content,
        };
      })
    }
  ]
});

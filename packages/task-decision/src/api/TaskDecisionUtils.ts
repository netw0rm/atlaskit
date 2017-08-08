import { Decision, DecisionQuery, DecisionResponse, ServiceDecision, ServiceDecisionResponse, ObjectKey, ServiceTask, Task } from '../types';

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

export const convertServiceTaskToTask = (serviceTask: ServiceTask): Task => {
  const { creationDate, lastUpdateDate, rawContent, ...other } = serviceTask;
  return {
    creationDate: new Date(creationDate),
    lastUpdateDate: new Date(lastUpdateDate),
    content: JSON.parse(rawContent),
    ...other
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

export const objectKeyToString = (objectKey: ObjectKey) => {
  const { containerAri, objectAri, localId } = objectKey;
  return `${containerAri}:${objectAri}:${localId}`;
};

export const findIndex = (array: any[], predicate: (item: any) => boolean): number => {
  let index = -1;
  array.some((item, i) => {
    if (predicate(item)) {
      index = i;
      return true;
    }
    return false;
  });

  return index;
};

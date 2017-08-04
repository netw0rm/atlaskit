import { MockTaskDecisionResourceConfig } from './support-types';
import { DecisionQuery, DecisionResponse, TaskDecisionProvider } from '../types';
import { getServiceDecisionsResponse } from './story-data';

import { convertServiceDecisionToDecision } from '../api/TaskDecisionUtils';

export default class MockTaskDecisionResource implements TaskDecisionProvider {
  private config?: MockTaskDecisionResourceConfig;
  private fakeCursor = 0;

  constructor(config?: MockTaskDecisionResourceConfig) {
    this.config = config;
  }

  getDecisions(query: DecisionQuery): Promise<DecisionResponse> {
    const serviceDecisionResponse = getServiceDecisionsResponse();
    const decisions = serviceDecisionResponse.decisions.map(convertServiceDecisionToDecision);
    let nextQuery: DecisionQuery | undefined;
    if (this.config && this.config.hasMore) {
      nextQuery = {
        ...query,
        cursor: `${this.fakeCursor++}`,
      };
    }
    const result = {
      decisions,
      nextQuery,
    };

    const lag = this.config && this.config.lag;

    if (lag) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(result);
        }, lag);
      });
    }
    return Promise.resolve(result);
  }
}

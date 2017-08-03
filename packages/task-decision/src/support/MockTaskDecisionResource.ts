import { MockTaskDecisionResourceConfig } from './support-types';
import { DecisionQuery, DecisionResponse, TaskDecisionProvider, ObjectKey, Handler } from '../types';
import { getServiceDecisionsResponse } from './story-data';

import { convertServiceDecisionToDecision, objectKeyToString, findIndex } from '../api/TaskDecisionUtils';

export default class MockTaskDecisionResource implements TaskDecisionProvider {
  private config?: MockTaskDecisionResourceConfig;
  private fakeCursor = 0;
  private subscribers: Map<string, Handler[]> = new Map();

  constructor(config?: MockTaskDecisionResourceConfig) {
    this.config = config;
    this.subscribers.clear();
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

  toggleTask(objectKey: ObjectKey, isDone: boolean): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      resolve(isDone);
      setTimeout(() => {
        this.notifyUpdated(objectKey, isDone);
      }, 200);
    });
  }

  subscribe(objectKey: ObjectKey, handler: Handler) {
    const key = objectKeyToString(objectKey);
    const handlers = this.subscribers.get(key) || [];
    handlers.push(handler);
    this.subscribers.set(key, handlers);
  }

  unsubscribe(objectKey: ObjectKey, handler: Handler) {
    const key = objectKeyToString(objectKey);
    const handlers = this.subscribers.get(key);
    if (!handlers) {
      return;
    }

    const index = findIndex(handlers, h => h === handler);

    if (index !== -1) {
      handlers.splice(index, 1);
    }

    if (handlers.length === 0) {
      this.subscribers.delete(key);
    } else {
      this.subscribers.set(key, handlers);
    }
  }

  notifyUpdated(objectKey: ObjectKey, isDone: boolean) {
    const key = objectKeyToString(objectKey);
    const handlers = this.subscribers.get(key);
    if (!handlers) {
      return;
    }

    handlers.forEach(handler => {
      handler(isDone);
    });
  }

}

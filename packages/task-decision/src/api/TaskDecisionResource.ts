import { RequestServiceOptions, ServiceConfig, utils } from '@atlaskit/util-service-support';
import { DecisionQuery, DecisionResponse, ServiceDecisionResponse, TaskDecisionProvider, ObjectKey, Handler } from '../types';
import { convertServiceDecisionResponseToDecisionResponse, objectKeyToString, findIndex } from './TaskDecisionUtils';

export default class TaskDecisionResource implements TaskDecisionProvider {
  private serviceConfig: ServiceConfig;
  private subscribers: Map<string, Handler[]> = new Map();

  constructor(serviceConfig: ServiceConfig) {
    this.serviceConfig = serviceConfig;
    this.subscribers.clear();
  }

  getDecisions(query: DecisionQuery): Promise<DecisionResponse> {
    const options: RequestServiceOptions = {
      path: 'decision',
      requestInit: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(query),
      }
    };
    return utils.requestService<ServiceDecisionResponse>(this.serviceConfig, options).then(serviceDecisionResponse => {
      return convertServiceDecisionResponseToDecisionResponse(serviceDecisionResponse, query);
    });
  }

  toggleTask(objectKey: ObjectKey, isDone: boolean): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      // TODO: Call service to update task
      resolve(isDone);

      // Notify subscribers that the task have been updated so that they can re-render accordingly
      this.notifyUpdated(objectKey, isDone);
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

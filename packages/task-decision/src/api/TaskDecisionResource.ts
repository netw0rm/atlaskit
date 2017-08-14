import { RequestServiceOptions, ServiceConfig, utils } from '@atlaskit/util-service-support';
import {
  convertServiceDecisionResponseToDecisionResponse,
  convertServiceItemResponseToItemResponse,
  convertServiceTaskResponseToTaskResponse,
  convertServiceTaskToTask,
  findIndex,
  ResponseConverter
} from './TaskDecisionUtils';
import {
  BaseItem,
  DecisionResponse,
  DecisionState,
  Handler,
  ItemResponse,
  ObjectKey,
  Query,
  ServiceTask,
  TaskDecisionProvider,
  TaskResponse,
  TaskState,
} from '../types';
import { objectKeyToString } from '../type-helpers';

let debouncedTaskStateQuery: number | null = null;
let debouncedTaskToggle: number | null = null;

export default class TaskDecisionResource implements TaskDecisionProvider {
  private serviceConfig: ServiceConfig;
  private subscribers: Map<string, Handler[]> = new Map();
  private cachedItems: Map<string, BaseItem<TaskState | DecisionState>> = new Map();
  private batchedKeys: Map<string, ObjectKey> = new Map();

  constructor(serviceConfig: ServiceConfig) {
    this.serviceConfig = serviceConfig;
    this.subscribers.clear();
    this.cachedItems.clear();
    this.batchedKeys.clear();
  }

  getDecisions(query: Query): Promise<DecisionResponse> {
    return this.query(query, 'decisions/query', convertServiceDecisionResponseToDecisionResponse);
  }

  getTasks(query: Query): Promise<TaskResponse> {
    return this.query(query, 'tasks/query', convertServiceTaskResponseToTaskResponse);
  }

  getItems(query: Query): Promise<ItemResponse> {
    return this.query(query, 'elements/query', convertServiceItemResponseToItemResponse);
  }

  private query<S,R>(query: Query, path: string, converters: ResponseConverter<S,R>): Promise<R> {
    const options: RequestServiceOptions = {
      path,
      requestInit: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(this.apiQueryToServiceQuery(query)),
      }
    };
    return utils.requestService<S>(this.serviceConfig, options).then(serviceResponse => {
      return converters(serviceResponse, query);
    });
  }

  private apiQueryToServiceQuery(query: Query) {
    const { sortCriteria, ...other } = query;
    const serviceQuery: any = {
      ...other,
    };
    switch (sortCriteria) {
      case 'lastUpdateDate':
        serviceQuery.sortCriteria = 'LAST_UPDATE_DATE';
        break;
      case 'creationDate':
      default:
        serviceQuery.sortCriteria = 'CREATION_DATE';
        break;
    }
    return serviceQuery;
  }

  toggleTask(objectKey: ObjectKey, state: TaskState): Promise<TaskState> {
    if (debouncedTaskToggle) {
      clearTimeout(debouncedTaskToggle);
    }

    return new Promise<TaskState>((resolve, reject) => {
      debouncedTaskToggle = setTimeout(() => {
        const options: RequestServiceOptions = {
          path: 'tasks',
          requestInit: {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
              ...objectKey,
              state
            }),
          }
        };

        utils
          .requestService<ServiceTask>(this.serviceConfig, options)
          .then(convertServiceTaskToTask)
          .then(task => {
            const key = objectKeyToString(objectKey);
            this.cachedItems.set(key, task);

            resolve(state);
            // Notify subscribers that the task have been updated so that they can re-render accordingly
            this.notifyUpdated(objectKey, state);
          })
          .catch(() => reject());
      }, 500);
    });
  }

  getTaskState(keys: ObjectKey[]) {
    const options: RequestServiceOptions = {
      path: 'tasks/state',
      requestInit: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          'taskKeys': keys
        }),
      }
    };

    return utils.requestService<BaseItem<TaskState>[]>(this.serviceConfig, options);
  }

  subscribe(objectKey: ObjectKey, handler: Handler) {
    const key = objectKeyToString(objectKey);
    const handlers = this.subscribers.get(key) || [];
    handlers.push(handler);
    this.subscribers.set(key, handlers);

    const cached = this.cachedItems.get(key);
    if (cached) {
      this.notifyUpdated(objectKey, cached.state);
      return;
    }

    if (debouncedTaskStateQuery) {
      clearTimeout(debouncedTaskStateQuery);
    }

    this.queueItem(objectKey);

    debouncedTaskStateQuery = setTimeout(() => {
      this.getTaskState(Array.from(this.batchedKeys.values()))
        .then(tasks => {
          tasks.forEach(task => {
            const { containerAri, objectAri, localId } = task;
            const objectKey = { containerAri, objectAri, localId };
            this.cachedItems.set(objectKeyToString(objectKey), task);

            this.dequeueItem(objectKey);
            this.notifyUpdated(objectKey, task.state);
          });
        });
    }, 1);
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

  notifyUpdated(objectKey: ObjectKey, state: TaskState | DecisionState) {
    const key = objectKeyToString(objectKey);
    const handlers = this.subscribers.get(key);
    if (!handlers) {
      return;
    }

    handlers.forEach(handler => {
      handler(state);
    });
  }

  private queueItem(objectKey: ObjectKey) {
    const key = objectKeyToString(objectKey);
    if (this.batchedKeys.get(key)) {
      return;
    }

    this.batchedKeys.set(key, objectKey);
  }

  private dequeueItem(objectKey: ObjectKey) {
    const key = objectKeyToString(objectKey);
    this.batchedKeys.delete(key);
  }

}

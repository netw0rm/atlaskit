import * as URLSearchParams from 'url-search-params';
import * as fetchMock from 'fetch-mock/src/client';
import { waitUntil } from '@atlaskit/util-common-test';

import {
  buildItemServiceResponse,
  buildServiceDecision,
  buildServiceTask,
  datePlus,
  getServiceDecisionsResponse,
  getServiceItemsResponse,
  getServiceTasksResponse,
} from '../../../src/support/test-data';

import TaskDecisionResource, { ItemStateManager } from '../../../src/api/TaskDecisionResource';

import {
  BaseItem,
  Query,
  TaskState,
} from '../../../src/types';

import {
  objectKeyToString,
  toObjectKey,
} from '../../../src/type-helpers';

// patch URLSearchParams API for jsdom tests
declare var global: any;
global.URLSearchParams = URLSearchParams;

const url = 'https://cheese/';

const getItemStateManager = (resource: TaskDecisionResource): ItemStateManager => (resource as any).itemStateManager;

describe('TaskDecisionResource', () => {

  describe('getDecisions', () => {

    afterEach(() => {
      fetchMock.restore();
    });

    it('successful', () => {
      const response = getServiceDecisionsResponse();
      fetchMock.mock({
        matcher: `begin:${url}`,
        response,
        name: 'decision',
      });
      const resource = new TaskDecisionResource({ url });
      const query = {
        containerAri: 'container1',
        limit: 10,
        cursor: 'cursor1'
      };
      return resource.getDecisions(query).then(result => {
        const { decisions, nextQuery } = result;
        expect(decisions.length).toBe(response.decisions.length);
        expect(nextQuery).toBeDefined();
        if (nextQuery) {
          expect(nextQuery.containerAri).toEqual('container1');
          expect(nextQuery.limit).toEqual(10);
          expect(nextQuery.cursor).toEqual(response.meta.cursor);
        }

        const calls = fetchMock.calls('decision');
        expect(calls.length).toBe(1);
        const call = calls[0][0];
        expect(call.url).toEqual(`${url}decisions/query`);
        expect(call.method).toEqual('POST');
        const body = JSON.parse(call._bodyText);
        expect(body.containerAri).toEqual('container1');
        expect(body.limit).toEqual(10);
        expect(body.cursor).toEqual('cursor1');
      });
    });

    it('error', () => {
      fetchMock.mock({
        matcher: `begin:${url}`,
        response: 404,
        name: 'decision',
      });
      const resource = new TaskDecisionResource({ url });
      const query = {
        containerAri: 'container1',
        limit: 10,
        cursor: 'cursor1'
      };
      return resource.getDecisions(query).then(result => {
        fail(`getDecisions should return rejected promise:\n${JSON.stringify(result, undefined, 2)}`);
      }).catch(err => {
        expect(err.code).toBe(404);
      });
    });
  });

  describe('getTasks', () => {
    afterEach(() => {
      fetchMock.restore();
    });

    it('successful', () => {
      const response = getServiceTasksResponse();
      fetchMock.mock({
        matcher: `begin:${url}`,
        response,
        name: 'task',
      });
      const resource = new TaskDecisionResource({ url });
      const query = {
        containerAri: 'container1',
        limit: 10,
        cursor: 'cursor1'
      };
      return resource.getTasks(query).then(result => {
        const { tasks, nextQuery } = result;
        expect(tasks.length).toBe(response.tasks.length);
        expect(nextQuery).toBeDefined();
        if (nextQuery) {
          expect(nextQuery.containerAri).toEqual('container1');
          expect(nextQuery.limit).toEqual(10);
          expect(nextQuery.cursor).toEqual(response.meta.cursor);
        }

        const calls = fetchMock.calls('task');
        expect(calls.length).toBe(1);
        const call = calls[0][0];
        expect(call.url).toEqual(`${url}tasks/query`);
        expect(call.method).toEqual('POST');
        const body = JSON.parse(call._bodyText);
        expect(body.containerAri).toEqual('container1');
        expect(body.limit).toEqual(10);
        expect(body.cursor).toEqual('cursor1');
      });
    });

    it('error', () => {
      fetchMock.mock({
        matcher: `begin:${url}`,
        response: 404,
        name: 'task',
      });
      const resource = new TaskDecisionResource({ url });
      const query = {
        containerAri: 'container1',
        limit: 10,
        cursor: 'cursor1'
      };
      return resource.getTasks(query).then(result => {
        fail(`getTasks should return rejected promise:\n${JSON.stringify(result, undefined, 2)}`);
      }).catch(err => {
        expect(err.code).toBe(404);
      });
    });
  });

  describe('getItems', () => {
    afterEach(() => {
      fetchMock.restore();
    });

    it('successful', () => {
      const response = getServiceItemsResponse();
      fetchMock.mock({
        matcher: `begin:${url}`,
        response,
        name: 'items',
      });
      const resource = new TaskDecisionResource({ url });
      const query = {
        containerAri: 'container1',
        limit: 10,
        cursor: 'cursor1'
      };
      return resource.getItems(query).then(result => {
        const { items, nextQuery } = result;
        expect(items.length).toBe(response.elements.length);
        expect(nextQuery).toBeDefined();
        if (nextQuery) {
          expect(nextQuery.containerAri).toEqual('container1');
          expect(nextQuery.limit).toEqual(10);
          expect(nextQuery.cursor).toEqual(response.meta.cursor);
        }

        const calls = fetchMock.calls('items');
        expect(calls.length).toBe(1);
        const call = calls[0][0];
        expect(call.url).toEqual(`${url}elements/query`);
        expect(call.method).toEqual('POST');
        const body = JSON.parse(call._bodyText);
        expect(body.containerAri).toEqual('container1');
        expect(body.limit).toEqual(10);
        expect(body.cursor).toEqual('cursor1');
        expect(body.sortCriteria).toEqual('CREATION_DATE');
      });
    });

    it('error', () => {
      fetchMock.mock({
        matcher: `begin:${url}`,
        response: 404,
        name: 'items',
      });
      const resource = new TaskDecisionResource({ url });
      const query = {
        containerAri: 'container1',
        limit: 10,
        cursor: 'cursor1'
      };
      return resource.getItems(query).then(result => {
        fail(`getItems should return rejected promise:\n${JSON.stringify(result, undefined, 2)}`);
      }).catch(err => {
        expect(err.code).toBe(404);
      });
    });

    it('sortCriteria - creationDate', () => {
      const response = getServiceItemsResponse();
      fetchMock.mock({
        matcher: `begin:${url}`,
        response,
        name: 'items',
      });
      const resource = new TaskDecisionResource({ url });
      const query: Query = {
        containerAri: 'container1',
        limit: 10,
        cursor: 'cursor1',
        sortCriteria: 'creationDate',
      };
      return resource.getItems(query).then(result => {
        const { nextQuery } = result;
        expect(nextQuery).toBeDefined();
        if (nextQuery) {
          expect(nextQuery.sortCriteria).toEqual(query.sortCriteria);
        }

        const calls = fetchMock.calls('items');
        expect(calls.length).toBe(1);
        const call = calls[0][0];
        const body = JSON.parse(call._bodyText);
        expect(body.sortCriteria).toEqual('CREATION_DATE');
      });
    });

    it('sortCriteria - lastUpdateDate', () => {
      const response = getServiceItemsResponse();
      fetchMock.mock({
        matcher: `begin:${url}`,
        response,
        name: 'items',
      });
      const resource = new TaskDecisionResource({ url });
      const query: Query = {
        containerAri: 'container1',
        limit: 10,
        cursor: 'cursor1',
        sortCriteria: 'lastUpdateDate',
      };
      return resource.getItems(query).then(result => {
        const { nextQuery } = result;
        expect(nextQuery).toBeDefined();
        if (nextQuery) {
          expect(nextQuery.sortCriteria).toEqual(query.sortCriteria);
        }

        const calls = fetchMock.calls('items');
        expect(calls.length).toBe(1);
        const call = calls[0][0];
        const body = JSON.parse(call._bodyText);
        expect(body.sortCriteria).toEqual('LAST_UPDATE_DATE');
      });
    });
  });

  describe('getTaskState', () => {

    afterEach(() => {
      fetchMock.restore();
    });

    const resource = new TaskDecisionResource({ url });
    const tasks = [
      {
        containerAri: 'containerAri',
        objectAri: 'objectAri',
        localId: 'task-1',
        state: 'DONE'
      },
      {
        containerAri: 'containerAri',
        objectAri: 'objectAri',
        localId: 'task-2',
        state: 'DONE'
      },
      {
        containerAri: 'containerAri',
        objectAri: 'objectAri',
        localId: 'task-3',
        state: 'TODO'
      },
    ];

    it('should return list of task states', () => {
      fetchMock.mock({
        matcher: `end:tasks/state`,
        name: 'task',
        response: tasks
      });

      return (resource as any).itemStateManager.getTaskState(tasks).then(response => {
        expect(response).toEqual(tasks);
      });
    });

  });

  describe('subscriptions', () => {
    const resource = new TaskDecisionResource({ url });
    const mockHandler = jest.fn();
    const mockHandler2 = jest.fn();
    const objectKey = { localId: 'task-1', objectAri: 'objectAri', containerAri: 'containerAri' };

    describe('subscribe', () => {
      it('should add handlers to subscriptions-map', () => {
        resource.subscribe(objectKey, mockHandler);
        resource.subscribe(objectKey, mockHandler2);
        expect((getItemStateManager(resource) as any).subscribers.get(objectKeyToString(objectKey))).toEqual([mockHandler, mockHandler2]);
      });
    });

    describe('notifyUpdated', () => {
      it('should call all subscribers', () => {
        getItemStateManager(resource).notifyUpdated(objectKey, 'DONE');
        expect(mockHandler).toBeCalledWith('DONE');
        expect(mockHandler2).toBeCalledWith('DONE');
      });
    });

    describe('unsubscribe', () => {
      it('should remove handler from subscriptions-map', () => {
        resource.unsubscribe(objectKey, mockHandler);
        expect((getItemStateManager(resource) as any).subscribers.get(objectKeyToString(objectKey))).toEqual([mockHandler2]);
      });

      it('should delete the key from subscriptions-map if empty', () => {
        resource.unsubscribe(objectKey, mockHandler2);
        expect((getItemStateManager(resource) as any).subscribers.get(objectKeyToString(objectKey))).toEqual(undefined);
      });
    });

  });

  describe('recent updates', () => {
    describe('items', () => {
      afterEach(() => {
        fetchMock.restore();
      });

      it('notified of recent updates', () => {
        const resource = new TaskDecisionResource({ url });
        const d1 = buildServiceDecision({ localId: 'd1', lastUpdateDate: datePlus(4).toISOString() });
        const t1 = buildServiceTask({ localId: 't1', state: 'TODO', lastUpdateDate: datePlus(3).toISOString() });
        const d2 = buildServiceDecision({ localId: 'd2', lastUpdateDate: datePlus(2).toISOString() });
        const t2 = buildServiceTask({ localId: 't2', state: 'DONE', lastUpdateDate: datePlus(1).toISOString() });
        const response = buildItemServiceResponse([
          d1,
          t1,
          d2,
          t2,
        ], {});

        const t1update = buildServiceTask({ localId: 't1', state: 'DONE', lastUpdateDate: datePlus(5).toISOString() });
        const stateUpdateResponse: BaseItem<TaskState>[] = [
          {
            ...toObjectKey(t1update),
            state: t1update.state, // match service update
            type: 'TASK',
          },
        ];

        fetchMock.mock({
          matcher: `begin:${url}elements/query`,
          response,
          times: 1,
        }).mock({
          matcher: `begin:${url}tasks/state`,
          response: stateUpdateResponse,
          times: 1,
        });

        const idMock = jest.fn();
        const recentUpdatesMock = jest.fn();
        const handlerT1 = jest.fn();

        resource.subscribe(toObjectKey(t1), handlerT1);

        return resource.getItems({
          containerAri: 'cheese',
          sortCriteria: 'lastUpdateDate',
        }, {
          id: idMock,
          recentUpdates: recentUpdatesMock,
        }).then(response => {
          expect(idMock.mock.calls.length).toBe(1);
          expect(recentUpdatesMock.mock.calls.length).toBe(0);
          expect(response.items.length).toBe(4);
          const context = {
            containerAri: 'cheese',
            localId: 'bacon',
          };
          resource.notifyRecentUpdates(context);
          expect(recentUpdatesMock.mock.calls.length).toBe(1);
          expect(recentUpdatesMock.mock.calls[0][0]).toEqual(context);
          return waitUntil(() => handlerT1.mock.calls.length === 1);
        }).then(() => {
          expect(handlerT1.mock.calls.length).toBe(1);

          const recentUpdatedId = idMock.mock.calls[0][0];
          resource.unsubscribeRecentUpdates(recentUpdatedId);
          resource.notifyRecentUpdates({
            containerAri: 'cheese'
          });
          // No new callback as unsubscribed
          expect(recentUpdatesMock.mock.calls.length).toBe(1);
        });
      });
    });

  });
});

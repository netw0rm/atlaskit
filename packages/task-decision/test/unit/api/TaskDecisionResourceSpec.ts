import * as URLSearchParams from 'url-search-params';
import * as fetchMock from 'fetch-mock/src/client';

import { getServiceDecisionsResponse, getServiceTasksResponse, getServiceItemsResponse } from '../../../src/support/test-data';
import TaskDecisionResource from '../../../src/api/TaskDecisionResource';
import { Query } from '../../../src/types';
import { objectKeyToString } from '../../../src/type-helpers';

// patch URLSearchParams API for jsdom tests
declare var global: any;
global.URLSearchParams = URLSearchParams;

const url = 'https://cheese/';

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
        expect(body.sortCriteria).toEqual(undefined);
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

      return resource.getTaskState(tasks).then(response => {
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
        expect((resource as any).subscribers.get(objectKeyToString(objectKey))).toEqual([mockHandler, mockHandler2]);
      });
    });

    describe('notifyUpdated', () => {
      it('should call all subscribers', () => {
        resource.notifyUpdated(objectKey, 'DONE');
        expect(mockHandler).toBeCalledWith('DONE');
        expect(mockHandler2).toBeCalledWith('DONE');
      });
    });

    describe('unsubscribe', () => {
      it('should remove handler from subscriptions-map', () => {
        resource.unsubscribe(objectKey, mockHandler);
        expect((resource as any).subscribers.get(objectKeyToString(objectKey))).toEqual([mockHandler2]);
      });

      it('should delete the key from subscriptions-map if empty', () => {
        resource.unsubscribe(objectKey, mockHandler2);
        expect((resource as any).subscribers.get(objectKeyToString(objectKey))).toEqual(undefined);
      });
    });

  });

});

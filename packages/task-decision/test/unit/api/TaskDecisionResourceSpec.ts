import * as URLSearchParams from 'url-search-params';
import * as fetchMock from 'fetch-mock/src/client';

import { getServiceDecisionsResponse } from '../../../src/support/test-data';
import { objectKeyToString } from '../../../src/api/TaskDecisionUtils';
import TaskDecisionResource from '../../../src/api/TaskDecisionResource';

// patch URLSearchParams API for jsdom tests
declare var global: any;
global.URLSearchParams = URLSearchParams;

const url = 'https://cheese/';

describe('TaskDecisionResource', () => {

  afterEach(() => {
    fetchMock.restore();
  });

  it('getDecisions successful', () => {
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
      expect(call.url).toEqual(`${url}decision`);
      expect(call.method).toEqual('POST');
      const body = JSON.parse(call._bodyText);
      expect(body.containerAri).toEqual('container1');
      expect(body.limit).toEqual(10);
      expect(body.cursor).toEqual('cursor1');
    });
  });

  it('getDecisions error', () => {
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

  describe('subscriptions', () => {
    const resource = new TaskDecisionResource({ url });
    const mockHandler = jest.fn();
    const mockHandler2 = jest.fn();
    const objectKey = { taskId: 'task-1', ari: 'objectAri', containerAri: 'containerAri' };

    describe('subscribe', () => {
      it('should add handlers to subscriptions-map', () => {
        resource.subscribe(objectKey, mockHandler);
        resource.subscribe(objectKey, mockHandler2);
        expect((resource as any).subscribers.get(objectKeyToString(objectKey))).toEqual([mockHandler, mockHandler2]);
      });
    });

    describe('notifyUpdated', () => {
      it('should call all subscribers', () => {
        resource.notifyUpdated(objectKey, true);
        expect(mockHandler).toBeCalledWith(true);
        expect(mockHandler2).toBeCalledWith(true);
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

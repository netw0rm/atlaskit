import { AbstractResource } from '../../src/serviceResources';
import { OnProviderChange } from '../../src/types';

class TestResource extends AbstractResource<string, string[], string, string, {}> {
  filter() {}

  callNotifyResult(result: string[]) {
    this.notifyResult(result);
  }

  callNotifyError(error: string){
    this.notifyError(error);
  }

  callNotifyInfo(info: string) {
    this.notifyInfo(info);
  }

  callNotifyNotReady() {
    this.notifyNotReady();
  }
}

class TestOnProviderChange implements OnProviderChange<string[], string, string> {
  result = jest.fn();
  error = jest.fn();
  info = jest.fn();
  notReady = jest.fn();
}

class MinimalTestOnProviderChange implements OnProviderChange<string[], string, string> {
  result = jest.fn();
}

const result = [ 'a', 'b' ];
const errMsg = 'error';
const infoMsg = 'info';

const testSubscriptions = (subCount: number) => {
  let resource: TestResource;
  let listeners: TestOnProviderChange[];

  beforeEach(() => {
    resource = new TestResource();
    listeners = [];
    for (let i = 0; i < subCount; i++) {
      const listener = new TestOnProviderChange();
      listeners.push(listener);
      resource.subscribe(listener);
    }
  });

  it('all listeners called on notifyResult', () => {
    resource.callNotifyResult(result);
    listeners.forEach(listener => {
      expect(listener.result).toHaveBeenCalledTimes(1);
      expect(listener.result).toHaveBeenCalledWith(result);
      expect(listener.error).not.toHaveBeenCalled();
      expect(listener.info).not.toHaveBeenCalled();
      expect(listener.notReady).not.toHaveBeenCalled();
    });
  });

  it('new subscriber gets notified of last result', () => {
    resource.callNotifyResult(result);
    const listener = new TestOnProviderChange();
    resource.subscribe(listener);
    resource.callNotifyResult(result);
    expect(listener.result).toHaveBeenCalledTimes(1);
    expect(listener.result).toHaveBeenCalledWith(result);
  });

  it('all listeners called on notifyError', () => {
    resource.callNotifyError(errMsg);
    listeners.forEach(listener => {
      expect(listener.result).not.toHaveBeenCalled();
      expect(listener.error).toHaveBeenCalledTimes(1);
      expect(listener.error).toHaveBeenCalledWith(errMsg);
      expect(listener.info).not.toHaveBeenCalled();
      expect(listener.notReady).not.toHaveBeenCalled();
    });
  });

  it('all listeners called on notifyInfo', () => {
    resource.callNotifyInfo(infoMsg);
    listeners.forEach(listener => {
      expect(listener.result).not.toHaveBeenCalled();
      expect(listener.error).not.toHaveBeenCalled();
      expect(listener.info).toHaveBeenCalledTimes(1);
      expect(listener.info).toHaveBeenCalledWith(infoMsg);
      expect(listener.notReady).not.toHaveBeenCalled();
    });
  });

  it('all listeners called on notifyNotReady', () => {
    resource.callNotifyNotReady();
    listeners.forEach(listener => {
      expect(listener.result).not.toHaveBeenCalled();
      expect(listener.error).not.toHaveBeenCalled();
      expect(listener.info).not.toHaveBeenCalled();
      expect(listener.notReady).toHaveBeenCalledTimes(1);
    });
  });

  it('optional callbacks are skipped', () => {
    const minimalListener = new MinimalTestOnProviderChange();
    resource.subscribe(minimalListener);
    resource.callNotifyResult(result);
    resource.callNotifyError(errMsg);
    resource.callNotifyInfo(infoMsg);
    resource.callNotifyNotReady();
    listeners.forEach(listener => {
      expect(listener.result).toHaveBeenCalledTimes(1);
      expect(listener.error).toHaveBeenCalledTimes(1);
      expect(listener.info).toHaveBeenCalledTimes(1);
      expect(listener.notReady).toHaveBeenCalledTimes(1);
    });
    expect(minimalListener.result).toHaveBeenCalledWith(result);
    expect(minimalListener.result).toHaveBeenCalledTimes(1);
  });

  if (subCount > 0) {
    it('unsubscribed listeners are not called on notifyResult', () => {
      const removedListener = listeners[0];
      resource.unsubscribe(removedListener);
      resource.callNotifyResult(result);
      expect(removedListener.result).not.toHaveBeenCalled();
    });

    it('unsubscribed listeners are not called on notifyResult', () => {
      const removedListener = listeners[0];
      resource.unsubscribe(removedListener);
      resource.callNotifyError(errMsg);
      expect(removedListener.error).not.toHaveBeenCalled();
    });

    it('unsubscribed listeners are not called on notifyResult', () => {
      const removedListener = listeners[0];
      resource.unsubscribe(removedListener);
      resource.callNotifyInfo(infoMsg);
      expect(removedListener.info).not.toHaveBeenCalled();
    });

    it('unsubscribed listeners are not called on notifyResult', () => {
      const removedListener = listeners[0];
      resource.unsubscribe(removedListener);
      resource.callNotifyNotReady();
      expect(removedListener.notReady).not.toHaveBeenCalled();
    });
  }
};

describe('AbstractResource', () => {
  describe('no subscribers', () => {
    testSubscriptions(0);
  });

  describe('one subscribers', () => {
    testSubscriptions(1);
  });

  describe('two subscribers', () => {
    testSubscriptions(2);
  });
});

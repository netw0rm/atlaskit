import * as chai from 'chai';
import { expect } from 'chai';
import { fixtures } from 'ak-editor-test';
import FacadeInput from '../src/index';

describe('Facade Input', () => {
  const target = fixtures();

  afterEach(() => {
    const elements = document.querySelectorAll('.facade-input');
    for (let i = 0; i < elements.length; i++) {
      const el = elements[i];
      el.parentNode.removeChild(el);
    }
  });

  it('should be initialized with given values', () => {
    new FacadeInput(target(), {
      initialValue: 'foo',
      classList: ['facade-input'],
    });

    const elem = document.querySelector('.facade-input');
    expect((elem as HTMLInputElement).value).to.equal('foo');
  });

  it('should call the sync function when theres a user input', (done) => {
    const fInput = new FacadeInput(target(), {
      initialValue: 'foo',
      classList: ['facade-input'],
    });

    let syncedVal = '';
    fInput.onSync = (val) => {
      syncedVal = val;
    }

    const elem = document.querySelector('.facade-input');
    (elem as HTMLInputElement).value = 'barbaz';

    setTimeout(() => {
      expect(syncedVal).to.equal('barbaz');
      done();
    }, 100);
  });

  it('should be removed when marked for removal', (done) => {
    const fInput = new FacadeInput(target(), {
      initialValue: 'foo',
      classList: ['facade-input'],
    });

    let willRemove = false;
    fInput.onSync = (val, r) => {
      willRemove = r
    }

    fInput.markForRemoval();
    setTimeout(() => {
      expect(willRemove).to.be.true;
      expect(fInput.removed).to.be.true;
      expect(document.querySelector('.facade-input')).to.be.null;
      done();
    }, 100);
  });

  it('should be possible to attach mulitple sync functions', (done) => {
    const fInput = new FacadeInput(target(), {
      initialValue: 'foo',
      classList: ['facade-input'],
    });

    let syncedVal1 = '';
    let syncCallCount = 0;
    fInput.onSync = (val) => {
      syncedVal1 = val;
      syncCallCount++;
    }

    let syncedVal2 = '';
    fInput.onSync = (val) => {
      syncedVal2 = val;
      syncCallCount++;
    }

    const elem = document.querySelector('.facade-input');
    (elem as HTMLInputElement).value = 'barbaz';

    setTimeout(() => {
      expect(syncedVal1).to.equal('barbaz');
      expect(syncedVal2).to.equal('barbaz');
      expect(syncCallCount).to.equal(2);
      done();
    }, 100);
  });
});

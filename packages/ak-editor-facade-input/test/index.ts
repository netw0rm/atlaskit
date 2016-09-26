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
    expect((elem as HTMLInputElement)).to.have.property('value', 'foo');
  });

  it('should call the sync function when theres a user input', () => {
    const fInput = new FacadeInput(target(), {
      initialValue: 'foo',
      classList: ['facade-input'],
    });

    const promise = new Promise(
      (resolve) => {
        fInput.onSync = (val) => {
          resolve(val);
        }
      }
    );

    const elem = document.querySelector('.facade-input');
    (elem as HTMLInputElement).value = 'barbaz';

    return promise.then((val) => {
      expect(val).to.equal('barbaz');
    });
  });

  it('should be removed when marked for removal', () => {
    const fInput = new FacadeInput(target(), {
      initialValue: 'foo',
      classList: ['facade-input'],
    });

    const promise = new Promise(
      (resolve) => {
        fInput.onSync = (val, willRemove) => {
          resolve(willRemove);
        }
      }
    );

    fInput.markForRemoval();
    return promise.then((willRemove) => {
      expect(willRemove).to.be.true;
      expect(fInput.removed).to.be.true;
      expect(document.querySelector('.facade-input')).to.be.null;
    });
  });

  it('should be possible to attach mulitple sync functions', () => {
    const fInput = new FacadeInput(target(), {
      initialValue: 'foo',
      classList: ['facade-input'],
    });

    const promise = new Promise(
      (resolve) => {
        let callCount = 0;

        fInput.onSync = () => {
          callCount++;
        }

        fInput.onSync = () => {
          callCount++;
          resolve(callCount);
        }
      }
    );

    const elem = document.querySelector('.facade-input');
    (elem as HTMLInputElement).value = 'barbaz';

    return promise.then((callCount) => {
      expect(callCount).to.equal(2);
    });
  });
});

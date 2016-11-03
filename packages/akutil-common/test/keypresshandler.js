import keyCode from 'keycode';
import 'custom-event-polyfill';
import { afterMutations } from 'akutil-common-test';

import { name } from '../package.json';
import KeyPressHandler,
      { KeyInvalidError, CallbackInvalidError } from '../src/index.KeyPressHandler';


describe(name, () => {
  describe('KeyPressHandler', () => {
    let keyPressEvent;
    let keyPressCallback;
    let keyPressObj;

    beforeEach(() => {
      keyPressEvent = new CustomEvent('keydown', {
        bubbles: true,
        cancelable: true,
      });
      keyPressEvent.keyCode = keyCode('ESCAPE');
      keyPressCallback = sinon.spy();
      keyPressObj = new KeyPressHandler('ESCAPE', keyPressCallback);
    });

    it('should create an event listener when created', (done) => {
      document.dispatchEvent(keyPressEvent);
      afterMutations(
        () => expect(keyPressCallback).to.be.called,
        done
      );
    });

    it('should be possible to add an additional event', (done) => {
      keyPressEvent.keyCode = keyCode('CTRL');
      keyPressObj.add('CTRL', keyPressCallback);
      document.dispatchEvent(keyPressEvent);

      afterMutations(
        () => expect(keyPressCallback).to.be.called,
        done
      );
    });

    it('correct callback should be called', (done) => {
      const newCallback = sinon.spy();
      keyPressEvent.keyCode = keyCode('CTRL');
      keyPressObj.add('CTRL', newCallback);
      document.dispatchEvent(keyPressEvent);

      afterMutations(
        () => {
          expect(keyPressCallback).not.to.be.called;
          expect(newCallback).to.be.called;
        },
        done
      );
    });

    it('should pass on the event object', (done) => {
      document.dispatchEvent(keyPressEvent);
      afterMutations(
        () => {
          expect(keyPressCallback).to.be.called;
          expect(keyPressCallback).to.have.been.calledWith(keyPressEvent);
        },
        done
      );
    });

    it('should be possible to remove an event', (done) => {
      keyPressObj.destroy('ESCAPE');

      document.dispatchEvent(keyPressEvent);
      afterMutations(
        () => expect(keyPressCallback).not.to.be.called,
        done
      );
    });

    it('should be possible to remove all events', (done) => {
      const newCallback = sinon.spy();
      keyPressObj.add('CTRL', newCallback);
      keyPressObj.destroy();
      document.dispatchEvent(keyPressEvent);
      keyPressEvent.keyCode = keyCode('CTRL');
      document.dispatchEvent(keyPressEvent);

      afterMutations(
        () => {
          expect(keyPressCallback).not.to.be.called;
          expect(newCallback).not.to.be.called;
        },
        done
      );
    });

    describe('error cases', () => {
      it('should throw if the given key is invalid', () => {
        expect(() => new KeyPressHandler('FOOBAR', () => null)).to.throw(KeyInvalidError);
        expect(() => keyPressObj.add('FOOBAR', () => null)).to.throw(KeyInvalidError);
      });

      it('should throw if the given callback is invalid', () => {
        expect(() => new KeyPressHandler('ESCAPE', null)).to.throw(CallbackInvalidError);
        expect(() => keyPressObj.add('ESCAPE', null)).to.throw(CallbackInvalidError);
      });
    });
  });
});

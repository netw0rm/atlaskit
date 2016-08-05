import keyCode from 'keycode';
import KeyPressHandler from '../src/KeyPressHandler';

describe('aui/internal/keypresshandler', () => {
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
    setTimeout(() => {
      expect(keyPressCallback).to.be.called;
      done();
    }, 0);
  });

  it('should be possible to add an additional event', (done) => {
    keyPressEvent.keyCode = keyCode('CTRL');
    keyPressObj.add('CTRL', keyPressCallback);
    document.dispatchEvent(keyPressEvent);

    setTimeout(() => {
      expect(keyPressCallback).to.be.called;
      done();
    }, 0);
  });

  it('correct callback should be called', (done) => {
    const newCallback = sinon.spy();
    keyPressEvent.keyCode = keyCode('CTRL');
    keyPressObj.add('CTRL', newCallback);
    document.dispatchEvent(keyPressEvent);

    setTimeout(() => {
      expect(keyPressCallback).not.to.be.called;
      expect(newCallback).to.be.called;
      done();
    }, 0);
  });

  it('should be possible to remove an event', (done) => {
    keyPressObj.destroy('ESCAPE');

    document.dispatchEvent(keyPressEvent);
    setTimeout(() => {
      expect(keyPressCallback).not.to.be.called;
      done();
    }, 0);
  });

  it('should be possible to remove all events', (done) => {
    const newCallback = sinon.spy();
    keyPressObj.add('CTRL', newCallback);
    keyPressObj.destroy();
    document.dispatchEvent(keyPressEvent);
    keyPressEvent.keyCode = keyCode('CTRL');
    document.dispatchEvent(keyPressEvent);

    setTimeout(() => {
      expect(keyPressCallback).not.to.be.called;
      expect(newCallback).not.to.be.called;
      done();
    }, 0);
  });
});

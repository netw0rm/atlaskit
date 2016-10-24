import { afterMutations } from 'akutil-common-test';
import { events, Prop } from '../src';

describe('ak-theme-prop', () => {
  let elem;

  beforeEach(() => {
    elem = new Prop();
    document.body.appendChild(elem);
  });

  afterEach(() => {
    document.body.removeChild(elem);
  });

  describe('props', () => {
    describe('name', () => {
      it('should be an attribute', (done) => {
        elem.name = 0;
        afterMutations(
          () => expect(elem.hasAttribute('name')).to.equal(true),
          done
        );
      });

      it('should be a string', () => {
        elem.name = 0;
        expect(elem.name).to.equal('0');
      });
    });

    describe('val', () => {
      it('should be an attribute', (done) => {
        elem.val = 0;
        afterMutations(
          () => expect(elem.hasAttribute('val')).to.equal(true),
          done
        );
      });

      it('should be a string', () => {
        elem.val = 0;
        expect(elem.val).to.equal('0');
      });
    });
  });

  describe('updated', () => {
    it('should not emit an event if vals did not change', () => {
      const spy = sinon.spy();
      elem.name = 'same';
      elem.val = 'same';
      elem.addEventListener(events.prop.change, spy);
      Prop.updated(elem, { name: 'same', val: 'same' });
      expect(spy.callCount).to.equal(0);
    });

    it('should emit an event if vals did change', () => {
      const spy = sinon.spy();
      elem.name = 'same';
      elem.val = 'diff';
      elem.addEventListener(events.prop.change, spy);
      Prop.updated(elem, { name: 'same', val: 'same' });
      expect(spy.callCount).to.equal(1);
    });
  });
});

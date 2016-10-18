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
      it('should be an attribute', () => {
        elem.name = 0;
        expect(elem.hasAttribute('name')).to.equal(true);
      });

      it('should be a string', () => {
        elem.name = 0;
        expect(elem.name).to.equal('0');
      });
    });

    describe('value', () => {
      it('should be an attribute', () => {
        elem.value = 0;
        expect(elem.hasAttribute('value')).to.equal(true);
      });

      it('should be a string', () => {
        elem.value = 0;
        expect(elem.value).to.equal('0');
      });
    });
  });

  describe('updated', () => {
    it('should not emit an event if values did not change', () => {
      const spy = sinon.spy();
      elem.name = 'same';
      elem.value = 'same';
      elem.addEventListener(events.prop.change, spy);
      Prop.updated(elem, { name: 'same', value: 'same' });
      expect(spy.callCount).to.equal(0);
    });

    it('should emit an event if values did change', () => {
      const spy = sinon.spy();
      elem.name = 'same';
      elem.value = 'diff';
      elem.addEventListener(events.prop.change, spy);
      Prop.updated(elem, { name: 'same', value: 'same' });
      expect(spy.callCount).to.equal(1);
    });
  });
});

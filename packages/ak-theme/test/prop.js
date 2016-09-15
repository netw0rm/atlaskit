import { events, Prop } from '../src/index';

describe('ak-theme-prop', () => {
  let prop;

  beforeEach(() => {
    prop = new Prop();
  });

  describe('props', () => {
    describe('name', () => {
      it('should be an attribute', () => {
        prop.name = 0;
        expect(prop.hasAttribute('name')).to.equal(true);
      });

      it('should be a string', () => {
        prop.name = 0;
        expect(prop.name).to.equal('0');
      });
    });

    describe('value', () => {
      it('should be an attribute', () => {
        prop.value = 0;
        expect(prop.hasAttribute('value')).to.equal(true);
      });

      it('should be a string', () => {
        prop.value = 0;
        expect(prop.value).to.equal('0');
      });
    });
  });

  describe('updated', () => {
    it('should not emit an event if values did not change', () => {
      const spy = sinon.spy();
      prop.name = 'same';
      prop.value = 'same';
      prop.addEventListener(events.prop.change, spy);
      Prop.updated(prop, { name: 'same', value: 'same' });
      expect(spy.callCount).to.equal(0);
    });

    it('should emit an event if values did change', () => {
      const spy = sinon.spy();
      prop.name = 'same';
      prop.value = 'diff';
      prop.addEventListener(events.prop.change, spy);
      Prop.updated(prop, { name: 'same', value: 'same' });
      expect(spy.callCount).to.equal(1);
    });
  });
});

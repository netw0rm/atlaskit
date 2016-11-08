import { waitUntil, getShadowRoot, locateWebComponent } from 'akutil-common-test';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import FieldText from '../src';

chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.should();

function setupComponent() {
  const component = new FieldText();
  const componentHasShadowRoot = () => getShadowRoot(component);

  document.body.appendChild(component);

  return waitUntil(componentHasShadowRoot).then(() => component);
}

function tearDownComponent(component) {
  document.body.removeChild(component);
}

describe('ak-field-text', () => {
  let component;
  let shadowRoot;

  function getFieldBase() {
    return locateWebComponent('ak-field-base', shadowRoot)[0];
  }

  beforeEach(() => setupComponent().then((newComponent) => {
    component = newComponent;
    shadowRoot = getShadowRoot(component);
  }));
  afterEach(() => tearDownComponent(component));

  describe('compact prop', () => {
    it('should be reflected', () => {
      const fieldBase = getFieldBase();
      const reflected = () => (fieldBase.appearance === 'compact');
      // check the negative case first
      expect(reflected()).to.be.false;

      component.compact = true;

      return waitUntil(reflected).should.be.fulfilled;
    });
  });

  describe('disabled prop', () => {
    it('should be reflected', () => {
      const fieldBase = getFieldBase();
      const input = fieldBase.querySelector('input');
      const reflected = () => (!!fieldBase.disabled && !!input.disabled);
      // check the negative case first
      expect(reflected()).to.be.false;

      component.disabled = true;

      return waitUntil(reflected).should.be.fulfilled;
    });
  });

  describe('label prop', () => {
    it('should be reflected', () => {
      const newValue = 'new label';
      const fieldBase = getFieldBase();
      const reflected = () => (fieldBase.label === newValue);
      // check the negative case first
      expect(reflected()).to.be.false;

      component.label = newValue;

      return waitUntil(reflected).should.be.fulfilled;
    });
  });

  describe('name prop', () => {
    it('should be reflected', () => {
      const newValue = 'new name';
      const fieldBase = getFieldBase();
      const input = fieldBase.querySelector('input');
      const reflected = () => (input.name === newValue);
      // check the negative case first
      expect(reflected()).to.be.false;

      component.name = newValue;

      return waitUntil(reflected).should.be.fulfilled;
    });
  });

  describe('placeholder prop', () => {
    it('should be reflected', () => {
      const newValue = 'new placeholder';
      const fieldBase = getFieldBase();
      const input = fieldBase.querySelector('input');
      const reflected = () => (input.placeholder === newValue);
      // check the negative case first
      expect(reflected()).to.be.false;

      component.placeholder = newValue;

      return waitUntil(reflected).should.be.fulfilled;
    });
  });

  describe('required prop', () => {
    it('should be reflected', () => {
      const fieldBase = getFieldBase();
      const reflected = () => (!!fieldBase.required);
      // check the negative case first
      expect(reflected()).to.be.false;

      component.required = true;

      return waitUntil(reflected).should.be.fulfilled;
    });
  });

  describe('type prop', () => {
    it('should be reflected', () => {
      const newValue = 'email';
      const fieldBase = getFieldBase();
      const input = fieldBase.querySelector('input');
      const reflected = () => (input.type === newValue);
      // check the negative case first
      expect(reflected()).to.be.false;

      component.type = newValue;

      return waitUntil(reflected).should.be.fulfilled;
    });
  });

  describe('value', () => {
    it('sets the value of the internal input', () => {
      const newValue = 'new value';
      const fieldBase = getFieldBase();
      const input = fieldBase.querySelector('input');

      expect(input.value).to.equal('', 'initial');

      const setsInternalValue = () => (input.value === newValue);

      expect(setsInternalValue()).to.be.false;

      component.value = newValue;

      return waitUntil(setsInternalValue).should.be.fulfilled;
    });

    it('gets the value from the internal input', () => {
      const newValue = 'new value';
      const fieldBase = getFieldBase();
      const input = fieldBase.querySelector('input');

      expect(component.value).to.equal('', 'initial');

      const getsInternalValue = () => (component.value === newValue);

      input.value = newValue;

      return waitUntil(getsInternalValue).should.be.fulfilled;
    });
  });
});

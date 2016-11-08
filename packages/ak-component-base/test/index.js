import { waitUntil, getShadowRoot, tearDownComponent } from 'akutil-common-test';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import { Component, prop, define, vdom } from 'skatejs';

import base from '../src';
import { setupComponent } from './_helpers';

chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.should();

const expect = chai.expect;
const Base = base({ Component, prop });

// We'll make a quick component that extends base so that we can test it. We'll use the .increment
// function to simulate a component attempting to update it's own props
const Extended = define('x-extended', class extends Base {
  static get props() {
    return Object.assign({}, {
      value1: prop.number({ default: 1 }),
      value2: prop.number({ default: 1 }),
    }, super.props);
  }
  static attached(elem) {
    elem.increment = () => {
      elem.value1 += 1;
      elem.value2 += 1;
    };
  }
  static render() {
    return <div />;
  }
});

// and a component to control the Extended component which will override the value1 value
const Controller = define('x-controller', class extends Component {
  static get props() {
    return {
      myValue1: prop.number({ default: 1 }),
    };
  }
  static render(elem) {
    return <Extended override={{ value1: elem.myValue1 }} class="extended" />;
  }
});

describe('ak-component-base', () => {
  describe('exports', () => {
    it('should export a base component', () => {
      // cant instantiate this class, so we'll check its prototype
      (Base.prototype).should.be.an.instanceof(Component);
    });
  });

  describe('Extended component', () => {
    let extended;

    beforeEach(() => setupComponent(Extended).then((newComponent) => {
      extended = newComponent;
    }));
    afterEach(() => tearDownComponent(extended));

    it('should have correct default values', () => {
      expect(extended.value1).to.equal(1);
      expect(extended.value2).to.equal(1);
    });

    it('should increment both values when .increment is called', () => {
      extended.increment(extended);

      expect(extended.value1).to.equal(2);
      expect(extended.value2).to.equal(2);
    });
  });

  describe('controlling component', () => {
    let controller;
    let controllerShadowRoot;
    let extended;

    beforeEach(() => setupComponent(Controller).then((newComponent) => {
      controller = newComponent;
      controllerShadowRoot = getShadowRoot(controller);
      extended = controllerShadowRoot.querySelector('.extended');
    }));
    afterEach(() => tearDownComponent(controller));

    it('should pass its value to the Extended Component', () => {
      const valueReflected = () => (extended.value1 === 2);
      controller.myValue1 = 2;

      return waitUntil(valueReflected).should.be.fulfilled;
    });

    it('should prevent changes to value1 from .increment', () => {
      const valuesAreCorrect = () => (extended.value1 === 1 && extended.value2 === 2);
      extended.increment(extended);

      return waitUntil(valuesAreCorrect).should.be.fulfilled;
    });

    it('should not lose its changes after increment is called', () => {
      const valuesAreCorrect = () => (extended.value1 === 5 && extended.value2 === 2);
      controller.myValue1 = 5;
      extended.increment(extended);

      return waitUntil(valuesAreCorrect).should.be.fulfilled;
    });
  });
});

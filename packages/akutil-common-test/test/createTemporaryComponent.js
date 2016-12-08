/** @jsx vdom */

import { vdom, define, Component } from 'skatejs';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';

import { createTemporaryComponent, tearDownComponent, getShadowRoot, getRootNode } from '../src';

chai.should();
chai.use(sinonChai);
chai.use(chaiAsPromised);
const { expect } = chai;

describe('createTemporaryComponent', () => {
  let component;
  let target;
  const definition = {
    render() {
      return (<div />);
    },
  };

  afterEach(() => tearDownComponent(component, target));

  it('should yell at you if you do not pass a define fn', () =>
    expect(() => createTemporaryComponent()).to.throw(/Given define is not a function/)
  );

  it('should yell at you if you do not pass a definition', () =>
    expect(() => createTemporaryComponent(define))
    .to.throw(/Definition must be an object or constructor/)
  );

  it('should be possible to create a component', () => createTemporaryComponent(define, definition)
    .then((newComponent) => {
      component = newComponent;
      expect(component.tagName).to.match(new RegExp('^x-', 'i'));
      expect(getShadowRoot(component)).to.be.defined;
      expect(getRootNode(component)).to.be.defined;
    })
  );

  it('should be possible to create a component from a class', () => {
    // eslint-disable-next-line react/prefer-stateless-function
    class MyComponent extends Component {
      static render() {
        return (<div />);
      }
    }

    return createTemporaryComponent(define, MyComponent)
      .then((newComponent) => {
        component = newComponent;
        expect(component).to.be.instanceof(MyComponent);
      });
  });

  it('should be possible to use target element', () => {
    target = document.createElement('div');
    document.body.appendChild(target);
    return createTemporaryComponent(define, definition, target).then((newComponent) => {
      component = newComponent;
      expect(target.firstChild).to.equal(component);
      document.body.removeChild(target);
    });
  });
});

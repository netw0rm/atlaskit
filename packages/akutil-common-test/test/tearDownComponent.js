import { vdom, define } from 'skatejs';
import { createTemporaryComponent, tearDownComponent } from '../src';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';

chai.should();
chai.use(sinonChai);
chai.use(chaiAsPromised);
const { expect } = chai;

describe('getRootNode', () => {
  let component;
  let target;
  const definition = {
    render() {
      return (<div />);
    },
  };

  it('should be possible to remove a component', () => createTemporaryComponent(define, definition)
    .then((newComponent) => {
      component = newComponent;
      tearDownComponent(component);
      expect(component.parentNode).to.equal(null);
      expect(document.body.querySelector(component.tagName)).to.equal(null);
    })
  );

  it('should be possible to remove a component from target', () => {
    target = document.createElement('div');
    document.body.appendChild(target);
    return createTemporaryComponent(define, definition, target).then((newComponent) => {
      component = newComponent;
      tearDownComponent(component, target);
      expect(component.parentNode).to.equal(null);
      expect(target.querySelector(component.tagName)).to.equal(null);
      document.body.removeChild(target);
    });
  });

  it('should not die if the component was not found in the target', () =>
    expect(() => tearDownComponent(document.createElement('div'))).to.not.throw()
  );
});

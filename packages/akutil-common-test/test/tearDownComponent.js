import { vdom } from 'skatejs';
import { createTemporaryComponent, tearDownComponent } from '../src';
import chai from 'chai';
import sinonChai from 'sinon-chai';
chai.should();
chai.use(sinonChai);


describe('getRootNode', () => {
  let component;

  const definition = {
    render() {
      return (<div />);
    },
  };

  it('should be possible to remove a component', () => createTemporaryComponent(definition)
    .then(newComponent => {
      component = newComponent;
      tearDownComponent(component);
      expect(component.parentNode).to.equal(null);
      expect(document.body.querySelector(component.tagName)).to.equal(null);
    })
  );
});

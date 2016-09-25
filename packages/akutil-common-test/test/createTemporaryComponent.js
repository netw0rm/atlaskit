import { vdom } from 'skatejs';
import { createTemporaryComponent, tearDownComponent, getShadowRoot } from '../src';
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

  afterEach(() => tearDownComponent(component));

  it('should be possible to create a component', () => createTemporaryComponent(definition)
    .then(newComponent => {
      component = newComponent;
      expect(component.tagName).to.match(new RegExp('^x-', 'i'));
      expect(getShadowRoot(component)).to.be.defined;
      expect(getShadowRoot(component).firstChild).to.be.defined;
    })
  );
});

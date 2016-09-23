import locateWebComponent from '../src/index.locateWebComponent';
import { getShadowRoot, waitUntil } from '../src';
import { define } from 'skatejs';
import chai from 'chai';
import sinonChai from 'sinon-chai';
chai.should();
chai.use(sinonChai);

const componentPrefix = 'x-foo';

function registerFooComponent() {
  return define(componentPrefix, {
    render() {
    },
  });
}

describe('locateWebComponent', () => {
  let component;
  let container;
  const Foo = registerFooComponent();

  beforeEach(() => {
    component = new Foo();
    container = document.createElement('div');
    document.body.appendChild(container);
    container.appendChild(component);
    return waitUntil(() => !!getShadowRoot(component));
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('should be possible to locate a webcomponent by its name', () => {
    locateWebComponent('x-foo').should.be.deep.equal([component]);
    locateWebComponent('not-existent').should.be.deep.equal([]);
  });

  it('should be possible to locate a webcomponent by its prefix', () => {
    locateWebComponent('x-f').should.be.deep.equal([component]);
    const Foo2 = registerFooComponent();
    const component2 = new Foo2();
    container.appendChild(component2);
    component2.tagName.should.not.be.equal('x-foo');
    locateWebComponent('x-foo').should.be.deep.equal([component, component2]);
  });

  it('should be possible to locate a webcomponent by its prefix in a given parent element', () => {
    locateWebComponent('x-foo', container).should.be.deep.equal([component]);
    const div = document.createElement('div');
    document.body.appendChild(div);
    locateWebComponent('x-foo', div).should.be.deep.equal([]);
    document.body.removeChild(div);
  });
});

import { vdom, define } from 'skatejs';
import chai from 'chai';
import sinonChai from 'sinon-chai';

import { createTemporaryComponent, tearDownComponent, getRootNode } from '../src';


chai.should();
chai.use(sinonChai);

describe('getRootNode', () => {
  let component;
  let rootNode;

  const definition = {
    render() {
      return (<div />);
    },
  };

  afterEach(() => tearDownComponent(component));

  it('should return the rootNode of a component if it has one', () =>
    createTemporaryComponent(define, definition)
      .then((newComponent) => {
        component = newComponent;
        rootNode = getRootNode(component);
        expect(rootNode).not.to.equal(undefined);
        expect(rootNode.tagName).to.equal('DIV');
      })
  );
});

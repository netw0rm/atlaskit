/** @jsx vdom */

import { vdom, define } from 'skatejs';

import { createTemporaryComponent, tearDownComponent, getRootNode } from '../src';

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
        expect(rootNode).to.not.equal(undefined);
        expect(rootNode.tagName).to.equal('DIV');
      })
  );
});

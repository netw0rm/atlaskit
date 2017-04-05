/** @jsx vdom */

import { vdom, define } from 'skatejs';

import { createTemporaryComponent, tearDownComponent, getRootNode } from '../src';

// eslint-disable-next-line mocha/no-skipped-tests
describe.skip('getRootNode', () => {
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

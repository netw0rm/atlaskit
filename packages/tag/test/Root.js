/** @jsx vdom */

import { vdom } from 'skatejs';

import { createTemporary, removeTemporary, getRootNode } from './_helpers';
import Root from '../src/Root';

// eslint-disable-next-line mocha/no-skipped-tests
describe.skip('ak-tag', () => {
  describe('Root', () => {
    let component;
    let rootNode;

    const definition = {
      render() {
        return (<Root />);
      },
    };

    beforeEach(() => createTemporary(definition)
      .then((newComponent) => {
        component = newComponent;
        rootNode = getRootNode(component);
      }));
    afterEach(() => removeTemporary(component));

    it('should be possible to create a Root', () => {
      rootNode.tagName.should.equal('DIV');
      const styleTag = rootNode.querySelector('style');
      styleTag.should.not.be.equal(undefined);
      styleTag.innerHTML.should.match(/animation/);
    });
  });
});

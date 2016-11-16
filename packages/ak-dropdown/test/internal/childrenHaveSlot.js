/** @jsx vdom */

import { vdom, define } from 'skatejs';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { createTemporaryComponent, tearDownComponent } from 'akutil-common-test';

import { name } from '../../package.json';
import childrenHaveSlot from '../../src/internal/childrenHaveSlot';


chai.use(chaiAsPromised);
chai.should();


describe.skip(name, () => {
  describe('childrenHaveSlot', () => {
    let component;
    let rootNode;

    const definition = {
      render() {
        return (<div><div /><div slot="test" /><div slot="lostslot" /></div>);
      },
    };

    beforeEach(() => createTemporaryComponent(define, definition)
      .then((newComponent) => {
        component = newComponent;
        rootNode = component.shadowRoot.firstChild;
      }));
    afterEach(() => tearDownComponent(component));

    it('should return correct boolean value', () => {
      expect(childrenHaveSlot(rootNode.children, 'test')).to.equal(true);
      expect(childrenHaveSlot(rootNode.children, 'test2')).to.equal(false);
    });
  });
});

/** @jsx vdom */

import { vdom, define } from 'skatejs';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import {
  createTemporaryComponent as createTemporary,
  tearDownComponent,
  getShadowRoot,
} from 'akutil-common-test';


import Root from '../src/Root';

chai.use(chaiAsPromised);
chai.should();


describe.skip('ak-field-base', () => {
  describe('Root', () => {
    let component;
    let shadowRoot;

    const definition = {
      render() {
        return (<Root />);
      },
    };

    beforeEach(() => createTemporary(define, definition)
      .then((newComponent) => {
        component = newComponent;
        shadowRoot = getShadowRoot(component);
      }));
    afterEach(() => tearDownComponent(component));

    it('should be possible to create a Root', () => {
      const styleTag = shadowRoot.querySelector('style');

      shadowRoot.should.not.be.undefined;
      styleTag.should.not.be.undefined;
    });
  });
});

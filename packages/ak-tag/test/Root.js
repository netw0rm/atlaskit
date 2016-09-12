import { vdom } from 'skatejs';
import { getShadowRoot } from 'akutil-common-test';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import { createTemporary, removeTemporary } from './_helpers';
import Root from '../src/Root';

chai.use(chaiAsPromised);
chai.should();


describe('ak-tag', () => {
  describe('Root', () => {
    let component;
    const definition = {
      render() {
        return (<Root />);
      },
    };

    beforeEach(() => createTemporary(definition).then(newComponent => (component = newComponent)));
    afterEach(() => removeTemporary(component));

    it('should be possible to create a Root', () => {
      const shadowRoot = getShadowRoot(component);

      shadowRoot.firstChild.tagName.should.equal('DIV');
      const styleTag = shadowRoot.querySelector('style');
      styleTag.should.not.be.undefined;
      styleTag.innerHTML.should.match(/animation/);
    });
  });
});

/** @jsx vdom */

import { vdom, define } from 'skatejs';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import {
  createTemporaryComponent as createTemporary,
  tearDownComponent,
  getShadowRoot,
  waitUntil,
} from 'akutil-common-test';

import Label from '../src/Label';
import { createDefinition } from './_helpers';

chai.use(chaiAsPromised);
chai.should();

describe.skip('ak-field-base', () => {
  describe('Label', () => {
    let component;
    let shadowRoot;

    const setupLocalVariables = (newComponent) => {
      component = newComponent;
      shadowRoot = getShadowRoot(newComponent);
    };

    afterEach(() => tearDownComponent(component));

    describe('by default', () => {
      const tmpDefinition = (<Label />);

      beforeEach(() => createTemporary(define, createDefinition(tmpDefinition))
        .then(setupLocalVariables));

      it('should be possible to create a Root', () => {
        shadowRoot.should.not.be.undefined;
      });

      it('should render a label element', () => {
        const label = shadowRoot.querySelector('label');
        label.should.not.be.undefined;
      });
    });

    describe('label prop', () => {
      const tmpDefinition = (<Label label="This is a label" />);

      beforeEach(() => createTemporary(define, createDefinition(tmpDefinition))
        .then(setupLocalVariables));

      it('should be reflected in the label element', () => {
        const label = shadowRoot.querySelector('label');
        expect(label.textContent).to.match(/This is a label/);
      });
    });

    describe('required prop', () => {
      const tmpDefinition = (<Label label="This is a label" required />);

      beforeEach(() => createTemporary(define, createDefinition(tmpDefinition))
        .then(setupLocalVariables));

      it('should append an asterisk to the content', () => {
        const label = shadowRoot.querySelector('label');
        expect(label.textContent).to.match(/^This is a label/);
        expect(label.textContent).to.match(/\*$/);
      });
    });

    describe('onLabelClick prop', () => {
      let handlerFired = false;
      const handler = () => (handlerFired = true);
      const tmpDefinition = (<Label onLabelClick={handler} />);

      beforeEach(() => createTemporary(define, createDefinition(tmpDefinition))
        .then(setupLocalVariables));

      it('should fire handler when the span is clicked', () => {
        const handlerWasFired = () => handlerFired;
        expect(handlerWasFired()).to.be.false;

        const span = shadowRoot.querySelector('span');
        span.click();

        return waitUntil(handlerWasFired).should.be.fulfilled;
      });
    });

    describe('.children', () => {
      const tmpDefinition = (<Label>
        <div className="foo">Here is some child content!</div>
      </Label>);

      beforeEach(() => createTemporary(define, createDefinition(tmpDefinition))
        .then(setupLocalVariables));

      it('should render any children passed to it', () => {
        const childContent = shadowRoot.querySelector('div.foo');
        expect(childContent).to.not.be.undefined;
        expect(childContent.textContent).to.equal('Here is some child content!');
      });
    });
  });
});

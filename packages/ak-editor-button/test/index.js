import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { props } from 'skatejs';
import { afterMutations, getShadowRoot } from 'akutil-common-test';

import { name } from '../package.json';
import AkEditorButton from '../src';
import shadowStyles from '../src/shadow.less';


const classKeys = shadowStyles.locals;

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

describe('ak-editor-button', () => {
  let component;
  const shadowDomQuery = (elem, selector) =>
    getShadowRoot(elem).querySelector(selector);

  const getShadowButtonElem = elem =>
    shadowDomQuery(elem, `.${classKeys.root} button`);

  beforeEach((done) => {
    component = new AkEditorButton();
    document.body.appendChild(component);
    afterMutations(done);
  });

  it('should not throws when component is instantiated', () =>
    expect(() => (new AkEditorButton())).not.to.throw(Error)
  );

  it('should be possible to create a component', () => {
    expect(shadowDomQuery(component, `.${classKeys.root}`)).to.be.defined;
    expect(component.tagName).to.match(new RegExp(`^${name}`, 'i'));
  });

  it('should call preventDefault when onmousedown event is triggered', () => {
    const button = getShadowButtonElem(component);

    const event = new CustomEvent('mousedown', {});
    sinon.spy(event, 'preventDefault');

    button.dispatchEvent(event);
    expect(event.preventDefault.called).to.be.true;
  });

  describe('attributes', () => {
    describe('default attributes', () => {
      it('should not have active class', () => {
        const selector = `.${classKeys.root}.${classKeys.active}`;
        expect(shadowDomQuery(component, selector)).to.be.null;
      });

      it('should not have button disabled', () => {
        const selector = `.${classKeys.root} button[disabled]`;
        expect(shadowDomQuery(component, selector)).to.be.null;
      });
    });

    describe('active attribute', () => {
      const selector = `.${classKeys.root}.${classKeys.active}`;
      beforeEach(() =>
        props(component, { active: true })
      );

      it('container should have active class', () =>
        expect(shadowDomQuery(component, selector)).not.to.be.null
      );

      it('container should not have active class after it is removed', () => {
        props(component, { active: false });
        expect(shadowDomQuery(component, selector)).to.be.null;
      });
    });

    describe('when disabled attribute is set', () => {
      const selector = `.${classKeys.root} button[disabled]`;
      beforeEach(() =>
        props(component, { disabled: true })
      );

      it('button should have disabled attribute', () =>
        expect(shadowDomQuery(component, selector)).not.to.be.null
      );

      it('button should not have disabled attribute after it is removed', () => {
        props(component, { disabled: false });
        expect(shadowDomQuery(component, selector)).to.be.null;
      });
    });
  });
});

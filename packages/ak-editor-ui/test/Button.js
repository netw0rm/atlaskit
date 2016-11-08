import * as chai from 'chai';
import { props } from 'skatejs';
import { afterMutations } from 'akutil-common-test';
import Button from '../src/Button';
import shadowStyles from '../src/Button/shadow.less';

const classKeys = shadowStyles.locals;
const { expect } = chai;

describe('ak-editor-ui Button', () => {
  let component;
  const getShadowButtonElem = elem =>
    elem.shadowRoot.querySelector(`.${classKeys.root} button`);

  beforeEach((done) => {
    component = new Button();
    document.body.appendChild(component);
    afterMutations(done);
  });

  it('should not throws when component is instantiated', () =>
    expect(() => (new Button())).not.to.throw(Error)
  );

  it('should be possible to create a component', () => {
    expect(component.shadowRoot.querySelector(`.${classKeys.root}`)).to.not.be.undefined;
    expect(component.tagName).to.match(new RegExp('^ak-editor-ui-button', 'i'));
  });

  it('should call preventDefault when onmousedown event is triggered', () => {
    const button = getShadowButtonElem(component);

    const event = new CustomEvent('mousedown', {});
    const spy = sinon.spy(event, 'preventDefault');

    button.dispatchEvent(event);
    expect(spy.called).to.be.true;
  });

  describe('attributes', () => {
    describe('default attributes', () => {
      it('should not have active class', () => {
        const selector = `.${classKeys.root}.${classKeys.active}`;
        expect(component.shadowRoot.querySelector(selector)).to.be.null;
      });

      it('should not have button disabled', () => {
        const selector = `.${classKeys.root} button[disabled]`;
        expect(component.shadowRoot.querySelector(selector)).to.be.null;
      });
    });

    describe('active attribute', () => {
      const selector = `.${classKeys.root}.${classKeys.active}`;
      beforeEach(() =>
        props(component, { active: true })
      );

      it('container should have active class', () =>
        expect(component.shadowRoot.querySelector(selector)).not.to.be.null
      );

      it('container should not have active class after it is removed', () => {
        props(component, { active: false });
        expect(component.shadowRoot.querySelector(selector)).to.be.null;
      });
    });

    describe('when disabled attribute is set', () => {
      const selector = `.${classKeys.root} button[disabled]`;
      beforeEach(() =>
        props(component, { disabled: true })
      );

      it('button should have disabled attribute', () =>
        expect(component.shadowRoot.querySelector(selector)).not.to.be.null
      );

      it('button should not have disabled attribute after it is removed', () => {
        props(component, { disabled: false });
        expect(component.shadowRoot.querySelector(selector)).to.be.null;
      });
    });
  });
});

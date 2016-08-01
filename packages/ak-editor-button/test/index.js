import { name } from '../package.json';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import AkEditorButton from '../src';
import { symbols, state } from 'skatejs';
import shadowStyles from '../src/shadow.less';

const classKeys = shadowStyles.locals;

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

describe('ak-editor-button', () => {
  const shadowDomQuery = (elem, classes) =>
    elem[symbols.shadowRoot].querySelector(classes);

  const getShadowButtonElem = (elem) =>
    shadowDomQuery(elem, `.${classKeys.root} button`);

  it('should not throws when component is instantiated', () =>
    expect(() => (new AkEditorButton())).not.to.throw(Error)
  );

  it('should be possible to create a component', () => {
    const component = new AkEditorButton();
    expect(shadowDomQuery(component, `.${classKeys.root}`)).to.be.defined;
    expect(component.tagName.toLowerCase()).to.equal(name);
  });

  it('should call preventDefault when onmousedown event is triggered', () => {
    const component = new AkEditorButton();
    const button = getShadowButtonElem(component);

    const event = new CustomEvent('mousedown', {});
    sinon.spy(event, 'preventDefault');

    button.dispatchEvent(event);
    expect(event.preventDefault.called).to.be.true;
  });

  describe('attributes', () => {
    let component;
    beforeEach(() => {
      component = new AkEditorButton();
    });

    describe('default attributes', () => {
      it('should not have active class', () => {
        const classes = `.${classKeys.root}.${classKeys.active}`;
        expect(shadowDomQuery(component, classes)).to.be.null;
      });

      it('should not have button disabled', () => {
        const classes = `.${classKeys.root} button[disabled]`;
        expect(shadowDomQuery(component, classes)).to.be.null;
      });
    });

    describe('active attribute', () => {
      const selector = `.${classKeys.root}.${classKeys.active}`;
      beforeEach(() =>
        state(component, { active: true })
      );

      it('container should have active class', () =>
        expect(shadowDomQuery(component, selector)).not.to.be.null
      );

      it('container should not have active class after it is removed', () => {
        state(component, { active: false });
        expect(shadowDomQuery(component, selector)).to.be.null;
      });
    });

    describe('when disabled attribute is set', () => {
      const selector = `.${classKeys.root} button[disabled]`;
      beforeEach(() =>
        state(component, { disabled: true })
      );

      it('button should have disabled attribute', () =>
        expect(shadowDomQuery(component, selector)).not.to.be.null
      );

      it('button should not have disabled attribute after it is removed', () => {
        state(component, { disabled: false });
        expect(shadowDomQuery(component, selector)).to.be.null;
      });

      describe('onclick event', () => {
        const checkOnClickEvent = shouldBeCalled => {
          const onclick = sinon.spy();
          state(component, { onclick });
          state(getShadowButtonElem(component), { onclick });
          getShadowButtonElem(component).click();
          expect(onclick.called).to.equals(shouldBeCalled);
        };

        it('button should not trigger onclick event', () => checkOnClickEvent(false));
        it('button should trigger onclick event after it is removed', () => {
          state(component, { disabled: false });
          checkOnClickEvent(true);
        });
      });
    });
  });
});

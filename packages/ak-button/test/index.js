import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { symbols, state } from 'skatejs';
import AkButton from '../src/index.js';
import shadowStyles from '../src/shadow.less';
import { name } from '../package.json';
const classKeys = shadowStyles.locals;

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('ak-button', () => {
  const shadowDomQuery = (elem, classes) =>
    elem[symbols.shadowRoot].querySelector(classes);

  const getShadowButtonElem = (elem) =>
    shadowDomQuery(elem, `.${classKeys.akButton}`);

  it('should not throws when component is instanciated', () => {
    expect(() => {
      new AkButton(); // eslint-disable-line no-new
    }).not.to.throw(Error);
  });

  it('should be possible to create a component', () => {
    const component = new AkButton();
    expect(shadowDomQuery(component, `.${classKeys.akButton}`)).to.be.defined;
    expect(component.tagName.toLowerCase()).to.equal(name);
  });

  it('should call preventDefault when onmousedown event is triggered', () => {
    const component = new AkButton();
    const button = getShadowButtonElem(component);

    const event = new CustomEvent('mousedown', {});
    sinon.spy(event, 'preventDefault');

    button.dispatchEvent(event);
    expect(event.preventDefault.called).to.be.true;
  });

  describe('attributes', () => {
    let component;
    beforeEach(() => {
      component = new AkButton();
    });

    describe('type', () => {
      describe('defaults', () =>
        it('button should have type=button', () =>
          expect(getShadowButtonElem(component).getAttribute('type')).to.equals('button')
        )
      );
    });

    describe('appearence', () => {
      describe('standard', () => {
        it.skip('button should only have akButton class', () => {
          state(component, { appearence: 'standard' });
          const buttonClasses = getShadowButtonElem(component).classList;
          expect(buttonClasses).to.have.lengthOf(1);
          expect(buttonClasses[0]).to.equals(shadowStyles.locals.akButton);
        });
      });

      describe('primary', () => {
        const selector = `.${classKeys.akButton}.${classKeys.primary}`;
        beforeEach(() =>
          state(component, { appearence: 'primary' })
        );

        it('button should have primary class', () =>
          expect(shadowDomQuery(component, selector)).not.to.be.null
        );

        it('button should not have primary class after it is removed', () => {
          state(component, { appearence: 'standard' });
          expect(shadowDomQuery(component, selector)).to.be.null;
        });
      });
    });

    describe('when disabled attribute is set', () => {
      const selector = `.${classKeys.container} button[disabled]`;
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
        it('should not be triggered', () => {
          const onclick = sinon.spy();
          state(component, { onclick });
          getShadowButtonElem(component).click();
          expect(onclick.called).to.equals(false);
        });
      });
    });
  });
});

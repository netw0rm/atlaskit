import 'custom-event-polyfill';
import assign from 'object-assign';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { symbols, props } from 'skatejs';
import AkButton, { APPEARANCE } from '../src/index.js';
import shadowStyles from '../src/shadow.less';
import { name } from '../package.json';
const classKeys = shadowStyles.locals;

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('ak-button', () => {
  let component;
  const shadowDomQuery = (elem, selector) =>
    elem[symbols.shadowRoot].querySelector(selector);

  const getShadowButtonElem = (elem) =>
    shadowDomQuery(elem, `.${classKeys.button}`);

  const indexOf = (array, value) => Array.prototype.indexOf.call(array, value);
  const containsClass = (array, ...classes) =>
    classes.reduce((acum, val) => acum && (indexOf(array, val) > -1), true);

  function waitForRender(elem, cb) {
    setTimeout(() => {
      if (elem[symbols.shadowRoot]) {
        return cb();
      }
      return waitForRender(elem, cb);
    }, 0);
  }

  beforeEach(done => {
    component = new AkButton();
    document.body.appendChild(component);
    waitForRender(component, done);
  });

  afterEach(() => document.body.removeChild(component));

  it('should not throws when component is instanciated', () =>
    expect(() => (new AkButton())).not.to.throw(Error)
  );

  it('should be possible to create a component', () => {
    expect(getShadowButtonElem(component)).to.be.defined;
    expect(component.tagName).to.match(new RegExp(`^${name}`, 'i'));
  });

  it('should call preventDefault when onmousedown event is triggered', () => {
    const button = getShadowButtonElem(component);
    const event = new CustomEvent('mousedown', {});
    sinon.spy(event, 'preventDefault');
    button.dispatchEvent(event);
    expect(event.preventDefault).to.have.been.called;
  });

  describe('attributes', () => {
    describe('defaults', () =>
      it('button should have type="button" by default', () =>
        expect(getShadowButtonElem(component).type).to.equal('button')
      )
    );

    describe('appearance', () => {
      [
        {
          message: 'standard',
          appearance: APPEARANCE.STANDARD,
        },
        {
          message: 'when invalid appearance provided',
          appearance: 'invalid',
        },
      ].forEach(testCase => {
        describe(testCase.message, () => {
          it('button should only have .button class', () => {
            props(component, { appearance: testCase.appearance });
            const buttonClasses = getShadowButtonElem(component).classList;
            expect(buttonClasses).to.have.lengthOf(1);
            expect(containsClass(buttonClasses, classKeys.button)).to.be.true;
          });
        });
      });

      [APPEARANCE.PRIMARY, APPEARANCE.SUBTLE].forEach(appearanceName => {
        describe(appearanceName, () => {
          const selector = `.${classKeys.button}.${classKeys[appearanceName]}`;
          beforeEach(() =>
            props(component, { appearance: appearanceName })
          );

          it(`button should have ${appearanceName} class`, () =>
            expect(shadowDomQuery(component, selector)).not.to.be.null
          );

          it(`button should not have ${appearanceName} class after it is removed`, () => {
            props(component, { appearance: APPEARANCE.STANDARD });
            expect(shadowDomQuery(component, selector)).to.be.null;
          });
        });
      });
    });

    describe('compact', () => {
      const selector = `.${classKeys.button}.${classKeys.compact}`;
      beforeEach(() =>
        props(component, { compact: true })
      );

      it('button should have compact class', () =>
        expect(shadowDomQuery(component, selector)).not.to.be.null
      );

      describe('when button is compact', () => {
        [
          {
            setup: { disabled: true },
            expectedClass: 'disabled',
          },
          {
            setup: { selected: true },
            expectedClass: 'selected',
          },
          {
            setup: { appearance: APPEARANCE.PRIMARY },
            expectedClass: 'primary',
          },
          {
            setup: { appearance: APPEARANCE.SUBTLE },
            expectedClass: 'subtle',
          },
        ].forEach(testCase => {
          describe(`and is also ${JSON.stringify(testCase.setup)}`, () => {
            beforeEach(() =>
              (props(component, assign({ compact: true }, testCase.setup)))
            );
            it(`button should have compact and ${testCase.expectedClass} class`, () => {
              const buttonClasses = getShadowButtonElem(component).classList;
              expect(buttonClasses).to.have.lengthOf(3);
              expect(containsClass(buttonClasses,
                classKeys.button,
                classKeys.compact,
                classKeys[testCase.expectedClass]
              )).to.be.true;
            });
          });
        });
      });
    });

    describe('selected', () => {
      const selector = `.${classKeys.button}.${classKeys.selected}`;
      beforeEach(() =>
        props(component, { selected: true })
      );

      it('button should have selected class', () =>
        expect(shadowDomQuery(component, selector)).not.to.be.null
      );

      it('selected button should override any appearance', () => {
        props(component, { appearance: APPEARANCE.PRIMARY, selected: true });
        const buttonClasses = getShadowButtonElem(component).classList;
        expect(buttonClasses).to.have.lengthOf(2);
        expect(containsClass(buttonClasses, classKeys.button, classKeys.selected)).to.be.true;
      });

      it('button should not have selected class after it is removed', () => {
        props(component, { selected: false });
        expect(shadowDomQuery(component, selector)).to.be.null;
      });
    });

    describe('disabled', () => {
      const selector = `.${classKeys.button}[disabled]`;
      beforeEach(() =>
        props(component, { disabled: true })
      );

      it('button should have disabled attribute', () =>
        expect(shadowDomQuery(component, selector)).not.to.be.null
      );

      it('button should override any other class', () => {
        props(component, { disabled: true, selected: true });
        const buttonClasses = getShadowButtonElem(component).classList;
        expect(buttonClasses).to.have.lengthOf(2);
        expect(containsClass(buttonClasses, classKeys.button, classKeys.disabled)).to.be.true;
      });

      it('button should not have disabled attribute after it is removed', () => {
        props(component, { disabled: false });
        expect(shadowDomQuery(component, selector)).to.be.null;
      });

      it('button should have pointer-events: none css attribute', () =>
        expect(window.getComputedStyle(component).pointerEvents).to.equal('none')
      );

      it('button\'s children should have pointer-events: none css attribute', () => {
        const div = document.createElement('div', 'test');
        component.appendChild(div);
        expect(window.getComputedStyle(div).pointerEvents).to.equal('none');
      });
    });
  });
});

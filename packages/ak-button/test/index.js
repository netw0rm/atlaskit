import 'custom-event-polyfill';
import assign from 'object-assign';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { symbols, props } from 'skatejs';
import AkButton, { APPEARANCE } from '../src/index.js';
import shadowStyles from '../src/shadow.less';
import hostStyles from '../src/host.less';
import { name } from '../package.json';
import { hasClass, waitUntil } from 'akutil-common-test';
const classKeys = shadowStyles.locals;

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('ak-button', () => {
  let component;
  const shadowDomQuery = (elem, selector) =>
    elem[symbols.shadowRoot].querySelector(selector);

  const getShadowButtonElem = (elem) =>
    shadowDomQuery(elem, `.${classKeys.button}`);

  const expectButtonToHaveClasses = (testComponent, expectClassCount, ...classes) => {
    const button = getShadowButtonElem(testComponent);
    expect(button.classList).to.have.lengthOf(expectClassCount);
    expect(hasClass(button, ...classes)).to.be.true;
  };

  const createDivTest = config => {
    const div = document.createElement('div');
    div.innerText = 'test';
    if (config.slotName) {
      div.slot = config.slotName;
    }
    return div;
  };

  beforeEach(() => {
    component = new AkButton();
    props(component, { className: hostStyles.locals.akButton });
    document.body.appendChild(component);
    return waitUntil(() => component[symbols.shadowRoot] !== null);
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

  describe('slots', () => {
    describe('before', () => {
      const div = createDivTest({ slotName: 'before' });
      beforeEach(() => component.appendChild(div));

      it('slotted element should have margin-right applied', () =>
        expect(window.getComputedStyle(div).marginRight).to.equal('8px')
      );
    });

    describe('after', () => {
      const div = createDivTest({ slotName: 'after' });
      beforeEach(() => component.appendChild(div));

      it('slotted element should have margin-left applied', () =>
        expect(window.getComputedStyle(div).marginLeft).to.equal('8px')
      );
    });
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
            expectButtonToHaveClasses(component, 1, classKeys.button);
          });
        });
      });

      [APPEARANCE.PRIMARY, APPEARANCE.SUBTLE, APPEARANCE.LINK].forEach(appearanceName => {
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
            it(`button should have compact and ${testCase.expectedClass} class`, () =>
              expectButtonToHaveClasses(component, 3,
                classKeys.button,
                classKeys.compact,
                classKeys[testCase.expectedClass]
              )
            );
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
        expectButtonToHaveClasses(component, 2,
          classKeys.button,
          classKeys.selected
        );
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

      [
        { selected: true },
        { appearance: APPEARANCE.PRIMARY },
        { appearance: APPEARANCE.SUBTLE },
      ].forEach(setup =>
        describe(`when button also has ${setup}`, () => {
          beforeEach(() => props(component, setup));

          it('disabled button should discard any other class', () =>
            expectButtonToHaveClasses(component, 2,
              classKeys.button,
              classKeys.disabled
            )
          );
        })
      );

      describe('when button also has appearance link', () => {
        beforeEach(() => props(component, { appearance: APPEARANCE.LINK }));

        it('should have both disabled and link classes', () =>
          expectButtonToHaveClasses(component, 3,
            classKeys.button,
            classKeys.disabled,
            classKeys.link
          )
        );
      });

      it('button should not have disabled attribute after it is removed', () => {
        props(component, { disabled: false });
        expect(shadowDomQuery(component, selector)).to.be.null;
      });

      it('button should have pointer-events: none css attribute', () =>
        expect(window.getComputedStyle(component).pointerEvents).to.equal('none')
      );

      describe('when button has slotted elements', () => {
        const addSlottedElement = slotName => {
          const div = createDivTest({ slot: slotName });
          component.appendChild(div);
          return div;
        };

        [false, 'before'].forEach(slotName =>
          describe(`on ${slotName || 'default'} slot`, () =>
            it('slotted elements should have pointer-events: none css attribute', () => {
              const div = addSlottedElement(slotName);
              expect(window.getComputedStyle(div).pointerEvents).to.equal('none');
            })
          )
        );
      });
    });
  });
});

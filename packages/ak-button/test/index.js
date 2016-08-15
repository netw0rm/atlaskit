import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { symbols, props } from 'skatejs';
import AkButton from '../src/index.js';
import shadowStyles from '../src/shadow.less';
import { name } from '../package.json';
const classKeys = shadowStyles.locals;

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('ak-button', () => {
  let component;
  const shadowDomQuery = (elem, classes) =>
    elem[symbols.shadowRoot].querySelector(classes);

  const getShadowButtonElem = (elem) =>
    shadowDomQuery(elem, `.${classKeys.akButton}`);

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
    expect(shadowDomQuery(component, `.${classKeys.akButton}`)).to.be.defined;
    expect(component.tagName.toLowerCase()).to.equal(name);
  });

  it('should call preventDefault when onmousedown event is triggered', () => {
    const button = getShadowButtonElem(component);
    const event = new CustomEvent('mousedown', {});
    sinon.spy(event, 'preventDefault');
    button.dispatchEvent(event);
    expect(event.preventDefault).to.have.been.called;
  });

  describe('attributes', () => {
    describe('appearance', () => {
      [
        {
          message: 'standard',
          appearance: 'standard',
        },
        {
          message: 'when invalid appearance provided',
          appearance: 'invalid',
        },
      ].forEach(testCase => {
        describe(testCase.message, () => {
          it('button should only have akButton class', () => {
            props(component, { appearance: testCase.appearance });
            const buttonClasses = getShadowButtonElem(component).classList;
            expect(buttonClasses).to.have.lengthOf(1);
            expect(buttonClasses[0]).to.equal(shadowStyles.locals.akButton);
          });
        });
      });

      ['subtle', 'primary', 'selected'].forEach(appearanceName => {
        describe(appearanceName, () => {
          const selector = `.${classKeys.akButton}.${classKeys[appearanceName]}`;
          beforeEach(() =>
            props(component, { appearance: appearanceName })
          );

          it(`button should have ${appearanceName} class`, () =>
            expect(shadowDomQuery(component, selector)).not.to.be.null
          );

          it(`button should not have ${appearanceName} class after it is removed`, () => {
            props(component, { appearance: 'standard' });
            expect(shadowDomQuery(component, selector)).to.be.null;
          });
        });
      });
    });

    describe('disabled', () => {
      const selector = `.${classKeys.container} button[disabled]`;
      beforeEach(() =>
        props(component, { disabled: true })
      );

      it('button should have disabled attribute', () =>
        expect(shadowDomQuery(component, selector)).not.to.be.null
      );

      it('button should override any other class', () => {
        props(component, { disabled: true, appearance: 'selected' });
        const buttonClasses = getShadowButtonElem(component).classList;
        expect(buttonClasses).to.have.lengthOf(2);
        expect([
          shadowStyles.locals.akButton,
          shadowStyles.locals.disabled,
        ]).to.have.members([buttonClasses[0], buttonClasses[1]]);
      });

      it('button should not have disabled attribute after it is removed', () => {
        props(component, { disabled: false });
        expect(shadowDomQuery(component, selector)).to.be.null;
      });

      describe('onclick event', () => {
        it('should not be triggered when button is clicked', () => {
          // disable this test on ie11 until we find a way to make this test green
          if (!(/rv:11.0/i.test(window.navigator.userAgent))) {
            const onclick = sinon.spy();
            props(component, { onclick });
            getShadowButtonElem(component).click();
            expect(onclick).to.have.been.called;
          }
        });

        it('should not be triggered when any nested element is clicked', () => {
          const onclick = sinon.spy();
          const div = document.createElement('div');
          div.appendChild(document.createTextNode('CLICK ME'));
          component.appendChild(div);

          props(component, { onclick });
          div.click();
          expect(onclick).to.have.been.called;
        });
      });
    });
  });
});

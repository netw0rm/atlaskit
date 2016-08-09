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
    expect(event.preventDefault.called).to.be.true;
  });

  describe('attributes', () => {
    describe('type', () => {
      describe('defaults', () =>
        it('button should have type=button', () =>
          expect(getShadowButtonElem(component).getAttribute('type')).to.equals('button')
        )
      );

      it('button should not have invalid type', () => {
        props(component, { type: 'invalid' });
        expect(getShadowButtonElem(component).getAttribute('type')).to.equals('button');
      });
    });

    describe('appearence', () => {
      [
        {
          message: 'standard',
          appearence: 'standard',
        },
        {
          message: 'when invalid appearence provided',
          appearence: 'invalid',
        },
      ].forEach(testCase => {
        describe(testCase.message, () => {
          it('button should only have akButton class', () => {
            props(component, { appearence: testCase.appearence });
            const buttonClasses = getShadowButtonElem(component).classList;
            expect(buttonClasses).to.have.lengthOf(1);
            expect(buttonClasses[0]).to.equals(shadowStyles.locals.akButton);
          });
        });
      });

      ['subtle', 'primary', 'selected'].forEach(appearenceName => {
        describe(appearenceName, () => {
          const selector = `.${classKeys.akButton}.${classKeys[appearenceName]}`;
          beforeEach(() =>
            props(component, { appearence: appearenceName })
          );

          it(`button should have ${appearenceName} class`, () =>
            expect(shadowDomQuery(component, selector)).not.to.be.null
          );

          it('button should not have subtle class after it is removed', () => {
            props(component, { appearence: 'standard' });
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
        props(component, { disabled: true, appearence: 'selected' });
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
          // disable this test on ie11 for now. It works in the storybook.
          if (!(/rv:11.0/i.test(window.navigator.userAgent))) {
            const onclick = sinon.spy();
            props(component, { onclick });
            getShadowButtonElem(component).click();
            expect(onclick.called).to.equals(false);
          }
        });

        it('should not be triggered when any nested element is clicked', () => {
          const onclick = sinon.spy();
          const div = document.createElement('div');
          div.appendChild(document.createTextNode('CLICK ME'));
          component.appendChild(div);

          props(component, { onclick });
          div.click();
          expect(onclick.called).to.equals(false);
        });

        describe('when icon attribute is set', () => {
          beforeEach(() =>
            props(component, { leftIcon: 'add' })
          );

          describe('and icon is clicked', () => {
            const onclick = sinon.spy();
            beforeEach(() => {
              const icon = shadowDomQuery(component, `.${classKeys.akButton} #left-icon`);
              props(component, { onclick });
              icon.click();
            });
            it('should not be triggered', () => expect(onclick.called).to.equals(false));
          });
        });
      });
    });

    describe('icon', () => {
      describe('position', () => {
        const setupButton = (...args) => {
          const attrs = args.reduce((acum, side) => {
            acum[`${side}Icon`] = 'add';
            return acum;
          }, {});
          props(component, attrs);
          return shadowDomQuery(component, `.${shadowStyles.locals.contentContainer}`);
        };

        describe('on the left', () => {
          it('should be rendered properly', () =>
            expect(setupButton('left').firstChild.id).to.equals('left-icon')
          );
        });

        describe('on the right', () => {
          it('should be rendered properly', () =>
            expect(setupButton('right').lastChild.id).to.equals('right-icon')
          );
        });

        describe('on both sides', () => {
          it('should be rendered properly', () => {
            const button = setupButton('left', 'right');
            expect(button.firstChild.id).to.equals('left-icon');
            expect(button.lastChild.id).to.equals('right-icon');
          });
        });
      });
    });
  });
});

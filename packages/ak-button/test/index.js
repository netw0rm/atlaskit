import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { symbols, state } from 'skatejs';
import AkButton from '../src/index.js';
import shadowStyles from '../src/shadow.less';

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('ak-button', () => {
  let component;

  const getButtonElement = (elem) =>
    elem[symbols.shadowRoot].querySelector(`.${shadowStyles.locals.akButton}`);

  const getButtonLabelElement = (elem) =>
    getButtonElement(elem).querySelector(`.${shadowStyles.locals.label}`);


  it('should be possible to create the component', () => {
    component = new AkButton();
    expect(component).to.be.defined;
    expect(getButtonElement(component)).to.be.defined;
  });

  describe('behaviour', () => {
    beforeEach(() => {
      component = new AkButton();
    });

    describe('states', () =>
      describe('disabled', () =>
        it('should reject any attached onclick handler', () => {
          const onclickhandler = sinon.spy();
          state(component, { onclick: onclickhandler, disabled: true });
          getButtonElement(component).click();
          expect(onclickhandler.calledOnce).to.be.false;
        })
      )
    );

    describe('types', () => {
      describe('default', () => {
        it('should be possible to specify a button label', () => {
          state(component, { label: 'test' });
          expect(getButtonLabelElement(component).innerHTML).to.equal('test');
        });

        it('should be possible to set an onclick event handler', () => {
          const onclickhandler = sinon.spy();
          component.onclick = onclickhandler;
          getButtonElement(component).click();

          expect(onclickhandler.calledOnce).to.be.true;
        });
      });

      describe('primary', () => {
        it('should have attribute primary', () => {
          state(component, { primary: true });
          const buttonClasses = Array.from(getButtonElement(component).classList);
          expect(buttonClasses).to.include(shadowStyles.locals.primary);
        });
      });
    });
  });
});

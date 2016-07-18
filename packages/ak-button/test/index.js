import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { symbols, state } from 'skatejs';
import AkButton from '../src/index.js';

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('ak-button', () => {
  let component;

  const getButtonElement = (elem) =>
    elem[symbols.shadowRoot].querySelector('button');

  it('should be possible to create the component', () => {
    component = new AkButton();
    expect(component).to.be.defined;
    expect(getButtonElement(component)).to.be.defined;
  });


  describe('types', () => {
    beforeEach(() => {
      component = new AkButton();
    });

    describe('default', () => {
      it('should be possible to specify a button label', () => {
        state(component, { label: 'test' });
        expect(getButtonElement(component).innerHTML).to.equal('test');
      });

      it('should be possible to set an onclick event handler', (done) => {
        const onclickhandler = sinon.spy();
        component.onclick = onclickhandler;
        getButtonElement(component).click();

        expect(onclickhandler.calledOnce).to.be.true;
        done();
      });
    });

    describe('primary', () => {
      it('should have attribute primary', () => {
        state(component, { primary: true });
        expect(component.primary).to.be.true;
      });
    });
  });
});

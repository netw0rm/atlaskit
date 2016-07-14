import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { symbols } from 'skatejs';
import AkButton from '../src/index.register.js';

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
      it('should be possible to specify a button label', (done) => {
        component.label = 'test';

        setTimeout(() => {
          expect(getButtonElement(component).innerHTML).to.equal('test');
          done();
        }, 100);
      });

      it('should be possible to set an onclick event handler', (done) => {
        const onclickhandler = sinon.spy();
        component.onclick = onclickhandler;
        getButtonElement(component).click();

        expect(onclickhandler.calledOnce).to.be.true;
        done();
      });
    });
  });
});

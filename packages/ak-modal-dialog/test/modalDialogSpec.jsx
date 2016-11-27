import chai from 'chai';
import React from 'react';
import { shallow, mount } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';

import ModalDialog from '../src';
import styles from '../src/style.less';

chai.should();
chai.use(chaiEnzyme());

describe('ak-modal-dialog', () => {
  describe('exports', () => {
    it('should export a base component', () => {
      shallow(<ModalDialog />).should.be.an.instanceof(Object);
    });
  });

  describe('props', () => {
    describe('isOpen', () => {
      it('should be hidden by default', () => {
        shallow(<ModalDialog />).should.have.text('');
      });
      it('should be visible when open = true', () => {
        shallow(<ModalDialog isOpen />).should.not.have.text('');
      });
      it('should become hidden when open changed from true -> false', () => {
        const wrapper = shallow(<ModalDialog isOpen />);
        wrapper.setProps({ isOpen: false });
        wrapper.should.have.text('');
      });
    });

    describe('header', () => {
      it('should render when set', () => {
        shallow(
          <ModalDialog
            isOpen
            header={
              <span>My header</span>
            }
          />
        ).should.contain(<span>My header</span>);
      });
    });

    describe('footer', () => {
      it('should render when set', () => {
        shallow(
          <ModalDialog
            isOpen
            footer={
              <span>My footer</span>
            }
          />
        ).should.contain(<span>My footer</span>);
      });
    });

    describe('children', () => {
      it('should render when set', () => {
        shallow(
          <ModalDialog isOpen>
            <form>This is <strong>my</strong> form</form>
          </ModalDialog>
        ).should.contain(<form>This is <strong>my</strong> form</form>);
      });
    });

    describe('onBlanketClicked', () => {
      it('should trigger when blanket clicked', () => {
        const spy = sinon.spy();
        const wrapper = mount(<ModalDialog isOpen onBlanketClicked={spy} />);
        wrapper.find(`.${styles.locals.modalWrapper}`).children().first().simulate('click');
        expect(spy).to.have.been.calledOnce;
      });
    });
  });
});

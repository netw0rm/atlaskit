import chai from 'chai';
import React from 'react';
import { shallow, mount } from 'enzyme';

import ModalDialog from '../src';
import styles from '../src/style.less';

chai.should();

describe('ak-modal-dialog', () => {
  describe('exports', () => {
    it('should export a base component', () => {
      shallow(<ModalDialog />).should.be.an.instanceof(Object);
    });
  });

  describe('props', () => {
    describe('isOpen', () => {
      it('should be hidden by default', () => {
        shallow(<ModalDialog />).text().should.equal('');
      });
      it('should be visible when open = true', () => {
        shallow(<ModalDialog isOpen />).text().should.not.equal('');
      });
      it('should become hidden when open changed from true -> false', () => {
        const wrapper = shallow(<ModalDialog isOpen />);
        wrapper.setProps({ isOpen: false });
        wrapper.text().should.equal('');
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
        ).find(`.${styles.locals.headerFlex}`).text().should.equal('My header');
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
        ).find(`.${styles.locals.footerFlex}`).text().should.equal('My footer');
      });
    });

    describe('children', () => {
      it('should render when set', () => {
        shallow(
          <ModalDialog isOpen>
            <form>This is <strong>my</strong> form</form>
          </ModalDialog>
        ).find(`.${styles.locals.contentFlex}`).text().should.equal('This is my form');
      });
    });

    describe('onBlanketClicked', () => {
      it('should trigger when blanket clicked', (done) => {
        const wrapper = mount(<ModalDialog isOpen onBlanketClicked={() => done()} />);
        wrapper.find(`.${styles.locals.blanketPositioner}`).children().first().simulate('click');
      });
    });
  });
});

import React from 'react';
import { shallow, mount } from 'enzyme';

import ModalDialog from '../src';
import styles from '../src/style.less';

describe('ak-modal-dialog', () => {
  describe('exports', () => {
    it('should export a base component', () => {
      shallow(<ModalDialog />).should.be.an.instanceof(Object);
    });
  });

  describe('props', () => {
    describe('isOpen', () => {
      it('should be hidden by default', () => {
        shallow(<ModalDialog />).text().should.be.equal('');
      });
      it('should be visible when open = true', () => {
        shallow(<ModalDialog isOpen />).text().should.not.equal('');
      });
      it('should become hidden when open changed from true -> false', () => {
        const wrapper = shallow(<ModalDialog isOpen />);
        wrapper.setProps({ isOpen: false });
        wrapper.text().should.be.equal('');
      });
    });

    describe('width', () => {
      const { locals, locals: { modalPositioner, medium } } = styles;
      const allowedWidths = ['small', 'medium', 'large', 'x-large'];
      const hasClass = (wrapper, className) => wrapper.find(`.${modalPositioner}`).hasClass(className);

      it('should be "medium" by default', () => {
        hasClass(shallow(<ModalDialog isOpen />), medium).should.equal(true);
      });

      allowedWidths.forEach((width) => {
        it(`width = "${width}" is applied uniquely`, () => {
          hasClass(shallow(<ModalDialog isOpen width={width} />), locals[width]).should.equal(true);

          // Check that other widths aren't applied
          allowedWidths.filter(w => w !== width).forEach((otherWidth) => {
            hasClass(shallow(<ModalDialog isOpen width={width} />), otherWidth).should.equal(false);
          });
        });
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
        ).contains(<span>My header</span>).should.be.equal(true);
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
        ).contains(<span>My footer</span>).should.be.equal(true);
      });
    });

    describe('children', () => {
      it('should render when set', () => {
        shallow(
          <ModalDialog isOpen>
            <form>This is <strong>my</strong> form</form>
          </ModalDialog>
        ).contains(<form>This is <strong>my</strong> form</form>).should.be.equal(true);
      });
    });

    describe('onDialogDismissed', () => {
      it('should trigger when blanket clicked', () => {
        const spy = sinon.spy();
        const wrapper = mount(<ModalDialog isOpen onDialogDismissed={spy} />);
        wrapper.find(`.${styles.locals.modalWrapper}`).children().first().simulate('click');
        expect(spy.callCount).to.equal(1);
      });
    });
  });
});

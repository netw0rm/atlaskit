import sinon from 'sinon';

import React from 'react';
import { shallow, mount } from 'enzyme';

import ModalDialog from '../../src';
import styles from '../../src/style.less';

describe('ak-modal-dialog', () => {
  describe('exports', () => {
    it('should export a base component', () => {
      expect(shallow(<ModalDialog />)).to.be.an.instanceof(Object);
    });
  });

  describe('props', () => {
    describe('isOpen', () => {
      it('should be hidden by default', () => {
        expect(shallow(<ModalDialog />).text()).to.equal('');
      });
      it('should be visible when open = true', () => {
        expect(shallow(<ModalDialog isOpen />).text()).to.not.equal('');
      });
      it('should become hidden when open changed from true -> false', () => {
        const wrapper = shallow(<ModalDialog isOpen />);
        wrapper.setProps({ isOpen: false });
        expect(wrapper.text()).to.equal('');
      });
    });

    describe('width', () => {
      const allowedWidths = ['small', 'medium', 'large', 'x-large'];
      const hasClass = (wrapper, className) => wrapper.find(`.${styles.modalPositioner}`).hasClass(className);

      it('should be "medium" by default', () => {
        expect(hasClass(shallow(<ModalDialog isOpen />), styles.medium)).to.equal(true);
      });

      it('should support a custom pixel width as string', () => {
        expect(shallow(
          <ModalDialog
            isOpen
            width="300px"
          />
        ).find(`.${styles.modalPositioner}`).props().style).to.deep.equal({ width: '300px' });
      });

      it('should support a custom pixel width as string', () => {
        expect(shallow(
          <ModalDialog
            isOpen
            width="75%"
          />
        ).find(`.${styles.modalPositioner}`).props().style).to.deep.equal({ width: '75%' });
      });

      it('should support a custom integer width', () => {
        expect(shallow(
          <ModalDialog
            isOpen
            width={300}
          />
        ).find(`.${styles.modalPositioner}`).props().style).to.deep.equal({ width: 300 });
      });

      allowedWidths.forEach((width) => {
        it(`width = "${width}" is applied uniquely`, () => {
          const wrapper = shallow(<ModalDialog isOpen width={width} />);
          expect(hasClass(wrapper, styles[width])).to.equal(true);

          // Check that other widths aren't applied
          allowedWidths.filter(w => w !== width).forEach((otherWidth) => {
            expect(hasClass(wrapper, otherWidth)).to.equal(false);
          });
        });
      });
    });

    describe('header', () => {
      it('should render when set', () => {
        const wrapper = shallow(<ModalDialog header={<span>My header</span>} isOpen />);
        expect(wrapper.contains(<span>My header</span>)).to.equal(true);
      });
    });

    describe('footer', () => {
      it('should render when set', () => {
        const wrapper = shallow(<ModalDialog footer={<span>My footer</span>} isOpen />);
        expect(wrapper.contains(<span>My footer</span>)).to.equal(true);
      });
    });

    describe('children', () => {
      it('should render when set', () => {
        const wrapper = shallow(<ModalDialog isOpen>
          <form>This is <strong>my</strong> form</form>
        </ModalDialog>);
        expect(wrapper.contains(<form>This is <strong>my</strong> form</form>)).to.equal(true);
      });
    });

    describe('onDialogDismissed', () => {
      it('should trigger when blanket clicked', () => {
        const spy = sinon.spy();
        const wrapper = mount(<ModalDialog isOpen onDialogDismissed={spy} />);
        wrapper.find(`.${styles.modalWrapper}`).children().first().simulate('click');
        expect(spy.callCount).to.equal(1);
      });

      it('should trigger when blanket clicked below dialog (modalPositioner)', () => {
        const spy = sinon.spy();
        const wrapper = mount(<ModalDialog isOpen onDialogDismissed={spy} />);
        wrapper.find(`.${styles.modalPositioner}`).simulate('click');
        expect(spy.callCount).to.equal(1);
      });

      it('should not trigger when blanket content clicked', () => {
        const spy = sinon.spy();
        const wrapper = mount(
          <ModalDialog isOpen onDialogDismissed={spy}>
            <span className="my-content" />
          </ModalDialog>
        );
        wrapper.find('.my-content').simulate('click');
        expect(spy.callCount).to.equal(0);
      });
    });
  });

  describe('scrolling header/footer keylines', () => {
    it('should enable header keyline only when header provided', () => {
      const wrapper = mount(<ModalDialog isOpen />);
      expect(wrapper.find(`.${styles.withHeader}`).length).to.equal(0);
      expect(wrapper.find(`.${styles.topKeylineMask}`).length).to.equal(0);
      wrapper.setProps({ header: 'Header' });
      expect(wrapper.find(`.${styles.withHeader}`).length).to.equal(1);
      expect(wrapper.find(`.${styles.topKeylineMask}`).length).to.equal(1);
    });

    it('should enable footer keyline only when footer provided', () => {
      const wrapper = mount(<ModalDialog isOpen />);
      expect(wrapper.find(`.${styles.withFooter}`).length).to.equal(0);
      expect(wrapper.find(`.${styles.bottomKeylineMask}`).length).to.equal(0);
      wrapper.setProps({ footer: 'Header' });
      expect(wrapper.find(`.${styles.withFooter}`).length).to.equal(1);
      expect(wrapper.find(`.${styles.bottomKeylineMask}`).length).to.equal(1);
    });
  });
});

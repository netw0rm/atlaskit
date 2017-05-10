import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import ModalDialog from '../../src';

import ModalWrapper from '../../src/styled/ModalWrapper';
import ModalPositioner from '../../src/styled/ModalPositioner';
import HeaderFooterWrapper from '../../src/styled/HeaderFooterWrapper';
import KeylineMask from '../../src/styled/KeylineMask';

describe('ak-modal-dialog', () => {
  describe('exports', () => {
    it('should export a base component', () => {
      expect(shallow(<ModalDialog />)).to.be.an.instanceof(Object);
    });
  });

  describe('props', () => {
    describe('isOpen', () => {
      it('should be hidden by default', () => {
        expect(shallow(<ModalDialog />).find(ModalPositioner).length).to.equal(0);
      });
      it('should be visible when open = true', () => {
        expect(shallow(<ModalDialog isOpen />).find(ModalPositioner).length).to.equal(1);
      });
      it('should become hidden when open changed from true -> false', () => {
        const wrapper = mount(<ModalDialog isOpen />);
        expect(wrapper.find(ModalPositioner).length).to.equal(1);
        wrapper.setProps({ isOpen: false });
        // need to simulate onAnimationEnd it doesn't seem to fire after setProps
        wrapper.find(ModalPositioner).simulate('animationEnd');
        expect(wrapper.find(ModalPositioner).length).to.equal(0);
      });
    });

    describe('width', () => {
      const allowedWidths = ['small', 'medium', 'large', 'x-large'];
      const hasWidth = (wrapper, expectedWidth) => wrapper.find(ModalPositioner).prop('width') === expectedWidth;

      it('should be "medium" by default', () => {
        expect(hasWidth(shallow(<ModalDialog isOpen />), 'medium')).to.equal(true);
      });

      it('should support a custom pixel width as string', () => {
        expect(shallow(
          <ModalDialog
            isOpen
            width="300px"
          />
        ).find(ModalPositioner).prop('style')).to.deep.equal({ width: '300px' });
      });

      it('should support a custom pixel width as string', () => {
        expect(shallow(
          <ModalDialog
            isOpen
            width="75%"
          />
        ).find(ModalPositioner).prop('style')).to.deep.equal({ width: '75%' });
      });

      it('should support a custom integer width', () => {
        expect(shallow(
          <ModalDialog
            isOpen
            width={300}
          />
        ).find(ModalPositioner).prop('style')).to.deep.equal({ width: 300 });
      });

      allowedWidths.forEach((width) => {
        it(`width = "${width}" is applied uniquely`, () => {
          const wrapper = shallow(<ModalDialog isOpen width={width} />);
          expect(hasWidth(wrapper, width)).to.equal(true);

          // Check that other widths aren't applied
          allowedWidths.filter(w => w !== width).forEach((otherWidth) => {
            expect(hasWidth(wrapper, otherWidth)).to.equal(false);
          });
        });
      });
    });

    describe('header', () => {
      it('should render when set', () => {
        const wrapper = mount(<ModalDialog header={<span>My header</span>} isOpen />);
        expect(wrapper.find(HeaderFooterWrapper).contains(<span>My header</span>)).to.equal(true);
      });
    });

    describe('footer', () => {
      it('should render when set', () => {
        const wrapper = mount(<ModalDialog footer={<span>My footer</span>} isOpen />);
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
        wrapper.find(ModalWrapper).children().first().simulate('click');
        expect(spy.callCount).to.equal(1);
      });

      it('should trigger when blanket clicked below dialog (modalPositioner)', () => {
        const spy = sinon.spy();
        const wrapper = mount(<ModalDialog isOpen onDialogDismissed={spy} />);
        wrapper.find(ModalPositioner).simulate('click');
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
      expect(wrapper.find(KeylineMask).length).to.equal(0);
      wrapper.setProps({ header: 'Header' });
      const keyline = wrapper.find(KeylineMask);
      expect(keyline.length).to.equal(1);
      expect(keyline.prop('headerOrFooter')).to.equal('header');
    });

    it('should enable footer keyline only when footer provided', () => {
      const wrapper = mount(<ModalDialog isOpen />);
      expect(wrapper.find(KeylineMask).length).to.equal(0);
      wrapper.setProps({ footer: 'Header' });
      const keyline = wrapper.find(KeylineMask);
      expect(keyline.length).to.equal(1);
      expect(keyline.prop('headerOrFooter')).to.equal('footer');
    });
  });
});

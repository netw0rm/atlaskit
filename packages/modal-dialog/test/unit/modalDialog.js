import React from 'react';
import { shallow, mount } from 'enzyme';

import ModalDialog from '../../src';
import { KeylineMask, Header } from '../../src/styled/Content';
import { FillScreen, DialogPositioner, Dialog, dialogHeight } from '../../src/styled/Modal';

describe('ak-modal-dialog', () => {
  describe('exports', () => {
    it('should export a base component', () => {
      expect(shallow(<ModalDialog />)).toBeInstanceOf(Object);
    });
  });

  describe('props', () => {
    describe('isOpen', () => {
      it('should be hidden by default', () => {
        expect(shallow(<ModalDialog />).find(DialogPositioner).length).toBe(0);
      });
      it('should be visible when open = true', () => {
        expect(shallow(<ModalDialog isOpen />).find(DialogPositioner).length).toBe(1);
      });
      it('should become hidden when open changed from true -> false', () => {
        const wrapper = mount(<ModalDialog isOpen />);
        expect(wrapper.find(DialogPositioner).length).toBe(1);
        wrapper.setProps({ isOpen: false });
        // need to simulate onAnimationEnd it doesn't seem to fire after setProps
        wrapper.find(DialogPositioner).simulate('animationEnd');
        expect(wrapper.find(DialogPositioner).length).toBe(0);
      });
    });

    describe('height', () => {
      it('should be passed to Dialog', () => {
        expect(
          shallow(<ModalDialog height="42%" isOpen />).find(Dialog).prop('height')
        ).toBe('42%');
      });

      it('should return px if number', () => {
        expect(dialogHeight({ height: 42 })).toBe('42px');
      });

      it('should return raw value if string', () => {
        expect(dialogHeight({ height: '42%' })).toBe('42%');
        expect(dialogHeight({ height: '42em' })).toBe('42em');
        expect(dialogHeight({ height: 'initial' })).toBe('initial');
      });

      it('should return "auto" if not supplied', () => {
        expect(dialogHeight({})).toBe('auto');
      });
    });

    describe('width', () => {
      const allowedWidths = ['small', 'medium', 'large', 'x-large'];
      const hasWidth = (wrapper, expectedWidth) => wrapper.find(DialogPositioner).prop('width') === expectedWidth;

      it('should be "medium" by default', () => {
        expect(hasWidth(shallow(<ModalDialog isOpen />), 'medium')).toBe(true);
      });

      it('should support a custom pixel width as string (pixels)', () => {
        expect(shallow(
          <ModalDialog
            isOpen
            width="300px"
          />
        ).find(DialogPositioner).prop('style')).toEqual({ width: '300px' });
      });

      it('should support a custom pixel width as string (percent)', () => {
        expect(shallow(
          <ModalDialog
            isOpen
            width="75%"
          />
        ).find(DialogPositioner).prop('style')).toEqual({ width: '75%' });
      });

      it('should support a custom integer width', () => {
        expect(shallow(
          <ModalDialog
            isOpen
            width={300}
          />
        ).find(DialogPositioner).prop('style')).toEqual({ width: 300 });
      });

      allowedWidths.forEach((width) => {
        it(`width = "${width}" is applied uniquely`, () => {
          const wrapper = shallow(<ModalDialog isOpen width={width} />);
          expect(hasWidth(wrapper, width)).toBe(true);

          // Check that other widths aren't applied
          allowedWidths.filter(w => w !== width).forEach((otherWidth) => {
            expect(hasWidth(wrapper, otherWidth)).toBe(false);
          });
        });
      });
    });

    describe('header', () => {
      it('should render when set', () => {
        const wrapper = mount(<ModalDialog header={<span>My header</span>} isOpen />);
        expect(wrapper.find(Header).contains(<span>My header</span>)).toBe(true);
      });
    });

    describe('footer', () => {
      it('should render when set', () => {
        const wrapper = mount(<ModalDialog footer={<span>My footer</span>} isOpen />);
        expect(wrapper.contains(<span>My footer</span>)).toBe(true);
      });
    });

    describe('children', () => {
      it('should render when set', () => {
        const wrapper = shallow(<ModalDialog isOpen>
          <form>This is <strong>my</strong> form</form>
        </ModalDialog>);
        expect(wrapper.contains(<form>This is <strong>my</strong> form</form>)).toBe(true);
      });
    });

    describe('onDialogDismissed', () => {
      it('should trigger when blanket clicked', () => {
        const spy = jest.fn();
        const wrapper = mount(<ModalDialog isOpen onDialogDismissed={spy} />);
        wrapper.find(FillScreen).children().first().simulate('click');
        expect(spy).toHaveBeenCalledTimes(1);
      });

      it('should trigger when blanket clicked below dialog (modalPositioner)', () => {
        const spy = jest.fn();
        const wrapper = mount(<ModalDialog isOpen onDialogDismissed={spy} />);
        wrapper.find(DialogPositioner).simulate('click');
        expect(spy).toHaveBeenCalledTimes(1);
      });

      it('should not trigger when blanket content clicked', () => {
        const spy = jest.fn();
        const wrapper = mount(
          <ModalDialog isOpen onDialogDismissed={spy}>
            <span className="my-content" />
          </ModalDialog>
        );
        wrapper.find('.my-content').simulate('click');
        expect(spy).not.toHaveBeenCalled();
      });
    });
  });

  describe('scrolling header/footer keylines', () => {
    it('should enable header keyline only when header provided', () => {
      const wrapper = mount(<ModalDialog isOpen />);
      expect(wrapper.find(KeylineMask).length).toBe(0);
      wrapper.setProps({ header: 'Header' });
      const keyline = wrapper.find(KeylineMask);
      expect(keyline.length).toBe(1);
      expect(keyline.prop('position')).toBe('header');
    });

    it('should enable footer keyline only when footer provided', () => {
      const wrapper = mount(<ModalDialog isOpen />);
      expect(wrapper.find(KeylineMask).length).toBe(0);
      wrapper.setProps({ footer: 'Header' });
      const keyline = wrapper.find(KeylineMask);
      expect(keyline.length).toBe(1);
      expect(keyline.prop('position')).toBe('footer');
    });
  });
});

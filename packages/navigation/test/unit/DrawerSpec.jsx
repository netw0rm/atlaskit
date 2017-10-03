import { mount } from 'enzyme';
import React from 'react';
import Blanket from '@atlaskit/blanket';
import Drawer from '../../src/components/js/Drawer';
import ContainerHeader from '../../src/components/js/ContainerHeader';
import DrawerBackIcon from '../../src/components/js/DrawerBackIcon';
import DrawerSide from '../../src/components/styled/DrawerSide';
import DrawerPrimaryIcon from '../../src/components/styled/DrawerPrimaryIcon';
import GlobalItem from '../../src/components/js/GlobalItem';
import DrawerTrigger from '../../src/components/js/DrawerTrigger';
import DrawerBackIconWrapper from '../../src/components/styled/DrawerBackIconWrapper';

describe('<Drawer />', () => {
  const escKeyCode = 27;
  const delKeyCode = 26;
  let event;
  const keyDown = (keyCode: number) => {
    event = document.createEvent('Events');
    event.initEvent('keydown', true, true);
    event.keyCode = keyCode;
    window.dispatchEvent(event);
  };

  let drawerWrapper;
  const onBackButtonStub = jest.fn();
  const onKeyDownStub = jest.fn();
  beforeEach(() => {
    drawerWrapper = mount(
      <Drawer
        isOpen
        onBackButton={onBackButtonStub}
        onKeyDown={onKeyDownStub}
      />
    );
  });

  afterEach(() => {
    // Remove keydown event listener on `window`
    drawerWrapper.unmount();
    onBackButtonStub.mockReset();
    onKeyDownStub.mockReset();
  });

  describe('onKeyDown func is NOT provided', () => {
    it('should do the default behaviours if the key is Escape', () => {
      keyDown(escKeyCode);
      expect(onBackButtonStub).toHaveBeenCalledWith(event);
    });
    it('should NOT do the default behaviours if the key is NOT Escape', () => {
      keyDown(delKeyCode);
      expect(onBackButtonStub).not.toHaveBeenCalled();
    });
    it('should NOT do the default behaviours if the drawer is closed', () => {
      drawerWrapper.setProps({ isOpen: false });
      keyDown(escKeyCode);
      expect(onBackButtonStub).not.toHaveBeenCalled();
    });
  });

  describe('onKeyDown func is provided', () => {
    it('should call the provided function', () => {
      keyDown(escKeyCode);
      expect(onKeyDownStub).toHaveBeenCalledWith(event);
    });
    describe('and default is not prevented', () => {
      it('should also do the default behaviours if the key is Escape', () => {
        keyDown(escKeyCode);
        expect(onBackButtonStub).toHaveBeenCalledWith(event);
      });
      it('should NOT do the default behaviours if the key is NOT Escape', () => {
        keyDown(delKeyCode);
        expect(onBackButtonStub).not.toHaveBeenCalled();
      });
    });

    describe('and default is prevented', () => {
      it('should NOT do the default behaviours', () => {
        const onKeyDownStubDefaultPrevented = (e) => { e.preventDefault(); };
        drawerWrapper.setProps({ onKeyDown: onKeyDownStubDefaultPrevented });
        keyDown(escKeyCode);
        expect(onBackButtonStub).not.toHaveBeenCalledWith(event);
      });
    });
  });

  describe('content', () => {
    describe('is open', () => {
      it('render the header', () => {
        const header = <div />;
        drawerWrapper.setProps({ header });
        expect(drawerWrapper.find(ContainerHeader).contains(header)).toBe(true);
      });

      it('should render its children', () => {
        const content = <div className="foo" />;
        drawerWrapper.setProps({ children: content });
        expect(drawerWrapper.contains(content)).toBe(true);
      });
    });

    describe('is closed', () => {
      it('should not render its children', () => {
        const content = <div className="foo" />;
        drawerWrapper.setProps({ isOpen: false, children: content });
        expect(drawerWrapper.contains(content)).toBe(false);
      });

      it('should not render a provided header', () => {
        const header = <div />;
        drawerWrapper.setProps({ isOpen: false, header });
        expect(drawerWrapper.find(ContainerHeader).contains(header)).toBe(false);
      });
    });
  });

  describe('sidebar', () => {
    describe('is open', () => {
      it('should render the primaryIcon', () => {
        const icon = <img alt="foo" />;
        drawerWrapper.setProps({ primaryIcon: icon });

        expect(drawerWrapper
          .find(DrawerSide)
          .find(DrawerPrimaryIcon)
          .props().children).toBe(icon);
      });

      it('should render backIcon inside a <DrawerBackIcon />', () => {
        const icon = <img alt="foo" />;
        drawerWrapper.setProps({ backIcon: icon });

        expect(drawerWrapper
          .find(DrawerSide)
          .find(DrawerBackIcon)
          .props().children).toBe(icon);
      });

      it('should trigger onBackButton when the DrawerTrigger is clicked', () => {
        drawerWrapper.find(DrawerTrigger).find(GlobalItem).simulate('click');
        expect(onBackButtonStub).toHaveBeenCalled();
      });

      it('should default the back icon position at 0px', () => {
        expect(drawerWrapper
          .find(DrawerBackIconWrapper).props().iconOffset).toBe(0);
      });

      it('should update the backIconOffset based on where the backIcon is rendered', () => {
        drawerWrapper.setProps({ iconOffset: 123 });
        expect(drawerWrapper
          .find(DrawerBackIconWrapper).props().iconOffset).toBe(123);
      });

      it('should wrap a DrawerBackIcon in a DrawerTrigger', () => {
        expect(
          drawerWrapper
            .find(DrawerTrigger)
            .find(DrawerBackIcon)
            .exists()
        ).toBe(true);
      });
    });

    describe('is closed', () => {

    });
  });

  describe('blanket', () => {
    it('should render a blanket when the drawer is open and closed', () => {
      expect(drawerWrapper.find(Blanket).length).toBe(1);
      drawerWrapper.setProps({ isOpen: false });
      expect(drawerWrapper.find(Blanket).length).toBe(1);
    });

    it('should render a blocking blanket when the drawer is open', () => {
      const blanket = drawerWrapper.find(Blanket);
      expect(blanket.props().isTinted).toBe(true);
      expect(blanket.props().canClickThrough).toBe(false);
    });

    it('should hide the blanket when the drawer is closed', () => {
      drawerWrapper.setProps({ isOpen: false });
      const blanket = drawerWrapper.find(Blanket);
      expect(blanket.props().isTinted).toBe(false);
      expect(blanket.props().canClickThrough).toBe(true);
    });

    it('should treat clicking an open blanket as if it where a back button', () => {
      drawerWrapper
        .find(Blanket)
        .simulate('click');
      expect(onBackButtonStub).toHaveBeenCalled();
    });
  });
});

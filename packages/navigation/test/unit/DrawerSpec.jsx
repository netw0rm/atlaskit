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

  describe('onKeyDown func is NOT provided', () => {
    it('should do the default behaviours if the key is Escape', () => {
      const onBackButtonStub = jest.fn();
      mount(<Drawer onBackButton={onBackButtonStub} />);
      keyDown(escKeyCode);
      expect(onBackButtonStub).toHaveBeenCalledWith(event);
    });
    it('should NOT do the default behaviours if the key is NOT Escape', () => {
      const onBackButtonStub = jest.fn();
      mount(<Drawer onBackButton={onBackButtonStub} />);
      keyDown(delKeyCode);
      expect(onBackButtonStub).not.toHaveBeenCalledWith(event);
    });
  });

  describe('onKeyDown func is provided', () => {
    it('should call the provided function', () => {
      const onKeyDownStub = jest.fn();
      mount(<Drawer onKeyDown={onKeyDownStub} />);
      keyDown(escKeyCode);
      expect(onKeyDownStub).toHaveBeenCalledWith(event);
    });
    describe('and default is not prevented', () => {
      let onKeyDownStub;
      let onBackButtonStub;
      beforeEach(() => {
        onKeyDownStub = jest.fn();
        onBackButtonStub = jest.fn();
        mount(<Drawer onKeyDown={onKeyDownStub} onBackButton={onBackButtonStub} />);
      });
      it('should also do the default behaviours if the key is Escape', () => {
        keyDown(escKeyCode);
        expect(onBackButtonStub).toHaveBeenCalledWith(event);
      });
      it('should NOT do the default behaviours if the key is NOT Escape', () => {
        keyDown(delKeyCode);
        expect(onBackButtonStub).not.toHaveBeenCalledWith(event);
      });
    });

    describe('and default is prevented', () => {
      it('should NOT do the default behaviours', () => {
        const onKeyDownStub = (e) => { e.preventDefault(); };
        const onBackButtonStub = jest.fn();
        mount(<Drawer onKeyDown={onKeyDownStub} onBackButton={onBackButtonStub} />);
        keyDown(escKeyCode);
        expect(onBackButtonStub).not.toHaveBeenCalledWith(event);
      });
    });
  });

  describe('content', () => {
    describe('is open', () => {
      it('render the header', () => {
        const header = <div />;
        const wrapper = mount(<Drawer isOpen header={header} />);

        expect(wrapper.find(ContainerHeader).contains(header)).toBe(true);
      });

      it('should render its children', () => {
        const content = <div className="foo" />;
        expect(mount(<Drawer isOpen>{content}</Drawer>)
          .contains(content)).toBe(true);
      });
    });

    describe('is closed', () => {
      it('should not render its children', () => {
        const content = <div className="foo" />;
        expect(mount(<Drawer isOpen={false}>{content}</Drawer>)
          .contains(content)).toBe(false);
      });

      it('should not render a provided header', () => {
        const header = <div />;
        const wrapper = mount(<Drawer isOpen={false} header={header} />);

        expect(wrapper.find(ContainerHeader).contains(header)).toBe(false);
      });
    });
  });

  describe('sidebar', () => {
    describe('is open', () => {
      it('should render the primaryIcon', () => {
        const icon = <img alt="foo" />;
        const wrapper = mount(<Drawer isOpen primaryIcon={icon} />);

        expect(wrapper
          .find(DrawerSide)
          .find(DrawerPrimaryIcon)
          .props().children).toBe(icon);
      });

      it('should render backIcon inside a <DrawerBackIcon />', () => {
        const icon = <img alt="foo" />;
        const wrapper = mount(<Drawer isOpen backIcon={icon} />);

        expect(wrapper
          .find(DrawerSide)
          .find(DrawerBackIcon)
          .props().children).toBe(icon);
      });

      it('should trigger onBackButton when the DrawerTrigger is clicked', () => {
        const spy = jest.fn();
        mount(<Drawer isOpen onBackButton={spy} />)
          .find(DrawerTrigger).find(GlobalItem).simulate('click');
        expect(spy).toHaveBeenCalled();
      });

      it('should default the back icon position at 0px', () => {
        expect(mount(
          <Drawer isOpen />
        ).find(DrawerBackIconWrapper).props().iconOffset).toBe(0);
      });

      it('should update the backIconOffset based on where the backIcon is rendered', () => {
        expect(mount(
          <Drawer isOpen iconOffset={123} />
        ).find(DrawerBackIconWrapper).props().iconOffset).toBe(123);
      });

      it('should wrap a DrawerBackIcon in a DrawerTrigger', () => {
        expect(
          mount(<Drawer isOpen />)
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
      expect(mount(<Drawer isOpen />).find(Blanket).length).toBe(1);
      expect(mount(<Drawer isOpen={false} />).find(Blanket).length).toBe(1);
    });

    it('should render a blocking blanket when the drawer is open', () => {
      const blanket = mount(<Drawer isOpen />).find(Blanket);
      expect(blanket.props().isTinted).toBe(true);
      expect(blanket.props().canClickThrough).toBe(false);
    });

    it('should hide the blanket when the drawer is closed', () => {
      const blanket = mount(<Drawer isOpen={false} />).find(Blanket);
      expect(blanket.props().isTinted).toBe(false);
      expect(blanket.props().canClickThrough).toBe(true);
    });

    it('should treat clicking an open blanket as if it where a back button', () => {
      const onBackButton = jest.fn();
      const blanket = mount(<Drawer isOpen onBackButton={onBackButton} />).find(Blanket);

      expect(blanket.props().onBlanketClicked).toBe(onBackButton);

      blanket.simulate('click');

      expect(onBackButton).toHaveBeenCalled();
    });
  });
});

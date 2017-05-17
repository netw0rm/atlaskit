import { mount } from 'enzyme';
import React from 'react';
import Drawer from '../src/components/js/Drawer';

describe('<Drawer />', () => {
  describe('content', () => {
    describe('is open', () => {
      it('should not render the ContainerHeader when width="full"', () => {
        expect(mount(<Drawer isOpen width="full" />).find('ContainerHeader').length).to.equal(0);
      });

      it('render the header', () => {
        const header = <div />;
        const wrapper = mount(<Drawer isOpen header={header} />);

        expect(wrapper.find('ContainerHeader').contains(header)).to.equal(true);
      });

      it('should not render a ContainerHeader if no header is provided', () => {
        const wrapper = mount(<Drawer isOpen />);

        expect(wrapper.find('ContainerHeader').length).to.equal(0);
      });

      it('should render its children', () => {
        const content = <div className="foo" />;
        expect(mount(<Drawer isOpen>{content}</Drawer>)
          .contains(content)).to.equal(true);
      });
    });

    describe('is closed', () => {
      it('should not render its children', () => {
        const content = <div className="foo" />;
        expect(mount(<Drawer isOpen={false}>{content}</Drawer>)
          .contains(content)).to.equal(false);
      });

      it('should not render a provided header', () => {
        const header = <div />;
        const wrapper = mount(<Drawer isOpen={false} header={header} />);

        expect(wrapper.find('ContainerHeader').contains(header)).to.equal(false);
      });
    });
  });

  describe('sidebar', () => {
    describe('is open', () => {
      it('should render the primaryIcon', () => {
        const icon = <img alt="foo" />;
        const wrapper = mount(<Drawer isOpen primaryIcon={icon} />);

        expect(wrapper
          .find('DrawerSide')
          .find('DrawerPrimaryIcon')
          .props().children).to.equal(icon);
      });

      it('should render backIcon inside a <DrawerBackIcon />', () => {
        const icon = <img alt="foo" />;
        const wrapper = mount(<Drawer isOpen backIcon={icon} />);

        expect(wrapper
          .find('DrawerSide')
          .find('DrawerBackIcon')
          .props().children).to.equal(icon);
      });

      it('should trigger onBackButton when the DrawerTrigger is clicked', () => {
        const spy = sinon.stub();
        mount(<Drawer isOpen onBackButton={spy} />).find('DrawerTrigger').simulate('click');
        expect(spy.called).to.equal(true);
      });

      it('should default the back icon position at 0px', () => {
        expect(mount(
          <Drawer isOpen />
        ).find('DrawerBackIconWrapper').props().style.top).to.equal('0px');
      });

      it('should updated the backIconOffset based on where the backIcon is rendered', () => {
        expect(mount(
          <Drawer isOpen backIconOffset={123} />
        ).find('DrawerBackIconWrapper').props().style.top).to.equal('123px');
      });

      it('should wrap a DrawerBackIcon in a DrawerTrigger', () => {
        expect(mount(<Drawer isOpen />).find('DrawerTrigger')
          .childAt(0).is('DrawerBackIcon')).to.equal(true);
      });
    });

    describe('is closed', () => {

    });
  });

  describe('blanket', () => {
    it('should render a blanket when the drawer is open and closed', () => {
      expect(mount(<Drawer isOpen />).find('Blanket').length).to.equal(1);
      expect(mount(<Drawer isOpen={false} />).find('Blanket').length).to.equal(1);
    });

    it('should render a blocking blanket when the drawer is open', () => {
      const blanket = mount(<Drawer isOpen />).find('Blanket');
      expect(blanket.props().isTinted).to.equal(true);
      expect(blanket.props().canClickThrough).to.equal(false);
    });

    it('should hide the blanket when the drawer is closed', () => {
      const blanket = mount(<Drawer isOpen={false} />).find('Blanket');
      expect(blanket.props().isTinted).to.equal(false);
      expect(blanket.props().canClickThrough).to.equal(true);
    });

    it('should treat clicking an open blanket as if it where a back button', () => {
      const onBackButton = sinon.stub();
      const blanket = mount(<Drawer isOpen onBackButton={onBackButton} />).find('Blanket');

      expect(blanket.props().onBlanketClicked).to.equal(onBackButton);

      blanket.simulate('click');

      expect(onBackButton.called).to.equal(true);
    });
  });
});


import { shallow, mount } from 'enzyme';
import React, { PureComponent } from 'react';
import Navigation from '../src/components/js/Navigation';
import Drawer from '../src/components/js/Drawer';
import {
  containerClosedWidth,
  navigationOpenWidth,
} from '../src/shared-variables';

class Child extends PureComponent {
  render() {
    return <div>Hi there</div>;
  }
}

describe('<Navigation />', () => {
  describe('renders', () => {
    it('should render a <ContainerNavigation />', () => {
      expect(shallow(<Navigation />).find('ContainerNavigation').length).to.equal(1);
    });
    it('should render a <GlobalNavigation />', () => {
      expect(shallow(<Navigation />).find('GlobalNavigation').length).to.equal(1);
    });
    it('should render a <GlobalPrimaryActions /> in GlobalNavigation', () => {
      const wrapper = mount(<Navigation />);
      expect(wrapper.find('GlobalNavigation').find('GlobalPrimaryActions').length).to.equal(1);
      wrapper.unmount();
    });
    it('should render a <GlobalPrimaryActions /> in ContainerNavigation', () => {
      const wrapper = mount(<Navigation />);
      expect(wrapper.find('ContainerNavigation').find('GlobalPrimaryActions').length).to.equal(1);
      wrapper.unmount();
    });
    it('should render a <Resizer />', () => {
      expect(shallow(<Navigation />).find('Resizer').length).to.equal(1);
    });
  });

  describe('props', () => {
    it('isResizeable=false does not render a <Resizer />', () => {
      expect(shallow(<Navigation isResizeable={false} />).find('Resizer').length).to.equal(0);
    });
    it('containerAppearance="global" is passed on to <ContainerNavigation/>', () => {
      expect(shallow(<Navigation containerAppearance="global" />).find('ContainerNavigation').prop('appearance')).to.equal('global');
    });
    it('isCollapsible=false does render a <Resizer />', () => {
      expect(shallow(<Navigation isCollapsible={false} />).find('Resizer').length).to.be.above(0);
    });
    it('containerHeaderComponent - passes a func for the container header component to <ContainerNavigation />', () => {
      const header = () => (<div>foo</div>);
      expect(shallow(<Navigation containerHeaderComponent={header} />)
        .find('ContainerNavigation').props().headerComponent).to.equal(header);
    });
    it('globalSearchIcon should pass search icon onto <GlobalNavigation />', () => {
      const icon = <img alt="search" />;
      const wrapper = mount(<Navigation globalSearchIcon={icon} />);
      expect(wrapper.find('GlobalNavigation').props().searchIcon).to.equal(icon);
      wrapper.unmount();
    });
    it('globalCreateIcon should pass createIcon onto <GlobalNavigation />', () => {
      const icon = <img alt="create" />;
      const wrapper = mount(<Navigation globalCreateIcon={icon} />);
      expect(wrapper.find('GlobalNavigation').props().createIcon).to.equal(icon);
      wrapper.unmount();
    });
    it('globalAppearance should pass globalAppearance onto <GlobalNavigation />', () => {
      const appearance = 'settings';
      const wrapper = mount(<Navigation globalAppearance={appearance} />);
      expect(wrapper.find('GlobalNavigation').props().appearance).to.equal(appearance);
      wrapper.unmount();
    });
    it('globalSearchIcon should pass globalSearchIcon onto <ContainerNavigation />', () => {
      const icon = <img alt="search" />;
      const wrapper = mount(<Navigation globalSearchIcon={icon} />);
      expect(wrapper.find('ContainerNavigation').props().globalSearchIcon).to.equal(icon);
      wrapper.unmount();
    });
    it('globalCreateIcon should pass globalCreateIcon onto <ContainerNavigation />', () => {
      const icon = <img alt="create" />;
      const wrapper = mount(<Navigation globalCreateIcon={icon} />);
      expect(wrapper.find('ContainerNavigation').props().globalCreateIcon).to.equal(icon);
      wrapper.unmount();
    });
    it('onResizeStart is called when the resizer starts resizing', (done) => {
      const navigation = shallow(<Navigation />);
      navigation.setProps({
        onResizeStart: () => {
          done();
        },
      });
      navigation.find('Resizer').simulate('resizeStart');
    });
    it('onResize is called after the resizeDelta has been reset to 0 (so that animations are enabled again)', (done) => {
      const navigation = shallow(<Navigation />);
      navigation.setProps({
        onResize: () => {
          expect(navigation.state().resizeDelta).to.equal(0);
          done();
        },
      });
      navigation.find('Resizer').simulate('resizeStart');
      navigation.find('Resizer').simulate('resize', -300);
      navigation.find('Resizer').simulate('resizeEnd');
    });
    it('drawers should render list of Drawers', () => {
      const drawer1 = (<Drawer key="d1" />);
      const drawer2 = (<Drawer key="d2" />);
      expect(shallow(<Navigation drawers={[drawer1, drawer2]} />).find('Drawer').length).to.equal(2);
    });
    it('globalPrimaryItem should map to global navigation\'s primaryItem', () => {
      const primaryIcon = <span className="PRIMARY_ICON" />;
      const wrapper = mount(
        <Navigation
          globalPrimaryIcon={primaryIcon}
        />
      );
      expect(wrapper.find('GlobalNavigation').props().primaryIcon).to.equal(primaryIcon);
      wrapper.unmount();
    });
    it('should allow you to pass in global secondard actions', () => {
      const wrapper = mount(
        <Navigation
          globalSecondaryActions={[<Child />, <Child />]}
        />
      );

      expect(wrapper
        .find('GlobalNavigation')
        .find('GlobalSecondaryActions')
        .find(Child)
        .length
      ).to.equal(2);
      wrapper.unmount();
    });
    it('linkComponent is passed on to <GlobalNavigation/>', () => {
      const linkComponent = () => null;
      const wrapper = mount(
        <Navigation
          linkComponent={linkComponent}
        />
      );
      expect(wrapper.find('GlobalNavigation').props().linkComponent).to.equal(linkComponent);
      wrapper.unmount();
    });
  });

  describe('interaction', () => {
    it('resize changes internal resize state', () => {
      const navigation = shallow(<Navigation />);
      navigation.find('Resizer').simulate('resize', 50);
      expect(navigation.state().resizeDelta).to.equal(50);
    });
    it('rendered width is never less than the container width', () => {
      const navigation = shallow(<Navigation />);
      navigation.find('Resizer').simulate('resize', -300);
      expect(navigation.find('Spacer').props().width).to.be.at.least(containerClosedWidth);
    });
    it('with isCollapsible=false, rendered width is never less than the navigation open width', () => {
      const navigation = shallow(<Navigation isCollapsible={false} />);
      navigation.find('Resizer').simulate('resize', -300);
      expect(navigation.find('Spacer').props().width).to.be.at.least(navigationOpenWidth);
    });
  });

  describe('open/closed props matrix', () => {
    it('width prop is reflected on <Spacer />', () => {
      expect(shallow(<Navigation width={500} />).find('Spacer').props().width).to.equal(500);
      expect(shallow(<Navigation width={200} />).find('Spacer').props().width).to.equal(200);
    });
    it('open=false overrides width prop on <Spacer />', () => {
      expect(shallow(<Navigation isOpen={false} width={500} />)
        .find('Spacer').props().width).to.equal(containerClosedWidth);
      expect(shallow(<Navigation isOpen={false} width={200} />)
        .find('Spacer').props().width).to.equal(containerClosedWidth);
    });

    // if specific test from the matrix fail hard code them here
    // hard coded tests being more resistant to co-changes
    it('isCollapsible=false overrides isOpen=false', () => {
      const navigation = shallow(<Navigation isCollapsible={false} isOpen={false} />);
      const spacer = navigation.find('Spacer');
      const container = navigation.find('ContainerNavigation');
      expect(container.length).to.equal(1);
      expect(spacer.props().width).to.equal(navigationOpenWidth);
      expect(container.props().areGlobalActionsVisible).to.equal(false);
    });

    it('static isCollapsible=false isOpen=true width=containerClosedWidth must render with renderedWidth=navigationOpenWidth, and showGlobalActions=false', () => {
      const navigation = shallow(<Navigation isCollapsible={false} width={containerClosedWidth} />);
      const spacer = navigation.find('Spacer');
      const container = navigation.find('ContainerNavigation');
      expect(container.length).to.equal(1);
      expect(spacer.props().width).to.equal(navigationOpenWidth);
      expect(container.props().areGlobalActionsVisible).to.equal(false);
    });

    it('static isCollapsible=false isOpen=false width=containerClosedWidth must render with renderedWidth=navigationOpenWidth, and showGlobalActions=false', () => {
      const navigation = shallow(
        <Navigation
          isCollapsible={false}
          isOpen={false}
          width={containerClosedWidth}
        />
      );
      const spacer = navigation.find('Spacer');
      const container = navigation.find('ContainerNavigation');
      expect(container.length).to.equal(1);
      expect(spacer.props().width).to.equal(navigationOpenWidth);
      expect(container.props().areGlobalActionsVisible).to.equal(false);
    });

    // construct the parameter matrix
    const matrix = [];
    [true, false].forEach((isCollapsible) => {
      [true, false].forEach((isOpen) => {
        const halfWayWidth =
          ((navigationOpenWidth - containerClosedWidth) / 2) + containerClosedWidth;
        [navigationOpenWidth, containerClosedWidth].forEach((setWidth) => {
          // decide assertable values
          const isClosed = isCollapsible && !isOpen;
          const renderedWidth = (!isCollapsible || (isOpen && setWidth > halfWayWidth)) ?
              navigationOpenWidth :
              containerClosedWidth;
          matrix.push({
            isCollapsible,
            isOpen,
            setWidth,
            renderedWidth,
            showGlobalActions: isClosed,
          });
        });
      });
    });

    // one test per matrix entry ^
    matrix.forEach((params) => {
      it(
        `isCollapsible=${params.isCollapsible} ` +
        `isOpen=${params.isOpen} ` +
        `width=${params.setWidth} must render with ` +
        `renderedWidth=${params.renderedWidth}, and ` +
        `showGlobalActions=${params.showGlobalActions}`, () => {
        const navigation = shallow(
          <Navigation
            isCollapsible={params.isCollapsible}
            isOpen={params.isOpen}
            width={params.setWidth}
          />
        );
        const spacer = navigation.find('Spacer');
        const container = navigation.find('ContainerNavigation');
        expect(container.length).to.equal(1);
        expect(spacer.props().width).to.equal(params.renderedWidth);
        expect(container.props().areGlobalActionsVisible).to.equal(params.showGlobalActions);
      });
    });
  });
});

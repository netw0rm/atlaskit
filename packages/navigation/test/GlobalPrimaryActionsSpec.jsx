import React from 'react';
import GlobalPrimaryActions from '../src/components/js/GlobalPrimaryActions';
import { mountWithTheme, shallowWithTheme } from './theme-util';

describe('<GlobalPrimaryActions />', () => {
  describe('renders', () => {
    it('renders 0 GlobalItems with no props', () => {
      expect(shallowWithTheme(<GlobalPrimaryActions />).find('GlobalItem').length).to.equal(0);
    });
    it('renders 1 GlobalItem with a primaryIcon', () => {
      expect(shallowWithTheme(<GlobalPrimaryActions primaryIcon={<img alt="foo" />} />).find('GlobalItem').length).to.equal(1);
    });
    it('renders 2 GlobalItems with a primaryIcon and a search icon', () => {
      expect(shallowWithTheme(<GlobalPrimaryActions
        primaryIcon={<img alt="foo" />}
        searchIcon={<img alt="foo" />}
      />).find('GlobalItem').length).to.equal(2);
    });
    it('renders 3 GlobalItems with a primaryIcon, searchIcon and a createIcon', () => {
      expect(shallowWithTheme(<GlobalPrimaryActions
        primaryIcon={<img alt="foo" />}
        searchIcon={<img alt="foo" />}
        createIcon={<img alt="foo" />}
      />).find('GlobalItem').length).to.equal(3);
    });
  });
  describe('props', () => {
    it('appearance is passed onto all <GlobalItem />', () => {
      const globalItems = shallowWithTheme(<GlobalPrimaryActions appearance="container" />).find('GlobalItem');
      expect(globalItems.everyWhere(globalItem => globalItem.props().appearance === 'container')).to.equal(true);
    });
    it('linkComponent is passed onto the first <GlobalItem />', () => {
      const linkComponent = () => null;
      expect(shallowWithTheme(<GlobalPrimaryActions linkComponent={linkComponent} primaryIcon={<img alt="foo" />} />).find('GlobalItem').at(0).props().linkComponent).to.equal(linkComponent);
    });

    it('primaryIcon is passed onto the first <GlobalItem />', () => {
      const primaryIcon = <img alt="foo" />;
      expect(shallowWithTheme(<GlobalPrimaryActions primaryIcon={primaryIcon} />).find('GlobalItem').at(0).props().children).to.equal(primaryIcon);
    });
    it('primaryItemHref is passed onto the first <GlobalItem />', () => {
      expect(shallowWithTheme(<GlobalPrimaryActions primaryIcon={<img alt="foo" />} primaryItemHref="#foo" />).find('GlobalItem').at(0).props().href).to.equal('#foo');
    });
    it('onSearchActivate is given to to the first <DrawerTrigger />', () => {
      const handler = sinon.spy();
      expect(mountWithTheme(<GlobalPrimaryActions
        searchIcon={'s'}
        createIcon={'c'}
        onSearchActivate={handler}
      />).find('DrawerTrigger').at(0).props().onActivate).to.equal(handler);
    });
    it('onCreateActivate is given to to the second <DrawerTrigger />', () => {
      const handler = sinon.spy();
      expect(mountWithTheme(<GlobalPrimaryActions
        searchIcon={'s'}
        createIcon={'c'}
        onCreateActivate={handler}
      />).find('DrawerTrigger').at(1).props().onActivate).to.equal(handler);
    });
  });
});

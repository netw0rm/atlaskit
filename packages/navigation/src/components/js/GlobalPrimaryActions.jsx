import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import GlobalItem from './GlobalItem';
import DrawerTrigger from './DrawerTrigger';
import DefaultLinkComponent from './DefaultLinkComponent';
import GlobalPrimaryActionsInner from '../styled/GlobalPrimaryActionsInner';
import GlobalPrimaryActionsPrimaryItem from '../styled/GlobalPrimaryActionsPrimaryItem';
import GlobalPrimaryActionsItemsWrapper from '../styled/GlobalPrimaryActionsItemsWrapper';

export default class GlobalPrimaryActions extends PureComponent {
  static propTypes = {
    createIcon: PropTypes.node,
    homeHref: PropTypes.string,
    homeIcon: PropTypes.node,
    linkComponent: PropTypes.func,
    onCreateActivate: PropTypes.func,
    onSearchActivate: PropTypes.func,
    primaryIcon: PropTypes.node,
    primaryIconAppearance: PropTypes.string,
    primaryItemHref: PropTypes.string,
    searchIcon: PropTypes.node,
  };

  static defaultProps = {
    linkComponent: DefaultLinkComponent,
  }

  render() {
    const {
      createIcon,
      homeHref,
      homeIcon,
      linkComponent,
      onCreateActivate,
      onSearchActivate,
      primaryIcon,
      primaryIconAppearance,
      primaryItemHref,
      searchIcon,
    } = this.props;
    return (
      <GlobalPrimaryActionsInner>
        {primaryIcon ?
          <GlobalPrimaryActionsPrimaryItem>
            <GlobalItem
              href={primaryItemHref}
              linkComponent={linkComponent}
              size="medium"
              appearance={primaryIconAppearance}
            >
              {primaryIcon}
            </GlobalItem>
          </GlobalPrimaryActionsPrimaryItem>
        : null}
        <GlobalPrimaryActionsItemsWrapper>
          {homeIcon ?
            <GlobalItem
              href={homeHref}
              linkComponent={linkComponent}
              size="medium"
            >
              {homeIcon}
            </GlobalItem>
          : null}
          {searchIcon ?
            <DrawerTrigger onActivate={onSearchActivate}>
              {searchIcon}
            </DrawerTrigger>
          : null}
          {createIcon ?
            <DrawerTrigger onActivate={onCreateActivate}>
              {createIcon}
            </DrawerTrigger>
          : null}
        </GlobalPrimaryActionsItemsWrapper>
      </GlobalPrimaryActionsInner>
    );
  }
}

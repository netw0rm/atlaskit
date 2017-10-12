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
    linkComponent: PropTypes.func,
    onCreateActivate: PropTypes.func,
    onSearchActivate: PropTypes.func,
    peopleIcon: PropTypes.node,
    peopleItemHref: PropTypes.string,
    primaryIcon: PropTypes.node,
    primaryItemHref: PropTypes.string,
    searchIcon: PropTypes.node,
  };

  static defaultProps = {
    linkComponent: DefaultLinkComponent,
  }

  render() {
    const {
      createIcon,
      linkComponent,
      onCreateActivate,
      onSearchActivate,
      peopleIcon,
      peopleItemHref,
      primaryIcon,
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
            >
              {primaryIcon}
            </GlobalItem>
          </GlobalPrimaryActionsPrimaryItem>
        : null}
        <GlobalPrimaryActionsItemsWrapper>
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
        {peopleIcon ?
          <GlobalPrimaryActionsPrimaryItem>
            <GlobalItem
              href={peopleItemHref}
              linkComponent={linkComponent}
              size="medium"
            >
              {peopleIcon}
            </GlobalItem>
          </GlobalPrimaryActionsPrimaryItem>
        : null}
      </GlobalPrimaryActionsInner>
    );
  }
}

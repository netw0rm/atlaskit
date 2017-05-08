import React, { PureComponent, PropTypes } from 'react';
import { Tooltip } from '@atlaskit/tooltip';
import GlobalItem from './GlobalItem';
import DrawerTrigger from './DrawerTrigger';
import DefaultLinkComponent from './DefaultLinkComponent';
import GlobalPrimaryActionsInner from '../styled/GlobalPrimaryActionsInner';
import GlobalPrimaryActionsPrimaryItem from '../styled/GlobalPrimaryActionsPrimaryItem';
import GlobalPrimaryActionsItemsWrapper from '../styled/GlobalPrimaryActionsItemsWrapper';

export default class GlobalPrimaryActions extends PureComponent {
  static propTypes = {
    createIcon: PropTypes.node,
    isVisible: PropTypes.bool,
    linkComponent: PropTypes.func,
    onCreateActivate: PropTypes.func,
    onSearchActivate: PropTypes.func,
    primaryIcon: PropTypes.node,
    primaryItemHref: PropTypes.string,
    searchIcon: PropTypes.node,
  };

  static defaultProps = {
    isVisible: true,
    linkComponent: DefaultLinkComponent,
  }

  render() {
    const {
      createIcon,
      isVisible,
      linkComponent,
      onCreateActivate,
      onSearchActivate,
      primaryIcon,
      primaryItemHref,
      searchIcon,
    } = this.props;
    return (
      <GlobalPrimaryActionsInner isVisible={isVisible}>
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
              <GlobalItem size="medium">
                {searchIcon}
              </GlobalItem>
            </DrawerTrigger>
          : null}
          {createIcon ?
            <Tooltip
              description="testing tooltips"
              position="top"
              visible
            ><DrawerTrigger onActivate={onCreateActivate}>
              <GlobalItem size="medium">
                {createIcon}
              </GlobalItem>
            </DrawerTrigger>
            </Tooltip>
          : null}
        </GlobalPrimaryActionsItemsWrapper>
      </GlobalPrimaryActionsInner>
    );
  }
}

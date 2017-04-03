import React, { PureComponent, PropTypes } from 'react';
import { ThemeProvider } from 'styled-components';
import { globalOpenWidth } from '../../shared-variables';
import Spacer from './Spacer';
import GlobalPrimaryActions from './GlobalPrimaryActions';
import GlobalSecondaryActions from './GlobalSecondaryActions';
import DefaultLinkComponent from './DefaultLinkComponent';
import GlobalNavigationOuter from '../styled/GlobalNavigationOuter';
import GlobalNavigationInner from '../styled/GlobalNavigationInner';
import GlobalNavigationPrimaryContainer from '../styled/GlobalNavigationPrimaryContainer';
import GlobalNavigationSecondaryContainer from '../styled/GlobalNavigationSecondaryContainer';

export default class GlobalNavigation extends PureComponent {
  static propTypes = {
    appearance: PropTypes.oneOf(['global', 'settings']),
    linkComponent: PropTypes.func,
    primaryIcon: PropTypes.node,
    primaryItemHref: PropTypes.string,
    shouldAnimate: PropTypes.bool,
    searchIcon: PropTypes.node,
    onSearchActivate: PropTypes.func,
    onCreateActivate: PropTypes.func,
    createIcon: PropTypes.node,
    secondaryActions: PropTypes.arrayOf(PropTypes.node),
  };
  static defaultProps = {
    appearance: 'global',
    accountItem: null,
    helpItem: null,
    linkComponent: DefaultLinkComponent,
    primaryIcon: null,
    shouldAnimate: false,
    secondaryActions: [],
  };

  render() {
    const {
      appearance,
      createIcon,
      linkComponent,
      onCreateActivate,
      onSearchActivate,
      primaryIcon,
      primaryItemHref,
      searchIcon,
      shouldAnimate,
      secondaryActions,
    } = this.props;
    return (
      <ThemeProvider
        theme={{
          GlobalNavigationAppearance: appearance,
        }}
      >
        <GlobalNavigationOuter>
          <Spacer
            shouldAnimate={shouldAnimate}
            width={globalOpenWidth}
          />
          <GlobalNavigationInner shouldAnimate={shouldAnimate} appearance={appearance}>
            <GlobalNavigationPrimaryContainer>
              <GlobalPrimaryActions
                appearance={appearance}
                createIcon={createIcon}
                linkComponent={linkComponent}
                onCreateActivate={onCreateActivate}
                onSearchActivate={onSearchActivate}
                primaryIcon={primaryIcon}
                primaryItemHref={primaryItemHref}
                searchIcon={searchIcon}
              />
            </GlobalNavigationPrimaryContainer>
            <GlobalNavigationSecondaryContainer>
              {secondaryActions.length ? <GlobalSecondaryActions
                actions={secondaryActions}
              /> : null}
            </GlobalNavigationSecondaryContainer>
          </GlobalNavigationInner>
        </GlobalNavigationOuter>
      </ThemeProvider>
    );
  }
}

import React, { PureComponent, PropTypes } from 'react';
import { ThemeProvider } from 'styled-components';
import { appearanceEnum, themeVariables } from '../../utils/theme';
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
    appearance: PropTypes.oneOf([appearanceEnum.global, appearanceEnum.settings]),
    linkComponent: PropTypes.func,
    primaryIcon: PropTypes.node,
    primaryItemHref: PropTypes.string,
    searchIcon: PropTypes.node,
    onSearchActivate: PropTypes.func,
    onCreateActivate: PropTypes.func,
    createIcon: PropTypes.node,
    secondaryActions: PropTypes.arrayOf(PropTypes.node),
  };
  static defaultProps = {
    appearance: appearanceEnum.global,
    accountItem: null,
    helpItem: null,
    linkComponent: DefaultLinkComponent,
    primaryIcon: null,
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
      secondaryActions,
    } = this.props;
    return (
      <ThemeProvider
        theme={{
          [themeVariables.appearance]: appearance,
        }}
      >
        <GlobalNavigationOuter>
          <Spacer width={globalOpenWidth} />
          <GlobalNavigationInner>
            <GlobalNavigationPrimaryContainer>
              <GlobalPrimaryActions
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
              {secondaryActions.length ? (
                <GlobalSecondaryActions actions={secondaryActions} />
              ) : null}
            </GlobalNavigationSecondaryContainer>
          </GlobalNavigationInner>
        </GlobalNavigationOuter>
      </ThemeProvider>
    );
  }
}

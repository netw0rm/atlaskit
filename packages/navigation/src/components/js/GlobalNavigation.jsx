import React, { PureComponent, PropTypes } from 'react';
import { ThemeProvider } from 'styled-components';
import { appearanceEnum, themeVariables } from '../../utils/theme';
import GlobalPrimaryActions from './GlobalPrimaryActions';
import GlobalSecondaryActions from './GlobalSecondaryActions';
import DefaultLinkComponent from './DefaultLinkComponent';
import GlobalNavigationInner from '../styled/GlobalNavigationInner';
import GlobalNavigationPrimaryContainer from '../styled/GlobalNavigationPrimaryContainer';
import GlobalNavigationSecondaryContainer from '../styled/GlobalNavigationSecondaryContainer';

export default class GlobalNavigation extends PureComponent {
  static propTypes = {
    appearance: PropTypes.oneOf([appearanceEnum.global, appearanceEnum.settings]),
    createIcon: PropTypes.node,
    linkComponent: PropTypes.func,
    primaryIcon: PropTypes.node,
    primaryItemHref: PropTypes.string,
    secondaryActions: PropTypes.arrayOf(PropTypes.node),
    searchIcon: PropTypes.node,
    onSearchActivate: PropTypes.func,
    onCreateActivate: PropTypes.func,
  };
  static defaultProps = {
    appearance: appearanceEnum.global,
    accountItem: null,
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
      </ThemeProvider>
    );
  }
}

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { WithRootTheme } from '../../theme/util';
import * as presets from '../../theme/presets';
import GlobalPrimaryActions from './GlobalPrimaryActions';
import GlobalSecondaryActions from './GlobalSecondaryActions';
import DefaultLinkComponent from './DefaultLinkComponent';
import GlobalNavigationInner from '../styled/GlobalNavigationInner';
import GlobalNavigationPrimaryContainer from '../styled/GlobalNavigationPrimaryContainer';
import GlobalNavigationSecondaryContainer from '../styled/GlobalNavigationSecondaryContainer';

export default class GlobalNavigation extends PureComponent {
  static propTypes = {
    createIcon: PropTypes.node,
    linkComponent: PropTypes.func,
    primaryIcon: PropTypes.node,
    primaryItemHref: PropTypes.string,
    theme: PropTypes.obj,
    secondaryActions: PropTypes.arrayOf(PropTypes.node),
    searchIcon: PropTypes.node,
    onSearchActivate: PropTypes.func,
    onCreateActivate: PropTypes.func,
  };
  static defaultProps = {
    accountItem: null,
    linkComponent: DefaultLinkComponent,
    primaryIcon: null,
    theme: presets.global,
    secondaryActions: [],
  };

  render() {
    const {
      createIcon,
      linkComponent,
      onCreateActivate,
      onSearchActivate,
      primaryIcon,
      primaryItemHref,
      theme,
      searchIcon,
      secondaryActions,
    } = this.props;
    return (
      <WithRootTheme
        provided={theme}
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
      </WithRootTheme>
    );
  }
}

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
    appearance: PropTypes.oneOf(Object.keys(presets)),
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
    appearance: 'global',
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
      <WithRootTheme
        provided={presets[appearance]}
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

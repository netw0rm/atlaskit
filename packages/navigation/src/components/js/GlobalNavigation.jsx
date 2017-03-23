import React, { PureComponent, PropTypes } from 'react';
import invariant from 'invariant';
import classNames from 'classnames';
import styles from 'style!../less/GlobalNavigation.less';
import { globalOpenWidth } from '../../shared-variables';
import Spacer from './Spacer';
import GlobalPrimaryActions from './GlobalPrimaryActions';
import GlobalSecondaryActions from './GlobalSecondaryActions';
import DefaultLinkComponent from './DefaultLinkComponent';

const maxSecondaryItems = 4;

const checkIfTooManySecondaryActions = (actions = []) =>
  invariant(actions.length <= maxSecondaryItems,
    `cannot have more than ${maxSecondaryItems} secondary actions`);

export default class GlobalNavigation extends PureComponent {
  static propTypes = {
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
    accountItem: null,
    helpItem: null,
    linkComponent: DefaultLinkComponent,
    primaryIcon: null,
    shouldAnimate: false,
    secondaryActions: [],
  };

  constructor(props, context) {
    super(props, context);
    checkIfTooManySecondaryActions(props.secondaryActions);
  }

  componentWillReceiveProps(nextProps) {
    checkIfTooManySecondaryActions(nextProps.secondaryActions);
  }

  render() {
    const {
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
      <nav
        className={classNames(styles.globalNavigationOuter, {
          [styles.shouldAnimate]: shouldAnimate,
        })}
      >
        <Spacer
          shouldAnimate={shouldAnimate}
          width={globalOpenWidth}
        />
        <div
          className={styles.globalNavigation}
        >
          <div className={styles.primaryContainer}>
            <GlobalPrimaryActions
              createIcon={createIcon}
              linkComponent={linkComponent}
              onCreateActivate={onCreateActivate}
              onSearchActivate={onSearchActivate}
              primaryIcon={primaryIcon}
              primaryItemHref={primaryItemHref}
              searchIcon={searchIcon}
            />
          </div>
          <div className={styles.secondaryContainer}>
            {secondaryActions.length ? <GlobalSecondaryActions
              actions={secondaryActions}
            /> : null}
          </div>
        </div>
      </nav>
    );
  }
}

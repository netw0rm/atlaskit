/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AppBase from './AppBase';
import { withCrossSellProvider } from './CrossSellProvider';
import InitializingScreen from './InitializingScreen';
import { withAnalytics } from './Analytics';
import RequestTrial from '../../request-trial/components/RequestTrial';
import StartTrial from '../../start-trial/components/StartTrial';
import AlreadyStarted from '../../start-trial/components/AlreadyStarted';

const Screens = {
  INITIALIZING: 'INITIALIZING',
  CANNOT_ADD: 'CANNOT_ADD',
  ALREADY_STARTED: 'ALREADY_STARTED',
  REQUEST_TRIAL: 'REQUEST_TRIAL',
  START_TRIAL: 'START_TRIAL',
};

class RequestOrStartTrial extends Component {
  static propTypes = {
    locale: PropTypes.string,
    canCurrentUserAddProduct: PropTypes.func.isRequired,
    //fireAnalyticsEvent: PropTypes.func.isRequired,
  };

  static defaultProps = {
    locale: 'en_US',
  };

  state = {
    screen: Screens.INITIALIZING,
    error: null,
  };

  async componentWillMount() {
    try {
      const alreadyStarted = await this.props.isProductInstalledOrActivating();
      const canAdd = alreadyStarted ? false : await this.props.canCurrentUserAddProduct();

      if (alreadyStarted) {
        this.setState({ screen: Screens.ALREADY_STARTED });
      } else if (canAdd) {
        this.setState({ screen: Screens.START_TRIAL });
      } else {
        this.setState({ screen: Screens.REQUEST_TRIAL });
      }
    } catch (e) {
      // TODO: Handle this appropriately.
      console.error(e);
    }
  }

  render() {
    return (
      <AppBase locale={this.props.locale}>
        {(() => {
          switch (this.state.screen) {
            case Screens.INITIALIZING: {
              return <InitializingScreen />;
            }
            case Screens.START_TRIAL: {
              return <StartTrial />;
            }
            case Screens.ALREADY_STARTED: {
              return <AlreadyStarted />;
            }
            case Screens.REQUEST_TRIAL: {
              return <RequestTrial />;
            }
            default: {
              return <InitializingScreen />;
            }
          }
        })()}
      </AppBase>
    );
  }
}

export default withCrossSellProvider(
  withAnalytics(RequestOrStartTrial),
  ({ crossSell: { canCurrentUserAddProduct, isProductInstalledOrActivating } }) => ({
    canCurrentUserAddProduct,
    isProductInstalledOrActivating,
  })
);

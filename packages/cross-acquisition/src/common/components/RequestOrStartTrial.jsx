/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AppBase from './AppBase';
import { withCrossSellProvider } from './CrossSellProvider';
import InitializingScreen from './InitializingScreen';
import { withAnalytics } from './Analytics';
import RequestTrial from '../../request-trial/components/RequestTrial';
import StartTrial from '../../start-trial/components/StartTrial';

const Screens = {
  INITIALIZING: 'INITIALIZING',
  CANNOT_ADD: 'CANNOT_ADD',
  ALREADY_ADDED: 'ALREADY_ADDED',
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

  componentDidMount() {
    this.props
      .canCurrentUserAddProduct()
      .then((canAdd) => {
        if (canAdd) {
          this.setState({ screen: Screens.START_TRIAL });
        } else {
          this.setState({ screen: Screens.REQUEST_TRIAL });
        }
      })
      .catch((e) => {
        // TODO: Handle this appropriately.
        console.error(e);
      });
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
  ({ crossSell: { canCurrentUserAddProduct } }) => ({
    canCurrentUserAddProduct,
  })
);

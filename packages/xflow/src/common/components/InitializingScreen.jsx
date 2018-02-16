import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ModalDialog from '@atlaskit/modal-dialog';
import Spinner from '@atlaskit/spinner';
import { withAnalytics } from '@atlaskit/analytics';

import { withXFlowProvider } from './XFlowProvider';
import InitializingSpinnerDiv from '../styled/InitializingSpinnerDiv';
import InitializingScreenHeader from '../styled/InitializingScreenHeader';
import InitializingScreenFooter from '../styled/InitializingScreenFooter';

class InitializingScreen extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    productLogo: PropTypes.element,

    firePrivateAnalyticsEvent: PropTypes.func.isRequired,
  };

  defaultProps = {
    isOpen: true,
  };

  componentDidMount() {
    const { firePrivateAnalyticsEvent } = this.props;
    firePrivateAnalyticsEvent('xflow.initializing-screen.displayed');
  }

  render() {
    const { productLogo, isOpen } = this.props;
    return isOpen ? (
      <ModalDialog
        width="small"
        header={() => <InitializingScreenHeader>{productLogo}</InitializingScreenHeader>}
        footer={() => <InitializingScreenFooter />}
      >
        <InitializingSpinnerDiv>
          <Spinner size="large" isCompleting={false} />
        </InitializingSpinnerDiv>
      </ModalDialog>
    ) : null;
  }
}

export const InitializingScreenBase = withAnalytics(InitializingScreen);

export default withXFlowProvider(InitializingScreenBase, ({ xFlow }) => ({
  productLogo: xFlow.config.productLogo,
}));

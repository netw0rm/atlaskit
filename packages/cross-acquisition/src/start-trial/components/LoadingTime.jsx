import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '@atlaskit/button';
import CrossCircleIcon from '@atlaskit/icon/glyph/cross-circle';
import CheckCircleIcon from '@atlaskit/icon/glyph/check-circle';
import { FormattedMessage } from 'react-intl';

import ModalDialog from '@atlaskit/modal-dialog';
import ProgressBar from './ProgressBar';
import StartTrialDialog from '../styled/StartTrialDialog';
import StartTrialHeader from '../styled/StartTrialHeader';
import StartTrialFooter from '../styled/StartTrialFooter';
import ProgressBarWithIconDiv from '../styled/ProgressBarWithIconDiv';
import ProgressBarDiv from '../styled/ProgressBarDiv';
import CenterProgressBarDiv from '../styled/CenterProgressBarDiv';
import LoadingTimeTextDiv from '../styled/LoadingTimeTextDiv';
import WhereToFindConfluenceDiv from '../styled/WhereToFindConfluenceDiv';
import WhereToFindConfluenceSVGDiv from '../styled/WhereToFindConfluenceSVGDiv';
import WhereToFindConfluenceText from '../styled/WhereToFindConfluenceText';

import { withCrossSellProvider } from '../../common/components/CrossSellProvider';
import i18nId from '../../common/i18nId';

const i18n = i18nId('loading-product-trial');

export class LoadingTimeBase extends Component {
  static propTypes = {
    onComplete: PropTypes.func.isRequired,
    progress: PropTypes.number,
    productLogo: PropTypes.node,
    goToProduct: PropTypes.func,
    closeLoadingDialog: PropTypes.func,
    confluenceTimedOut: PropTypes.bool,
  };

  static defaultProps = {
    goToProduct: () => Promise.resolve(),
    closeLoadingDialog: () => Promise.resolve(),
    confluenceTimedOut: false,
  };

  state = {
    // TODO set according to the provisioning status and how long it has been polling
    confluenceTimedOut: this.props.confluenceTimedOut,
  };

  handleGoToProductClick = () => {
    const { goToProduct, onComplete } = this.props;
    Promise.resolve(goToProduct()).then(onComplete);
  };

  handleCloseClick = () => {
    const { closeLoadingDialog, onComplete } = this.props;
    Promise.resolve(closeLoadingDialog()).then(onComplete);
  };

  showHeading = () => {
    if (this.state.confluenceTimedOut) {
      return <FormattedMessage id={i18n`error-heading`} />;
    } else if (this.props.progress === 100) {
      return <FormattedMessage id={i18n`complete-heading`} />;
    }
    return <FormattedMessage id={i18n`loading-heading`} />;
  };

  showProgressBar = () => {
    if (this.props.progress === 100) {
      return (
        <ProgressBarWithIconDiv>
          <CenterProgressBarDiv>
            <ProgressBar progress={this.props.progress} />
          </CenterProgressBarDiv>
          <CheckCircleIcon label="errorIcon" primaryColor="#35b37e" />
        </ProgressBarWithIconDiv>
      );
    } else if (this.state.confluenceTimedOut) {
      return (
        <ProgressBarWithIconDiv>
          <CenterProgressBarDiv>
            <ProgressBar progress={this.props.progress} />
          </CenterProgressBarDiv>
          <CrossCircleIcon label="errorIcon" primaryColor="#ff7451" />
        </ProgressBarWithIconDiv>
      );
    }
    return (
      <ProgressBarDiv>
        <ProgressBar progress={this.props.progress} />
      </ProgressBarDiv>
    );
  };

  render() {
    const { productLogo, progress } = this.props;

    const isReady = progress === 100;

    return (
      <ModalDialog
        isOpen
        width="small"
        header={productLogo}
        footer={
          <StartTrialFooter>
            <Button
              isDisabled={!isReady}
              onClick={this.handleGoToProductClick}
              appearance="primary"
            >
              <FormattedMessage id={i18n`go-to-product-button`} />
            </Button>
            <Button onClick={this.handleCloseClick} appearance="subtle-link">
              <FormattedMessage id={i18n`close-button`} />
            </Button>
          </StartTrialFooter>
        }
      >
        <StartTrialDialog>
          {this.showProgressBar()}
          <StartTrialHeader>
            {this.showHeading()}
          </StartTrialHeader>
          <LoadingTimeTextDiv>
            <WhereToFindConfluenceSVGDiv>
              <img
                // TODO replace with proper way of serving SVGs for AtlasKit
                src="https://aes-artifacts--cdn.us-east-1.prod.public.atl-paas.net/hashed/lmp9uitENIE2uALwP2L-0RptjRxiiDMe0atv8gRXyCs/loading_img.svg"
                alt="app-switcher"
              />
            </WhereToFindConfluenceSVGDiv>
            <WhereToFindConfluenceDiv>
              <h5>
                <FormattedMessage id={i18n`info-heading`} />
              </h5>
              <WhereToFindConfluenceText>
                <FormattedMessage id={i18n`info-text`} />
              </WhereToFindConfluenceText>
            </WhereToFindConfluenceDiv>
          </LoadingTimeTextDiv>
        </StartTrialDialog>
      </ModalDialog>
    );
  }
}

export default withCrossSellProvider(
  LoadingTimeBase,
  ({
    crossSell: { config: { productLogo }, state: { progress }, goToProduct, closeLoadingDialog },
  }) => ({
    productLogo,
    progress,
    goToProduct,
    closeLoadingDialog,
  })
);

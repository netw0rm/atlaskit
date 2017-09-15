import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Button from '@atlaskit/button';
import ModalDialog from '@atlaskit/modal-dialog';
import Spinner from '@atlaskit/spinner';
import { AkFieldRadioGroup } from '@atlaskit/field-radio-group';
import { withAnalytics } from '@atlaskit/analytics';

import OptOutHeader from '../styled/OptOutHeader';
import OptOutFooter from '../styled/OptOutFooter';
import CustomLabel from '../styled/CustomLabel';
import SpinnerDiv from '../../common/styled/SpinnerDiv';

import { withXFlowProvider } from '../../common/components/XFlowProvider';

class AdminSettings extends Component {
  static propTypes = {
    heading: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    defaultSelectedRadio: PropTypes.string.isRequired,
    optionItems: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string,
        note: PropTypes.string,
      })
    ).isRequired,
    children: PropTypes.node,
    spinnerActive: PropTypes.bool,
    buttonsDisabled: PropTypes.bool,
    firePrivateAnalyticsEvent: PropTypes.func,
    optOutRequestTrialFeature: PropTypes.func,
    cancelOptOut: PropTypes.func,
  };

  static defaultProps = {
    heading: 'Confluence trial requests',
    spinnerActive: false,
    buttonsDisabled: false,
    optOutRequestTrialFeature: () => {},
    cancelOptOut: () => {},
  };

  state = {
    isOpen: true,
    spinnerActive: this.props.spinnerActive,
    buttonsDisabled: this.props.buttonsDisabled,
    selectedRadio: this.props.defaultSelectedRadio,
  };

  componentDidMount() {
    const { firePrivateAnalyticsEvent } = this.props;
    firePrivateAnalyticsEvent('xflow.opt-out.displayed');
  }

  handleContinueClick = async () => {
    const { firePrivateAnalyticsEvent, optOutRequestTrialFeature } = this.props;
    const { selectedRadio } = this.state;
    firePrivateAnalyticsEvent('xflow.opt-out.continue-button.clicked', {
      selectedRadio,
    });
    this.setState({
      spinnerActive: true,
      buttonsDisabled: true,
    });
    try {
      await optOutRequestTrialFeature(selectedRadio);
      this.setState({
        isOpen: false,
      });
    } catch (e) {
      this.setState({
        spinnerActive: false,
        buttonsDisabled: false,
      });
    }
  };

  handleCancelClick = async () => {
    const { firePrivateAnalyticsEvent, cancelOptOut } = this.props;
    firePrivateAnalyticsEvent('xflow.opt-out.cancel-button.clicked');
    this.setState({
      isOpen: false,
    });
    await cancelOptOut();
  };

  handleRadioChange = evt => {
    const { firePrivateAnalyticsEvent } = this.props;
    firePrivateAnalyticsEvent('xflow.opt-out.radio-option.changed', {
      selectedRadio: evt.target.value,
    });
    this.setState({
      selectedRadio: evt.target.value,
    });
  };

  render() {
    const { heading, message, optionItems } = this.props;

    return (
      <ModalDialog
        isOpen={this.state.isOpen}
        width="small"
        header={<OptOutHeader>{heading}</OptOutHeader>}
        footer={
          <OptOutFooter>
            <SpinnerDiv>
              <Spinner isCompleting={!this.state.spinnerActive} />
            </SpinnerDiv>
            <Button
              id="xflow-opt-out-continue-button"
              onClick={this.handleContinueClick}
              appearance="primary"
              isDisabled={this.state.buttonsDisabled}
            >
              <FormattedMessage
                id="xflow-generic.opt-out.continue-button"
                defaultMessage="Continue"
              />
            </Button>
            <Button
              onClick={this.handleCancelClick}
              appearance="subtle-link"
              isDisabled={this.state.buttonsDisabled}
            >
              <FormattedMessage id="xflow-generic.opt-out.cancel-button" defaultMessage="Cancel" />
            </Button>
          </OptOutFooter>
        }
      >
        <AkFieldRadioGroup
          label={message}
          onRadioChange={this.handleRadioChange}
          items={optionItems.map(({ value, label, note }) => ({
            value,
            label: note ? (
              <CustomLabel>
                {label}
                <br />
                <small>{note}</small>
              </CustomLabel>
            ) : (
              label
            ),
            isSelected: this.state.selectedRadio === value,
          }))}
        />
        {this.props.children}
      </ModalDialog>
    );
  }
}

export const AdminSettingsBase = withAnalytics(AdminSettings);

export default withXFlowProvider(
  AdminSettingsBase,
  ({
    xFlow: {
      config: {
        productLogo,
        optOut: { optOutHeading, optOutMessage, optOutOptionItems, optOutDefaultSelectedRadio },
      },
      status,
      optOutRequestTrialFeature,
      cancelOptOut,
    },
  }) => ({
    productLogo,
    optOutRequestTrialFeature,
    cancelOptOut,
    status,
    heading: optOutHeading,
    message: optOutMessage,
    optionItems: optOutOptionItems,
    defaultSelectedRadio: optOutDefaultSelectedRadio,
  })
);

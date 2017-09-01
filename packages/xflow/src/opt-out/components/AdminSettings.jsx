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
import SpinnerDiv from '../../common/styled/SpinnerDiv';

import { withXFlowProvider } from '../../common/components/XFlowProvider';

class AdminSettings extends Component {
  static propTypes = {
    header: PropTypes.string.isRequired,
    children: PropTypes.node,
    spinnerActive: PropTypes.bool,
    continueButtonDisabled: PropTypes.bool,
    firePrivateAnalyticsEvent: PropTypes.func,
    defaultSelectedRadio: PropTypes.string,
  };

  static defaultProps = {
    header: 'Confluence trial requests',
    spinnerActive: false,
    continueButtonDisabled: false,
    defaultSelectedRadio: 'personal-opt-out',
  };

  state = {
    isOpen: true,
    spinnerActive: this.props.spinnerActive,
    continueButtonDisabled: this.props.continueButtonDisabled,
    selectedRadio: this.props.defaultSelectedRadio,
  };

  componentDidMount() {
    const { firePrivateAnalyticsEvent } = this.props;
    firePrivateAnalyticsEvent('xflow.opt-out.displayed');
  }

  handleContinueClick = () => {
    const { firePrivateAnalyticsEvent } = this.props;
    firePrivateAnalyticsEvent('xflow.opt-out.continue-button.clicked');
    this.setState({
      spinnerActive: true,
      continueButtonDisabled: true,
    });
  };

  handleCancelClick = () => {
    const { firePrivateAnalyticsEvent } = this.props;
    firePrivateAnalyticsEvent('xflow.opt-out.cancel-button.clicked');
    this.setState({
      isOpen: false,
    });
  };

  handleRadioChange = evt => {
    const { firePrivateAnalyticsEvent } = this.props;
    firePrivateAnalyticsEvent('xflow.opt-out.radio-option.changed', {
      selectedRadio: evt.target.value,
    });
    this.setState({
      selectedRadio: evt.target.value,
    });
  }

  render() {
    return (
      <ModalDialog
        isOpen={this.state.isOpen}
        width="small"
        header={
          <OptOutHeader>
            {this.props.header}
          </OptOutHeader>
        }
        footer={
          <OptOutFooter>
            <SpinnerDiv>
              <Spinner isCompleting={!this.state.spinnerActive} />
            </SpinnerDiv>
            <Button
              id="xflow-opt-out-continue-button"
              onClick={this.handleContinueClick}
              appearance="primary"
              isDisabled={this.state.continueButtonDisabled}
            >
              <FormattedMessage
                id="xflow-generic.opt-out.continue-button"
                defaultMessage="Continue"
              />
            </Button>
            <Button onClick={this.handleCancelClick} appearance="subtle-link">
              <FormattedMessage
                id="xflow-generic.opt-out.cancel-button"
                defaultMessage="Cancel"
              />
            </Button>
          </OptOutFooter>
        }
      >
        <AkFieldRadioGroup
          label="Change your notifications, or stop requests completely."
          onRadioChange={this.handleRadioChange}
          items={[
            { value: 'personal-opt-out',
              label: 'I don\'t want to get trial requests from users',
              isSelected: this.state.selectedRadio === 'personal-opt-out' },
            { value: 'blanket-opt-out',
              label: 'Turn off trial requesting for all users',
              isSelected: this.state.selectedRadio === 'blanket-opt-out' },
          ]}
        />
        {this.props.children}
      </ModalDialog>
    );
  }
}

export const AdminSettingsBase = withAnalytics(AdminSettings);

export default withXFlowProvider(
  AdminSettingsBase
);

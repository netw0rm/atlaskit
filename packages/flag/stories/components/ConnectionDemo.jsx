// @flow
import React, { PureComponent } from 'react';
import Flag, { FlagGroup } from '@atlaskit/flag';
import Spinner from '@atlaskit/spinner';
import { colors } from '@atlaskit/theme';
import FieldRadioGroup from '@atlaskit/field-radio-group';
import SuccessIcon from '@atlaskit/icon/glyph/check-circle';
import ErrorIcon from '@atlaskit/icon/glyph/error';
import WarningIcon from '@atlaskit/icon/glyph/warning';
import styled from 'styled-components';
import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';
import { AppearanceArray } from '../../src/types';

const boldAppearanceNames = AppearanceArray.filter(val => val !== 'normal');
const boldAppearanceItems = boldAppearanceNames.map(val => (
  { name: val, value: val, label: val, defaultSelected: val === boldAppearanceNames[0] }
));

// We wrap the Spinner in a div the same height as a standard Icon, to avoid the flag height
// jumping when Flag.appearance is changed.
const SpinnerContainer = styled.div`
  height: ${akGridSizeUnitless * 3}px;
  width: ${akGridSizeUnitless * 3}px;
`;

export default class ConnectionDemo extends PureComponent {
  createdFlagCount = 0; // eslint-disable-line react/sort-comp
  state = {
    appearance: boldAppearanceNames[0],
  };

  getTitle = () => {
    switch (this.state.appearance) {
      case 'error':
        return 'We are having issues';
      case 'info':
        return 'Connecting...';
      case 'success':
        return 'Connected';
      case 'warning':
        return 'Trying again...';
      default:
        return undefined;
    }
  }

  getIcon = () => {
    switch (this.state.appearance) {
      case 'error':
        return <ErrorIcon label="" secondaryColor={colors.R400} />;
      case 'info':
        return (
          <SpinnerContainer>
            <Spinner size="small" invertColor />
          </SpinnerContainer>
        );
      case 'success':
        return <SuccessIcon label="" secondaryColor={colors.G400} />;
      case 'warning':
        return <WarningIcon label="" secondaryColor={colors.Y200} />;
      default:
        return <SuccessIcon label="" secondaryColor={colors.G400} />;
    }
  }

  getDescription = () => {
    if (this.state.appearance === 'error') {
      return 'We cannot log in at the moment, please try again soon.';
    }
    return undefined;
  }

  getActions = () => {
    if (this.state.appearance === 'warning') {
      return [{ content: 'Good luck!' }];
    }
    return undefined;
  }

  render() {
    return (
      <div>
        <FlagGroup>
          <Flag
            appearance={this.state.appearance}
            icon={this.getIcon()}
            title={this.getTitle()}
            description={this.getDescription()}
            actions={this.getActions()}
          />
        </FlagGroup>
        <p>
          This story shows the transition between various flag appearances.
        </p>
        <FieldRadioGroup
          items={boldAppearanceItems}
          label="Pick your new flag appearance:"
          onRadioChange={(e) => {
            this.setState({ appearance: e.target.value });
          }}
        />
      </div>
    );
  }
}

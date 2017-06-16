import React, { Component } from 'react';
import styled from 'styled-components';
import { ConfluenceLogo } from '@atlaskit/logo';
import StartTrial from './StartTrial';

const StartTrialDialog = styled.div`
  margin-left: 8px;
`;

const StartTrialHeader = styled.h3`
  margin-top: 0px;
`;

// TODO: Determine whether to use composition of inheritance.
export default class ConfluenceStartTrial extends Component {
  render() {
    return (
      <StartTrial productLogo={<ConfluenceLogo />}>
        <StartTrialDialog>
          <StartTrialHeader>Start your 30 day trial</StartTrialHeader>
          <p>Once your trial finishes, billing will start.
            <br />
            Easily cancel at anytime in <b>Manage Application</b>.
            <br />
            We will email your billing contact 3 days in advance.</p>
        </StartTrialDialog>
      </StartTrial>
    );
  }
}

import React, { Component } from 'react';
import FieldRadioGroup from '@atlaskit/field-radio-group';
import styled from 'styled-components';
import OptOut from './OptOut';

const OptOutInfoText = styled.p`
  color: #6c798f;
  margin-bottom: 12px;
  margin-left: 30px;
  font-size: 12px;
`;

// TODO: Determine whether to use composition of inheritance.
export default class ConfluenceOptOut extends Component {
  handleRadioChange = (evt) => {
    console.log(`The ${`${evt.target.value}`} radio got selected!`);
  }

  render() {
    return (
      <OptOut header="Confluence request settings">
        <FieldRadioGroup
          onRadioChange={this.handleRadioChange}
          items={[{
            name: 'option',
            value: 'disableRequests',
            key: 'disableRequests',
            label: ['Don\'t receive Confluence request',
              <OptOutInfoText>other admins of your site will still be notified</OptOutInfoText>],
          },
          { name: 'option', value: 'preventRequests', key: 'preventRequests', label: 'Prevent users from requesting Confluence' }]}
          label="Which one?"
        />
      </OptOut>
    );
  }
}

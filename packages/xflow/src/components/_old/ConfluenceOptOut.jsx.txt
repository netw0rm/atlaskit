import React, { Component } from 'react';
import FieldRadioGroup from '@atlaskit/field-radio-group';
import OptOut from './OptOut';
import { OptOutInfoText } from '../styled/OptOut';

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
            defaultSelected: true,
          },
          { name: 'option', value: 'siteAdmins', key: 'siteAdmins', label: 'Prevent users from requesting Confluence' }]}
          label="Which one?"
        />
      </OptOut>
    );
  }
}

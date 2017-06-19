import React, { Component } from 'react';
import OptOutSoloAdmin from './OptOutSoloAdmin';

export default class ConfluenceOptOutSoloAdmin extends Component {
  handleRadioChange = (evt) => {
    console.log(`The ${`${evt.target.value}`} radio got selected!`);
  }

  render() {
    return (
      <OptOutSoloAdmin header="Confluence request">
        <p>Do you want to prevent users form requesting a Confluence trial on your site?</p>
      </OptOutSoloAdmin>
    );
  }
}

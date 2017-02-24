import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { Chrome, Code } from '@atlaskit/util-readme';

import { name } from '../package.json';

/* eslint-disable quotes, max-len,  */
const html = `<form>
  <h2>Settings</h2>
  <fieldset class="ak-field-group">
    <legend><span>Account options</span></legend>
    <div class="ak-field-checkbox">
      <input type="checkbox" name="option1" id="option1" value="option1">
      <label for="option1">Keep me logged in</label>
    </div>
    <div class="ak-field-checkbox">
      <input type="checkbox" name="option2" id="option2" value="option2" checked>
      <label for="option2">Check for updates automatically</label>
    </div>
    <div class="ak-field-checkbox">
      <input type="checkbox" name="option3" id="option3" value="option3" checked disabled>
      <label for="option3">Enable two-factor authentication</label>
    </div>
  </fieldset>
  <div class="ak-field-group">
    <button class="ak-button ak-button__appearance-primary">Save</button>
  </div>
</form>`;

const jsx = (<form onSubmit={e => e.preventDefault()}>
  <h2>Settings</h2>
  <fieldset className="ak-field-group">
    <legend><span>Account options</span></legend>
    <div className="ak-field-checkbox">
      <input type="checkbox" name="option1" id="option1" value="option1" />
      <label htmlFor="option1">Keep me logged in</label>
    </div>
    <div className="ak-field-checkbox">
      <input type="checkbox" name="option2" id="option2" value="option2" defaultChecked />
      <label htmlFor="option2">Check for updates automatically</label>
    </div>
    <div className="ak-field-checkbox">
      <input type="checkbox" name="option3" id="option3" value="option3" defaultChecked disabled />
      <label htmlFor="option3">Enable two-factor authentication</label>
    </div>
  </fieldset>
  <div className="ak-field-group">
    <button className="ak-button ak-button__appearance-primary">Save</button>
  </div>
</form>);

storiesOf(name, module)
  .add('Forms — checkboxes', () => (
    <Chrome title="Checkboxes">
      <Code code={html} language="html">
        {jsx}
      </Code>
    </Chrome>
  ));

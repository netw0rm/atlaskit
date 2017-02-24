import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { Code } from '@atlaskit/util-readme';

import { name } from '../package.json';

/* eslint-disable quotes, max-len,  */

const html = `<form>
  <h1>Example form to show field widths</h1>
  <div class="ak-field-group">
    <label for="username">Username</label>
    <input type="text" class="ak-field-text ak-field__width-medium" id="username" name="username" placeholder="eg. you@yourcompany.com" required>
  </div>
  <div class="ak-field-group">
    <label for="password">Password</label>
    <input type="password" class="ak-field-password ak-field__width-medium" id="password" name="password" required>
  </div>
  <div class="ak-field-group">
    <label for="description">Description</label>
    <textarea class="ak-field-textarea ak-field__width-xlarge" rows="3" id="description" name="description" required>
  </div>
  <div class="ak-field-group">
    <label for="fav-movie">Favourite movie</label>
    <select class="ak-field-select ak-field__width-large" id="fav-movie" name="fav-movie" required>
      <option value="">Choose a favourite</option>
      <option value="sw">Star Wars</option>
      <option value="hp">Harry Potter and the Half-Blood Prince</option>
      <option value="lotr">The Lord of the Rings</option>
    </select>
  </div>
  <div class="ak-field-group">
    <label for="email">Email</label>
    <input type="email" class="ak-field-email ak-field__width-medium" id="email" name="email" required>
  </div>
  <div class="ak-field-group">
    <label for="url">Url</label>
    <input type="url" class="ak-field-url ak-field__width-medium" id="url" name="url" required>
  </div>
  <div class="ak-field-group">
    <label for="tel">Tel</label>
    <input type="tel" class="ak-field-tel" id="tel ak-field__width-small" name="tel" required>
  </div>
  <div class="ak-field-group">
    <label for="number">Number</label>
    <input type="number" class="ak-field-number ak-field__width-xsmall" maxlength="1" id="number" name="number" placeholder="1-5" min="1" max="5" required>
  </div>
  <div class="ak-field-group">
    <label for="date">Date</label>
    <input type="date" class="ak-field-date ak-field__width-small" id="date" name="date" required>
  </div>
  <div class="ak-field-group">
    <label for="month">Month</label>
    <input type="month" class="ak-field-month ak-field__width-small" id="month" name="month" required>
  </div>
  <div class="ak-field-group">
    <button class="ak-button ak-button__appearance-primary">Submit</button>
  </div>
</form>`;
const jsx = (<form onSubmit={e => e.preventDefault()}>
  <h1>Example form to show field widths</h1>
  <div className="ak-field-group">
    <label htmlFor="username">Username</label>
    <input type="text" className="ak-field-text ak-field__width-medium" id="username" name="username" placeholder="eg. you@yourcompany.com" required />
  </div>
  <div className="ak-field-group">
    <label htmlFor="password">Password</label>
    <input type="password" className="ak-field-password ak-field__width-medium" id="password" name="password" required />
  </div>
  <div className="ak-field-group">
    <label htmlFor="description">Description</label>
    <textarea className="ak-field-textarea ak-field__width-xlarge" rows="3" id="description" name="description" required />
  </div>
  <div className="ak-field-group">
    <label htmlFor="fav-movie">Favourite movie</label>
    <select className="ak-field-select ak-field__width-large" id="fav-movie" name="fav-movie" required>
      <option value="">Choose a favourite</option>
      <option value="sw">Star Wars</option>
      <option value="hp">Harry Potter and the Half-Blood Prince</option>
      <option value="lotr">The Lord of the Rings</option>
    </select>
  </div>
  <div className="ak-field-group">
    <label htmlFor="email">Email</label>
    <input type="email" className="ak-field-email ak-field__width-medium" id="email" name="email" required />
  </div>
  <div className="ak-field-group">
    <label htmlFor="url">Url</label>
    <input type="url" className="ak-field-url ak-field__width-medium" id="url" name="url" required />
  </div>
  <div className="ak-field-group">
    <label htmlFor="tel">Tel</label>
    <input type="tel" className="ak-field-tel" id="tel ak-field__width-small" name="tel" required />
  </div>
  <div className="ak-field-group">
    <label htmlFor="number">Number</label>
    <input type="number" className="ak-field-number ak-field__width-xsmall" maxlength="1" id="number" name="number" placeholder="1-5" min="1" max="5" required />
  </div>
  <div className="ak-field-group">
    <label htmlFor="date">Date</label>
    <input type="date" className="ak-field-date ak-field__width-small" id="date" name="date" required />
  </div>
  <div className="ak-field-group">
    <label htmlFor="month">Month</label>
    <input type="month" className="ak-field-month ak-field__width-small" id="month" name="month" required />
  </div>
  <div className="ak-field-group">
    <button className="ak-button ak-button__appearance-primary">Submit</button>
  </div>
</form>);

storiesOf(name, module)
  .add('Forms — field widths', () => (
    <div>
      <h1>Example form</h1>
      <Code code={html}>
        {jsx}
      </Code>
    </div>
  ));

import { storiesOf } from '@kadira/storybook';
import React from 'react';

import { name } from '../package.json';
import { InputFieldBase } from './shared-components';

/* eslint-disable jsx-a11y/label-has-for */

const formStyle = {
  padding: '20px',
  backgroundColor: 'white',
  width: '500px',
};

storiesOf(name, module)
  .add('fieldbase with cancellable events', () => {
    // we'll use this reference so that we can remove the event handler when required
    const checkboxWrapperStyles = {
      paddingTop: '20px',
    };
    const displayBlockStyle = {
      display: 'block',
    };
    const focusChangeHandler = (e) => {
      const checkBox = document.body.querySelector('#preventChange');
      if (checkBox.checked) {
        e.preventDefault();
      }
    };
    return (
      <div>
        <form action="" style={formStyle}>
          <h2>Cancelling events</h2>
          <div>
            This story is to show how we can use e.preventDefault() can be used on the
            beforeFocusedChange event
          </div>
          <div style={checkboxWrapperStyles}>
            <label htmlFor="preventChange" style={displayBlockStyle}>
              <input type="checkbox" id="preventChange" />
              <span>Prevent beforeFocusedChange event</span>
            </label>
          </div>
          <InputFieldBase label="A field-base" onBeforeFocusedChange={focusChangeHandler} />
        </form>
      </div>
    );
  });
/* eslint-enable jsx-a11y/label-has-for */

import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import FieldBaseWC, { events } from '../src';
import React from 'react';
import { name } from '../package.json';

const FieldBase = reactify(FieldBaseWC);

const formStyle = {
  padding: '20px',
  backgroundColor: 'white',
  width: '500px',
};

storiesOf(name, module)
  .add('fieldbase with cancellable events', () => {
    // we'll use this reference so that we can remove the event handler when required
    let storyBodyRef;
    const checkboxWrapperStyles = {
      paddingTop: '20px',
    };
    const displayBlockStyle = {
      display: 'block',
    };
    const isChecked = inputId => (document.body.querySelector(`#${inputId}`).checked);
    const exitViewingViewHandler = (e) => {
      if (isChecked('viewSwitch')) {
        e.preventDefault();
      }
    };
    const exitEditingViewHandler = (e) => {
      if (e.detail.cancelButtonPressed) {
        if (isChecked('editCancel')) {
          e.preventDefault();
        }
      } else {
        if (isChecked('editConfirm')) {
          e.preventDefault();
        }
      }
    };
    const bindEventHandler = storyBody => {
      if (storyBody) {
        storyBodyRef = storyBody;
        storyBody.addEventListener(events.exitViewingView, exitViewingViewHandler);
        storyBody.addEventListener(events.exitEditingView, exitEditingViewHandler);
      } else {
        if (storyBodyRef) {
          storyBodyRef.removeEventListener(events.exitViewingView, exitViewingViewHandler);
          storyBodyRef.removeEventListener(events.exitEditingView, exitEditingViewHandler);
        }
      }
    };
    return (
      <div ref={ref => bindEventHandler(ref)}>
        <form action="" style={formStyle}>
          <h2>Cancelling events</h2>
          <div>
            This story is to show how we can use e.preventDefault() to cancel the view switching
            events from changing views
          </div>
          <div style={checkboxWrapperStyles}>
            <label style={displayBlockStyle}>
              <input type="checkbox" id="viewSwitch" />
              <span>Disable viewmode switch</span>
            </label>
            <label style={displayBlockStyle}>
              <input type="checkbox" id="editCancel" />
              <span>Disable editmode cancel</span>
            </label>
            <label style={displayBlockStyle}>
              <input type="checkbox" id="editConfirm" />
              <span>Disable editmode confirm</span>
            </label>
          </div>
          <FieldBase label="Label for bold FieldBase">
            <div is slot="editmode">I'm in editing mode</div>
            <div is slot="viewmode"><b>I'm in view mode</b></div>
          </FieldBase>
        </form>
      </div>
    );
  });

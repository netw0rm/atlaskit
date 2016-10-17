import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import FieldBaseWC, { events } from '../src';
import React from 'react';
import { name } from '../package.json';

const FieldBase = reactify(FieldBaseWC);

const formStyle = (width = 300) => ({
  padding: '20px',
  backgroundColor: 'white',
  width: `${width}px`,
});

const story = () => {
  // we'll use this reference so that we can remove the event handler when required
  let storyBodyRef;
  const checkboxWrapperStyles = {
    paddingTop: '20px',
  };
  const displayBlockStyle = {
    display: 'block',
  };
  const isChecked = inputId => (document.body.querySelector(`#${inputId}`).checked);
  const showEditingViewHandler = (e) => {
    if (isChecked('viewSwitch')) {
      e.preventDefault();
    }
  };
  const showViewingViewHandler = (e) => {
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
      storyBody.addEventListener(events.showEditingView, showEditingViewHandler);
      storyBody.addEventListener(events.showViewingView, showViewingViewHandler);
    } else {
      if (storyBodyRef) {
        storyBodyRef.removeEventListener(events.showEditingView, showEditingViewHandler);
        storyBodyRef.removeEventListener(events.showViewingView, showViewingViewHandler);
      }
    }
  };
  return (
    <div ref={ref => bindEventHandler(ref)}>
      <form action="" style={formStyle(500)}>
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
};

storiesOf(name, module)
  .add('fieldbase with cancellable events', story)
;

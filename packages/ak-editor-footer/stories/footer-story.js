import { storiesOf } from '@kadira/storybook';
import FooterComponent from '../src';
const { React, ReactDOM } = window;
import { vdom } from 'skatejs';
import reactify from 'akutil-react';

const Footer = reactify(FooterComponent, { React, ReactDOM });

storiesOf('ak-editor-footer', module)
  .add('Empty', () => (
    <Footer
      onSave={() => console.log('Save')} // eslint-disable-line no-console
      onCancel={() => console.log('Cancel')} // eslint-disable-line no-console
    />
  ));

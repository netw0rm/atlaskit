import { storiesOf, action } from '@kadira/storybook';
import FooterComponent from '../src';
const { React, ReactDOM } = window;
import { vdom } from 'skatejs';
import reactify from 'akutil-react';

const Footer = reactify(FooterComponent, { React, ReactDOM });

const footerAction = action('footer');

storiesOf('ak-editor-footer', module)
  .add('Empty', () => (
    <Footer
      onSave={() => footerAction('Save')}
      onCancel={() => footerAction('Cancel')}
      onClickmention={() => footerAction('mention')}
      onClickimage={() => footerAction('image')}
    />
  ));

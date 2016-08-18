import { storiesOf, action } from '@kadira/storybook';
import FooterComponent from '../src';
const { React, ReactDOM } = window;
import { vdom } from 'skatejs';
import reactify from 'akutil-react';

const Footer = reactify(FooterComponent, { React, ReactDOM });

storiesOf('ak-editor-footer', module)
  .add('Empty', () => (
    <Footer
      onSave={() => action('Save')()}
      onCancel={() => action('Cancel')()}
      onClickmention={() => action('mention')()}
      onClickimage={() => action('image')()}
      onClickemoji={() => action('emoji')()}
      onClicktask={() => action('task')()}
      onClickattachment={() => action('attachment')()}
      onClickdecision={() => action('decision')()}
      onClickdate={() => action('date')()}
    />
  ));

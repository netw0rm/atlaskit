import { storiesOf, action } from '@kadira/storybook';
import React from 'react';
import reactify from 'akutil-react';

import FooterComponent from '../src';

const Footer = reactify(FooterComponent);
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

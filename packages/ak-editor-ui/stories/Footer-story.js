import { storiesOf, action } from '@kadira/storybook';
import React from 'react';
import reactify from 'akutil-react';
import FooterComponent from '../src/Footer';

const Footer = reactify(FooterComponent);

storiesOf('ak-editor-ui Footer', module)
  .add('Empty', () => (
    <Footer
      onSave={action('Save')}
      onCancel={action('Cancel')}
      onClickmention={action('mention')}
      onClickimage={action('image')}
    />
  ));

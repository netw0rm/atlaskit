/* tslint:disable: no-unused-expression */
import {storiesOf} from '@kadira/storybook';
import {injectGlobal} from 'styled-components';
import {
  file,
  link
} from './card-story/index';

injectGlobal`
  body {
    padding: 1em;
  }
`;

storiesOf('Card', {})
  .add('File', file)
  .add('Link', link)
;

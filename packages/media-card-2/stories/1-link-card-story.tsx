/* tslint:disable: no-unused-expression */
import {storiesOf} from '@kadira/storybook';
import {injectGlobal} from 'styled-components';
import {
  generic
} from './link-card-story/index';

injectGlobal`
  body {
    padding: 1em;
  }
`;

storiesOf('LinkCard', {})
  .add('Generic', generic)
;

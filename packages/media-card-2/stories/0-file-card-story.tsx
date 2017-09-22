/* tslint:disable: no-unused-expression */
import {storiesOf} from '@kadira/storybook';
import {injectGlobal} from 'styled-components';
import {
  image
} from './file-card-story/index';

injectGlobal`
  body {
    padding: 1em;
  }
`;

storiesOf('FileCard', {})
  .add('Image', image)
;

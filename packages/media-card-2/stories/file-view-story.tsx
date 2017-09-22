/* tslint:disable: no-unused-expression */
import {storiesOf} from '@kadira/storybook';
import {injectGlobal} from 'styled-components';
import {
  uploading,
  loading,
  loaded,
  error
} from './file-view-story/index';

injectGlobal`
  body {
    padding: 1em;
  }
`;

storiesOf('FileView', {})
  .add('Uploading', uploading)
  .add('Loading', loading)
  .add('Loaded', loaded)
  .add('Errored', error)
;

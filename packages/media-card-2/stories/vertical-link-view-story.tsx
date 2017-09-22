/* tslint:disable: no-unused-expression */
import {storiesOf} from '@kadira/storybook';
import {injectGlobal} from 'styled-components';
import {
  uploading,
  loading,
  loaded,
  error
} from './vertical-link-view-story/index';

injectGlobal`
  body {
    padding: 1em;
  }
`;

storiesOf('VerticalLinkView', {})
  .add('Uploading', uploading)
  .add('Loading', loading)
  .add('Waiting/Loaded', loaded)
  .add('Errored', error)
;

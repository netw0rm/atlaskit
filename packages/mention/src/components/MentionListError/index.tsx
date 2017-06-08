import * as React from 'react';
import { MentionListErrorStyle } from './styles';
import EditorWarningIcon from '@atlaskit/icon/glyph/editor/warning';

export default () => (
  <MentionListErrorStyle>
    <div><EditorWarningIcon label="whoops" size="xlarge"/></div>
    <div>Something went wrong</div>
  </MentionListErrorStyle>
);

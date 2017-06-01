import * as React from 'react';
import { MentionListErrorStyle } from './styles';
import { whoopsUri } from './icons';

export default () => (
  <MentionListErrorStyle>
    <p><img src={whoopsUri} alt="whoops" /></p>
    <p>Something went wrong</p>
  </MentionListErrorStyle>
);

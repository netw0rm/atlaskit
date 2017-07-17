import * as React from 'react';
import {Card, CardView} from '@atlaskit/media-card';
import {createStorybookContext, genericLinkId} from '@atlaskit/media-test-helpers';
import {FilmStripNavigator} from '../src';

const context = createStorybookContext();
const linkCard = <Card context={context} identifier={genericLinkId}/>;

export default () => (
  <div>
    <FilmStripNavigator width={700}>
      {linkCard}
      {linkCard}
      <CardView status="complete" />
      <CardView status="loading" />
      <CardView status="error" />
      {linkCard}
      <CardView status="loading" />
      <CardView status="loading" />
      <CardView status="complete" />
    </FilmStripNavigator>
    <FilmStripNavigator width={500}>
      <CardView status="complete" />
      {linkCard}
      {linkCard}
      <CardView status="loading" />
      <CardView status="processing" />
      {linkCard}
      <CardView status="error" />
    </FilmStripNavigator>
  </div>
);

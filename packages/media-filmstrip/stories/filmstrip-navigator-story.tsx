import * as React from 'react';
import {storiesOf} from '@kadira/storybook';
import {Card, CardView} from '@atlaskit/media-card';
import {createStorybookContext, genericUrlPreviewId, genericLinkId, genericFileId} from '@atlaskit/media-test-helpers';
import {FilmStripNavigator} from '../src';

const context = createStorybookContext();

storiesOf('FilmStripNavigator', {})
  .add('With a Card and CardView', () => (
    <FilmStripNavigator>
      <CardView status="loading"/>
      <CardView status="complete" metadata={{mediaType: 'doc', name: 'foobar.docx', size: 1000}}/>
      <Card context={context} identifier={genericUrlPreviewId}/>
      <Card context={context} identifier={genericLinkId}/>
      <Card context={context} identifier={genericFileId}/>
    </FilmStripNavigator>
  ));

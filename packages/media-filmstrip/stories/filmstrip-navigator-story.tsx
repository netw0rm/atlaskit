import * as React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import {Card, CardView, CardEvent} from '@atlaskit/media-card';
import {createStorybookContext, genericUrlPreviewId, genericLinkId, genericFileId} from '@atlaskit/media-test-helpers';
import {FilmStripNavigator} from '../src';

const context = createStorybookContext();

const clickAction = (event: CardEvent) => {
  action('click')(event.mediaItemDetails);
};

storiesOf('FilmStripNavigator', {})
  .add('With a Card and CardView', () => (
    <FilmStripNavigator>
      <CardView onClick={clickAction} status="loading"/>
      <CardView onClick={clickAction} status="complete" metadata={{mediaType: 'doc', name: 'foobar.docx', size: 1000}}/>
      <Card onClick={clickAction} appearance="image" context={context} identifier={genericUrlPreviewId}/>
      <Card onClick={clickAction} appearance="image" context={context} identifier={genericLinkId}/>
      <Card onClick={clickAction} context={context} identifier={genericFileId}/>
    </FilmStripNavigator>
  ));

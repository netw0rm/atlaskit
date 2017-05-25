import * as React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import {Card, CardView, CardEvent} from '@atlaskit/media-card';
import {createStorybookContext, genericUrlPreviewId, genericLinkId, genericFileId} from '@atlaskit/media-test-helpers';

import {FilmStripNavigator} from '../src';
import {
  OverflowContainer,
  Spacer
} from './styled';

const context = createStorybookContext();

const clickAction = (event: CardEvent) => {
  action('click')(event.mediaItemDetails);
};

const getDefaultNavigator = (overflow: boolean, key?) => {
  return (
    <FilmStripNavigator key={key} inOverflowContainer={overflow}>
      <CardView onClick={clickAction} status="loading"/>
      <CardView onClick={clickAction} status="complete" metadata={{mediaType: 'doc', name: 'foobar.docx', size: 1000}}/>
      <Card onClick={clickAction} appearance="image" context={context} identifier={genericUrlPreviewId}/>
      <Card onClick={clickAction} appearance="image" context={context} identifier={genericLinkId}/>
      <Card onClick={clickAction} context={context} identifier={genericFileId}/>
    </FilmStripNavigator>
  );
};


storiesOf('FilmStripNavigator', {})
  .add('With a Card and CardView', () => getDefaultNavigator(false))
  .add('Lazy loading - No Overflow', () => {
    return (
      <div style={{margin: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <h2>Scroll down to test lazyload</h2>
        {
          [1, 1, 1, 1, 1].map((_, i) => [
            <Spacer key={i}><h2>Keep scrolling!</h2></Spacer>,
            getDefaultNavigator(false, i + 100)
          ])
        }
      </div>
    );
  })
  .add('Lazy loading - Overflow', () => {
    return (
      <div style={{margin: '40px'}}>
        <h2>Scroll down to test lazyload in an overflow container</h2>
        <OverflowContainer>
          {
            [1, 1, 1, 1, 1].map((_, i) => [
              <Spacer key={i}><h2>Keep scrolling!</h2></Spacer>,
              getDefaultNavigator(true, i + 100)
            ])
          }
        </OverflowContainer>
      </div>
    );
  });

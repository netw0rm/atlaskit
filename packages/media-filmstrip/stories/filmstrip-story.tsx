import * as React from 'react';
import {storiesOf} from '@kadira/storybook';
import {Card, CardView} from '@atlaskit/media-card';
import {createStorybookContext, imageFileId, genericUrlPreviewId, genericDataURI, StoryList} from '@atlaskit/media-test-helpers';

import {Filmstrip} from '../src';

const context = createStorybookContext();
const linkCard = <Card identifier={genericUrlPreviewId} context={context} />;
const fileCard = <Card identifier={imageFileId} context={context} />;
const fileCardView = <CardView status="complete" dataURI={genericDataURI} />;
const linkCardView = <CardView status="complete" identifier={genericUrlPreviewId} dataURI={genericDataURI} />;
const loadingCardView = <CardView status="loading" />;

storiesOf('Filmstrip', module)
  .add('Multiple items', () => {
    return (
      <Filmstrip>
        {linkCard}
        {fileCard}
        {fileCardView}
        {loadingCardView}
      </Filmstrip>
    );
  })
  .add('Single item', () => {
    return (
      <StoryList>
        {[{
          title: 'Link Card',
          content: (
            <Filmstrip>
              {linkCard}
            </Filmstrip>
          )
        }, {
          title: 'File Card',
          content: (
            <Filmstrip>
              {fileCard}
            </Filmstrip>
          )
        }]}
      </StoryList>
    );
  });

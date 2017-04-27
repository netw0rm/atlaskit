import * as React from 'react';
import {storiesOf} from '@kadira/storybook';
import {
  StoryList,
  genericUrlPreview,
  genericLinkDetails,
  genericFileDetails,
  genericDataURI
} from '@atlaskit/media-test-helpers';
import {CardView} from '../src/cardView';

storiesOf('CardView', {})
  .add('Media types', () => (
    <table>
      <tr>
        <td><strong>URLPreview</strong></td>
        <td><CardView status="complete" metadata={genericUrlPreview}/></td>
      </tr>
      <tr>
        <td><strong>Link</strong></td>
        <td><CardView status="complete" metadata={genericLinkDetails}/></td>
      </tr>
      <tr>
        <td><strong>File</strong></td>
        <td><CardView status="complete" metadata={genericFileDetails} dataURI={genericDataURI}/></td>
      </tr>
    </table>
  ))
  .add('Loading state', () => {
    const loadingCards = [
      {
        title: 'File - default',
        content: <CardView status="loading" mediaItemType="file" />
      }, {
        title: 'Link - default',
        content: <CardView status="loading" mediaItemType="link" />
      }
    ];

    return <StoryList>{loadingCards}</StoryList>;
  })
  .add('Error state', () => {
    const errorCards = [
      {
        title: 'File - default',
        content: <CardView status="error" mediaItemType="file" />
      }, {
        title: 'Link - default',
        content: <CardView status="error" mediaItemType="link" />
      }
    ];

    return <StoryList>{errorCards}</StoryList>;
  });

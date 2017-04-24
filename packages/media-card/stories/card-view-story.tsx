import * as React from 'react';
import {storiesOf} from '@kadira/storybook';
import {genericUrlPreview, genericLinkDetails, genericFileDetails, genericDataURI} from '@atlaskit/media-test-helpers';
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
  .add('Loading...', () => (
    <div>
      <CardView status="loading"/>
      <br/>
      <small>* defaults to LinkCard which has a story to update the look of its loading state</small>
    </div>
  ))
  .add('Error', () => (
    <div>
      <CardView status="error" error={new Error('Some error occurred!')}/>
      <br/>
      <small>* defaults to LinkCard which currently renders null</small>
    </div>
  ))
;

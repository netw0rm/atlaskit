import * as React from 'react';
import {createStorybookContext, genericUrlPreview, genericLinkId, imageLinkId} from '@atlaskit/media-test-helpers';
import {LinkCard} from '../../../../src/__new';
import {Story} from '../../utils/styled';

const context = createStorybookContext();

function mapIdentifierToProps(identifier) {
  return {
    id: identifier.id,
    url: identifier.url,
    collection: identifier.collectionName
  };
}

export default function() {
  return (
    <Story>

      <h1>LinkCard</h1>
      <LinkCard context={context} {...mapIdentifierToProps(genericUrlPreview)}/>
      <br/>
      <LinkCard context={context} {...mapIdentifierToProps(genericLinkId)}/>
      <br/>
      <LinkCard context={context} {...mapIdentifierToProps(imageLinkId)}/>

    </Story>
  );
}

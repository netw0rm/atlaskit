import * as React from 'react';
import {
  createStorybookContext,
  imageFileId,
  genericLinkId
} from '@atlaskit/media-test-helpers';
import {Card} from '../../src/Card';

const context = createStorybookContext();

function convertIdentifier(id) {
  return {
    ...id,
    type: id.mediaItemType,
    collection: id.collectionName
  };
}

export function file() {
  return (
    <Card context={context} identifier={convertIdentifier(imageFileId)}/>
  );
}

export function link() {
  return (
    <Card context={context} identifier={convertIdentifier(genericLinkId)}/>
  );
}

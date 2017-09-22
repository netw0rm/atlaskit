import * as React from 'react';
import {
  createStorybookContext,
  imageFileId
} from '@atlaskit/media-test-helpers';
import {FileCard} from '../../src/files/FileCard';

const context = createStorybookContext();

function convertIdentifier(id) {
  return {
    ...id,
    collection: id.collectionName
  };
}

export function image() {
  return (
    <FileCard context={context} {...convertIdentifier(imageFileId)}/>
  );
}


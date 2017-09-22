import * as React from 'react';
import {
  createStorybookContext,
  genericLinkId
} from '@atlaskit/media-test-helpers';
import {LinkCard} from '../../src/links/LinkCard';

const context = createStorybookContext();

function convertIdentifier(id) {
  return {
    ...id,
    collection: id.collectionName
  };
}

export function generic() {
  return (
    <div>
      <LinkCard context={context} {...convertIdentifier(genericLinkId)}/>
      <br/>
      <LinkCard context={context} url="https://www.google.com"/>
      <br/>
      <LinkCard context={context} url="https://www.atlassian.com"/>
      <br/>
      <LinkCard context={context} url="https://www.example.com"/>
    </div>
  );
}

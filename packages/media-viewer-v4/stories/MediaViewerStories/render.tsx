import * as React from 'react';
import {createStorybookContext, defaultCollectionName, imageFileId} from '@atlaskit/media-test-helpers';
import {MediaViewer} from '../../src';

const context = createStorybookContext();

export function image() {
  return (
    <MediaViewer visible={true} context={context} source={imageFileId}/>
  );
}

export function collection() {
  return (
    <MediaViewer visible={true} context={context} source={defaultCollectionName}/>
  );
}


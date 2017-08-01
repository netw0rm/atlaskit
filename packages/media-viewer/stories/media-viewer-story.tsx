import * as React from 'react';
import { storiesOf } from '@kadira/storybook';
import {createStorybookContext, defaultCollectionName, genericFileId} from '@atlaskit/media-test-helpers';
import {MediaViewer} from '../src/3.0';

const context = createStorybookContext();

storiesOf('MediaViewer', {})
  .add('Single item', () => {
    return (
      <MediaViewer
        context={context}
        selection={{
          selected: genericFileId,
          list: defaultCollectionName
        }}
      />
    );
  });

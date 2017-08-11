import { storiesOf } from '@kadira/storybook';
import * as React from 'react';

import { Query } from '../src/types';
import ResourcedItemList from '../src/components/ResourcedItemList';
import { createProviders } from './story-utils';

const initialQuery: Query = {
  containerAri: 'cheese',
  limit: 10,
};

storiesOf('<ResourcedItemList/>', module)
  .add('Simple', () => {
    const { renderDocument, taskDecisionProvider } = createProviders();

    return (
      <ResourcedItemList
        renderDocument={renderDocument}
        initialQuery={initialQuery}
        taskDecisionProvider={taskDecisionProvider}
      />
    );
  })
  .add('Infinite loading', () => {
    const { renderDocument, taskDecisionProvider } = createProviders({ hasMore: true });

    return (
      <ResourcedItemList
        renderDocument={renderDocument}
        initialQuery={initialQuery}
        taskDecisionProvider={taskDecisionProvider}
      />
    );
  })
  .add('Infinite loading slow 500ms', () => {
    const { renderDocument, taskDecisionProvider } = createProviders({ hasMore: true, lag: 500 });

    return (
      <ResourcedItemList
        renderDocument={renderDocument}
        initialQuery={initialQuery}
        taskDecisionProvider={taskDecisionProvider}
      />
    );
  });

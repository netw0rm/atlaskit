import { storiesOf } from '@kadira/storybook';
import * as React from 'react';

import { Query } from '../src/types';
import ResourcedDecisionList from '../src/components/ResourcedDecisionList';
import { createProviders } from './story-utils';

const initialQuery: Query = {
  containerAri: 'cheese',
  limit: 10,
};

storiesOf('<ResourcedDecisionList/>', module)
  .add('Simple', () => {
    const { renderDocument, taskDecisionProvider } = createProviders();

    return (
      <ResourcedDecisionList
        renderDocument={renderDocument}
        initialQuery={initialQuery}
        taskDecisionProvider={taskDecisionProvider}
      />
    );
  })
  .add('Infinite loading', () => {
    const { renderDocument, taskDecisionProvider } = createProviders({ hasMore: true });

    return (
      <ResourcedDecisionList
        renderDocument={renderDocument}
        initialQuery={initialQuery}
        taskDecisionProvider={taskDecisionProvider}
      />
    );
  })
  .add('Infinite loading slow 500ms', () => {
    const { renderDocument, taskDecisionProvider } = createProviders({ hasMore: true, lag: 500 });

    return (
      <ResourcedDecisionList
        renderDocument={renderDocument}
        initialQuery={initialQuery}
        taskDecisionProvider={taskDecisionProvider}
      />
    );
  });

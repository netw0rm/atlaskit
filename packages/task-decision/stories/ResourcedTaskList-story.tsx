import { storiesOf } from '@kadira/storybook';
import * as React from 'react';

import { Query } from '../src/types';
import ResourcedTaskList from '../src/components/ResourcedTaskList';
import { createProviders } from './story-utils';

const initialQuery: Query = {
  containerAri: 'cheese',
  limit: 10,
};

storiesOf('<ResourcedTaskList/>', module)
  .add('Simple', () => {
    const { renderDocument, taskDecisionProvider } = createProviders();

    return (
      <ResourcedTaskList
        renderDocument={renderDocument}
        initialQuery={initialQuery}
        taskDecisionProvider={taskDecisionProvider}
      />
    );
  })
  .add('Infinite loading', () => {
    const { renderDocument, taskDecisionProvider } = createProviders({ hasMore: true });

    return (
      <ResourcedTaskList
        renderDocument={renderDocument}
        initialQuery={initialQuery}
        taskDecisionProvider={taskDecisionProvider}
      />
    );
  })
  .add('Infinite loading slow 500ms', () => {
    const { renderDocument, taskDecisionProvider } = createProviders({ hasMore: true, lag: 500 });

    return (
      <ResourcedTaskList
        renderDocument={renderDocument}
        initialQuery={initialQuery}
        taskDecisionProvider={taskDecisionProvider}
      />
    );
  });

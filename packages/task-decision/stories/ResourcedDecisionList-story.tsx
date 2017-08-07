import { storiesOf } from '@kadira/storybook';
import * as React from 'react';
import { ReactRenderer as Renderer } from '@atlaskit/editor-core/dist/es2015/renderer';

import { DecisionQuery } from '../src/types';
import ResourcedDecisionList from '../src/components/ResourcedDecisionList';
import { getMockTaskDecisionResource } from '../src/support/story-data';

const renderDocument = (document: any) => <Renderer document={document}/>;
const initialQuery: DecisionQuery = {
  containerAri: 'cheese',
  limit: 10,
};

storiesOf('<ResourcedDecisionList/>', module)
  .add('Simple', () => (
    <ResourcedDecisionList
      renderDocument={renderDocument}
      initialQuery={initialQuery}
      taskDecisionProvider={getMockTaskDecisionResource()}
    />
  ))
  .add('Infinite loading', () => (
    <ResourcedDecisionList
      renderDocument={renderDocument}
      initialQuery={initialQuery}
      taskDecisionProvider={getMockTaskDecisionResource({ hasMore: true })}
    />
  ))
  .add('Infinite loading slow 500ms', () => (
    <ResourcedDecisionList
      renderDocument={renderDocument}
      initialQuery={initialQuery}
      taskDecisionProvider={getMockTaskDecisionResource({ hasMore: true, lag: 500 })}
    />
  ));

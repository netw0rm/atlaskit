import { storiesOf } from '@kadira/storybook';
import * as React from 'react';

import ResourcedTaskItem from '../src/components/ResourcedTaskItem';
import { getMockTaskDecisionResource } from '../src/support/story-data';

const taskDecisionProvider = getMockTaskDecisionResource();

storiesOf('<ResourcedTaskItem/>', module)
  .add('Resourced TaskItem with renderer', () => (
    <div>
      <ResourcedTaskItem taskId="task-3" ari="objectAri" containerAri="containerAri" taskDecisionProvider={taskDecisionProvider}>
        Have a Swedish Fika
      </ResourcedTaskItem>
      <hr />
      <ResourcedTaskItem taskId="task-3" ari="objectAri" containerAri="containerAri" taskDecisionProvider={taskDecisionProvider}>
        Have a Swedish Fika
      </ResourcedTaskItem>
    </div>
  ))
;

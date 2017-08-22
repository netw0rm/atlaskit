import { storiesOf } from '@kadira/storybook';
import * as React from 'react';

import ResourcedTaskItem from '../src/components/ResourcedTaskItem';
import { getMockTaskDecisionResource } from '../src/support/story-data';

storiesOf('<ResourcedTaskItem/>', module)
  .add('Normal', () => {
    const mockTaskDecisionProvider = Promise.resolve(getMockTaskDecisionResource({ lag: 1000 }));
    return (
      <div>
        <ResourcedTaskItem
          taskId="bff0c423-3bba-45c4-a310-d49f7a95003e"
          objectAri="ari:cloud:app.cloud:f7ebe2c0-0309-4687-b913-41d422f2110b:message/f1328342-7c28-11e7-a5e8-02420aff0003"
          containerAri="ari:cloud:app.cloud:f7ebe2c0-0309-4687-b913-41d422f2110b:conversation/12e445f8-478c-4902-a556-f4866b273033"
          taskDecisionProvider={mockTaskDecisionProvider}
        >
          Have a Swedish Fika
        </ResourcedTaskItem>
        <hr />
        <ResourcedTaskItem
          taskId="bff0c423-3bba-45c4-a310-d49f7a95003e"
          objectAri="ari:cloud:app.cloud:f7ebe2c0-0309-4687-b913-41d422f2110b:message/f1328342-7c28-11e7-a5e8-02420aff0003"
          containerAri="ari:cloud:app.cloud:f7ebe2c0-0309-4687-b913-41d422f2110b:conversation/12e445f8-478c-4902-a556-f4866b273033"
          taskDecisionProvider={mockTaskDecisionProvider}
        >
          Have a Swedish Fika
        </ResourcedTaskItem>
      </div>
    );
  })
  .add('Error', () => {
    const mockTaskDecisionProvider = Promise.resolve(getMockTaskDecisionResource({ error: true }));
    return (
      <div>
        <ResourcedTaskItem
          taskId="bff0c423-3bba-45c4-a310-d49f7a95003e"
          objectAri="ari:cloud:app.cloud:f7ebe2c0-0309-4687-b913-41d422f2110b:message/f1328342-7c28-11e7-a5e8-02420aff0003"
          containerAri="ari:cloud:app.cloud:f7ebe2c0-0309-4687-b913-41d422f2110b:conversation/12e445f8-478c-4902-a556-f4866b273033"
          taskDecisionProvider={mockTaskDecisionProvider}
        >
          Have a Swedish Fika
        </ResourcedTaskItem>
        <hr />
        <ResourcedTaskItem
          taskId="bff0c423-3bba-45c4-a310-d49f7a95003e"
          objectAri="ari:cloud:app.cloud:f7ebe2c0-0309-4687-b913-41d422f2110b:message/f1328342-7c28-11e7-a5e8-02420aff0003"
          containerAri="ari:cloud:app.cloud:f7ebe2c0-0309-4687-b913-41d422f2110b:conversation/12e445f8-478c-4902-a556-f4866b273033"
          taskDecisionProvider={mockTaskDecisionProvider}
        >
          Have a Swedish Fika
        </ResourcedTaskItem>
      </div>
    );
  })
;

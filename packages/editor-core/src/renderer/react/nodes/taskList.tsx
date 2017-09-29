import * as React from 'react';
import { Children } from 'react';

import { TaskList as AkTaskList } from '@atlaskit/task-decision';

export default function TaskList(params)  {
  const { children } = params;

  if (Children.count(children) === 0) {
    return null;
  }

  return (
    <AkTaskList key={params.key}>{children}</AkTaskList>
  );
}

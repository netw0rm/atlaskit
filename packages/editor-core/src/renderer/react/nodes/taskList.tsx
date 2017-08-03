import * as React from 'react';
import { PureComponent } from 'react';

import { TaskList as AkTaskList } from '@atlaskit/task-decision';

export default class TaskList extends PureComponent<{}, {}> {
  render() {
    const { children } = this.props;
    return (
      <AkTaskList>{children}</AkTaskList>
    );
  }
}

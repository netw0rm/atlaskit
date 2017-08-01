import * as React from 'react';
import { PureComponent } from 'react';

import { TaskItem as AkTaskItem } from '@atlaskit/task-decision';

export interface Props {
  localId: string;
  state?: string;
}

export default class TaskItem extends PureComponent<Props, {}> {
  render() {
    const { children, localId, state } = this.props;
    return (
      <AkTaskItem taskId={localId} isDone={state === 'DONE'}>{children}</AkTaskItem>
    );
  }
}

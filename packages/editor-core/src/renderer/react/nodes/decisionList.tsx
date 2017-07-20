import * as React from 'react';
import { PureComponent } from 'react';

import { DecisionList as AkDecisionList } from '@atlaskit/task-decision';

export default class DecisionList extends PureComponent<{}, {}> {
  render() {
    const { children } = this.props;
    return (
      <AkDecisionList>{children}</AkDecisionList>
    );
  }
}

import * as React from 'react';
import { PureComponent } from 'react';

import { DecisionItem as AkDecisionItem, DecisionList as AkDecisionList } from '@atlaskit/task-decision';

export class DecisionList extends PureComponent<{}, {}> {
  render() {
    const { children } = this.props;
    return (
      <AkDecisionList>{children}</AkDecisionList>
    );
  }
}

export class DecisionItem extends PureComponent<{}, {}> {
  render() {
    const { children } = this.props;
    return (
      <AkDecisionItem>{children}</AkDecisionItem>
    );
  }
}

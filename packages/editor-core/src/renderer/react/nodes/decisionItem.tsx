import * as React from 'react';
import { PureComponent } from 'react';

import { DecisionItem as AkDecisionItem } from '@atlaskit/task-decision';

export default class DecisionItem extends PureComponent<{}, {}> {
  render() {
    const { children } = this.props;
    return (
      <AkDecisionItem>{children}</AkDecisionItem>
    );
  }
}

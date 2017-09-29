import * as React from 'react';
import { Children } from 'react';

import { DecisionItem as AkDecisionItem } from '@atlaskit/task-decision';

export default function DecisionItem(props, params) {
  const { children } = params;

  if (Children.count(children) === 0) {
    return null;
  }

  return (
    <AkDecisionItem key={params.key}>{children}</AkDecisionItem>
  );
}

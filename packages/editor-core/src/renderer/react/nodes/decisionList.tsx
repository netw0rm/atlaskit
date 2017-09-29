import * as React from 'react';
import { Children } from 'react';

import { DecisionList as AkDecisionList } from '@atlaskit/task-decision';

export default function DecisionList(props, params) {
  const { children } = params;

  if (Children.count(children) === 0) {
    return null;
  }

  return (
    <AkDecisionList key={params.key}>{children}</AkDecisionList>
  );
}

// @flow
import React from 'react';
import { md, Example, Props } from '@atlaskit/docs';

export default md`
  Badges are visual indicators for numeric values such as tallies and scores.
  They're commonly used before and after the label of the thing they're
  quantifying.

  They must be used once after a single item name, and have only numbers.

  - Use lozenges for statuses.
  - Use labels to call out tags and high-visibility attributes.
  - Use a tooltip if you want to indicate units.

  ## Examples

  ${(
    <Example
      Component={require('../examples/0-basic').default}
      title="Basic"
      source={require('!!raw-loader!../examples/0-basic')}
    />
  )}

  ${<Props props={require('!!extract-react-types-loader!../src/components/Badge')} />}
`;

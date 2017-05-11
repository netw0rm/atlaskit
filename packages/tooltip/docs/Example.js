import React from 'react';
import StatefulToolTip, { Tooltip } from '@atlaskit/tooltip';

const TagsExample = () => (
  <div>
    <StatefulToolTip
      description="Description"
    >
        Here things
    </StatefulToolTip>
    <Tooltip
      description="herethings"
    >
      Here other things
    </Tooltip>
  </div>
);

export default TagsExample;

import React from 'react';

export const description = (
  <div>
    <p>
      This component is part of the overflow to dropdown feature of the collapsed navigation.
    </p>
    <p>
      It must be nested inside an AkCollapseOverflowItemGroup, which itself must be nested inside
      an AkCollapseOverflow.
    </p>
    <p>
      Remember to set the required AkCollapseOverflowItem.overflowItemIndex prop, which is a number
      prop. The first AkCollapseOverflowItem in each AkCollapseOverflowItemGroup should be set to 0.
    </p>
  </div>
);

export const examples = [];

export const byline = 'Wraps your AkNavigationItem for the "overflow to dropdown" feature.';

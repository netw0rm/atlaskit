import React from 'react';
import AtlassianIcon, { AtlassianIconIcon } from '@atlaskit/icon/glyph/atlassian';
import Icon from '@atlaskit/icon';

// the module exports all the icons as top level icons.
// see the All icons (usage) story for a list of all exports

export default (
  <div>
    {/* meaning is same */}
    <AtlassianIcon label="foo" size="small" />
    <Icon label="foo" size="small" glyph={AtlassianIconIcon} />
  </div>
);

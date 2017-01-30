import React from 'react';
import { AkContainerItem, AkContainerNavigation } from 'ak-navigation';
import AtlassianIcon from 'ak-icon/glyph/atlassian';

export default (
  <AkContainerNavigation>
    <AkContainerItem href="#" text="1) A basic container item with some text" />
    <AkContainerItem href="#" icon={<AtlassianIcon />} text="2) A compact container item" />
    <AkContainerItem href="#" text="3) A basic container item with some text" />
    <AkContainerItem href="#" text="4) A basic container item with some text" />
  </AkContainerNavigation>
);

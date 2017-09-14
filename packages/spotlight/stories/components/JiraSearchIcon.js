import React, { PureComponent } from 'react';
import Tooltip from '@atlaskit/tooltip';
import SearchIcon from '@atlaskit/icon/glyph/search';
import { SpotlightTarget } from '../../src';

export default class JiraSearchIcon extends PureComponent {
  render() {
    return (
      <SpotlightTarget name="search">
        <div style={{ padding: 8 }}>
          <Tooltip position="right" description="Search">
            <SearchIcon label="Search icon" secondaryColor="inherit" size="medium" />
          </Tooltip>
        </div>
      </SpotlightTarget>
    );
  }
}

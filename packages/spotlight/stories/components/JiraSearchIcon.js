import React, { PureComponent } from 'react';
import Tooltip from '@atlaskit/tooltip';
import SearchIcon from '@atlaskit/icon/glyph/search';

export default class JiraSearchIcon extends PureComponent {
  render() {
    return (
      <Tooltip position="right" description="Search">
        <SearchIcon label="Search icon" secondaryColor="inherit" size="medium" />
      </Tooltip>
    );
  }
}

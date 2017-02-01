import React, { Component } from 'react';
import MoreIcon from 'ak-icon/glyph/moreoptions';

import DropdownMenu from '../src';
import { simpleDropdownItems } from './DropdownsData';

export default class DropWithTriggerOpts extends Component {
  render() {
    return (<div style={{ padding: '40px' }}>
      <p>When you want to pass in custom trigger button options, use the
        triggerButtonOptions property
      </p>
      <div style={{ padding: '20px 0' }}>
        <DropdownMenu
          items={simpleDropdownItems}
          triggerType="button"
          triggerButtonOptions={{
            appearance: 'subtle',
            iconBefore: <MoreIcon label="More" />,
          }}
        />
      </div>
    </div>);
  }
}

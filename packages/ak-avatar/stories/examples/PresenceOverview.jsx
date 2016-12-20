import React from 'react';
import { Presence } from 'ak-avatar';

export default (
  <div>
    <p>Presence components will stretch to fill the entire available space by default</p>
    <div style={{ display: 'inline-flex' }}>
      <Presence presence="none" />
      <Presence presence="online" />
      <Presence presence="busy" />
      <Presence presence="offline" />
    </div>
  </div>
);

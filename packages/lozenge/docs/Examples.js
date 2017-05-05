import React from 'react';
import Lozenge from '@atlaskit/lozenge';

const LozengeExamples = () => (
  <div>
    <div>
      <h3>Subtle Lozenges</h3>
      <Lozenge>Default</Lozenge>
      <Lozenge appearance="success">Success</Lozenge>
      <Lozenge appearance="removed">Removed</Lozenge>
      <Lozenge appearance="inprogress">In Progress</Lozenge>
      <Lozenge appearance="new">New</Lozenge>
      <Lozenge appearance="moved">Moved</Lozenge>
    </div>
    <div>
      <h3>Bold Lozenges</h3>
      <Lozenge isBold>Default</Lozenge>
      <Lozenge appearance="success" isBold>Success</Lozenge>
      <Lozenge appearance="removed" isBold>Removed</Lozenge>
      <Lozenge appearance="inprogress" isBold>In Progress</Lozenge>
      <Lozenge appearance="new" isBold>New</Lozenge>
      <Lozenge appearance="moved" isBold>Moved</Lozenge>
    </div>
    <div>
      <h3>Overflowed Lozenge</h3>
      <Lozenge>Long text will be truncated after a point.</Lozenge>
    </div>
  </div>
);

export default LozengeExamples;

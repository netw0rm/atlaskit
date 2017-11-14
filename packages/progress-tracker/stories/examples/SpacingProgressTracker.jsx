import React from 'react';
import ProgressTracker from '../../src/components/ProgressTracker';

const css = `
  .sample {
    border-bottom: 1px solid;
    padding-bottom: 10px;
    padding-top: 10px;
  }
`;

const stages = [
  {
    id: 'disabled-1',
    label: 'Disabled Step',
    percentageComplete: 100,
    status: 'disabled',
    href: '#',
  },
  {
    id: 'visited-1',
    label: 'Visited Step',
    percentageComplete: 100,
    status: 'visited',
    href: '#',
  },
  {
    id: 'current-1',
    label: 'Current Step',
    percentageComplete: 0,
    status: 'current',
    href: '#',
  },
  {
    id: 'unvisited-1',
    label: 'Unvisited Step 1',
    percentageComplete: 0,
    status: 'unvisited',
    href: '#',
  },
  {
    id: 'unvisited-2',
    label: 'Unvisited Step 2',
    percentageComplete: 0,
    status: 'unvisited',
    href: '#',
  },
  {
    id: 'unvisited-3',
    label: 'Unvisited Step 3',
    percentageComplete: 0,
    status: 'unvisited',
    href: '#',
  },
];

export default (
  <div>
    <style>{css}</style>
    <div className="sample">
      Comfortable Spacing
      <ProgressTracker
        stages={stages}
        spacing={'comfortable'}
      />
    </div>
    <div className="sample">
      Cosy Spacing
      <ProgressTracker
        stages={stages}
        spacing={'cosy'}
      />
    </div>
    <div className="sample">
      Compact Spacing
      <ProgressTracker
        stages={stages}
        spacing={'compact'}
      />
    </div>
  </div>
);

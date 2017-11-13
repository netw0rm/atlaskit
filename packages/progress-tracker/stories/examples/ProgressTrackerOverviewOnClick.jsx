import React from 'react';
import { action } from '@kadira/storybook';
import ProgressTracker from '../../src/components/ProgressTracker';

const stages = [
  {
    id: 'disabled-1',
    label: 'Disabled Step',
    percentageComplete: 100,
    status: 'disabled',
    onClick: action('clicked on link'),
  },
  {
    id: 'visited-1',
    label: 'Visited Step',
    percentageComplete: 100,
    status: 'visited',
    onClick: action('clicked on link'),
  },
  {
    id: 'current-1',
    label: 'Current Step',
    percentageComplete: 0,
    status: 'current',
    onClick: action('clicked on link'),
  },
  {
    id: 'unvisited-1',
    label: 'Unvisited Step 1',
    percentageComplete: 0,
    status: 'unvisited',
    onClick: action('clicked on link'),
  },
  {
    id: 'unvisited-2',
    label: 'Unvisited Step 2',
    percentageComplete: 0,
    status: 'unvisited',
    onClick: action('clicked on link'),
  },
  {
    id: 'unvisited-3',
    label: 'Unvisited Step 3',
    percentageComplete: 0,
    status: 'unvisited',
    onClick: action('clicked on link'),
  },
];

export default (
  <ProgressTracker
    stages={stages}
  />
);

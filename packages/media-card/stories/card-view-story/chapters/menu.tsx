import * as React from 'react';
import {MediaItemDetails} from '@atlaskit/media-core';

import {CardView, CardAppearance} from '../../../src';
import {deleteAction, actions} from './utils';

export const createMenuActionCards = (appearance: CardAppearance, metadata: MediaItemDetails) => {
  return [
    {
      title: 'Single menu action',
      content: <CardView appearance={appearance} status="complete" metadata={metadata} actions={actions.slice(0, 1)} />
    },
    {
      title: 'Multiple menu actions',
      content: <CardView appearance={appearance} status="complete" metadata={metadata} actions={actions} />
    },
    {
      title: 'Delete action',
      content: <CardView appearance={appearance} status="complete" metadata={metadata} actions={[deleteAction]} />
    }
  ];
};

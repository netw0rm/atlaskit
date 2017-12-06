import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import SuccessFlag from '../src/common/components/SuccessFlag';

import setupStorybookAnalytics from './helpers/setupStorybookAnalytics';

storiesOf('common/SuccessFlag')
  .add('basic', () => setupStorybookAnalytics(<SuccessFlag
    showFlag
    title="(Title) all done!"
    description="(description) That went pretty smoothly."
    source="(source)"
  />))
  .add('advanced', () => setupStorybookAnalytics(<SuccessFlag
    showFlag
    title="(Title) all done!"
    description="(description) That went pretty smoothly."
    flagActions={[
      { content: 'shut up and take my money', onClick: action('Flag action') },
    ]}
    source="(source)"
    onDismissed={action('Flag dismissed.')}
  />));

import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import ErrorFlag from '../src/common/components/ErrorFlag';

import setupStorybookAnalytics from './util/setupStorybookAnalytics';

storiesOf('common/ErrorFlag')
  .add('basic', () => setupStorybookAnalytics(<ErrorFlag
    showFlag
    title="(Title) Oops... Something went wrong"
    description="(description)"
    source="(source)"
  />))
  .add('advanced', () => setupStorybookAnalytics(<ErrorFlag
    showFlag
    title="(Title) Oops... Something went wrong"
    description="(description) Let's try again."
    flagActions={[
      { content: 'retry', onClick: action('Flag action') },
    ]}
    source="(source)"
    onDismissed={action('Flag dismissed.')}
  />));

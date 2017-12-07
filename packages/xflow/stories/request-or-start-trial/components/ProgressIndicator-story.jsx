import { storiesOf } from '@kadira/storybook';
import React from 'react';
import ProgressIndicator from '../../../src/request-or-start-trial/components/ProgressIndicator';
import { ACTIVE, ACTIVATING, UNKNOWN } from '../../../src/common/productProvisioningStates';

import setupStorybookAnalytics from '../../helpers/setupStorybookAnalytics';

storiesOf('request-or-start-trial/ProgressIndicator', module)
  .addDecorator(story => setupStorybookAnalytics(story()))
  .add('Empty Progress Bar', () =>
    <ProgressIndicator progress={0} status={ACTIVATING} />
  )
  .add('25% Full, ACTIVATING status', () =>
    <ProgressIndicator progress={0.25} status={ACTIVATING} />
  )
  .add('50% Full, UNKNOWN status', () =>
    <ProgressIndicator progress={0.5} status={UNKNOWN} />
  )
  .add('Complete, ACTIVE status', () =>
    <ProgressIndicator progress={1} status={ACTIVE} />
  )
  .add('Complete, ACTIVATING status', () =>
    <ProgressIndicator progress={1} status={ACTIVATING} />
  );

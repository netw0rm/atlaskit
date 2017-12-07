import { storiesOf, action } from '@kadira/storybook';
import React from 'react';

import { ConfluenceLogo } from '@atlaskit/logo';

import { AlreadyStartedBase } from '../../../src/request-or-start-trial/components/AlreadyStarted';
import setupStorybookAnalytics from '../../helpers/setupStorybookAnalytics';
import { ACTIVE, ACTIVATING } from '../../../src/common/productProvisioningStates';

const defaultProps = {
  productLogo: <ConfluenceLogo />,
  heading: 'You already have Confluence',
  message: (
    <div>
      <p>A site administrator already started a trial.</p>
      <p>You’re all set to create vital project documentation with your team.</p>
    </div>
  ),
  getStartedButtonText: 'Get started',
  status: ACTIVATING,
  progress: 0,

  onComplete: action('onComplete'),
  goToProduct: action('goToProduct'),
  closeAlreadyStartedDialog: action('closeAlreadyStartedDialog'),
};

storiesOf('request-or-start-trial/AlreadyStarted', module)
  .addDecorator(story => setupStorybookAnalytics(story()))
  .add('Already Started (ACTIVATING) progress bar (0%)', () =>
    <AlreadyStartedBase
      {...defaultProps}
    />
  )
  .add('Already Started (ACTIVATING) progress bar (50%)', () =>
    <AlreadyStartedBase
      {...defaultProps}
      progress={0.5}
    />
  )
  .add('Already Started (ACTIVATING Error) progress bar (100%)', () =>
    <AlreadyStartedBase
      {...defaultProps}
      progress={1}
      status={ACTIVATING}
    />
  )
  .add('Already Started (ACTIVATING) progress bar (100%)', () =>
    <AlreadyStartedBase
      {...defaultProps}
      progress={1}
      initialStatus={ACTIVATING}
      status={ACTIVE}
    />
  )
  .add('Already Started (ACTIVE)', () =>
    <AlreadyStartedBase
      {...defaultProps}
      progress={1}
      status={ACTIVE}
    />
  );

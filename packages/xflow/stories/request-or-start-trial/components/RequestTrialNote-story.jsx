import { storiesOf } from '@kadira/storybook';
import React from 'react';

import { RequestTrialNoteBase } from '../../../src/request-or-start-trial/components/RequestTrialNote';
import setupStorybookAnalytics from '../../helpers/setupStorybookAnalytics';

const defaultProps = {
  prompt: 'Send a quick note telling your site admin why you\'re keen to try Confluence:',
  placeholder: 'Hi! I\'d like to try Confluence. It helps give the team more context on anything happening in Jira - and there\'s a free 30 day trial.',
  placeholderShort: 'Hi! I\'d like to try Confluence.',
  onComplete: async () => true,
  setProductRequestFlag: async () => true,
};

storiesOf('request-or-start-trial/RequestTrialNote', module)
  .addDecorator(story => setupStorybookAnalytics(story()))
  .add('RequestTrialWithNote (INACTIVE), default, success on send', () =>
    <RequestTrialNoteBase
      {...defaultProps}
    />
  )
  .add('RequestTrialWithNote (INACTIVE), default, failure on send', () =>
    <RequestTrialNoteBase
      {...defaultProps}
      requestTrialWithNote={
          () => new Promise((_, reject) =>
            setTimeout(() =>
              reject(new Error('It\'s borked')), 100))
        }
    />
  );

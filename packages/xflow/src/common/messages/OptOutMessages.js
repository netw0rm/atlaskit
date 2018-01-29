import { defineMessages } from 'react-intl';

const optOutMessages = defineMessages({
  optOutHeading: {
    id: 'xflow.opt-out.heading',
    defaultMessage: 'Turn off all product suggestions',
  },
  optOutMessage: {
    id: 'xflow.opt-out.message',
    defaultMessage: 'All users of Jira on this site will no longer see product suggestions.',
  },
  optOutMessageWarning: {
    id: 'xflow.opt-out.message-warning',
    defaultMessage: 'This cannot be undone.',
  },
  optOutNotePlaceholder: {
    id: 'xflow.opt-out.note-placeholder',
    defaultMessage: 'Let us know why you want to turn these messages off (optional).',
  },
});

const optOutMessagesDefaultProps = intl => ({
  optOut: {
    optOutHeading: intl.formatMessage(optOutMessages.optOutHeading),
    optOutMessage: intl.formatMessage(optOutMessages.optOutMessage),
    optOutMessageWarning: intl.formatMessage(optOutMessages.optOutMessageWarning),
    optOutNotePlaceholder: intl.formatMessage(optOutMessages.optOutNotePlaceholder),
  },
});

export default optOutMessagesDefaultProps;

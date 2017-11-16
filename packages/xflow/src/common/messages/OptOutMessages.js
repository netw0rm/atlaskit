import { defineMessages } from 'react-intl';

const optOutMessages = defineMessages({
  optOutHeading: {
    id: 'xflow.opt-out.heading',
    defaultMessage: 'Trial requests',
  },
  optOutMessage: {
    id: 'xflow.opt-out.message',
    defaultMessage: 'Change your notifications or stop requests completely.',
  },
  optOutNotePlaceholder: {
    id: 'xflow.opt-out.note-placeholder',
    defaultMessage: 'Send us your feedback to help improve \nfuture releases.',
  },
  optOutOptionItemsLabelAdminNotifications: {
    id: 'xflow.opt-out.option.label.admin-notifications',
    defaultMessage: 'Turn off notifications',
  },
  optOutOptionItemsNoteAdminNotifications: {
    id: 'xflow.opt-out.option.note.admin-notifications',
    defaultMessage: 'You won\'t get trial requests from users.',
  },
  optOutOptionItemsLabelDisableRequests: {
    id: 'xflow.opt-out.option.label.disable-requests',
    defaultMessage: 'Turn off trial requesting',
  },
  optOutOptionItemsNoteDisableRequests: {
    id: 'xflow.opt-out.option.note.disable-requests',
    defaultMessage: 'Users can\'t request trials.',
  },
});

const optOutMessagesDefaultProps = intl => ({
  optOut: {
    optOutHeading: intl.formatMessage(optOutMessages.optOutHeading),
    optOutMessage: intl.formatMessage(optOutMessages.optOutMessage),
    optOutDefaultSelectedRadio: 'admin-opt-out',
    optOutNotePlaceholder: intl.formatMessage(optOutMessages.optOutNotePlaceholder),
    optOutOptionItems: [
      {
        value: 'admin-opt-out',
        label: intl.formatMessage(optOutMessages.optOutOptionItemsLabelAdminNotifications),
        note: intl.formatMessage(optOutMessages.optOutOptionItemsNoteAdminNotifications),
      },
      {
        value: 'disable-requests',
        label: intl.formatMessage(optOutMessages.optOutOptionItemsLabelDisableRequests),
        note: intl.formatMessage(optOutMessages.optOutOptionItemsNoteDisableRequests),
      },
    ],
  },
});

export default optOutMessagesDefaultProps;

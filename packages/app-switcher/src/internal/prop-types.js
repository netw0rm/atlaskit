import { PropTypes } from 'react';

const applications = PropTypes.arrayOf(PropTypes.shape({
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
}));

const configureLink = PropTypes.oneOfType([PropTypes.string, PropTypes.bool]);

export default {
  recentContainers: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    iconUrl: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })),

  linkedApplications: PropTypes.shape({
    configureLink,
    apps: applications,
  }),

  i18n: PropTypes.shape({
    home: PropTypes.string.isRequired,
    apps: PropTypes.string.isRequired,
    configure: PropTypes.string.isRequired,
    'try.other.apps': PropTypes.string.isRequired,
    "don't.show.this.again": PropTypes.string.isRequired,
  }),

  suggestedApplication: PropTypes.shape({
    show: PropTypes.bool.isRequired,
    application: PropTypes.oneOf(['jira', 'confluence']),
    description: PropTypes.string,
    url: PropTypes.string,
    onDontShowAgainClick: PropTypes.func,
  }),

  applications,
  configureLink,
};

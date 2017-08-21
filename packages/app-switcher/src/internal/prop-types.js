import PropTypes from 'prop-types';

const applications = PropTypes.arrayOf(PropTypes.shape({
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  product: PropTypes.string.isRequired,
}));

const suggestedApplications = PropTypes.arrayOf(PropTypes.shape({
  name: PropTypes.string.isRequired,
  product: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}));

const configureLink = PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired;

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
    suggested: suggestedApplications,
    error: PropTypes.bool.isRequired,
  }),

  i18n: PropTypes.shape({
    home: PropTypes.node.isRequired,
    apps: PropTypes.node.isRequired,
    configure: PropTypes.node.isRequired,
    recent: PropTypes.node.isRequired,
    'try.other.apps': PropTypes.node.isRequired,
    "don't.show.this.again": PropTypes.node.isRequired,
    'container.confluence-space': PropTypes.node.isRequired,
    'container.jira-project': PropTypes.node.isRequired,
    'suggested.application.description.confluence': PropTypes.node.isRequired,
    'suggested.application.description.jira': PropTypes.node.isRequired,
  }),

  applicationsToTry: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  })),

  suggestedApplication: PropTypes.shape({
    show: PropTypes.bool.isRequired,
    application: PropTypes.oneOf(['jira', 'confluence']),
    url: PropTypes.string,
    onDontShowAgainClick: PropTypes.func,
  }),

  dropdownOptions: PropTypes.shape({
    appearance: PropTypes.oneOf(['default', 'tall']),
    isTriggerNotTabbable: PropTypes.bool,
    position: PropTypes.string,
    shouldFlip: PropTypes.bool,
  }),

  applications,
  configureLink,
};

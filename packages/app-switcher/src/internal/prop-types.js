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
  homeLink: PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
  }),

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
    'container.confluence-space': PropTypes.node.isRequired,
    'container.jira-project': PropTypes.node.isRequired,
    'try.lozenge': PropTypes.node.isRequired,
  }),

  applicationsToTry: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  })),

  dropdownOptions: PropTypes.shape({
    appearance: PropTypes.oneOf(['default', 'tall']),
    isTriggerNotTabbable: PropTypes.bool,
    position: PropTypes.string,
    shouldFlip: PropTypes.bool,
  }),

  applications,
  configureLink,
};

import PropTypes from 'prop-types';

export default {
  crossAcquisition: PropTypes.shape({
    productLogo: PropTypes.element,
    requestTrial: PropTypes.shape({
      accessBanner: PropTypes.string,
      accessHeading: PropTypes.string,
      accessMessage: PropTypes.node,
      notePrompt: PropTypes.node,
      notePlaceholder: PropTypes.string,
    }),
  }),
};

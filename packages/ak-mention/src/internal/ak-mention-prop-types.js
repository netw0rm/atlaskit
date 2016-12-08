/**
 * Describes ak-mention related proptypes that are reused across components.
 */

import { PropTypes } from 'react';

const highlightDetail = PropTypes.arrayOf(PropTypes.shape({
  start: PropTypes.number,
  end: PropTypes.number,
}));

const mention = {
  id: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string,
  selected: PropTypes.bool,
  name: PropTypes.string,
  mentionName: PropTypes.string,
  status: PropTypes.string,
  time: PropTypes.string,
  highlight: PropTypes.shape({
    name: highlightDetail,
    mentionName: highlightDetail,
  }),
};

export default {
  mentionPropType: mention,
  mention: PropTypes.shape(mention),
  resourceProvider: PropTypes.shape({
    subscribe: PropTypes.func.isRequired,
    unsubscribe: PropTypes.func.isRequired,
    filter: PropTypes.func.isRequired,
    recordMentionSelection: PropTypes.func,
  }),
  presenceProvider: PropTypes.shape({
    subscribe: PropTypes.func.isRequired,
    unsubscribe: PropTypes.func.isRequired,
    refreshPresence: PropTypes.func.isRequired,
  }),
};

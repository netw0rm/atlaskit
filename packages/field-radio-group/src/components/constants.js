import { PropTypes } from 'react';

export const itemsPropType = PropTypes.arrayOf(
  PropTypes.shape({
    isDisabled: PropTypes.bool,
    isSelected: PropTypes.bool,
    label: PropTypes.node,
    name: PropTypes.string,
    value: PropTypes.string,
  }),
);

export const itemsDefault = [];

export const itemsPropTypeSmart = PropTypes.arrayOf(
  PropTypes.shape({
    defaultSelected: PropTypes.bool,
    isDisabled: PropTypes.bool,
    label: PropTypes.node,
    name: PropTypes.string,
    value: PropTypes.string,
  }),
);

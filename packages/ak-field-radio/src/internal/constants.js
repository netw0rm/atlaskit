import { PropTypes } from 'react';

export const itemsPropType = PropTypes.arrayOf(
  PropTypes.shape({
    disabled: PropTypes.bool,
    label: PropTypes.node,
    name: PropTypes.string,
    selected: PropTypes.bool,
    value: PropTypes.string,
  }),
);

export const itemsDefault = [];

export const itemsPropTypeSmart = PropTypes.arrayOf(
  PropTypes.shape({
    defaultSelected: PropTypes.bool,
    disabled: PropTypes.bool,
    label: PropTypes.node,
    name: PropTypes.string,
    value: PropTypes.string,
  }),
);

import { hover, merge, style } from 'glamor';
import React, { Component, PropTypes } from 'react';

import { b75, n80, n400, n600, n700, n900, transparent, white } from './util.colors';


function getBackgroundColor({ selected, previouslySelected }) {
  if (selected) {
    return white;
  }
  if (previouslySelected) {
    return b75;
  }
  return transparent;
}

function getBorderColor({ focused }) {
  if (focused) {
    return b75;
  }
  return transparent;
}

function getColor({ disabled, previouslySelected, selected, sibling, today }) {
  if (selected) {
    return n700;
  }
  if (disabled) {
    return n400;
  }
  if (previouslySelected) {
    return n600;
  }
  if (today) {
    return b75;
  }
  if (sibling) {
    return n80;
  }
  return white;
}

function getCursor({ disabled }) {
  return disabled ? 'default' : 'pointer';
}

function getHoverBackgroundColor({ previouslySelected, selected }) {
  if (selected) {
    return white;
  }
  if (previouslySelected) {
    return b75;
  }
  return n900;
}

function getHoverColor({ previouslySelected, selected }) {
  if (selected || previouslySelected) {
    return n600;
  }
  return white;
}

export default class extends Component {
  static get propTypes() {
    return {
      day: PropTypes.number,
      disabled: PropTypes.boolean,
      // TODO remove when https://bitbucket.org/atlassian/atlaskit/pull-requests/958/fix-fix-proptypes-validation-in-our-eslint/diff is merged.
      // eslint-disable-next-line react/no-unused-prop-types
      focused: PropTypes.boolean,
      month: PropTypes.number,
      now: PropTypes.string,
      // TODO remove when https://bitbucket.org/atlassian/atlaskit/pull-requests/958/fix-fix-proptypes-validation-in-our-eslint/diff is merged.
      // eslint-disable-next-line react/no-unused-prop-types
      previouslySelected: PropTypes.boolean,
      // TODO remove when https://bitbucket.org/atlassian/atlaskit/pull-requests/958/fix-fix-proptypes-validation-in-our-eslint/diff is merged.
      // eslint-disable-next-line react/no-unused-prop-types
      sibling: PropTypes.boolean,
      year: PropTypes.number,
    };
  }
  static get defaultProps() {
    const now = new Date();
    return {
      day: now.getDate(),
      disabled: false,
      focused: false,
      month: now.getMonth() + 1,
      now,
      previouslySelected: false,
      sibling: false,
      year: now.getFullYear(),
    };
  }
  render() {
    const css = merge(
      style({
        backgroundColor: getBackgroundColor(this.props),
        border: `2px solid ${getBorderColor(this.props)}`,
        borderRadius: 4,
        color: getColor(this.props),
        cursor: getCursor(this.props),
        display: 'table-cell',
        fontSize: 12,
        fontWeight: 'lighter',
        padding: '2px 5px',
        position: 'relative',
      }),
      hover({
        backgroundColor: getHoverBackgroundColor(this.props),
        color: getHoverColor(this.props),
      })
    );

    const cssUnderline = style({
      borderBottom: `1px solid ${this.props.disabled ? n400 : b75}`,
      bottom: -2,
      left: '12.5%',
      position: 'absolute',
      width: '75%',
    });

    const isToday = this.props.day === this.props.now.getDate() &&
      this.props.month === this.props.now.getMonth() &&
      this.props.year === this.props.now.getFullYear();

    return (
      <td {...css}>
        {this.props.day}
        {isToday ? <div {...cssUnderline} /> : ''}
      </td>
    );
  }
}

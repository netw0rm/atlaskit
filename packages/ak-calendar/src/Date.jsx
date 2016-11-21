import React, { Component, PropTypes } from 'react';

import styles, { underline } from './Date.style';

export default class extends Component {
  static get propTypes() {
    return {
      day: PropTypes.number,
      // TODO remove when https://bitbucket.org/atlassian/atlaskit/pull-requests/958/fix-fix-proptypes-validation-in-our-eslint/diff is merged.
      // eslint-disable-next-line react/no-unused-prop-types
      disabled: PropTypes.bool,
      // TODO remove when https://bitbucket.org/atlassian/atlaskit/pull-requests/958/fix-fix-proptypes-validation-in-our-eslint/diff is merged.
      // eslint-disable-next-line react/no-unused-prop-types
      focused: PropTypes.bool,
      month: PropTypes.number,
      now: PropTypes.any,
      // TODO remove when https://bitbucket.org/atlassian/atlaskit/pull-requests/958/fix-fix-proptypes-validation-in-our-eslint/diff is merged.
      // eslint-disable-next-line react/no-unused-prop-types
      previouslySelected: PropTypes.bool,
      // TODO remove when https://bitbucket.org/atlassian/atlaskit/pull-requests/958/fix-fix-proptypes-validation-in-our-eslint/diff is merged.
      // eslint-disable-next-line react/no-unused-prop-types
      sibling: PropTypes.bool,
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
    const css = styles(this.props);
    const cssUnderline = underline(this.props);
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

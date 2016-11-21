import React, { Component, PropTypes } from 'react';

import styles, { underline } from './Date.style';

export default class extends Component {
  static get propTypes() {
    return {
      children: PropTypes.string.isRequired,
      // TODO remove when https://bitbucket.org/atlassian/atlaskit/pull-requests/958/fix-fix-proptypes-validation-in-our-eslint/diff is merged.
      // eslint-disable-next-line react/no-unused-prop-types
      disabled: PropTypes.bool,
      // TODO remove when https://bitbucket.org/atlassian/atlaskit/pull-requests/958/fix-fix-proptypes-validation-in-our-eslint/diff is merged.
      // eslint-disable-next-line react/no-unused-prop-types
      focused: PropTypes.bool,
      // TODO remove when https://bitbucket.org/atlassian/atlaskit/pull-requests/958/fix-fix-proptypes-validation-in-our-eslint/diff is merged.
      // eslint-disable-next-line react/no-unused-prop-types
      previouslySelected: PropTypes.bool,
      // TODO remove when https://bitbucket.org/atlassian/atlaskit/pull-requests/958/fix-fix-proptypes-validation-in-our-eslint/diff is merged.
      // eslint-disable-next-line react/no-unused-prop-types
      sibling: PropTypes.bool,
      today: PropTypes.bool,
    };
  }
  static get defaultProps() {
    return {
      disabled: false,
      focused: false,
      previouslySelected: false,
      sibling: false,
      today: false,
    };
  }
  render() {
    const css = styles(this.props);
    const cssUnderline = underline(this.props);

    return (
      <td {...css}>
        {this.props.children}
        {this.props.today ? <div {...cssUnderline} /> : ''}
      </td>
    );
  }
}

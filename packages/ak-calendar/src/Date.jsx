import React, { PureComponent, PropTypes } from 'react';

import styles, { underline } from './Date.style';

export default class extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    // TODO remove when https://bitbucket.org/atlassian/atlaskit/pull-requests/958/fix-fix-proptypes-validation-in-our-eslint/diff is merged.
    // eslint-disable-next-line react/no-unused-prop-types
    disabled: PropTypes.bool,
    // TODO remove when https://bitbucket.org/atlassian/atlaskit/pull-requests/958/fix-fix-proptypes-validation-in-our-eslint/diff is merged.
    // eslint-disable-next-line react/no-unused-prop-types
    focused: PropTypes.bool,
    onClick: PropTypes.func,
    // TODO remove when https://bitbucket.org/atlassian/atlaskit/pull-requests/958/fix-fix-proptypes-validation-in-our-eslint/diff is merged.
    // eslint-disable-next-line react/no-unused-prop-types
    previouslySelected: PropTypes.bool,
    selected: PropTypes.bool,
    // TODO remove when https://bitbucket.org/atlassian/atlaskit/pull-requests/958/fix-fix-proptypes-validation-in-our-eslint/diff is merged.
    // eslint-disable-next-line react/no-unused-prop-types
    sibling: PropTypes.bool,
    today: PropTypes.bool,
  }
  static defaultProps = {
    disabled: false,
    focused: false,
    onClick() {},
    previouslySelected: false,
    sibling: false,
    today: false,
  }
  render() {
    const css = styles(this.props);
    const cssUnderline = underline(this.props);

    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <td {...css} onClick={this.props.onClick} role="gridcell" aria-selected={this.props.selected ? 'true' : 'false'}>
        {this.props.children}
        {this.props.today ? <div {...cssUnderline} /> : ''}
      </td>
    );
  }
}

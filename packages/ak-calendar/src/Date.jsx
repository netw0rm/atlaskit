/* eslint no-confusing-arrow: 0 */

import React, { PureComponent, PropTypes } from 'react';
import { Div, Td } from './styled';

export default class extends PureComponent {
  static propTypes = {
    children: PropTypes.number.isRequired,
    // TODO remove when https://bitbucket.org/atlassian/atlaskit/pull-requests/958/fix-fix-proptypes-validation-in-our-eslint/diff is merged.
    // eslint-disable-next-line react/no-unused-prop-types
    disabled: PropTypes.bool,
    // TODO remove when https://bitbucket.org/atlassian/atlaskit/pull-requests/958/fix-fix-proptypes-validation-in-our-eslint/diff is merged.
    // eslint-disable-next-line react/no-unused-prop-types
    focused: PropTypes.bool,
    // TODO remove when https://bitbucket.org/atlassian/atlaskit/pull-requests/958/fix-fix-proptypes-validation-in-our-eslint/diff is merged.
    // eslint-disable-next-line react/no-unused-prop-types
    isToday: PropTypes.bool,
    month: PropTypes.number.isRequired,
    onClick: PropTypes.func,
    // TODO remove when https://bitbucket.org/atlassian/atlaskit/pull-requests/958/fix-fix-proptypes-validation-in-our-eslint/diff is merged.
    // eslint-disable-next-line react/no-unused-prop-types
    previouslySelected: PropTypes.bool,
    selected: PropTypes.bool,
    // TODO remove when https://bitbucket.org/atlassian/atlaskit/pull-requests/958/fix-fix-proptypes-validation-in-our-eslint/diff is merged.
    // eslint-disable-next-line react/no-unused-prop-types
    sibling: PropTypes.bool,
    year: PropTypes.number.isRequired,
  }
  static defaultProps = {
    disabled: false,
    focused: false,
    onClick() {},
    previouslySelected: false,
    sibling: false,
    today: '',
  }
  handleClick = () => {
    const { children: day, month, onClick, year } = this.props;
    onClick({ year, month, day });
  }
  render() {
    const { children, focused, selected } = this.props;

    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <Td
        aria-live={focused ? 'polite' : ''}
        aria-selected={selected ? 'true' : 'false'}
        onClick={this.handleClick}
        role="gridcell"
      >
        <Div {...this.props}>
          {children}
        </Div>
      </Td>
    );
  }
}

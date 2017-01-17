/* eslint no-confusing-arrow: 0 */

import React, { PureComponent, PropTypes } from 'react';
import styled from 'styled-components';
import {
  akColorB75,
  akColorN0,
  akColorN80,
  akColorN400,
  akColorN600,
  akColorN700,
  akColorN900,
} from 'akutil-shared-styles';

function getBackgroundColor({ selected, previouslySelected }) {
  if (selected) {
    return akColorN0;
  }
  if (previouslySelected) {
    return akColorB75;
  }
  return 'transparent';
}

function getBorderColor({ focused }) {
  if (focused) {
    return akColorB75;
  }
  return 'transparent';
}

function getColor({ disabled, isToday, previouslySelected, selected, sibling }) {
  if (selected) {
    return akColorN700;
  }
  if (disabled) {
    return akColorN400;
  }
  if (previouslySelected) {
    return akColorN600;
  }
  if (isToday) {
    return akColorB75;
  }
  if (sibling) {
    return akColorN80;
  }
  return akColorN0;
}

function getCursor({ disabled }) {
  return disabled ? 'default' : 'pointer';
}

function getHoverBackgroundColor({ previouslySelected, selected }) {
  if (selected) {
    return akColorN0;
  }
  if (previouslySelected) {
    return akColorB75;
  }
  return akColorN900;
}

function getHoverColor({ previouslySelected, selected }) {
  if (selected || previouslySelected) {
    return akColorN600;
  }
  return akColorN0;
}

const Div = styled.div`
  background-color: ${getBackgroundColor};
  border: 2px solid ${getBorderColor};
  border-radius: 4px;
  color: ${getColor};
  cursor: ${getCursor};
  font-size: 12px;
  font-weight: lighter;
  padding: 2px 5px;
  position: relative;
  text-align: center;

  ${({ isToday }) => isToday ? `
    &:after {
      background-color: ${({ selected }) => selected ? akColorN700 : akColorB75};
      bottom: 1px;
      content: "";
      display: block;
      height: 1px;
      left: 2px;
      position: absolute;
      right: 2px;
    }
  ` : ''}

  &:hover {
    background-color: ${getHoverBackgroundColor};
    color: ${getHoverColor}
  }
`;

const Td = styled.td`
  border: 0;
  padding: 0;
`;

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
        onClick={this.handleClick}
        role="gridcell"
        aria-live={focused ? 'polite' : ''}
        aria-selected={selected ? 'true' : 'false'}
      >
        <Div {...this.props}>
          {children}
        </Div>
      </Td>
    );
  }
}

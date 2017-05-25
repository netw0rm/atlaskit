// @flow
import styled from 'styled-components';
import { gridSize } from '../../shared-variables';
import { focusOutline, truncate } from '../../utils/mixins';
import { getProvided } from '../../theme/util';

const borderRadius = 3;

const getItemOrDropdown = ({ theme, isDropdown }) =>
    getProvided(theme)[isDropdown ? 'dropdown' : 'item'];

const NavigationItemOuter = styled.div`
  border-radius: ${borderRadius}px;
  box-sizing: border-box;
  height: ${({ isCompact }) => (isCompact ? gridSize * 4.5 : gridSize * 5)}px;
  position: relative;
  ${truncate('100%')}

  button, a {
    background-color: ${(props) => {
      const item = getItemOrDropdown(props);
      if (props.isSelected) {
        return item.selected.background;
      }
      return item.default.background;
    }};
    border-radius: ${borderRadius}px;
    color: ${(props) => {
      const item = getItemOrDropdown(props);

      // selected.text is optional
      if (props.isSelected && item.selected.text) {
        return item.selected.text;
      }
      return getProvided(props.theme).text;
    }}
    display: block;
    height: 100%;
    /* In theory this wouldn't be required, but Chrome does not place focus styles correctly without it */
    position: relative;
    text-decoration: none;

    &:focus {
      ${({ theme }) => focusOutline(getProvided(theme).item.focus.outline)}
    }

    &:hover {
      background-color: ${props => getItemOrDropdown(props).hover.background};
    }

    &:active {
      background-color: ${props => getItemOrDropdown(props).active.background};
    }
  }
`;

NavigationItemOuter.displayName = 'NavigationItemOuter';
export default NavigationItemOuter;

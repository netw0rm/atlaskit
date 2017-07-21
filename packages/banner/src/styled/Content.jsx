import styled from 'styled-components';
import {
  akColorN0,
  akColorN800,
  akColorR400,
  akColorY300,

  akGridSizeUnitless,
} from '@atlaskit/util-shared-styles';
import { TRANSITION_DURATION } from './constants';

// exported for testing
export const ThemeColor = {
  background: {
    error: akColorR400,
    warning: akColorY300,
  },
  text: {
    error: akColorN0,
    warning: akColorN800,
  },
};

export const getBackgroundColor = ({ appearance }) => ThemeColor.background[appearance];
export const getTextColor = ({ appearance }) => ThemeColor.text[appearance];

export default styled.div`
  align-items: center;
  background-color: ${getBackgroundColor};
  color: ${getTextColor};
  display: flex;
  font-weight: 500;
  justify-content: center;
  padding: ${akGridSizeUnitless * 2}px;
  text-align: center;
  transition: color ${TRANSITION_DURATION};
`;

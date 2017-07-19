import styled from 'styled-components';
import { akColorN500, akColorY500, akGridSizeUnitless } from '@atlaskit/util-shared-styles';
import { actionsPadding } from './constants';

const ThemeColor = {
  text: {
    default: akColorN500,
    error: akColorY500,
  },
};

const ActionsItem = styled.div`
  display: flex;

  & + &::before {
    color: ${ThemeColor.text.default};
    content: "·";
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    width: ${actionsPadding}px;
  }
`;

const ErrorIcon = styled.span`
  color: ${ThemeColor.text.error};
  padding-right: ${akGridSizeUnitless}px;
`;

const ActionsContainer = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  margin-top: ${akGridSizeUnitless * 0.75}px;
`;

export {
  ActionsContainer,
  ActionsItem,
  ErrorIcon,
};

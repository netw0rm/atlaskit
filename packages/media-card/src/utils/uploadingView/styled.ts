import styled from 'styled-components';
import {rgba, parseToRgb} from 'polished';
import {akColorN0, akColorN900} from '@atlaskit/util-shared-styles';

/* tslint:disable:variable-name */

export const Wrapper = styled.div`
  position: relative;
  height: inherit;
`;

export const Overlay = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: ${rgba({...parseToRgb(akColorN900), alpha: 0.5})};
`;

export const Title = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  padding: 8px;
  color: ${akColorN0};
  font-size: 12px;
  line-height: 18px;
  word-wrap: break-word;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 8px;
  color: ${akColorN0};
`;

export const ProgressWrapper = styled.div`
  flex-grow: 1;

  /* hack to get progress bar to allways be in the same position regardless of whether a cancel icon is visible or not */
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 20px; /* height of the cancel icon :( */

`;

export const IconLink = styled.a`

  /* fix the vertical align from taking up extra space */
  display: flex;
  align-items: center;
  justify-content: center;

  margin-left: 4px; /* guessed a random number to make it look good since the icon doesn't fill the 20px square */

  cursor: pointer;
  color: ${akColorN0};
  &:hover {
    color: ${akColorN0};
    background-color: rgba(9, 30, 66, 0.06);
  }

`;

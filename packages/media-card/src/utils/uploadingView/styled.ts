/* tslint:disable:variable-name */
import styled from 'styled-components';
import {rgba, parseToRgb} from 'polished';
import {akColorN0, akColorN900} from '@atlaskit/util-shared-styles';
import {absolute, size, center} from '../../styles';

const bodyHeight = 26;

export const Wrapper = styled.div`
  position: relative;
  height: inherit;
  border-radius: inherit;
`;

export const Overlay = styled.div`
  ${absolute()}
  ${size()}
  border-radius: inherit;
  background-color: ${rgba({...parseToRgb(akColorN900), alpha: 0.5})};
`;

export const Title = styled.div`
  ${absolute()}
  width: 100%;
  padding: 8px;
  color: ${akColorN0};
  font-size: 12px;
  line-height: 18px;
  word-wrap: break-word;
`;

export const Body = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 8px;
  color: ${akColorN0};
`;

export const ProgressWrapper = styled.div`
  flex-grow: 1;

  /*
    force the height to always be 20px (the height of the cancel icon),
    so that the height of the progress bar doesn't jump when cards with
    and without a cancel icon are rendered side-by-side.
  */
  height: ${bodyHeight}px;

  /*
    vertically center the progress bar within the 20px, keeping the progress bar full width
  */
  display: flex;
  flex-direction: column;
  justify-content: center;

`;

export const IconLink = styled.a`

  /*
    fix the vertical align from taking up extra space
  */
  ${center}

  /*
    guessed a random number to make it look good since the icon doesn't fill the 20px square
  */
  margin-left: 4px;

  /*
    extra room to make it easier to touch on mobile
  */
  ${size(bodyHeight)}

  cursor: pointer;
  color: ${akColorN0};
  border-radius: 3px;

  &:hover, &:active {
    color: ${akColorN0};
    background-color: rgba(9, 30, 66, 0.06);
  }

`;

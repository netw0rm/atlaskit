/* tslint:disable:variable-name */
import styled from 'styled-components';
import { akFontFamily, akColorN0, akColorN30 } from '@atlaskit/util-shared-styles';
import { Root, borderRadius, spaceAround, cardShadow } from '../styles';

 // min-width required in Details to get proper text wrapping in IE11
export const Details = styled.div`
  ${spaceAround}
  flex-grow: 1;
  min-width: 320px;

  padding: 10px;
  background-color: ${akColorN30};
`;

export const Wrapper = styled(Root)`
  display: flex;
  user-select: none;
  background-color: ${akColorN0};
  font-family: ${akFontFamily};

  ${borderRadius}
  ${cardShadow}

  &.square {
    flex-direction: column;

    .details {
      height: 116px;
      flex-grow: 0;
      min-width: initial;
      border-radius: 0 0 3px 3px;
    }

    .media-card {
      height: 185px;
      border-radius: 3px 3px 0 0;
    }
  }

  .media-card {
    border-radius: 3px 0 0 3px;
  }
`;

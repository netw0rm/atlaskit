/* tslint:disable:variable-name */
import styled from 'styled-components';
import {akColorN0, akColorN300} from '@atlaskit/util-shared-styles';
import {center, ellipsis} from '../../styles';

export interface WrapperProps {
  contentMaxWidth: number;
}

export const Wrapper = styled.div`
  display: flex;
  box-sizing: border-box;
  max-width: ${({contentMaxWidth}: WrapperProps) => contentMaxWidth}px;
  flex-wrap: wrap;
  padding-top: 6px; /* allow space to avoid avatars getting clipped */
  padding-left: 16px;
`;

export const Widget = styled.div`
  ${center}
  height: 18px;
  max-width: calc(100% - 2*16px);
  margin-right: 16px;
  margin-bottom: 16px;

  /* space the widget items */
  & > * + * {
    margin-left: 4px;
  }

`;

export interface TitleProps {
  inverse?: boolean;
}

export const Title = styled.div`
  color: ${({inverse}: TitleProps) => inverse && akColorN0 || akColorN300};
`;

export const Text = styled.div`
  ${ellipsis('none')}
`;

export const IconImage = styled.img`
  width: 16px;
  height: 16px;
`;

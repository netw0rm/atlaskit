/* tslint:disable variable-name */
import styled from 'styled-components';
import {akColorN300, akColorN800} from '@atlaskit/util-shared-styles';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  height: 92px;
  box-sizing: border-box;
  padding: 14px 16px 16px 16px;
`;

export const Title = styled.div`
  height: 18px;
  flex-shrink: 0;
  margin-bottom: 6px;

  color: ${akColorN800};
  font-weight: 500;
  font-size: 16px;
  line-height: 18px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Description = styled.div`
  max-height: 36px;
  overflow: hidden;

  color: ${akColorN300};
  font-size: 12px;
  line-height: 18px;
`;

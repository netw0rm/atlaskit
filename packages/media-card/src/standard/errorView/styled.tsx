/* tslint:disable:variable-name */
import styled from 'styled-components';
import {size} from '../../styles';
import {akColorN70} from '@atlaskit/util-shared-styles';

export const Wrapper = styled.div`
  ${size()}
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 8px;
`;

export const Title = styled.div`
  vertical-align: middle;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: bold;
  color: ${akColorN70};
  font-size: 12px;
  line-height: 15px;
  overflow: hidden;
  max-width: ~"calc(100% - 24px)";
  text-overflow: ellipsis;
  white-space: nowrap;
`;

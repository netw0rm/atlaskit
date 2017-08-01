import styled from 'styled-components';

import {
  akColorB400,
  akColorN20,
  akColorN40,
  akColorB50
} from '@atlaskit/util-shared-styles';

export const ArrowWrapper = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: ${akColorN20};
  border-radius: 100%;
  display: flex;
  cursor: pointer;
  transition: opacity .3s;
  box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.6);
  color: black;
  width: 30px;
  height: 30px;
  justify-content: center;

  &:hover{
    color: black;
    background-color: ${akColorN40};
  }

  &:active{
    color: ${akColorB400};
    background-color: ${akColorB50};
  }
`;

export const ArrowLeftWrapper = styled(ArrowWrapper)`
  left: 20px;

  svg {
    padding-right: 2px;
  }
`;

export const ArrowRightWrapper = styled(ArrowWrapper)`
  right: 20px;

  svg {
    padding-left: 1px;
  }
`;

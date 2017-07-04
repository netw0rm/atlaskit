import styled from 'styled-components';import {
  akColorN200,
  akGridSizeUnitless,
} from '@atlaskit/util-shared-styles';

const Frame = styled.dl`
  margin: 0;
  padding: 0;

  dt {
    color: ${akColorN200};
    font-size: 12px;
    font-weight: 600;
    line-height: (16 / 12);
    padding: ${akGridSizeUnitless}px 0 ${akGridSizeUnitless / 2}px 0;
  }

  dd {
    margin: 0;
  }

  & + & {
    margin-top: ${akGridSizeUnitless * 3}px;
  }
`;

export default Frame;

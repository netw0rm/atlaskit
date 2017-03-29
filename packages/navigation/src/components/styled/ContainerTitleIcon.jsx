import {
  akGridSizeUnitless,
} from '@atlaskit/util-shared-styles';
import styled from 'styled-components';

const size = akGridSizeUnitless * 5;

export default styled.div`
  width: ${size};
  height: ${size};

  & > * {
    width: ${size};
    height: ${size};
    border-radius: 4px;
  }
`;

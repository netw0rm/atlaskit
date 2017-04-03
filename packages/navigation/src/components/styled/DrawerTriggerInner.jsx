import {
  akGridSizeUnitless,
  akColorN0,
} from '@atlaskit/util-shared-styles';
import styled from 'styled-components';
import focusRingMixin from '../../utils/focus-ring-mixin';

export default styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  background: none;
  border: none;
  border-radius: 50%;
  padding: 0;
  width: ${akGridSizeUnitless * 5}px;
  height: ${akGridSizeUnitless * 5}px;
  outline: none;
  color: ${akColorN0};

  ${focusRingMixin()}
`;

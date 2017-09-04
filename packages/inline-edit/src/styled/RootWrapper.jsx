import styled, { css } from 'styled-components';
import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';

const RootWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: -${akGridSizeUnitless}px;
  width: 100%;

  ${props => (!props.isEditing ? css`
    display: flex;
    flex: 0 1 auto;
    max-width: 100%;
  ` : null)}
`;

RootWrapper.displayName = 'RootWrapper';

export default RootWrapper;

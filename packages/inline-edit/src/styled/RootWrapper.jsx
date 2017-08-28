import styled, { css } from 'styled-components';
import { gridSize } from '@atlaskit/theme';

const RootWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: -${gridSize}px;

  ${props => (!props.isEditing ? css`
    display: inline-flex;
    flex: 0 1 auto;
    max-width: 100%;
  ` : null)}
`;

RootWrapper.displayName = 'RootWrapper';

export default RootWrapper;

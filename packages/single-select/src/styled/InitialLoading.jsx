import styled from 'styled-components';
import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';

const InitialLoading = styled.div`
  padding: 6px ${akGridSizeUnitless * 3}px;
`;

InitialLoading.displayName = 'InitialLoading';

export default InitialLoading;

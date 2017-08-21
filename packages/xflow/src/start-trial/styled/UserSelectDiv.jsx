import styled from 'styled-components';

import { gridSize, math } from '@atlaskit/theme';

const UserSelectDiv = styled.div`
  margin-left: ${math.multiply(gridSize, 4)}px;
`;

UserSelectDiv.displayName = 'UserSelectDiv';
export default UserSelectDiv;

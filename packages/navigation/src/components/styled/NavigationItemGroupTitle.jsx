import styled from 'styled-components';
import { akColorN90 } from '@atlaskit/util-shared-styles';

const NavigationItemGroupTitle = styled.div`
  align-self: center;
  color: ${akColorN90};
  display: flex;
  flex-grow: 1;
  font-size: 12px;
  text-transform: uppercase;
  
  [data-__ak-navigation-container-closed="true"] & {
    visibility: hidden;
  }
`;

NavigationItemGroupTitle.displayName = 'NavigationItemGroupTitle';
export default NavigationItemGroupTitle;

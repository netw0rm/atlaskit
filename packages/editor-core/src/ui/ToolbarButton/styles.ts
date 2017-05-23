import styled from 'styled-components';
import AkButtonDefault from '@atlaskit/button';

// tslint:disable-next-line:variable-name
export const AkButton = styled(AkButtonDefault)`
  line-height: 0;

  & + & {
    margin-left: 4px;
  }
`;

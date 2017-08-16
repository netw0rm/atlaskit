/* tslint:disable:variable-name */
import styled from 'styled-components';
import { akColorB400 } from '@atlaskit/util-shared-styles';
import { Href, HrefProps } from '../../utils/href';

export const A = styled(Href)`
  color: initial;
  // We need to do this to make TS happy
  ${(props: HrefProps) => ''}
  &:hover {
    .card-title {
      color: ${akColorB400};
    }

    .details {
      background-color: #e7e9ed;
    }
  }
`;

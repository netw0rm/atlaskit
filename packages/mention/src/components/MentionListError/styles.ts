import styled from 'styled-components';
import { akBorderRadius } from '@atlaskit/util-shared-styles';

// tslint:disable:next-line variable-name
export const MentionListErrorStyle = styled.div`
  background-color: #344563;
  color: #9ba4b3;

  border: 1px solid #fff;
  border-radius: ${akBorderRadius};

  height: 264px;

  & > {
    img {
      opacity: .5;
      padding-top: 70px;
    }

    p {
      margin: 0;
      text-align: center;
      font-size: 14px;
      padding-top: 20px;
    }
  }
`;

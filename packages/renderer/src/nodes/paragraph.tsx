import {
  akColorN800,
  akFontFamily,
  akFontSizeDefault,
} from '@atlaskit/util-shared-styles';
import styled from 'styled-components';

//tslint:disable-next-line
const Paragraph = styled.p`
  color: ${akColorN800};
  font-family: ${akFontFamily};
  font-size: ${akFontSizeDefault};
  font-weight: 400;
  line-height: 24px;
`;

export default Paragraph;

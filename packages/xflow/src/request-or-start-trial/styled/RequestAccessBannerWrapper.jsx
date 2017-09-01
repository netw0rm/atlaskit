import styled from 'styled-components';
import { gridSize, math } from '@atlaskit/theme';

const RequestAccessBannerWrapper = styled.div`
  width: 170px;
  margin: 0 auto ${math.multiply(gridSize, 3)}px auto;
`;

RequestAccessBannerWrapper.displayName = 'RequestAccessBannerWrapper';
export default RequestAccessBannerWrapper;

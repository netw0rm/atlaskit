import styled from 'styled-components';

import { gridSize, math } from '@atlaskit/theme';

const images = {
  card: 'https://aes-artifacts--cdn.us-east-1.prod.public.atl-paas.net/hashed/MIaiYFUBtLllUleonXxZqYV3RvnCiKN-AdRg5pUun5U/card-icon.svg',
  email: 'https://aes-artifacts--cdn.us-east-1.prod.public.atl-paas.net/hashed/Jl9ZH3eUNIVZMlvIDmOZocgQ01dRrDH2nMkXjEYGxJE/email-icon.svg',
  settings: 'https://aes-artifacts--cdn.us-east-1.prod.public.atl-paas.net/hashed/t1X9AbDG8RiEr496nPjjMLBUvZq_v7BxW877dDMKS0U/settings-icon.svg',
};

const ConfirmTrialAdminInfoImage = styled.div`
  @media all and (max-width: 800px) {
    margin: ${gridSize}px 0px ${math.multiply(gridSize, -3)}px 0px;
    padding-bottom: 0px;
  }

  display: block;
  margin: auto;
  width: ${math.multiply(gridSize, 3)}px;
  height: ${math.multiply(gridSize, 3)}px;
  padding-bottom: ${gridSize()}px;
  background: url(${props => images[props.imageType] || images.settings}) no-repeat;
  background-size: ${math.multiply(gridSize, 3)}px ${math.multiply(gridSize, 3)}px;
`;

ConfirmTrialAdminInfoImage.displayName = 'ConfirmTrialAdminInfoImage';
export default ConfirmTrialAdminInfoImage;

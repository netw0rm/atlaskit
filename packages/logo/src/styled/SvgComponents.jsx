import styled, { css } from 'styled-components';
import { logoColoursThemeKey } from '../components/LogoBase';

const getColor = (themeKey) => (props) => (
  props.theme[logoColoursThemeKey][themeKey]
);

// elements for text/wordmark portion of logos
const textFillStyle = css`fill: ${getColor('textColor')};`;
export const TextPath = styled.path`${textFillStyle}`;
export const TextPolygon = styled.polygon`${textFillStyle}`;
export const TextRect = styled.rect`${textFillStyle}`;

// elements for flat-color icon portion of logos
export const IconPath = styled.path`
  fill: ${getColor('iconColor')};
`;

// elements for gradient portion of icons in logos
export const IconGradientStart = styled.stop`
  stop-color: ${getColor('iconGradientStart')};
`;
export const IconGradientStop = styled.stop`
  stop-color: ${getColor('iconGradientStop')};
`;

import { css } from 'styled-components';
import colors from '!less-vars-loader?camelCase&resolveVariables!./colors.less';
import fonts from '!less-vars-loader?camelCase&resolveVariables!./fonts.less';
import grid from '!less-vars-loader?camelCase&resolveVariables!./grid.less';

const fontSizeDefault = parseInt(fonts.akFontSizeDefault, 10);
const gridSize = parseInt(grid.akGridSize, 10);

const baseHeading = (fontSize, lineHeight) => css`
    font-size: ${fontSize / fontSizeDefault}em;
    font-style: inherit;
    line-height: ${lineHeight / fontSize};
`;

export const akTypographyH900 = css`
    ${baseHeading(35, 40)}
    font-weight: 500;
    letter-spacing: -0.01em;
    margin-top: ${gridSize * 6.5}px;
`;

export const akTypographyH800 = css`
    ${baseHeading(29, 32)}
    font-weight: 600;
    letter-spacing: -0.01em;
    margin-top: ${gridSize * 5}px;
`;

export const akTypographyH700 = css`
    ${baseHeading(24, 28)}
    font-weight: 500;
    letter-spacing: -0.01em;
    margin-top: ${gridSize * 5}px;
`;

export const akTypographyH600 = css`
    ${baseHeading(20, 24)}
    font-weight: 500;
    letter-spacing: -0.008em;
    margin-top: ${gridSize * 3.5}px;
`;

export const akTypographyH500 = css`
    ${baseHeading(16, 20)}
    font-weight: 600;
    letter-spacing: -0.006em;
    margin-top: ${gridSize * 3}px;
`;

export const akTypographyH400 = css`
    ${baseHeading(14, 16)}
    font-weight: 600;
    letter-spacing: -0.003em;
    margin-top: ${gridSize * 2}px;
`;

export const akTypographyH300 = css`
    ${baseHeading(12, 16)}
    color: ${colors.akColorN300};
    font-weight: 600;
    margin-top: ${gridSize * 2.5}px;
    text-transform: uppercase;
`;

export const akTypographyH200 = css`
    ${baseHeading(12, 16)}
    color: ${colors.akColorN300};
    font-weight: 600;
    margin-top: ${gridSize * 2}px;
`;

export const akTypographyH100 = css`
    ${baseHeading(12, 16)}
    color: ${colors.akColorN300};
    font-weight: normal;
    margin-top: ${gridSize * 2}px;
`;

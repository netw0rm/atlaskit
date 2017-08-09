import { css } from 'styled-components';
import { colors, gridSize, math, themed } from '@atlaskit/theme';

export default ({ theme }) => css`
table {
  border-collapse: collapse;
  width: 100%;
}

thead,
tbody,
tfoot {
  border-bottom: 2px solid ${themed({ light: colors.N40, dark: colors.DN70 })};
}
td,
th {
  border: none;
  padding: ${math.divide(gridSize({ theme }), 2)}px ${gridSize({ theme })}px;
  text-align: left;
}
th {
  vertical-align: top;
}
td:first-child,
th:first-child {
  padding-left: 0;
}
td:last-child,
th:last-child {
  padding-right: 0;
}
caption {
  font-size: 20px;
  font-style: inherit;
  font-weight: 500;
  letter-spacing: -0.008em;
  line-height: 24px;
  margin-bottom: ${gridSize({ theme })}px;
  margin-top: ${math.multiply(gridSize({ theme }), 3.5)};
  text-align: left;
}
`;

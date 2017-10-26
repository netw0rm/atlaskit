import styled from 'styled-components';

const sizes = {
  xsmall: 16,
  small: 24,
  medium: 32,
  large: 40,
  xlarge: 48,
};

const Wrapper = styled.span`
  display: inline-block;
  height: ${p => sizes[p.size]}px;
  color: ${p => p.iconColor};
  fill: ${p => p.textColor};
  stop-color: currentColor;

  > svg {
    display: inline-block;
    height: inherit;
    fill: inherit;
    vertical-align: top;
  }
  svg, defs, linearGradient { stop-color: inherit; }
`;

export default Wrapper;

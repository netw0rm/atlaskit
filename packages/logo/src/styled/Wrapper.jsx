import styled from 'styled-components';

const sizes = {
  xsmall: 16,
  small: 24,
  medium: 32,
  large: 40,
  xlarge: 48,
};

const Wrapper = styled.span`
  color: ${p => p.iconColor};
  display: inline-block;
  fill: ${p => p.textColor};
  height: ${p => sizes[p.size]}px;
  position: relative;
  stop-color: currentColor;
  user-select: none;

  > svg {
    fill: inherit;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }
  > canvas {
    display: block;
    height: 100%;
    visibility: hidden;
  }
  /*
    The stop-color doesn't cascade down through these elements, so when we have a gradient
    that inherits currentColor, it won't be seen by the <stop> element within the <linearGradient>
  */
  svg, defs, linearGradient { stop-color: inherit; }
`;

export default Wrapper;

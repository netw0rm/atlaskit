import styled, { css } from 'styled-components';
import { akAnimationMixins } from '@atlaskit/util-shared-styles';

// map animation style
const translate = ['transform', 'translateY(XXpx)', 0, -200];
const translateAndRotate = ['transform', 'translateY(XXpx) rotate(45deg)', 0, -200];
const ANIMATION_STYLE = {
  bold: css`
    animation: ${akAnimationMixins.createBold(translate)} 1s 1;
  `,
  optimistic: css`
    animation: ${akAnimationMixins.createOptimistic(translate)} 1s 1;
  `,
  combined: css`
    animation: ${akAnimationMixins.createCombined(translateAndRotate)} 1s 1;
  `,
};

// map box style
const BOX_STYLE = {
  bold: css`
    border-radius: 10px;
  `,
  optimistic: css`
    border-radius: 100%;
  `,
  combined: css`
    border-radius:35px;
    transform: rotate(45deg);

    span {
      display: block;
      transform: rotate(-45deg);
    }
  `,
};

export const Box = styled.div`
  ${({ appearance }) => BOX_STYLE[appearance]}
  ${({ appearance, isAnimating }) => (isAnimating ? ANIMATION_STYLE[appearance] : null)}

  background-color: #0049B0;
  color: white;
  cursor: pointer;
  display: inline-block;
  font-size: 20px;
  height: 100px;
  line-height: 100px;
  margin: 30px;
  text-align: center;
  width: 100px;
`;

export const Container = styled.div`
  margin: auto;
  margin-top: 200px;
  width: 500px;
`;

export const Example = styled.div`
  border: 1px dotted blue;
  display: inline-block;
  margin: 10px;
  padding: 10px;
  width: 500px;
`;

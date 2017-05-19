import styled, { css } from 'styled-components';
import { akColorN50A, akColorN60A } from '@atlaskit/util-shared-styles';
import { backgroundMainColor, borderRadius, spacing } from './constants';

const halfSpacing = `${spacing / 2}px`;

export default styled.div`
  display: inline-flex;

  ${props => (props.fit && css`
    display: block;
    flex: 1 1 auto;
  `)}
`;
export const Content = styled.div`
  background: ${backgroundMainColor};
  border-radius: ${borderRadius};
  box-shadow: 0 ${halfSpacing} ${spacing}px -${spacing / 4}px ${akColorN50A}, 0 0 1px ${akColorN60A};
  box-sizing: border-box;
  overflow: auto;
  padding: ${halfSpacing} 0;
`;
export const Trigger = styled.div`
  cursor: pointer;
  display: inline-flex;
  transition-duration: 0.2s;
  transition: box-shadow 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38);

  ${props => (props.fit && css`
    box-sizing: border-box;
    display: block;
  `)}
`;

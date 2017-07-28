import styled, { css } from 'styled-components';
import Theme from './theme';

const { borderRadius, spacing } = Theme.$;

export default styled.div`
  display: inline-flex;

  ${props => (props.fit && css`
    display: block;
    flex: 1 1 auto;
  `)}
`;
export const Content = styled.div`
  background: ${Theme.Content.background};
  border-radius: ${borderRadius};
  box-shadow: ${Theme.Content.boxShadow};
  box-sizing: border-box;
  overflow: auto;
  padding: ${spacing / 2}px 0;
`;
export const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  min-width: ${20 * spacing}px;
  padding: ${2.5 * spacing}px;
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

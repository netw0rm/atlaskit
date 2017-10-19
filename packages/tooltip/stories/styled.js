import styled from 'styled-components';
import { colors } from '@atlaskit/theme';

const color = {
  blue: colors.B300,
  green: colors.G300,
  neutral: colors.N100,
  purple: colors.P300,
  red: colors.R300,
  teal: colors.T300,
  yellow: colors.Y300,
};

export const Target = styled.div`
  background-color: ${p => color[p.color] || colors.primary};
  border-radius: 3px;
  color: white;
  cursor: pointer;
  display: inline-block;
  height: 30px;
  line-height: 30px;
  padding-left: 1em;
  padding-right: 1em;
  user-select: none;
`;
export const Center = styled.div`
  box-sizing: border-box;
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
  padding: ${p => (p.pad ? '40px' : '0px')};
`;
export const Container = styled.div`
  margin: 0 auto;
  max-width: 600px;
  padding: ${p => (p.pad ? '40px' : '0px')};
`;
export const Box = styled.div`
  background-color: ${colors.N30};
  height: 140px;
  position: ${p => p.position || 'relative'};
  width: 140px;
`;
export const Spacer = styled.div`
  margin-bottom: 4em;
`;

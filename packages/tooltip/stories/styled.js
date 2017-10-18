import styled from 'styled-components';
import { colors } from '@atlaskit/theme';

export const Target = styled.div`
  background-color: ${colors.primary};
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

import styled from 'styled-components';
import { colors, themed } from '@atlaskit/theme';

export const Bar = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;
export const Footer = styled(Bar)`
  background-color: ${p => (p.appearance === 'inverted'
    ? themed({ light: colors.DN30, dark: colors.N0 })
    : null
  )};
  margin: 1em -1em;
  padding: 1em;
`;
export const Body = styled.div`
  color: ${colors.text};
  display: flex;
`;
export const Count = styled.div`
  border: 1px solid ${colors.subtleText};
  border-radius: 0.2em;
  font-size: 3em;
  font-weight: 500;
  margin-right: 0.5em;
  text-align: center;
  width: 3em;
`;
export const Header = styled(Bar)`margin-bottom: 2em;`;
export const Page = styled.div`
  color: ${colors.subtleText};
  margin: 0 auto;
  padding: 2em 0;
  width: 640px;
`;
export const Input = styled.input`
  margin-right: 0.5em;
`;
export const Label = styled.label`
  display: block;
  margin-bottom: 2em;
`;

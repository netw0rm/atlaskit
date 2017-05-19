import { akEditorPopupText } from '../../styles';
import styled from 'styled-components';
import FloatingToolbarDefault from '../FloatingToolbar';

export const Container = styled.div`
  & button > span > span:first-child {
    color: ${akEditorPopupText};
    min-width: 80px;
    text-align: left;
  }
  & span[role="menuitem"] {
    padding: 0 16px;
  }
`;

export const FloatingToolbar = styled(FloatingToolbarDefault)`
  background-color: transparent;
`;

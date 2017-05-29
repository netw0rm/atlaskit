import { akEditorPopupText } from '../../styles';
import styled from 'styled-components';
import FloatingToolbarDefault from '../FloatingToolbar';

// tslint:disable-next-line:variable-name
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

// tslint:disable-next-line:variable-name
export const FloatingToolbar: any = styled(FloatingToolbarDefault)`
  background-color: transparent;
`;

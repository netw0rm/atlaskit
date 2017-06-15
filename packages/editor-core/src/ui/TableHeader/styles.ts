import styled from 'styled-components';
import {
  akEditorTableToolbarSelected,
  akEditorTableBorder,
  akEditorTableBorderSelected,
  akEditorTableToolbar,
} from '../../styles';

// tslint:disable-next-line:variable-name
export const Container = styled.div`
  position: relative;
`;
// tslint:disable-next-line:variable-name
export const HeaderButton = styled.button`
    background: ${akEditorTableToolbar};
    border-top: 1px solid ${akEditorTableBorder};
    border-left: 1px solid ${akEditorTableBorder};
    display: block;
    padding: 0;
    cursor: pointer;
    &:hover, .active > & {
      background-color: ${akEditorTableToolbarSelected};
      border-color: ${akEditorTableBorderSelected};
    }
    &:focus {
      outline: none;
    }
`;

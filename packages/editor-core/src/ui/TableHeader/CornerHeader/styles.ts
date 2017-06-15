import styled from 'styled-components';
import {
  akEditorTableBorderRadius,
  akEditorTableToolbarSelected,
  akEditorTableBorder,
  akEditorTableBorderSelected,
  akEditorTableToolbar,
  akEditorTableToolbarSize
} from '../../../styles';

// tslint:disable-next-line:variable-name
export const Header = styled.div`
    position: absolute;
    top: -${akEditorTableToolbarSize}px;
    left: -${akEditorTableToolbarSize}px;
    width: ${akEditorTableToolbarSize}px;
    height: ${akEditorTableToolbarSize}px;
`;
// tslint:disable-next-line:variable-name
export const Button = styled.button`
    position: absolute;
    right: -1px;
    bottom: -1px;
    width: ${akEditorTableToolbarSize}px;
    height: ${akEditorTableToolbarSize}px;
    background-image: linear-gradient(to bottom right, #fff 0, #fff 49%, ${akEditorTableToolbar} 50%, ${akEditorTableToolbar} 100%);
    box-shadow: inset 0 0 0 1px #fff;
    border: 1px solid ${akEditorTableBorder};
    border-top-left-radius: ${akEditorTableBorderRadius};
    cursor: pointer;
    padding: 0;

    &:hover, .active > & {
      background-image: linear-gradient(to bottom right, #fff 0, #fff 49%, ${akEditorTableToolbarSelected} 50%, ${akEditorTableToolbarSelected} 100%);
      border-color: ${akEditorTableBorderSelected};
      z-index: 1;
    }
    &:focus {
      outline: none;
    }
`;

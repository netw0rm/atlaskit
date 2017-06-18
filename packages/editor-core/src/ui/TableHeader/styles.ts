import styled from 'styled-components';
import {
  akEditorTableBorderRadius,
  akEditorTableToolbarSelected,
  akEditorTableBorder,
  akEditorTableBorderSelected,
  akEditorTableToolbar,
  akEditorTableToolbarSize
} from '../../styles';

// tslint:disable-next-line:variable-name
export const Container = styled.div`
  position: relative;
`;
// tslint:disable-next-line:variable-name
export const CornerHeader = styled.div`
    position: absolute;
    top: -${akEditorTableToolbarSize}px;
    left: -${akEditorTableToolbarSize}px;
    width: ${akEditorTableToolbarSize}px;
    height: ${akEditorTableToolbarSize}px;
`;

// tslint:disable-next-line:variable-name
export const CornerButton = styled.button`
    position: absolute;
    right: -1px;
    bottom: -1px;
    width: ${akEditorTableToolbarSize}px;
    height: ${akEditorTableToolbarSize}px;
    background-image: linear-gradient(to bottom right, #fff 0, #fff 49%, ${akEditorTableBorder} 50%, ${akEditorTableBorder} 100%);
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

// tslint:disable-next-line:variable-name
export const HeaderButtonDefault = styled.button`
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
// tslint:disable-next-line:variable-name
export const InsertButtonDefault = styled.div`
  background: white;
  border-radius: 3px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  position: absolute;
  z-index: 20;
  width: 36px;
  height: 30px;
  display: flex;
  justify-content: center;
  & button {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;
// tslint:disable-next-line:variable-name
export const InsertMarkerDefault = styled.div`
    background-color: ${akEditorTableBorder};
    position: absolute;
    height: 4px;
    width: 4px;
    border-radius: 50%;
    div:hover > & {
      background-color: ${akEditorTableBorderSelected}
    }
`;

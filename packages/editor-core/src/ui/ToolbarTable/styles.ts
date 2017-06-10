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
export const TableHeader = styled.div`
    position: absolute;
    top: -${akEditorTableToolbarSize}px;
    left: -${akEditorTableToolbarSize}px;
    width: ${akEditorTableToolbarSize}px;
    height: ${akEditorTableToolbarSize}px;
    margin-right: -1px;
    margin-bottom: -1px;
`;
// tslint:disable-next-line:variable-name
export const TableHeaderButton = styled.button`
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

    &:hover {
      background-image: linear-gradient(to bottom right, #fff 0, #fff 49%, ${akEditorTableToolbarSelected} 50%, ${akEditorTableToolbarSelected} 100%);
      border-color: ${akEditorTableBorderSelected};
      z-index: 10;
    }
    &:focus {
      outline: none;
    }
`;
// tslint:disable-next-line:variable-name
export const ColHeaderWrap = styled.div`
    position: absolute;
    top: -${akEditorTableToolbarSize - 1}px;
    left: 0;
    height: ${akEditorTableToolbarSize}px;
    box-sizing: border-box;
`;
// tslint:disable-next-line:variable-name
export const ColHeaderWrapInner = styled.div`
    display: flex;
    & > div:last-child button {
      border-top-right-radius: ${akEditorTableBorderRadius};
    }
`;
// tslint:disable-next-line:variable-name
export const ColHeader = styled.div`
    position: relative;
    margin-right: -1px;
    &:hover {
      z-index: 1;
    }
`;
// tslint:disable-next-line:variable-name
export const ColHeaderButton = styled.button`
    background: ${akEditorTableToolbar};
    border-right: 1px solid ${akEditorTableBorder};
    border-top: 1px solid ${akEditorTableBorder};
    border-left: 1px solid ${akEditorTableBorder};
    border-bottom: none;
    display: block;
    height: ${akEditorTableToolbarSize - 1}px;
    width: 100%;
    cursor: pointer;
    padding: 0;

    &:hover {
      background-color: ${akEditorTableToolbarSelected};
      border-color: ${akEditorTableBorderSelected};
      border-bottom: 1px solid ${akEditorTableBorderSelected};
      height: ${akEditorTableToolbarSize}px;
    }
    &:focus {
      outline: none;
    }
`;

// tslint:disable-next-line:variable-name
export const RowHeaderWrap = styled.div`
    position: absolute;
    top: 1px;
    left: -${akEditorTableToolbarSize - 1}px;
    width: ${akEditorTableToolbarSize}px;
    box-sizing: border-box;
`;
// tslint:disable-next-line:variable-name
export const RowHeaderWrapInner = styled.div`
    display: flex;
    flex-direction: column;
    & > div:last-child button {
      border-bottom-left-radius: ${akEditorTableBorderRadius};
    }
`;
// tslint:disable-next-line:variable-name
export const RowHeader = styled.div`
    position: relative;
    margin-top: -1px;
    &:hover {
      z-index: 1;
    }
`;
// tslint:disable-next-line:variable-name
export const RowHeaderButton = styled.button`
    background: ${akEditorTableToolbar};
    border-right: none;
    border-top: 1px solid ${akEditorTableBorder};
    border-left: 1px solid ${akEditorTableBorder};
    border-bottom: 1px solid ${akEditorTableBorder};
    display: block;
    height: 100%;
    width: ${akEditorTableToolbarSize - 1}px;
    cursor: pointer;
    padding: 0;

    &:hover, &.active {
      background-color: ${akEditorTableToolbarSelected};
      border-color: ${akEditorTableBorderSelected};
      border-right: 1px solid ${akEditorTableBorderSelected};
      width: ${akEditorTableToolbarSize}px;
    }
    &:focus {
      outline: none;
    }
`;

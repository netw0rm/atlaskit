import styled from 'styled-components';
import {
  akEditorTableBorderRadius,
  akEditorTableBorder,
  akEditorTableBorderSelected,
  akEditorTableToolbarSize
} from '../../../styles';
import { HeaderButton } from '../styles';

// tslint:disable-next-line:variable-name
export const Header = styled.div`
    position: absolute;
    top: -${akEditorTableToolbarSize - 1}px;
    left: 0;
    height: ${akEditorTableToolbarSize}px;
    box-sizing: border-box;
`;
// tslint:disable-next-line:variable-name
export const ColumnContainer = styled.div`
    display: flex;
    & > div:last-child button {
        border-top-right-radius: ${akEditorTableBorderRadius};
    }
`;
// tslint:disable-next-line:variable-name
export const ButtonWrap = styled.div`
    position: relative;
    margin-right: -1px;
    &:hover, &.active {
      z-index: 1;
    }
`;
// tslint:disable-next-line:variable-name
export const Button = styled(HeaderButton)`
    border-right: 1px solid ${akEditorTableBorder};
    border-bottom: none;
    height: ${akEditorTableToolbarSize - 1}px;
    width: 100%;

    &:hover, .active > & {
      border-bottom: 1px solid ${akEditorTableBorderSelected};
      height: ${akEditorTableToolbarSize}px;
    }
`;

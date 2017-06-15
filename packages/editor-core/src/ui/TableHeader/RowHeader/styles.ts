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
    top: 1px;
    left: -${akEditorTableToolbarSize - 1}px;
    width: ${akEditorTableToolbarSize}px;
    box-sizing: border-box;
`;
// tslint:disable-next-line:variable-name
export const RowContainer = styled.div`
    display: flex;
    flex-direction: column;
    & > div:last-child button {
      border-bottom-left-radius: ${akEditorTableBorderRadius};
    }
`;
// tslint:disable-next-line:variable-name
export const ButtonWrap = styled.div`
    position: relative;
    margin-top: -1px;
    &:hover, &.active {
      z-index: 1;
    }
`;
// tslint:disable-next-line:variable-name
export const Button = styled(HeaderButton)`
    border-right: none;
    border-bottom: 1px solid ${akEditorTableBorder};
    height: 100%;
    width: ${akEditorTableToolbarSize - 1}px;

    &:hover, .active > & {
      border-right: 1px solid ${akEditorTableBorderSelected};
      width: ${akEditorTableToolbarSize}px;
    }
`;

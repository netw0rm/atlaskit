import styled from 'styled-components';

import {
  emojiPreviewSelectedColor,
  emojiTypeAheadMaxHeight,
  emojiTypeAheadWidth,
  noDialogContainerBorderColor,
  noDialogContainerBorderRadius,
  noDialogContainerBoxShadow,
} from '../../shared-styles';

export interface TypeAheadProps {
  visible: boolean;
}

// tslint:disable-next-line:variable-name
export const TypeAheadStyle = styled.div`
  display: ${(props: TypeAheadProps) => props.visible ? 'block' : 'none'};
`;

// tslint:disable-next-line:variable-name
export const TypeAheadItemRowStyle = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  vertical-align: middle;
`;

export interface TypeAheadItemProps {
  selected: boolean;
}

// tslint:disable-next-line:variable-name
export const TypeAheadItemStyle = styled.div`
  cursor: pointer;
  display: block;
  list-style-type: none;
  overflow: hidden;
  width: ${emojiTypeAheadWidth}px;
  background-color: ${(props: TypeAheadItemProps) => props.selected ? emojiPreviewSelectedColor : 'transparent'};
`;

export interface TypeAheadListProps {
  empty: boolean;
}

// tslint:disable-next-line:variable-name
export const TypeAheadListStyle = styled.div`
  background: white;
  border: 1px solid ${noDialogContainerBorderColor};
  border-radius: ${noDialogContainerBorderRadius};
  box-shadow: ${noDialogContainerBoxShadow}
  color: #333;
  width: ${emojiTypeAheadWidth}px;
  display: ${(props: TypeAheadListProps) => props.empty ? 'none' : 'block'};
`;

// tslint:disable-next-line:variable-name
export const TypeAheadSpinnerContainerStyle = styled.div`
  position: relative;
  height: ${emojiTypeAheadMaxHeight}px;
  padding-top: ${((emojiTypeAheadMaxHeight - 30) / 2).toFixed()}px;
  box-sizing: border-box;
`;

// tslint:disable-next-line:variable-name
export const TypeAheadSpinnerStyle = styled.div`
  text-align: center;
`;

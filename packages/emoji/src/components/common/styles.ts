import styled from 'styled-components';

import {
  akBorderRadius,
  akColorN200,
  akColorN900,
} from '@atlaskit/util-shared-styles';

import { SpriteSheet } from '../../';
import { akEmojiSelectedBackgroundColor } from '../../shared-styles';

export interface SpriteProps {
  sprite: SpriteSheet;
  xPositionInPercent: number;
  yPositionInPercent: number;
  preview?: boolean;
}

// these simple functions are exported for testing purposes
export const spriteUtils = {
  backgroundImage: (props: SpriteProps) => `url(${props.sprite.url})`,
  backgroundPosition: (props: SpriteProps) => `${props.xPositionInPercent}% ${props.yPositionInPercent}%`,
  backgroundSize: (props: SpriteProps) => `${props.sprite.column * 100}% ${props.sprite.row * 100}%`,
};

// tslint:disable-next-line:variable-name
export const SpriteStyle = styled.span`
  background: transparent no-repeat;
  display: block;

  width: ${(props: SpriteProps) => props.preview ? '32' : '24'}px;
  height: ${(props: SpriteProps) => props.preview ? '32' : '24'}px;
  background-image: ${(props: SpriteProps) => spriteUtils.backgroundImage(props)};
  background-position: ${(props: SpriteProps) => spriteUtils.backgroundPosition(props)};
  background-size: ${(props: SpriteProps) => spriteUtils.backgroundSize(props)};
`;

export interface ContainerProps {
  selected?: boolean;
}

// tslint:disable-next-line:variable-name
export const ContainerStyle = styled.span`
  display: inline-block;
  vertical-align: middle;

  /*
    Ensure along with vertical align middle,
    we don't increase the line height for h1..h6, and p
  */
  margin: -1px 0;

  background-color: ${(props: ContainerProps) => props.selected ? akEmojiSelectedBackgroundColor : 'transparent'};
`;

export interface EmojiProps {
  selected?: boolean;
}

// tslint:disable-next-line:variable-name
export const EmojiStyle = styled.span`
  border-radius: 5px;
  background-color: ${(props: EmojiProps) => props.selected ? akEmojiSelectedBackgroundColor : 'transparent'};
  display: inline-block;
  vertical-align: middle;

  /*
    Ensure along with vertical align middle, we don't increase the line height for p and some
    headings. Smaller headings get a slight increase in height, cannot add more negative margin
    as a "selected" emoji (e.g. in the editor) will not look good.
  */
  margin: -1px 0;

  & > img {
    max-height: 24px;
    display: block;
  }
`;

// tslint:disable-next-line:variable-name
export const ButtonStyle = styled.button`
  background-color: transparent;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 0;
  padding: 4px;

  /* Firefox */
  &::-moz-focus-inner {
    border: 0 none;
    padding: 0;
  }
`;

export interface PlaceholderProps {
  size: number;
}

// tslint:disable-next-line:variable-name
export const PlaceholderStyle = styled.svg`
  display: inline-block;
  fill: #f7f7f7;
  width: ${(props: PlaceholderProps) => props.size}px;
  height: ${(props: PlaceholderProps) => props.size}px;
  height: 24px;
  vertical-align: middle;
`;

export interface ScrollableProps {
  maxHeight: string;
}

// tslint:disable-next-line:variable-name
export const ScrollableStyle = styled.div`
  border: 1px solid #fff;
  border-radius: ${akBorderRadius};
  display: block;
  margin: 0;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0;
  max-height: ${(props: ScrollableProps) => props.maxHeight ? props.maxHeight : 'none'};
`;

// tslint:disable-next-line:variable-name
export const PreviewStyle = styled.div`
  display: flex;
  padding: 10px;
`;

// tslint:disable-next-line:variable-name
export const PreviewEmojiStyle = styled.span`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

// tslint:disable-next-line:variable-name
export const PreviewImgStyle = styled.span`
  display: inline-block;
  flex: initial;
  width: 32px;

  & > span {
    width: 32px;
    height: 32px;
    padding: 0;
    max-height: inherit;

    & > img {
      position: relative;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
      max-height: 32px;
      max-width: 32px;
      padding: 0;
      display: block;
    }
  }
`;

// tslint:disable-next-line:variable-name
export const ToneSelectedContainerStyle = styled.div`
  flex: 1;
  text-align: right;
`;

// tslint:disable-next-line:variable-name
export const ButtonsStyle = styled.div`
  flex: 1;
  text-align: right;
`;

export interface PreviewTextProps {
  withToneSelector: boolean;
  previewSingleLine: boolean;
}

// tslint:disable-next-line:variable-name
export const PreviewTextStyle = styled.div`
  flex: column;
  margin-left: 10px;
  margin-top: -2px;
  width: 285px; /* IE */

  max-width: ${(props: PreviewTextProps) => props.withToneSelector ? '255' : '285'}px;
  padding-top: ${(props: PreviewTextProps) => props.previewSingleLine ? '10' : '0'}px;
`;

export interface PreviewTextInternalProps {
  previewSingleLine: boolean;
}

// tslint:disable-next-line:variable-name
export const PreviewTextNameStyle = styled.span`
  display: ${(props: PreviewTextInternalProps) => props.previewSingleLine ? 'none' : 'block'};
  color: ${akColorN900};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:first-letter {
    text-transform: uppercase;
  }
`;

// tslint:disable-next-line:variable-name
export const PreviewTextShortNameStyle = styled.span`
  display: block;
  color: ${(props: PreviewTextInternalProps) => props.previewSingleLine ? akColorN900 : akColorN200};
  font-size: ${(props: PreviewTextInternalProps) => props.previewSingleLine ? '14' : '12'}px;
  line-height: 1;
  margin-bottom: -2px;
  overflow: hidden;
  padding-bottom: 2px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

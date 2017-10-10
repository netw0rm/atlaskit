import * as React from 'react';
import TooltipWrapper from './TooltipWrapper';
import { placeholderEmoji, placeholderContainer } from './styles';
import { defaultEmojiHeight } from '../../constants';
import { EmojiImageRepresentation } from '../../types';
import { isImageRepresentation, isMediaRepresentation } from '../../type-helpers';
import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';

export interface Props {
  shortName: string;
  size?: number;
  showTooltip?: boolean;
  representation?: EmojiImageRepresentation;
  fitToHeight?: number;
}

// tslint:disable-next-line:variable-name
const EmojiPlaceholder = (props: Props) => {
  const { shortName, size = defaultEmojiHeight, showTooltip, representation, fitToHeight } = props;

  let scaledWidth;
  let scaledHeight;
  if (representation && fitToHeight && (isImageRepresentation(representation) || isMediaRepresentation(representation))) {
    const width = representation.width;
    const height = representation.height;
    if (width && height) {
      scaledWidth = fitToHeight / height * width;
      scaledHeight = fitToHeight;
    }
  }
  const width: number = scaledWidth || size;
  const height: number = scaledHeight || size;

  const style = {
    fill: 'f7f7f7',
    width: `${width}px`,
    height: `${height}px`,
  };
  const pad = akGridSizeUnitless/2;

  const placeholderNode = (
    <svg className={placeholderEmoji} style={style} xmlns="http://www.w3.org/2000/svg" >
      <rect width={width} height={height} rx={pad} ry={pad} aria-label={shortName} />
    </svg>
  );
  return (
    showTooltip ?
      <TooltipWrapper description={shortName} className={placeholderContainer}>{placeholderNode}</TooltipWrapper>
      : placeholderNode
    );
};

export default EmojiPlaceholder;

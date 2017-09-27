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
  };
  const border = akGridSizeUnitless;

  const placeholderNode = (
    <svg className={placeholderEmoji} style={style} width={width} height={height} xmlns="http://www.w3.org/2000/svg" >
      <rect width={width-2} height={height} rx={border/2} ry={border/2} aria-label={shortName} />
    </svg>
  );
  return (
    showTooltip ?
      <TooltipWrapper description={shortName} className={placeholderContainer}>{placeholderNode}</TooltipWrapper>
      : placeholderNode
    );
};

export default EmojiPlaceholder;

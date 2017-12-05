import * as React from 'react';
import * as classNames from 'classnames';
import { placeholder, placeholderContainer, emojiTooltip } from './styles';
import { defaultEmojiHeight } from '../../constants';
import { EmojiImageRepresentation } from '../../types';
import { isImageRepresentation, isMediaRepresentation } from '../../type-helpers';

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
      scaledWidth = (fitToHeight / height) * width;
      scaledHeight = fitToHeight;
    }
  }
  const width: number = scaledWidth || fitToHeight || size;
  const height: number = scaledHeight || fitToHeight || size;
  const style = {
    fill: 'f7f7f7',
    width: `${width}px`,
    height: `${height}px`,
  };
  const classes = {
    [placeholder]: true,
    [placeholderContainer]: true,
    [emojiTooltip]: showTooltip
  };

  return <span aria-label={shortName} className={classNames(classes)} style={style} />;
};

export default EmojiPlaceholder;

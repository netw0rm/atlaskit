import * as React from 'react';
import TooltipWrapper from './TooltipWrapper';
import { placeholderEmoji, placeholderContainer } from './styles';

export const defaultSize = 24;

export interface Props {
  shortName: string;
  size?: number;
  showTooltip?: boolean;
}

// tslint:disable-next-line:variable-name
const EmojiPlaceholder = (props: Props) => {
  const { shortName, size = defaultSize, showTooltip } = props;
  const center = Math.floor(size / 2);
  const radius = center - 1;
  const style = {
    width: `${size}px`,
    height: `${size}px`,
  };
  const placeholderNode = (
    <svg className={placeholderEmoji} style={style} viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg" >
      <circle cx={center} cy={center} r={radius} aria-label={shortName} />
    </svg>
  );
  return (
    showTooltip ?
      <TooltipWrapper description={shortName} children={placeholderNode} className={placeholderContainer}/>
      : placeholderNode
    );
};

export default EmojiPlaceholder;

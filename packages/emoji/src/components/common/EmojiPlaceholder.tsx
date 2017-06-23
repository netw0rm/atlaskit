import * as React from 'react';
import Tooltip from '@atlaskit/Tooltip';
import { placeholderEmoji, placeholderContainer } from './styles';

export const defaultSize = 24;

export interface Props {
  shortName: string;
  name?: string;
  size?: number;
  showTooltip?: boolean;
}

// tslint:disable-next-line:variable-name
const EmojiPlaceholder = (props: Props) => {
  const { shortName, name = 'Unknown Emoji', size = defaultSize, showTooltip } = props;
  const center = Math.floor(size / 2);
  const radius = center - 1;
  const style = {
    width: `${size}px`,
    height: `${size}px`,
  };
  const placeholderNode = (
    <svg className={placeholderEmoji} style={style} viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg" >
      <circle cx={center} cy={center} r={radius} />
    </svg>
  );
  return (
    showTooltip ?
      <div className={placeholderContainer}>
        <Tooltip description={`${name} (${shortName})`} position="top">
          {placeholderNode}
        </Tooltip>
      </div>
      : placeholderNode
    );
};

export default EmojiPlaceholder;

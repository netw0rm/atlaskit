import * as React from 'react';
import { PlaceholderStyle } from './styles';

export const defaultSize = 24;

export interface Props {
  shortName: string;
  name?: string;
  size?: number;
}

// tslint:disable-next-line:variable-name
const EmojiPlaceholder = (props: Props) => {
  const { shortName, name = 'Unknown Emoji', size = defaultSize } = props;
  const center = Math.floor(size / 2);
  const radius = center - 1;

  return (
    <PlaceholderStyle size={size} viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg" >
      <circle cx={center} cy={center} r={radius}>
        <title>{`${name} (${shortName})`}</title>
      </circle>
    </PlaceholderStyle>
  );
};

export default EmojiPlaceholder;

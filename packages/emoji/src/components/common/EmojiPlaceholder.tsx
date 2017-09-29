import * as React from 'react';
import * as classNames from 'classnames';
import { placeholderContainer, emojiTooltip } from './styles';
import { defaultEmojiHeight } from '../../constants';

export interface Props {
  shortName: string;
  size?: number;
  showTooltip?: boolean;
}

// tslint:disable-next-line:variable-name
const EmojiPlaceholder = (props: Props) => {
  const { shortName, size = defaultEmojiHeight, showTooltip } = props;
  const style = {
    width: `${size}px`,
    height: `${size}px`,
  };
  const classes = {
    [placeholderContainer]: true,
    [emojiTooltip]: showTooltip
  };

  return <span aria-label={shortName} className={classNames(classes)} style={style} />;
};

export default EmojiPlaceholder;

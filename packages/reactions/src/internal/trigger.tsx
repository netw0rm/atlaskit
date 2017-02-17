import { EditorEmojiIcon } from '@atlaskit/icon';
import {
  akBorderRadius,
  akColorN0,
  akColorN30A,
  akColorN70
} from '@atlaskit/util-shared-styles';
import * as cx from 'classnames';
import * as React from 'react';
import { PureComponent } from 'react';
import { style } from 'typestyle';
import { isLeftClick } from './helpers';

export interface Props {
  onClick: Function;
  miniMode?: boolean;
}

const triggerStyle = style({
  background: akColorN0,
  border: 0,
  borderRadius: akBorderRadius,
  cursor: 'pointer',
  boxSizing: 'border-box',
  padding: 0,
  margin: 0,
  width: '32px',
  height: '32px',
  $nest: {
    '&:hover, &:active': {
      background: akColorN30A
    },
    '&.miniMode': {
      color: akColorN70,
      width: '20px',
      height: '20px',
      overflow: 'hidden',
      $nest: {
        '&> span': {
          width: '20px',
          height: '20px'
        }
      }
    }
  }
});

export default class Trigger extends PureComponent<Props, {}> {

  private handleMouseDown = (event) => {
    event.preventDefault();
    if (this.props.onClick && isLeftClick(event)) {
      this.props.onClick(event);
    }
  }

  render() {
    const classNames = cx(triggerStyle, {
      'miniMode': this.props.miniMode
    });

    return (
      <button
        className={classNames}
        onMouseDown={this.handleMouseDown}
      >
        <EditorEmojiIcon label="Add reaction" />
      </button>
    );
  }

}

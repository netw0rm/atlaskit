import * as React from 'react';
import { PureComponent, SyntheticEvent } from 'react';
import * as cx from 'classnames';
import * as styles from './styles';

export type MentionEventHandler = (mentionId: string, text: string, event?: SyntheticEvent<HTMLSpanElement>) => void;

export interface Props {
  id: string;
  text: string;
  isHighlighted?: boolean;
  onClick?: MentionEventHandler;
  onMouseEnter?: MentionEventHandler;
  onMouseLeave?: MentionEventHandler;
}

export default class Mention extends PureComponent<Props, {}> {

  private handleOnClick = (e: SyntheticEvent<HTMLSpanElement>) => {
    const { id, text, onClick } = this.props;
    if (onClick) {
      onClick(id, text, e);
    }
  }

  private handleOnMouseEnter = (e: SyntheticEvent<HTMLSpanElement>) => {
    const { id, text, onMouseEnter } = this.props;
    if (onMouseEnter) {
      onMouseEnter(id, text, e);
    }
  }

  private handleOnMouseLeave = (e: SyntheticEvent<HTMLSpanElement>) => {
    const { id, text, onMouseLeave } = this.props;
    if (onMouseLeave) {
      onMouseLeave(id, text, e);
    }
  }

  render() {
    const { props } = this;
    const classNames = cx('ak-mention', styles.mention, {
      [styles.highlighted]: props.isHighlighted
    });

    return (
      <span
        className={classNames}
        onClick={this.handleOnClick}
        onMouseEnter={this.handleOnMouseEnter}
        onMouseLeave={this.handleOnMouseLeave}
      >
        {props.text}
      </span>
    );
  }
}

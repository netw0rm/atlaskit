import * as React from 'react';
import { PureComponent, SyntheticEvent } from 'react';
import { MentionStyle, UnpermittedMentionStyle, MentionContainer } from './styles';
import Tooltip from '@atlaskit/tooltip';
import { isRestricted } from '../../types';

export type MentionEventHandler = (mentionId: string, text: string, event?: SyntheticEvent<HTMLSpanElement>) => void;

export interface Props {
  id: string;
  text: string;
  isHighlighted?: boolean;
  accessLevel?: string;
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
    const {
      handleOnClick,
      handleOnMouseEnter,
      handleOnMouseLeave,
      props,
    } = this;
    const { accessLevel, isHighlighted, text } = props;
    const restricted: boolean = isRestricted(accessLevel);

    let mentionComponent;
    if (restricted) {
      mentionComponent = (
        <Tooltip
          description={`${text} won't be notified as they have no access`}
          position="right"
        >
          <UnpermittedMentionStyle
            highlighted={isHighlighted}
            onClick={handleOnClick}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          >
            {text}
          </UnpermittedMentionStyle>
        </Tooltip>
      );
    } else {
      mentionComponent = (
        <MentionStyle
          highlighted={isHighlighted}
          onClick={handleOnClick}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
        >
          {text}
        </MentionStyle>
      );
    }

    return (
      <MentionContainer>
        {mentionComponent}
      </MentionContainer>
    );
  }
}

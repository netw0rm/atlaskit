import * as React from 'react';
import { PureComponent, ReactElement } from 'react';
import Participants from './Participants';

import {
  CardHeadingWrapper,
  ContentWrapper,
  ParticipantWrapper,
  Wrapper,
} from '../styled/Item';

import { Appearance, Participant } from '../types';
import { Placeholder } from '../styled/Placeholder';

export interface ContentRef {
  (ref: HTMLElement | undefined): void;
}

export interface Props {
  icon: JSX.Element;
  children?: ReactElement<any>;
  participants?: Participant[];
  appearance?: Appearance;
  contentRef?: ContentRef;
  placeholder: string;
  showPlaceholder?: boolean;
}

export default class Item extends PureComponent<Props, {}> {
  public static defaultProps: Partial<Props> = {
    appearance: 'inline',
  };

  private renderPlaceholder() {
    const { children, placeholder, showPlaceholder } = this.props;
    if (!showPlaceholder || children) {
      return null;
    }
    return <Placeholder contentEditable={false}>{placeholder}</Placeholder>;
  }

  renderParticipants() {
    const { appearance, participants = [] } = this.props;
    if (appearance === 'inline' || !participants.length) {
      return null;
    }
    return (
      <ParticipantWrapper>
        <Participants participants={participants} />
      </ParticipantWrapper>
    );
  }

  renderCardAppearance() {
    const { appearance, contentRef, children, icon } = this.props;
    return (
      <Wrapper theme={{ appearance }}>
        <CardHeadingWrapper>
          {icon}
          {this.renderParticipants()}
          {this.renderPlaceholder()}
        </CardHeadingWrapper>
        <ContentWrapper innerRef={contentRef}>
          {children}
        </ContentWrapper>
      </Wrapper>
    );
  }

  renderMessageAppearance() {
    const { appearance, contentRef, children, icon } = this.props;
    return (
      <Wrapper theme={{ appearance }}>
        {icon}
        {this.renderPlaceholder()}
        <ContentWrapper innerRef={contentRef}>
          {children}
        </ContentWrapper>
      </Wrapper>
    );
  }

  render() {
    const { appearance } = this.props;

    if (appearance === 'card') {
      return this.renderCardAppearance();
    }

    return this.renderMessageAppearance();
  }
}

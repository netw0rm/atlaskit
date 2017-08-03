import * as React from 'react';
import {Component} from 'react';
import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left';
import {Card} from '@atlaskit/media-card';
import {Context} from '@atlaskit/media-core';
import {Wrapper, CloseIconWrapper, ListWrapper, Header, CardWrapper} from './styled';
import {MediaIdentifier} from '../..';

export interface MiniModeViewProps {
  isVisible?: boolean;
  onClose?: any;
  onCardClick?: any;
  list?: Array<MediaIdentifier>;
  context?: Context;
}

export interface MiniModeViewState {
  
}

export class MiniModeView extends Component<MiniModeViewProps, MiniModeViewState> {
  render() {
    const {isVisible, onClose, list} = this.props;
    const listLength = list ? `All ${list.length} attachments` : '';

    return (
      <Wrapper isVisible={isVisible}>
        <Header>
          <CloseIconWrapper>
            <ArrowLeftIcon label="back" onClick={onClose} />
          </CloseIconWrapper>
          {listLength}
        </Header>
        {this.renderList()}
      </Wrapper>
    );
  }

  renderList() {
    const {list, context} = this.props;
    if (!list || !context) {
      return;
    }

    const cards = list.map(i => (
      <CardWrapper>
        <Card
          context={context}
          identifier={i}
          onClick={this.onCardClick(i)}
        />
      </CardWrapper>
    ));

    return (
      <ListWrapper>
        {cards}
      </ListWrapper>
    );
  }

  onCardClick = (identifier: MediaIdentifier) => () => {
    const {onCardClick} = this.props;
    if (!onCardClick) {
      return;
    }

    onCardClick(identifier);

  }
}
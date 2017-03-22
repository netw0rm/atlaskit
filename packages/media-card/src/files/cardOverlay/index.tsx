import * as React from 'react';
import {MouseEvent, Component} from 'react';
import {MediaType, CardAction, CardActionType, CardEventHandler} from '@atlaskit/media-core';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import TickIcon from '@atlaskit/icon/glyph/editor/check';

import {toHumanReadableMediaSize, ProgressBar, FileIcon, ErrorIcon, Ellipsify, Menu} from '../../utils';

import {
  DeleteBtn,
  TickBox,
  Overlay,
  ErrorLine,
  LeftColumn,
  TopRow,
  BottomRow,
  RightColumn,
  ErrorMessage,
  Retry,
  TitleWrapper,
  FileSize,
  Metadata
} from './styled';

export interface CardOverlayProps {
  mediaType?: MediaType;
  mediaName?: string;
  mediaSize?: number;

  selectable?: boolean;
  selected?: boolean;
  persistent: boolean;

  progress?: number;

  error?: string;
  onRetry?: CardAction;

  actions?: Array<CardAction>;
}

export interface CardOverlayState {
  isMenuExpanded: boolean;
}

export class CardOverlay extends Component<CardOverlayProps, CardOverlayState> {
  constructor(props: CardOverlayProps) {
    super(props);

    this.state = {
      isMenuExpanded: false
    };
  }

  static get defaultProps() {
    const actions: Array<CardAction> = [];

    return {
      actions
    };
  }

  render() {
    const active = (typeof this.props.progress === 'number');

    let classNames: Array<string> = ['overlay'];
    if (this.props.error) {
      classNames.push('error');
    } else {
      if (active) {
        classNames.push('active');
      }

      if (this.props.selectable) {
        classNames.push('selectable');
      }

      if (this.props.selected) {
        classNames.push('selected');
      }

      if (this.props.mediaType) {
        classNames.push(this.props.mediaType);
      }

      if (!this.props.persistent) {
        classNames.push('persistent');
      }

    }

    if (this.state.isMenuExpanded) {
      classNames.push('active');
    }

    const text = this.props.mediaName || '';

    return (
      <Overlay className={classNames.join(' ')}>
        <TopRow className={'top-row'}>
          {this.errorLine()}
          <TitleWrapper className={'title'}>
            <Ellipsify text={text} lines={2}/>
          </TitleWrapper>
          {this.tickBox()}
        </TopRow>
        <BottomRow className={'bottom-row'}>
          <LeftColumn className={'left-column'}>
            {this.bottomLeftColumn()}
          </LeftColumn>
          <RightColumn className={'right-column'}>
            {this.moreBtn()}
          </RightColumn>
        </BottomRow>
      </Overlay>
    );
  }

  errorLine() {
    const error = this.props.error;
    return error && (
      <ErrorLine>
        <ErrorIcon />
        <ErrorMessage>{this.props.error}</ErrorMessage>
      </ErrorLine>
    );
  }

  tickBox() {
    const selectedClass = this.props.selected ? 'selected' : null;
    const tick = <TickIcon label="tick" />;

    return this.props.selectable && (<TickBox className={`tickbox ${selectedClass}`}> {tick} </TickBox>);
  }

  bottomLeftColumn() {
    if (this.props.error) {
      const onRetry = this.props.onRetry;
      if (!onRetry) {
        return null;
      }

      const retryMessage = onRetry.label || 'Try again';
      const retryHandler = (event: MouseEvent<HTMLSpanElement>) => {
        // We need to prevent the card's onClick to be invoked
        event.stopPropagation();
        event.preventDefault();
        onRetry.handler(undefined, event.nativeEvent);
      };

      return (
        <Retry className={'retry'}>
          <span onClick={retryHandler}>{retryMessage}</span>
        </Retry>
      );
    } else {
      const fileSize = this.props.mediaSize && toHumanReadableMediaSize(this.props.mediaSize);
      const hasProgress = !!this.props.progress;
      const className = `metadata ${hasProgress ? 'has-progress' : ''}`;

      return (
        <div>
          <Metadata className={className}>
            <FileIcon mediaType={this.props.mediaType} />
            <FileSize className={'file-size'}>{fileSize}</FileSize>
          </Metadata>
          <ProgressBar progress={this.props.progress} />
        </div>
      );
    }
  }

  moreBtn() {
    const actions = this.props.actions || [];

    if (!actions.length) {
      return null;
    }

    if (actions.length === 1 && actions[0].type === CardActionType.delete) {
      const deleteAction = actions[0];
      return (
        <DeleteBtn className={'delete-btn'} onClick={this.removeBtnClick(deleteAction.handler)} >
          <CrossIcon label="cross" />
        </DeleteBtn>
      );
    }

    return (
      <Menu actions={actions} onToggle={this.onMenuToggle} />
    );
  }

  onMenuToggle = (newMenuState) => {
    this.setState({isMenuExpanded: newMenuState.isExpanded});
  }

  removeBtnClick(handler: CardEventHandler) {
    return (e: MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      handler();
    };
  }
}

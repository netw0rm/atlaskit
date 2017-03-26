import * as React from 'react';
import {MouseEvent, Component} from 'react';
import * as cx from 'classnames';
import {MediaType, CardAction, CardEventHandler} from '@atlaskit/media-core';
import TickIcon from '@atlaskit/icon/glyph/editor/check';

import {toHumanReadableMediaSize, ProgressBar, FileIcon, ErrorIcon, Ellipsify, Menu} from '../../utils';

import {
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

  private get wrapperClassNames() {
    const {progress, error, selectable, selected, mediaType, persistent} = this.props;
    const {isMenuExpanded} = this.state;
    const isProcessing = (typeof progress === 'number');

    return error
      ? cx('overlay', {error, active: isMenuExpanded})
      : cx('overlay', mediaType, {active: isProcessing || isMenuExpanded, selectable, selected, persistent: !persistent});
  }

  render() {
    const {mediaName, actions} = this.props;
    const text = mediaName || '';

    return (
      <Overlay className={this.wrapperClassNames}>
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
            <Menu actions={actions} onToggle={this.onMenuToggle} deleteBtnColor="white" />
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

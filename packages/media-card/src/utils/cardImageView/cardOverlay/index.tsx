import * as React from 'react';
import {MouseEvent, Component} from 'react';
import * as cx from 'classnames';
import {MediaType, CardAction, CardEventHandler} from '@atlaskit/media-core';
import TickIcon from '@atlaskit/icon/glyph/check';
import Icon from '@atlaskit/icon/lib/Icon';

import {FileIcon, ErrorIcon, Ellipsify, Menu} from '../..';

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
  subtitle?: string;

  selectable?: boolean;
  selected?: boolean;
  persistent: boolean;

  error?: string;
  onRetry?: CardAction;

  actions?: Array<CardAction>;
  icon?: string;
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

  static defaultProps = {
    actions: [],
    mediaName: ''
  };

  private get wrapperClassNames() {
    const {error, selectable, selected, mediaType, persistent} = this.props;
    const {isMenuExpanded} = this.state;

    return error
      ? cx('overlay', {error, active: isMenuExpanded})
      : cx('overlay', mediaType, {active: isMenuExpanded, selectable, selected, persistent: !persistent});
  }

  render() {
    const {error, mediaName, actions} = this.props;
    const titleText = error || !mediaName ? '' : mediaName;

    return (
      <Overlay className={this.wrapperClassNames}>
        <TopRow className={'top-row'}>
          {this.errorLine()}
          <TitleWrapper className={'title'}>
            <Ellipsify text={titleText} lines={2}/>
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
        <ErrorMessage>{this.props.error}</ErrorMessage>
      </ErrorLine>
    );
  }

  tickBox() {
    const selectedClass = this.props.selected ? 'selected' : null;
    const tick = <Icon glyph={TickIcon} label="tick" />;

    return this.props.selectable && (<TickBox className={`tickbox ${selectedClass}`}> {tick} </TickBox>);
  }

  bottomLeftColumn() {
    if (this.props.error) {
      const onRetry = this.props.onRetry;

      if (!onRetry) {
        return <ErrorIcon />;
      }

      const retryMessage = onRetry.label || 'Try again';
      const retryHandler = (event: MouseEvent<HTMLSpanElement>) => {
        // We need to prevent the card's onClick to be invoked
        event.stopPropagation();
        event.preventDefault();
        onRetry.handler(undefined, event.nativeEvent);
      };

      return (
        <div>
          <ErrorIcon />
          <Retry className={'retry'}>
            <span onClick={retryHandler}>{retryMessage}</span>
          </Retry>
        </div>
      );
    } else {
      const {mediaType, subtitle, icon} = this.props;
      const classNames = cx('metadata');

      return (
        <div>
          <Metadata className={classNames}>
            <FileIcon mediaType={mediaType} iconUrl={icon} />
            <FileSize className="file-size">{subtitle}</FileSize>
          </Metadata>
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

import * as React from 'react';
import {MouseEvent} from 'react';
import {Component} from 'react';
import {toHumanReadableMediaSize} from '../utils/index';
import {ProgressBar} from '../progressBar/progressBar';
import {MediaType, CardAction, CardActionType, CardEventHandler} from '@atlaskit/media-core';
import {Dropdown} from '../dropdown/dropdown';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import TickIcon from '@atlaskit/icon/glyph/editor/check';
import {FileIcon} from '../generic/fileIcon/fileIcon';
import {ErrorIcon} from '../generic/errorIcon/errorIcon';
import MoreIcon from '@atlaskit/icon/glyph/more';
import Ellipsify from '../ellipsify';
import {
  MoreBtn,
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
  DropdownWrapper,
  TitleWrapper,
  FileSize,
  Metadata
} from './styled';

export interface CardOverlayProps {
  height: number;
  width: number;

  mediaType?: MediaType;
  mediaName?: string;
  mediaSize?: number;

  selectable?: boolean;
  selected?: boolean;
  persistent: boolean;

  progress?: number;

  error?: string;
  onRetry?: CardAction;

  menuActions?: Array<CardAction>;
}

export interface CardOverlayState {
  isMenuExpanded: boolean;
}

export class CardOverlay extends Component<CardOverlayProps, CardOverlayState> {
  private clickDetector: (e: Event) => void;

  constructor(props: CardOverlayProps) {
    super(props);

    this.state = {
      isMenuExpanded: false
    };
  }

  static get defaultProps() {
    const menuActions: Array<CardAction> = [];

    return {
      menuActions
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
        {this.dropdown()}
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
    const actions = this.props.menuActions || [];
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

    const moreBtnClasses = ['more-btn'];
    if (this.state.isMenuExpanded) {
      moreBtnClasses.push('active');
    }

    return (
      <MoreBtn className={moreBtnClasses.join(' ')} onClick={this.moreBtnClick.bind(this)}>
        <MoreIcon label="more"/>
      </MoreBtn>
    );
  }

  dropdown() {
    if (!this.state.isMenuExpanded) {
      return null;
    }

    return (
      <DropdownWrapper onClick={this.dropdownClick}>
        <Dropdown items={this.props.menuActions}/>
      </DropdownWrapper>
    );
  }

  removeBtnClick(handler: CardEventHandler) {
    return (e: MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      handler();
    };
  }

  dropdownClick(e: MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
  }

  moreBtnClick(e: MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();

    if (this.state.isMenuExpanded) {    // we should remove handlers
      document.removeEventListener('click', this.clickDetector);
    } else {    // we should add handlers on clicking outside of element
      this.clickDetector = this.newClickDetector.bind(this);
      document.addEventListener('click', this.clickDetector);
    }

    this.setState({
      isMenuExpanded: !this.state.isMenuExpanded
    });
  }

  newClickDetector(e: Event) {
    this.setState({
      isMenuExpanded: false
    });

    document.removeEventListener('click', this.clickDetector);
  }
}

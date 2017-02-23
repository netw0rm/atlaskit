import * as React from 'react';
import {Component, DragEvent as ReactDragEvent, DragEventHandler} from 'react';
import {FilmStripViewWrapper, FilmStripListWrapper, FilmStripList, ArrowLeftWrapper, ArrowRightWrapper, ShadowLeft, ShadowRight} from './styled';
import ArrowLeft from '@atlaskit/icon/glyph/arrowleft';
import ArrowRight from '@atlaskit/icon/glyph/arrowright';

export interface FilmstripNavigatorProps {
  onDrop?: (event: DragEvent) => void;
  onDragEnter?: (event: DragEvent) => void;
  onDragOver?: (event: DragEvent) => void;
  width?: number;
}

function onDragEvent(dragEventHandler?: (event: DragEvent) => void): DragEventHandler<HTMLUListElement> {
  return (event: ReactDragEvent<HTMLUListElement>) => {
    if (!dragEventHandler) {
      return;
    }

    event.preventDefault();
    dragEventHandler(event.nativeEvent as DragEvent);
  };
}

interface FilmStripNavigatorState {
  showLeft: boolean;
  showRight: boolean;
  position: number;
  showTransition: boolean;
  transitionDuration: number;
}

interface FilmStripNavigatorPartialState {
  showLeft?: boolean;
  showRight?: boolean;
  position?: number;
  showTransition?: boolean;
  transitionDuration?: number;
}

export default class FilmStripNavigator extends Component<FilmstripNavigatorProps, FilmStripNavigatorState> {
  getDimensions: Function;
  onScroll: Function;
  wrapperWidth: number;
  listWidth: number;
  numOfCards: number;
  cardWidth: number;
  cardPadding: number;
  initialPadding: number;

  constructor(props) {
    super(props);
    this.state = {
      showLeft: false,
      showRight: false,
      position: 0,
      showTransition: true,
      transitionDuration: 0
    };
    this.getDimensions = this._getDimensions.bind(this);
    this.onScroll = this._onScroll.bind(this);
  }

  updateState(newState: FilmStripNavigatorPartialState) {
    this.setState((prevState) => {
      return {...prevState, ...newState};
    });
  }

  _onScroll(e) {
    e.preventDefault();
    const showTransition = false;
    this.updateState({showTransition});
    this._setNewPosition(this.state.position + e.nativeEvent.deltaX, showTransition);
  }

  render() {
    const props = this.props;
    const defaultWidth = 'auto';
    const width = `${this.props.width || defaultWidth}px`;
    const transform = `translateX(${-this.state.position}px)`;
    const leftArrow = <ShadowLeft>
                        <ArrowLeftWrapper className="arrow" onClick={this.navigate('left')}>
                          <ArrowLeft label="left"/>
                        </ArrowLeftWrapper>
                      </ShadowLeft>;
    const rightArrow = <ShadowRight>
                         <ArrowRightWrapper className="arrow" onClick={this.navigate('right')}>
                           <ArrowRight label="right"/>
                         </ArrowRightWrapper>
                       </ShadowRight>;
    const transitionProperty = this.state.showTransition ? 'transform' : 'none';
    const transitionDuration = `${this.state.transitionDuration}s`;
    return <FilmStripViewWrapper style={{width}} onWheel={this.onScroll} onDrop={onDragEvent(props.onDrop)} onDragEnter={onDragEvent(props.onDragEnter)} onDragOver={onDragEvent(props.onDragOver)}>
             {this.state.showLeft ? leftArrow : undefined}
             <FilmStripListWrapper>
               <FilmStripList style={{transform, transitionProperty, transitionDuration}} innerRef={this.getDimensions}>
                 {props.children}
               </FilmStripList>
             </FilmStripListWrapper>
             {this.state.showRight ? rightArrow : undefined}
           </FilmStripViewWrapper>;
  }

  _getDimensions(element) {
    if (!element) { return; }
    this.wrapperWidth = element.parentElement.getBoundingClientRect().width;
    this.listWidth = element.getBoundingClientRect().width;
    this.numOfCards = element.children.length;
    this.cardPadding = 4;
    this.initialPadding = 10;

    if (this.numOfCards !== 0) {
      const card = element.firstChild;
      this.cardWidth = card.clientWidth - (this.cardPadding + this.initialPadding);
    } else {
      this.cardWidth = 0;
    }

    this._setNewPosition(0, this.state.showTransition);
  }

  _getTransitionDuration(oldPosition: number, newPosition: number): number {
    const minDuration = 0.5;
    const baseDuration = 0.5;
    const maxDuration = 1.0;

    if (Math.abs(newPosition - oldPosition) < 1E-6) {
      return baseDuration;
    } else {
      const diff = Math.abs(newPosition - oldPosition);
      const relativeOffset = diff / this.wrapperWidth;
      const duration = maxDuration - baseDuration * relativeOffset;
      return Math.max(Math.min(duration, maxDuration), minDuration);
    }
  }

  _setNewPosition(desiredPosition: number, showTransition: boolean) {
    const oldPosition = this.state.position;
    const minPosition = 0;
    const maxPosition = Math.max(this.listWidth - this.wrapperWidth, 0);
    const position = Math.max(Math.min(desiredPosition, maxPosition), minPosition);

    const left = position;
    const right = position + this.wrapperWidth;

    const showLeft = left > 0;
    const showRight = right < this.listWidth;

    const transitionDuration = this._getTransitionDuration(oldPosition, position);
    const arrowVisibilityDelay = showTransition ? transitionDuration * 1000 : 0;

    // Delaying arrow state in order to not modify it visibility until the transition has finished
    setTimeout(() => this.updateState({showLeft, showRight}), arrowVisibilityDelay);

    this.updateState({position, transitionDuration});
  }

  _getClosest(position: number, start: number, accumulator: number, stop: number): number {
    // First position
    let minDist = Math.abs(position - start);
    let result = position;

    // Positions between cards
    let x = accumulator;
    for (let i = 0; i < this.numOfCards - 1; ++i) {
      x += (this.cardWidth + 2 * this.cardPadding);

      const dist = Math.abs(position - x);
      if (dist < minDist) {
        minDist = dist;
        result = x;
      }
    }

    // Last position
    const dist = Math.abs(position - stop);
    if (dist < minDist) {
      result = stop;
    }

    return result;
  }

  _getClosestForLeft(leftPosition: number): number {
    const initialPadding = this.initialPadding;
    const twiceCardPadding = 2 * this.cardPadding;

    return this._getClosest(leftPosition, 0, initialPadding - twiceCardPadding, this.listWidth - initialPadding);
  }

  _getClosestForRight(rightPosition: number): number {
    const initialPadding = this.initialPadding;

    return this._getClosest(rightPosition, initialPadding, initialPadding, this.listWidth);
  }

  _moveLeft(showTransition: boolean) {
    const currentLeft = this.state.position;
    const newLeft = currentLeft - this.wrapperWidth;
    this._setNewPosition(this._getClosestForLeft(newLeft), showTransition);
  }

  _moveRight(showTransition: boolean) {
    const currentRight = this.state.position + this.wrapperWidth;
    const newRight = currentRight + this.wrapperWidth;
    const adjustedRight = this._getClosestForRight(newRight);
    this._setNewPosition(adjustedRight - this.wrapperWidth, showTransition);
  }

  navigate(direction) {
    const component = this;

    return () => {
      const showTransition = true;
      component.updateState({showTransition});

      if (direction === 'left') {
        component._moveLeft(showTransition);
      } else {
        component._moveRight(showTransition);
      }
    };
  }
}

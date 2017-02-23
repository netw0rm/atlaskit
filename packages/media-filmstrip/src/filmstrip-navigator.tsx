import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Component, DragEvent as ReactDragEvent, DragEventHandler, WheelEvent} from 'react';
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

type NavigationDirection = 'left' | 'right';

const minDuration = 0.5;
const baseAnimationDuration = 0.5;
const maxAnimationDuration = 1.0;
const cardPadding = 4;
const initialPadding = 10;

export default class FilmStripNavigator extends Component<FilmstripNavigatorProps, FilmStripNavigatorState> {
  private wrapperWidth: number;
  private listWidth: number;
  private numOfCards: number;
  private cardWidth: number;

  constructor(props) {
    super(props);
    this.state = {
      showLeft: false,
      showRight: false,
      position: 0,
      showTransition: true,
      transitionDuration: 0
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.onWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
  }

  render() {
    const props = this.props;
    const defaultWidth = 'auto';
    const width = `${this.props.width || defaultWidth}px`;
    const transform = `translateX(${-this.state.position}px)`;
    const leftArrow = <ShadowLeft>
                        <ArrowLeftWrapper className="arrow" onClick={this._navigate('left')}>
                          <ArrowLeft label="left"/>
                        </ArrowLeftWrapper>
                      </ShadowLeft>;
    const rightArrow = <ShadowRight>
                         <ArrowRightWrapper className="arrow" onClick={this._navigate('right')}>
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

  private onWindowResize = (event) => {
    const parent = ReactDOM.findDOMNode(this).parentElement;
    if (!parent) { return; }

    this.wrapperWidth = parent.getBoundingClientRect().width;
    this._setNewPosition(this.state.position, this.state.showTransition);
  }

  private getDimensions = (element: HTMLElement) => {
    if (!element || !element.parentElement) {
      return;
    }

    this.wrapperWidth = element.parentElement.getBoundingClientRect().width;
    this.listWidth = element.getBoundingClientRect().width;
    this.numOfCards = element.children.length;

    if (this.numOfCards !== 0) {
      const card = element.firstChild as HTMLElement;
      const totalWidth = card.clientWidth || 0;
      this.cardWidth = Math.max(totalWidth - (cardPadding + initialPadding), 0);
    } else {
      this.cardWidth = 0;
    }

    this._setNewPosition(0, this.state.showTransition);
  }

  private onScroll = (e: WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const isHorizontalScroll = Math.abs(e.deltaX) > Math.abs(e.deltaY);
    if (!isHorizontalScroll) { return; }

    const showTransition = false;
    this._updateState({showTransition});
    this._setNewPosition(this.state.position + e.deltaX, showTransition);
  }

  private _updateState(newState: FilmStripNavigatorPartialState) {
    this.setState((prevState) => {
      return {...prevState, ...newState};
    });
  }

  private _getTransitionDuration(oldPosition: number, newPosition: number): number {
    if (Math.abs(newPosition - oldPosition) < 1E-6) {
      return baseAnimationDuration;
    } else {
      const diff = Math.abs(newPosition - oldPosition);
      const relativeOffset = diff / this.wrapperWidth;
      const duration = maxAnimationDuration - baseAnimationDuration * relativeOffset;
      return Math.max(Math.min(duration, maxAnimationDuration), minDuration);
    }
  }

  private _setNewPosition(desiredPosition: number, showTransition: boolean): void {
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
    setTimeout(() => this._updateState({showLeft, showRight}), arrowVisibilityDelay);

    this._updateState({position, transitionDuration});
  }

  private _getClosest(position: number, start: number, accumulator: number, stop: number): number {
    // First position
    let minDist = Math.abs(position - start);
    let result = start;

    // Positions between cards
    let x = accumulator;
    for (let i = 0; i < this.numOfCards - 1; ++i) {
      x += (this.cardWidth + 2 * cardPadding);

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

  private _getClosestForLeft(leftPosition: number): number {
    return this._getClosest(leftPosition, 0, initialPadding - 2 * cardPadding, this.listWidth - initialPadding);
  }

  private _getClosestForRight(rightPosition: number): number {
    return this._getClosest(rightPosition, initialPadding, initialPadding, this.listWidth);
  }

  private _moveLeft(showTransition: boolean): void {
    const currentLeft = this.state.position;
    const newLeft = currentLeft - this.wrapperWidth;
    this._setNewPosition(this._getClosestForLeft(newLeft), showTransition);
  }

  private _moveRight(showTransition: boolean): void {
    const currentRight = this.state.position + this.wrapperWidth;
    const newRight = currentRight + this.wrapperWidth;
    const adjustedRight = this._getClosestForRight(newRight);
    this._setNewPosition(adjustedRight - this.wrapperWidth, showTransition);
  }

  private _navigate(direction: NavigationDirection): () => void {
    const component = this;

    return () => {
      const showTransition = true;
      component._updateState({showTransition});

      if (direction === 'left') {
        component._moveLeft(showTransition);
      } else {
        component._moveRight(showTransition);
      }
    };
  }
}

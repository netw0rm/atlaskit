import * as React from 'react';
import {Component, DragEvent as ReactDragEvent, DragEventHandler} from 'react';
import {FilmStripViewWrapper, FilmStripList, ArrowLeftWrapper, ArrowRightWrapper, ShadowLeft, ShadowRight} from './styled';
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

interface FilmstripNavigatorState {
  showLeft: boolean;
  showRight: boolean;
  position: number;
}

export default class FilmStripNavigator extends Component<FilmstripNavigatorProps, FilmstripNavigatorState> {
  getDimensions: Function;
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
      position: 0
    };
    this.getDimensions = this._getDimensions.bind(this);
  }

  render() {
    const props = this.props;
    const defaultWidth = 'auto';
    const width = `${this.props.width || defaultWidth}px`;
    const transform = `translateX(${-this.state.position}px)`;
    // TODO: Create method to create arrow elements
    const leftArrow = <ShadowLeft>
                        <ArrowLeftWrapper className="arrow">
                          <ArrowLeft label="left" onClick={this.navigate('left')}/>
                        </ArrowLeftWrapper>
                      </ShadowLeft>;
    const rightArrow = <ShadowRight>
                         <ArrowRightWrapper className="arrow">
                           <ArrowRight label="right" onClick={this.navigate('right')}/>
                         </ArrowRightWrapper>
                       </ShadowRight>;

    return <FilmStripViewWrapper style={{width}} onDrop={onDragEvent(props.onDrop)} onDragEnter={onDragEvent(props.onDragEnter)} onDragOver={onDragEvent(props.onDragOver)}>
             {this.state.showLeft ? leftArrow : undefined}
             <FilmStripList style={{transform}} innerRef={this.getDimensions}>
               {props.children}
             </FilmStripList>
             {this.state.showRight ? rightArrow : undefined}
           </FilmStripViewWrapper>;
  }

  _getDimensions(element) {
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

    this._setNewPosition(0);
  }

  _setNewPosition(desiredPosition: number) {
    const minPosition = 0;
    const maxPosition = Math.max(this.listWidth - this.wrapperWidth, 0);
    const position = Math.max(Math.min(desiredPosition, maxPosition), minPosition);

    const left = position;
    const right = position + this.wrapperWidth;

    const showLeft = left > 0;
    const showRight = right < this.listWidth;

    this.setState({showLeft, showRight, position});
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

  _moveLeft() {
    const currentLeft = this.state.position;
    const newLeft = currentLeft - this.wrapperWidth;
    this._setNewPosition(this._getClosestForLeft(newLeft));
  }

  _moveRight() {
    const currentRight = this.state.position + this.wrapperWidth;
    const newRight = currentRight + this.wrapperWidth;
    const adjustedRight = this._getClosestForRight(newRight);
    this._setNewPosition(adjustedRight - this.wrapperWidth);
  }

  navigate(direction) {
    const component = this;

    return () => {
      if (direction === 'left') {
        component._moveLeft();
      } else {
        component._moveRight();
      }
    };
  }
}

import * as React from 'react';
import {ReactNode, WheelEvent} from 'react';
import ArrowLeft from '@atlaskit/icon/glyph/arrowleft';
import ArrowRight from '@atlaskit/icon/glyph/arrowright';
import {
  FilmStripViewWrapper,
  FilmStripListWrapper,
  FilmStripList,
  ArrowLeftWrapper,
  ArrowRightWrapper,
  ShadowLeft,
  ShadowRight,
  FilmStripListItem
} from './styled';

const DURATION_MIN = 0.5;
const DURATION_BASE = 0.5;
const DURATION_MAX = 1.0;

// TODO: drag & drop
// TODO: reset position to 0 when the children have changed (can we reliably know this?)
// TODO: delay visibility of arrows when position changes (does that make sense because i might think there's more and try to keep clicking)

export interface ChildPosition {
  left: number;
  right: number;
}

export interface SizeEvent {
  width: number;
  position: number;
  positions: ChildPosition[];
  minPosition: number;
  maxPosition: number;
}

export interface ScrollEvent {
  direction: 'left' | 'right';
  position: number;
}

export interface FilmstripViewProps {
  position?: number;
  children?: ReactNode;
  onSize?: (event: SizeEvent) => void;
  onScroll?: (event: ScrollEvent) => void;
}

export interface FilmstripViewState {
}

export class FilmstripView extends React.Component<FilmstripViewProps, FilmstripViewState> {

  static defaultProps = {
    position: 0
  };

  private bufferElement: HTMLElement;
  private bufferWidth: number = 0;

  private windowElement: HTMLElement;
  private windowWidth: number = 0;
  private childrenPositions: {left: number, right: number}[];

  private previousPosition: number = 0;

  private scrolling: boolean = false;
  private scrollingTimeout: number = 0;

  state = {};

  get position() {
    const {position} = this.props;
    if (!position) {
      return 0;
    }
    return Math.min(this.maxPosition, Math.max(this.minPosition, position));
  }

  get minPosition() {
    return 0;
  }

  get maxPosition() {
    return Math.max(this.minPosition, this.bufferWidth - this.windowWidth);
  }

  get canGoPrev() {
    return this.position > this.minPosition;
  }

  get canGoNext() {
    return this.position < this.maxPosition;
  }

  get transitionDuration() {
    if (Math.abs(this.position - this.previousPosition) < 1E-6) {
      return DURATION_BASE;
    } else {
      const diff = Math.abs(this.position - this.previousPosition);
      const relativeOffset = diff / this.windowWidth;
      const duration = DURATION_MAX - DURATION_BASE * relativeOffset;
      return Math.max(Math.min(duration, DURATION_MAX), DURATION_MIN);
    }
  }

  private triggerScrollEvent() {
    if (!this.windowElement) {
      return;
    }
    const event = document.createEvent('MouseEvents');
    event.initEvent('scroll', true, true);
    this.windowElement.dispatchEvent(event);
  }

  // find the child that is cut off on the left edge of the window and change the window position to
  // start to the left of that child
  private getClosestForLeft(position: number): number {
    for (let i = 0; i < this.childrenPositions.length; ++i) {
      const childBounds = this.childrenPositions[i];
      const leftWindowEdge = position;
      if (leftWindowEdge > childBounds.left && leftWindowEdge < childBounds.right) {
        return childBounds.left;
      }
    }
    return Math.max(this.minPosition, position);
  }

  // find the child that is cut off on the right edge of the window and change the window position
  // to finish at start of the next child
  private getClosestForRight(position: number): number {
    const rightWindowEdge = position + this.windowWidth;
    for (let i = 0; i < this.childrenPositions.length; ++i) {
      const childBounds = this.childrenPositions[i];
      if (rightWindowEdge > childBounds.left && rightWindowEdge < childBounds.right) {
        return childBounds.right - this.windowWidth;
      }
    }
    return Math.min(this.maxPosition, position);
  }

  private handleSizeChange = () => {

    // get the widths
    const {windowElement, bufferElement} = this;
    let bufferWidth = 0;
    let windowWidth = 0;
    let childrenPositions = [];
    if (windowElement && bufferElement) {
      bufferWidth = bufferElement.getBoundingClientRect().width;
      windowWidth = windowElement.getBoundingClientRect().width;

      // we're calculating `left` based on `width` because `rect.left` can be a negative value after resizing the window (considered scrolled??)
      const children = Array.prototype.slice.call(bufferElement.children, 0);
      let left = 0;
      childrenPositions = children.map((child, index) => {
        const width = child.getBoundingClientRect().width;
        const position = {
          left,
          right: left + width
        };
        left += width;
        return position;
      });
    }

    // make sure the widths have changed before we notify the integrator
    if (bufferWidth === this.bufferWidth && windowWidth === this.windowWidth) {
      return;
    }

    // store the widths
    this.bufferWidth = bufferWidth;
    this.windowWidth = windowWidth;
    this.childrenPositions = childrenPositions;

    // notify the integrator
    const {onSize} = this.props;
    if (onSize) {
      onSize({
        position: Math.min(this.maxPosition, this.position),
        positions: childrenPositions,
        width: this.windowWidth,
        minPosition: this.minPosition,
        maxPosition: this.maxPosition
      });
    }

  }

  handleWindowElementChange = windowElement => {
    this.windowElement = windowElement;
    this.handleSizeChange();
  }

  handleBufferElementChange = bufferElement => {
    this.bufferElement = bufferElement;
    this.handleSizeChange();
  }

  handleLeftClick = () => {
    const {onScroll} = this.props;
    if (onScroll) {
      const newPosition = this.getClosestForLeft(this.position - this.windowWidth);
      onScroll({
        direction: 'left',
        position: newPosition
      });
    }
  }

  handleRightClick = () => {
    const {onScroll} = this.props;
    if (onScroll) {
      const newPosition = this.getClosestForRight(this.position + this.windowWidth);
      onScroll({
        direction: 'right',
        position: newPosition
      });
    }
  }

  handleScroll = (event: WheelEvent<HTMLDivElement>) => {

    const isHorizontalScroll = Math.abs(event.deltaX) > Math.abs(event.deltaY);
    if (!isHorizontalScroll) {
      return;
    }

    // don't actually let the element scroll because we'll fake scrolling with `transform: translateX()`
    event.preventDefault();

    // hack: disable transitions when we think the user is updating due to scrolling
    // the timeout is used to set scrolling=false when the integrator isn't updating the position as a result
    // of the onScroll event
    this.scrolling = true;
    clearTimeout(this.scrollingTimeout);
    this.scrollingTimeout = setTimeout(() => {
      this.scrolling = false;
    }, 25);

    // notify the integrator of the position change
    const {onScroll} = this.props;
    if (onScroll && isHorizontalScroll) {
      const newPosition = Math.max(this.minPosition, Math.min(this.maxPosition, this.position + event.deltaX));
      onScroll({
        direction: event.deltaX < 0 ? 'left' : 'right',
        position: newPosition
      });
    }

  }

  renderLeftArrow() {
    const {canGoPrev} = this;
    if (!canGoPrev) {
      return null;
    }
    return (
      <ShadowLeft>
        <ArrowLeftWrapper className="arrow" onClick={this.handleLeftClick}>
          <ArrowLeft label="left"/>
        </ArrowLeftWrapper>
      </ShadowLeft>
    );
  }

  renderRightArrow() {
    const {canGoNext} = this;
    if (!canGoNext) {
      return null;
    }
    return (
      <ShadowRight>
        <ArrowRightWrapper className="arrow" onClick={this.handleRightClick}>
          <ArrowRight label="left"/>
        </ArrowRightWrapper>
      </ShadowRight>
    );
  }

  componentDidMount() {
    this.previousPosition = this.position;
    window.addEventListener('resize', this.handleSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleSizeChange);
  }

  componentDidUpdate() {
    this.previousPosition = this.position;

    // trigger a "real" scroll event so lazily loaded cards realize they've been shown
    this.triggerScrollEvent();

    // the children widths and therefore `this.bufferWidth` may have changed so we need to update our stored sizes
    // note: this reads the DOM on every render (that's nullifying some of the value of having a virtual-dom!)
    this.handleSizeChange();

    // hack: enable transitions when the user may have stopped scrolling
    this.scrolling = false;
    clearTimeout(this.scrollingTimeout);

  }

  render(): JSX.Element {
    const {children} = this.props;

    const transform = `translateX(${-this.position}px)`;
    const transitionProperty = this.scrolling ? 'none' : 'transform';
    const transitionDuration = `${this.transitionDuration}s`;

    // FilmStripViewWrapper style={{width}} onDrop={onDragEvent(onDrop)} onDragEnter={onDragEvent(onDragEnter)} onDragOver={onDragEvent(onDragOver)}
    // FilmStripList style={{transform, transitionProperty, transitionDuration}}
    return (
      <FilmStripViewWrapper>
        {this.renderLeftArrow()}
        <FilmStripListWrapper innerRef={this.handleWindowElementChange} onWheel={this.handleScroll}>
          <FilmStripList innerRef={this.handleBufferElementChange} style={{transform, transitionProperty, transitionDuration}}>
            {React.Children.map(children, (child, index) => (
              <FilmStripListItem key={index}>
                {child}
              </FilmStripListItem>
            ))}
          </FilmStripList>
        </FilmStripListWrapper>
        {this.renderRightArrow()}
      </FilmStripViewWrapper>
    );
  }

}

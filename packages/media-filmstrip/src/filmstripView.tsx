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
// TODO: handleSizeChange() when the children have changed
// TODO: reset position to 0 when the children have changed
// TODO: delay visibility of arrows when position changes

export interface SizeEvent {
  position: number;
  bufferWidth: number;
  windowWidth: number;
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

  private previousPosition: number = 0;

  private scrolling: boolean = false;
  private scrollingTimeout: number = 0;

  state = {};

  get position() {
    return this.props.position || 0;
  }

  get minPosition() {
    return 0;
  }

  get maxPosition() {
    return this.bufferWidth - this.windowWidth;
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

  private handleSizeChange = () => {

    // get the widths
    const {windowElement, bufferElement} = this;
    let bufferWidth = 0;
    let windowWidth = 0;
    if (windowElement && bufferElement) {
      bufferWidth = bufferElement.getBoundingClientRect().width;
      windowWidth = windowElement.getBoundingClientRect().width;
    }

    // make sure the widths have changed before we notify the integrator
    if (bufferWidth === this.bufferWidth && windowWidth === this.bufferWidth) {
      return;
    }

    // store the widths
    this.bufferWidth = bufferWidth;
    this.windowWidth = windowWidth;

    // notify the integrator
    const {onSize} = this.props;
    if (onSize) {
      onSize({
        position: Math.min(this.maxPosition, this.position),
        bufferWidth: this.bufferWidth,
        windowWidth: this.windowWidth
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
      const newPosition = Math.max(this.minPosition, this.position - this.windowWidth);
      onScroll({
        direction: 'left',
        position: newPosition
      });
    }
  }

  handleRightClick = () => {
    const {onScroll} = this.props;
    if (onScroll) {
      const newPosition = Math.min(this.maxPosition, this.position + this.windowWidth);
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

    // don't actually scroll because we'll fake the scroll with `transform: translateX()`
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

    // if the children changed, this.bufferWidth may have changed so we'll want to notify the user of a potentially changed position
    // warn: we're reading the DOM here on every render (which the whole point of React is to avoid!)
    // the alternative is a n^2 loop comparing old and new children, or 2xn loops and a hash table?
    // this.handleSizeChange();

    // hack: disable transitions when we think the user is updating due to scrolling
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

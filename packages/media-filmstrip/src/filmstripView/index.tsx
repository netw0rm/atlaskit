/* tslint:disable variable-name */
import * as React from 'react';
import { ReactNode, WheelEvent, MouseEvent as ReactMouseEvent, ReactChild, SyntheticEvent} from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
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
  FilmStripListItem,
  DropzoneOverlay
} from './styled';

const DURATION_MIN = 0.5;
const DURATION_MAX = 1.0;

const EXTRA_PADDING = 4;

export interface ChildOffset {
  left: number;
  right: number;
}

export interface SizeEvent {
  width: number;
  offset: number;
  offsets: ChildOffset[];
  minOffset: number;
  maxOffset: number;
}

export interface ScrollEvent {
  direction: 'left' | 'right';
  offset: number;
  animate: boolean;
}

export interface FilmstripViewProps {
  animate?: boolean;
  offset?: number;
  children?: ReactNode;
  onSize?: (event: SizeEvent) => void;
  onScroll?: (event: ScrollEvent) => void;
  onDragEnd?: (source: any, destination: any) => void;
  onDragEnter?: (items: number, index: number) => void;
}

export interface FilmstripViewState {
  bufferWidth: number;
  windowWidth: number;
  isNativeDragOver: boolean;
  isDragging: boolean;
}

export interface ArrowProps {
  onClick: (event: ReactMouseEvent<HTMLDivElement>) => void;
}

export const LeftArrow: React.SFC<ArrowProps> = ({onClick}: ArrowProps) => (
  <ShadowLeft>
    <ArrowLeftWrapper className="arrow" onClick={onClick}>
      <ArrowLeft label="left"/>
    </ArrowLeftWrapper>
  </ShadowLeft>
);

export const RightArrow: React.SFC<ArrowProps> = ({onClick}: ArrowProps) => (
  <ShadowRight>
    <ArrowRightWrapper className="arrow" onClick={onClick}>
      <ArrowRight label="right"/>
    </ArrowRightWrapper>
  </ShadowRight>
);

const getListStyle = (isDraggingOver) => ({
  // background: isDraggingOver ? 'lightblue' : 'lightgrey',
  // display: 'flex'
});

const getItemStyle = (draggableStyle, isDragging) => ({
  // display: 'inline-block',
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',

  // change background colour if dragging
  // background: isDragging ? 'lightgreen' : 'grey',
  margin: '0 4px',
  // styles we need to apply on draggables
  ...draggableStyle
});

export class FilmstripView extends React.Component<FilmstripViewProps, FilmstripViewState> {

  static defaultProps: Partial<FilmstripViewProps> = {
    animate: false,
    offset: 0
  };

  bufferElement: HTMLElement;
  windowElement: HTMLElement;

  childOffsets: ChildOffset[];
  previousOffset: number = 0;

  state = {
    isNativeDragOver: false,
    isDragging: false,
    bufferWidth: 0,
    windowWidth: 0
  };

  get offset() {
    const {offset} = this.props;
    if (!offset) {
      return 0;
    }

    return Math.min(this.maxOffset, Math.max(this.minOffset, offset));
  }

  get minOffset() {
    return 0;
  }

  /**
   * The furthest we can scroll, where the end of the buffer is just in view
   */
  get maxOffset() {
    const {bufferWidth, windowWidth} = this.state;

    return Math.max(this.minOffset, bufferWidth - windowWidth - 1);
  }

  get canGoLeft() {
    return this.offset > this.minOffset;
  }

  get canGoRight() {

    return this.offset < this.maxOffset;
  }

  get transitionDuration() {
    const {animate} = this.props;
    const {windowWidth} = this.state;
    if (!animate) {
      return 0;
    }
    if (Math.abs(this.offset - this.previousOffset) < 1E-6) {
      return DURATION_MIN;
    } else {
      const diff = Math.abs(this.offset - this.previousOffset);
      const relativeOffset = diff / windowWidth;
      const duration = DURATION_MAX - DURATION_MIN * relativeOffset;
      return Math.max(Math.min(duration, DURATION_MAX), DURATION_MIN);
    }
  }

  triggerScrollEvent() {
    if (!this.windowElement) {
      return;
    }
    const event = document.createEvent('MouseEvents');
    event.initEvent('scroll', true, true);
    this.windowElement.dispatchEvent(event);
  }

  // find the child that is cut off on the left edge of the window and change the window offset to
  // start to the left of that child
  getClosestForLeft(offset: number): number {
    const leftWindowEdge = Math.min(this.maxOffset, Math.max(this.minOffset, offset));
    for (let i = 0; i < this.childOffsets.length; ++i) {
      const childBounds = this.childOffsets[i];
      if (leftWindowEdge >= childBounds.left && leftWindowEdge <= childBounds.right) {
        const newOffset = childBounds.left;
        if (newOffset >= EXTRA_PADDING) {
          return newOffset - EXTRA_PADDING; // show extra padding from the next sibling for aesthetic reasons
        } else {
          return newOffset;
        }
      }
    }
    return Math.min(this.maxOffset, Math.max(this.minOffset, offset));
  }

  // find the child that is cut off on the right edge of the window and change the window offset
  // to finish at start of the next child
  getClosestForRight(offset: number): number {
    const {windowWidth} = this.state;
    const rightWindowEdge = Math.min(this.maxOffset, Math.max(this.minOffset, offset)) + windowWidth;
    for (let i = 0; i < this.childOffsets.length; ++i) {
      const childBounds = this.childOffsets[i];
      if (rightWindowEdge >= childBounds.left && rightWindowEdge <= childBounds.right) {
        const newOffset = childBounds.right - windowWidth;
        if (newOffset + EXTRA_PADDING <= this.maxOffset) {
          return newOffset + EXTRA_PADDING; // show extra padding from the next sibling for aesthetic reasons
        } else {
          return newOffset;
        }
      }
    }
    return Math.min(this.maxOffset, Math.max(this.minOffset, offset));
  }

  handleSizeChange = () => {

    // get the new widths
    const {windowElement, bufferElement} = this;
    let bufferWidth = 0;
    let windowWidth = 0;
    let childOffsets = [];

    if (windowElement && bufferElement) {
      bufferWidth = bufferElement.getBoundingClientRect().width;
      windowWidth = windowElement.getBoundingClientRect().width;

      // we're calculating `left` based on `width` because `rect.left` can be a negative value after resizing the window (considered scrolled??)
      const children = Array.prototype.slice.call(bufferElement.children, 0);
      let left = 0;
      childOffsets = children.map((child, index) => {
        const width = child.getBoundingClientRect().width;

        const offset = {
          left,
          right: left + width - 1
        };
        left += width;
        return offset;
      });
    }



    // make sure the state has changed before we update state and notify the integrator
    // (otherwise, since this method() is called in componentDidUpdate() we'll recurse until the stack size is exceeded)
    const {
      bufferWidth: prevBufferWidth,
      windowWidth: prevWindowWidth
    } = this.state;
    if (bufferWidth === prevBufferWidth && windowWidth === prevWindowWidth) {
      // NOTE: we're not checking here if childOffsets has changed... if the children change size but
      // result in the exact same size buffer, we're not going to update, resulting in incorrect navigations
      return;
    }

    // store the widths
    this.setState(
      {
        bufferWidth,
        windowWidth
      },
      () => {

        this.childOffsets = childOffsets;

        // notify the integrator
        const {onSize} = this.props;
        if (onSize) {
          onSize({
            offset: Math.min(this.maxOffset, this.offset),
            offsets: childOffsets,
            width: windowWidth,
            minOffset: this.minOffset,
            maxOffset: this.maxOffset
          });
        }

      }
    );

  }

  handleWindowElementChange = windowElement => {
    this.windowElement = windowElement;
    this.handleSizeChange();
  }

  handleBufferElementChange = provider => bufferElement => {
    provider(bufferElement);
    this.bufferElement = bufferElement;
    this.handleSizeChange();
  }

  handleLeftClick = event => {

    // Stop the click event from bubling up and being handled by other components
    // See https://product-fabric.atlassian.net/browse/MSW-165
    event.stopPropagation();

    const {onScroll} = this.props;
    if (onScroll) {
      const {windowWidth} = this.state;
      const newOffset = this.getClosestForLeft(this.offset - windowWidth);
      onScroll({
        direction: 'left',
        offset: newOffset,
        animate: true
      });
    }
  }

  handleRightClick = event => {

    // Stop the click event from bubling up and being handled by other components
    // See https://product-fabric.atlassian.net/browse/MSW-165
    event.stopPropagation();

    const {onScroll} = this.props;
    if (onScroll) {
      const {windowWidth} = this.state;
      const newOffset = this.getClosestForRight(this.offset + windowWidth);
      console.log('onScroll', newOffset);

      onScroll({
        direction: 'right',
        offset: newOffset,
        animate: true
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

    // notify the integrator of the offset change
    const {onScroll} = this.props;
    if (onScroll && isHorizontalScroll) {
      const newOffset = Math.max(this.minOffset, Math.min(this.maxOffset, this.offset + event.deltaX));
      onScroll({
        direction: event.deltaX < 0 ? 'left' : 'right',
        offset: newOffset,
        animate: false
      });
    }

  }

  renderLeftArrow() {
    const {canGoLeft} = this;
    if (!canGoLeft) {
      return null;
    }
    return (
      <LeftArrow onClick={this.handleLeftClick}/>
    );
  }

  renderRightArrow() {
    const {canGoRight} = this;

    if (!canGoRight) {
      return null;
    }
    return (
      <RightArrow onClick={this.handleRightClick}/>
    );
  }

  componentDidMount() {
    this.previousOffset = this.offset;
    // setTimeout(() => {
    //   this.firstMouseDownCb({
    //     button: 0, // primary
    //     clientX: 100,
    //     clientY: 100,
    //     preventDefault: () => {},
    //     stopPropagation: () => {}
    //   });
    //
    // }, 2000);
    window.addEventListener('resize', this.handleSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleSizeChange);
  }

  componentDidUpdate() {
    this.previousOffset = this.offset;

    // the children widths and therefore `this.bufferWidth` may have changed so we need to update our stored sizes
    // note: this reads the DOM on every render (that's nullifying some of the value of having a virtual-dom!)
    this.handleSizeChange();

    // trigger a "real" scroll event so lazily loaded cards realize they've been shown
    // note: we have to wait for the transition to end, otherwise the cards not visible when the scroll
    // event is triggered will be forever stuck in the loading screen (due to the lazy load)
    setTimeout(() => this.triggerScrollEvent(), this.transitionDuration * 1000);

  }

  onDragEnd = (result) => {
    this.fancyFlag = false;
    this.setState({isDragging: false});

    const {onDragEnd} = this.props;
    if (!result.destination || !onDragEnd) return;

    const {source, destination} = result;

    onDragEnd(
      source,
      destination
    );
  }

  onDragStart = (result) => {
    this.setState({isDragging: true});
  }

  onDragEnter = (e: DragEvent) => {
    const {dataTransfer} = e;

    if (!this.state.isNativeDragOver) {
      const {onDragEnter} = this.props;
      const {length} = dataTransfer.items;
      const index = 0; // TODO: get proper index
      this.setState({ isNativeDragOver: true });

      if (onDragEnter) {
        onDragEnter(length, index);
      }
    }
  }

  onDragLeave = (e: DragEvent) => {
    e.preventDefault();
    this.setState({ isNativeDragOver: false });
    console.log('onDragLeave');
  }

  // firstElement: HTMLElement;
  firstMouseDownCb: any;
  fancyFlag: boolean;

  renderChildren = (children) => {
    return React.Children.map(children, (child, index) => {
      const key = child['key'] ? child['key'] : index;
      this.firstMouseDownCb = null;
      return (
        <Draggable key={key} draggableId={key}>
          {(provided, snapshot) => {
            if (index === 0 && this.state.isNativeDragOver) {
              window.firstMouseDownCb = this.firstMouseDownCb = provided.dragHandleProps.onMouseDown;
              if (!this.fancyFlag) {
                setTimeout(() => {
                  console.log("calling it with fake event");

                  this.firstMouseDownCb({
                    button: 0, // primary
                    clientX: 0,
                    clientY: 0,
                    preventDefault: () => {
                    },
                    stopPropagation: () => {
                    }
                  });

                  console.log("mouse move dispatch");
                }, 10);


                this.fancyFlag = true;
              }
            }

            return (
              <FilmStripListItem>
                <div
                  className="draggable"
                  ref={provided.innerRef}
                  style={getItemStyle(
                    provided.draggableStyle,
                    snapshot.isDragging
                  )}
                  {...provided.dragHandleProps}
                >
                  {child}
                </div>
                {provided.placeholder}
              </FilmStripListItem>
            );
          }}
        </Draggable>
      );
    });
  }

  renderList = (provided, snapshot) => {
    const { animate, children } = this.props;
    const left = -this.offset;
    const transitionProperty = animate ? 'left' : 'none';
    const transitionDuration = `${this.transitionDuration}s`;

    return (
      <FilmStripViewWrapper>
        {this.renderLeftArrow()}
        <FilmStripListWrapper
          innerRef={this.handleWindowElementChange}
          onWheel={this.handleScroll}
        >
          <FilmStripList
            innerRef={this.handleBufferElementChange(provided.innerRef)}
            style={{left, transitionProperty, transitionDuration, ...getListStyle(snapshot.isDraggingOver)}}
          >
            {this.renderChildren(children)}
            {provided.placeholder}
          </FilmStripList>
        </FilmStripListWrapper>
        {this.renderRightArrow()}
      </FilmStripViewWrapper>
    );
  }

  onDragOver = (e: SyntheticEvent<Element>) => {
    e.preventDefault();
    const {nativeEvent} = e;
    const {childOffsets} = this;
    const x = nativeEvent.offsetX;
    const y = nativeEvent.offsetY;

    console.log('onDragOver', x)

    const mouseMove = new MouseEvent('mousemove', {
      button: 0, // primary
      clientX: 20 + x,
      clientY: 20 + y,
    });

    window.dispatchEvent(mouseMove);
  }

  onDrop = (e: DragEvent) => {
    e.preventDefault();
    this.setState({ isNativeDragOver: false });
  }

  render(): JSX.Element {
    const { offset, children } = this.props;
    const { isNativeDragOver, isDragging } = this.state;
    // We need to pass "offset" into Droppable even if we don't needed to force a render
    const color = isNativeDragOver ? 'lightred' : (isDragging ? 'lightgreen' : 'darkred');
    const cursor = isDragging ? '-webkit-grab' : 'auto';
    return (
      <div
        style={{ backgroundColor: color, position: 'relative', cursor }}
        onDragEnter={this.onDragEnter}
        onDragOver={this.onDragOver}
        onDrop={this.onDrop}
      >
        {isNativeDragOver ? <DropzoneOverlay onDragLeave={this.onDragLeave} /> : null}
        <DragDropContext onDragEnd={this.onDragEnd} onDragStart={this.onDragStart}>
          <Droppable droppableId="droppable" offset={offset} child={children} direction="horizontal">
            {this.renderList}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }

}

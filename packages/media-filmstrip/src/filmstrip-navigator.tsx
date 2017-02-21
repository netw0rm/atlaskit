import * as React from 'react';
import {Component, DragEvent as ReactDragEvent, DragEventHandler} from 'react';
import {FilmStripViewWrapper, FilmStripList, ArrowLeftWrapper, ArrowRightWrapper} from './styled';
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

// TODO: Create State interface

export default class FilmStripNavigator extends Component<FilmstripNavigatorProps, {}> {
  getDimensions: Function;
  wrapperWidth: number;
  listWidth: number;

  constructor(props) {
    super(props);
    this.state = {showLeft: false, showRight: false, offset: 0};
    this.getDimensions = this._getDimensions.bind(this);
  }

  render() {
    const props = this.props;
    const defaultWidth = 'auto';
    const width = `${this.props.width || defaultWidth}px`;
    const transform = `translateX(${this.state.offset}px)`;
    const leftArrow = <ArrowLeftWrapper>
                        <ArrowLeft label="left" onClick={this.navigate('left')}/>
                      </ArrowLeftWrapper>;
    const rightArrow = <ArrowRightWrapper>
                         <ArrowRight label="right" onClick={this.navigate('right')}/>
                       </ArrowRightWrapper>;

    return <FilmStripViewWrapper style={{width}} onDrop={onDragEvent(props.onDrop)} onDragEnter={onDragEvent(props.onDragEnter)} onDragOver={onDragEvent(props.onDragOver)}>
             {this.state.showLeft ? leftArrow : undefined}
             <FilmStripList style={{transform}} innerRef={this.getDimensions}>
               {props.children}
             </FilmStripList>
             {this.state.showRight ? rightArrow : undefined}
           </FilmStripViewWrapper>;
  }

  _setPosition(step: number) {
    if (this.wrapperWidth >= this.listWidth) {
      this.setState({showRight: false, showLeft: false, offset: 0});
      return;
    }

    const desiredOffset = this.state.offset + step;
    const minOffset = -(this.listWidth - this.wrapperWidth);
    const maxOffset = 0;
    const offset = Math.max(Math.min(desiredOffset, maxOffset), minOffset);

    const showRight = offset !== minOffset;
    const showLeft = offset !== maxOffset;
    this.setState({showRight, showLeft, offset});
  }

  _getDimensions(element) {
    this.wrapperWidth = element.parentElement.getBoundingClientRect().width;
    this.listWidth = element.getBoundingClientRect().width;
    this._setPosition(0);
  }

  navigate(direction) {
    const component = this;

    return () => {
      const step = direction === 'left' ? component.props.width : -component.props.width;
      this._setPosition(step);
    };
  }
}

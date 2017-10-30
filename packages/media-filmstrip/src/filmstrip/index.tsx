/* tslint:disable: variable-name */
import * as React from 'react';
import {FilmstripView} from '../filmstripView';

export interface FilmstripProps {
  dropzoneElement?: Element;
}

export interface FilmstripState {
  animate: boolean;
  offset: number;
  children: any;
}

export class Filmstrip extends React.PureComponent<FilmstripProps, FilmstripState> {
  eventsAdded: boolean;
  state: FilmstripState = {
    animate: false,
    offset: 0,
    children: null
  };

  constructor(props) {
    super(props);
    this.state = {
      animate: false,
      offset: 0,
      children: props.children
    };
  }

  handleSizeChange = ({offset}) => this.setState({offset});
  handleScrollChange = ({offset, animate}) => this.setState({offset, animate});

  componentWillReceiveProps(props: FilmstripProps) {
    const {dropzoneElement} = props;
    const {eventsAdded} = this;

    if (eventsAdded || !dropzoneElement) {return}
    
    this.eventsAdded = true;

    dropzoneElement.addEventListener('dragover', this.onDragOver);
  }

  onDragOver = (e: DragEvent) => {
    const {dataTransfer} = e;

    e.preventDefault();
    console.log('onDragOver', dataTransfer)
  }

  onDragEnd = (source, destination) => {
    const {children} = this.state;
    const result = [...children];
    const [removed] = result.splice(source.index, 1);

    result.splice(destination.index, 0, removed);
    this.setState({children: result})
  }

  render() {
    const {animate, offset, children} = this.state;
    // console.log('render offset', offset)
    return (
      <FilmstripView animate={animate} offset={offset} onSize={this.handleSizeChange} onScroll={this.handleScrollChange} onDragEnd={this.onDragEnd}>
        {children}
      </FilmstripView>
    );
  }
}

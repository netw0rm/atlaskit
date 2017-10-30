/* tslint:disable: variable-name */
import * as React from 'react';
import {FilmstripView} from '../filmstripView';

export interface FilmstripProps {
  dropzoneElement?: Element;
}

export interface FilmstripState {
  animate: boolean;
  offset: number;
}

export class Filmstrip extends React.PureComponent<FilmstripProps, FilmstripState> {
  eventsAdded: boolean;
  state: FilmstripState = {
    animate: false,
    offset: 0
  };

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

  render() {
    const {animate, offset} = this.state;
    const {children} = this.props;
    console.log('render offset', offset)
    return (
      <FilmstripView animate={animate} offset={offset} onSize={this.handleSizeChange} onScroll={this.handleScrollChange}>
        {children}
      </FilmstripView>
    );
  }
}

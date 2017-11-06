import * as React from 'react';

import FakeCard from '../filmstrip/fakeCard';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import {absolute} from '../../../media-card/src/styles/mixins';

interface Props {
  dropzoneElement: Element;
}

interface Position {
  x: number;
  y: number;
}

interface State {
  isDragging: boolean;
  numberOfFiles: number;
  // position?: Position;
}

export class FakeDroppable extends React.PureComponent<Props, State> {
  isDragging: boolean;
  isDraggingIntervalRef: number;
  justDraggedOver: boolean;
  draggableMouseDown: any;
  rootElement: HTMLElement;
  initialPosition: Position;

  constructor(props) {
    super(props);
    this.state = {
      isDragging: false,
      numberOfFiles: 0
    };
  }

  mountDropzoneElement = (dropzoneElement: Element) => {
    if (dropzoneElement) {
      dropzoneElement.addEventListener('dragover', this.onDragOver);
      dropzoneElement.addEventListener('dragenter', this.onDragzoneEnter);
    }
  }

  unmountDropzoneElement = () => {
    const {dropzoneElement} = this.props;
    if (dropzoneElement) {
      dropzoneElement.removeEventListener('dragover', this.onDragOver);
      dropzoneElement.removeEventListener('dragenter', this.onDragzoneEnter);
    }
  }

  attachFakeCard = () => {
    this.draggableMouseDown({
      button: 0, // primary
      clientX: 0,
      clientY: 0,
      preventDefault: () => {},
      stopPropagation: () => {}
    });
  }

  componentWillMount() {
    const {dropzoneElement} = this.props;
    this.mountDropzoneElement(dropzoneElement);
    // setTimeout(() => {
    //   this.attachFakeCard(10, 10);
    // }, 2000);
  }

  componentDidMount() {
    this.isDraggingIntervalRef = window.setInterval(() => {
      this.isDragging = false;
      setTimeout(() => {
        this.setState({isDragging: this.isDragging });
      }, 50);
    }, 200);
  }

  componentWillUnmount() {
    this.unmountDropzoneElement();
    window.clearInterval(this.isDraggingIntervalRef);
  }

  componentWillReceiveProps(nextProps: Props) {
    const {dropzoneElement: nextDropzoneElement} = nextProps;

    this.unmountDropzoneElement();
    this.mountDropzoneElement(nextDropzoneElement);
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    console.log(`did update. was: ${prevState.isDragging} now: ${this.state.isDragging}`);
    if(this.state.isDragging && !prevState.isDragging){
      console.log('Started dragging. Pressing that mouse down');
      this.attachFakeCard();
    }else if(!this.state.isDragging && prevState.isDragging){
      // Not dragging anymore;
      console.log('Stopped dragging');
      delete this.initialPosition;

      const mouseUp = new MouseEvent('mouseup', {
        button: 0, // primary
      });
      window.dispatchEvent(mouseUp);
    }
  }

  onDragzoneEnter = (e: DragEvent) => {
    console.log('DRAG ENTER ... oo, hello hello');
    if (!this.state.isDragging) {
      this.initialPosition = {x: e.clientX, y: e.clientY};
      console.log('attach and go away', this.initialPosition);
      this.justDraggedOver = true;
    }
    this.setState({isDragging: true, numberOfFiles: e.dataTransfer.items.length});
    // e.preventDefault();
  }

  onDragOver = (e: DragEvent) => {
    this.isDragging = true;
    const position: Position = {x: e.clientX, y: e.clientY};
    e.preventDefault();
    const mouseMove = new MouseEvent('mousemove', {
      button: 0, // primary
      clientX: position.x,
      clientY: position.y,
    });

    window.dispatchEvent(mouseMove);
  }

  setRootElement = (el: HTMLElement) => {
     this.rootElement = el;
  }

  render() {
    const {isDragging, numberOfFiles} = this.state;
    // let style = {};

    if (this.justDraggedOver) {
      console.log('oh, hello sweet heart');
      this.justDraggedOver = false;
    }

    if(!FakeCard){
      return <div />;
    }

    // if (isDragging && this.initialPosition) {
    console.log('re-rendering', this.initialPosition);
    let top;
    let left;
    if (isDragging && this.initialPosition) {
      top = this.initialPosition.y - 125/2;
      left = this.initialPosition.x - 156/2;
    }else{
      top = -1000;
      left = 0;
    }
    const style = {
      position: 'fixed',
      top,
      left
    }

    return <div style={style} ref={this.setRootElement}>
      <Droppable droppableId="fake-droppable" direction="horizontal" type="CARD">
        {(provided, snapshot) => {
          return (
            <div
              ref={provided.innerRef}
            >
              <Draggable draggableId={`fake-draggable|${numberOfFiles}`} type="CARD">
                {(provided, snapshot) => {
                  this.draggableMouseDown = provided.dragHandleProps.onMouseDown;
                  return (
                    <div>
                      <div
                        ref={provided.innerRef}
                        style={{
                          display: 'inline-block',
                          margin: '0 4px',
                          ...provided.draggableStyle}}
                        {...provided.dragHandleProps}
                      >
                        <FakeCard key="fake-card-42" draggedFiles={numberOfFiles} />
                      </div>
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Draggable>
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </div>;
  }
}

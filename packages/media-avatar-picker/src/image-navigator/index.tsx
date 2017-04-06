/* tslint:disable:variable-name */
import * as React from 'react';
import {Component} from 'react';
import {ImageCropper} from '../image-cropper/image-cropper';
import {Slider} from '../slider/index';

export const CONTAINER_SIZE = 400;

interface Props {
  imageSource: string;
}

interface Position {
  x: number;
  y: number;
}

interface State {
  imageWidth?: number;
  imageHeight?: number;
  imagePos: Position;
  imageInitPos: Position;
  cursorInitPos?: Position;
  scale: number;
  isDragging: boolean;
}

export class ImageNavigator extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      imageWidth: undefined,
      imagePos: {x: 0, y: 0},
      scale: 1,
      isDragging: false,
      imageInitPos: {x: 0, y: 0}
    };
  }

  componentWillMount() {
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  }

  onMouseMove = (e) => {
    if (this.state.isDragging) {
      const {screenX: x, screenY: y} = e;
      const cursorInitPos = this.state.cursorInitPos || {x, y};

      this.setState({
        cursorInitPos,
        imagePos: {
          x: this.state.imageInitPos.x + (x - cursorInitPos.x),
          y: this.state.imageInitPos.y + (y - cursorInitPos.y),
        }
      });
    }
  }

  onMouseUp = () => {
    this.setState({
      cursorInitPos: undefined,
      isDragging: false,
      imageInitPos: this.state.imagePos
    });
  }

  onDragStarted = () => {
    this.setState({
      isDragging: true
    });
  }

  onScaleChange = (scale) => {
    this.setState({scale: scale / 100});
  }

  onImageSize = (width, height) => {
    this.setState({
      imageWidth: width,
      imageHeight: height,
      scale: this.calculateInitialScale(width, height)
    });
  }

  calculateInitialScale(width: number, height: number): number {
    if (width < CONTAINER_SIZE && height < CONTAINER_SIZE) {
      return 1;
    } else if (width > height) {
      return CONTAINER_SIZE / height;
    } else {
      return CONTAINER_SIZE / width;
    }
  }

  render() {
    const {
      imageSource
    } = this.props;
    const {
      imageWidth,
      imagePos,
      scale,
    } = this.state;

    return <div>
      <ImageCropper
        scale={scale}
        imageSource={imageSource}
        imageWidth={imageWidth}
        containerSize={CONTAINER_SIZE}
        isCircularMask={false}
        top={imagePos.y}
        left={imagePos.x}
        onDragStarted={this.onDragStarted}
        onImageSize={this.onImageSize}
      />
      <Slider
        value={100 * scale}
        onChange={this.onScaleChange}
      />
    </div>;
  }
}

/* tslint:disable:variable-name */
import * as React from 'react';
import {Component} from 'react';
import {ImageCropper} from '../image-cropper/image-cropper';
import {Slider} from '../slider/index';
import {Container, SliderContainer} from './styled';
import {akGridSizeUnitless} from '@atlaskit/util-shared-styles';
import ScaleLargeIcon from '@atlaskit/icon/glyph/media-services/scale-large';
import ScaleSmallIcon from '@atlaskit/icon/glyph/media-services/scale-small';

export const CONTAINER_SIZE = akGridSizeUnitless * 32;

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
  minScale?: number;
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

  /**
   * When scale change we want to zoom in/out relative to the center of the frame.
   * @param scale New scale in 0-100 format.
   */
  onScaleChange = (scale) => {
    const newScale = scale / 100;
    const oldScale = this.state.scale;
    const scaleRelation = newScale / oldScale;
    const oldCenterPixel: Position = {
      x: CONTAINER_SIZE / 2 - this.state.imagePos.x,
      y: CONTAINER_SIZE / 2 - this.state.imagePos.y,
    };
    const newCenterPixel: Position = {
      x: scaleRelation * oldCenterPixel.x,
      y: scaleRelation * oldCenterPixel.y,
    };

    this.setState({
      scale: newScale,
      imagePos: {
        x: CONTAINER_SIZE / 2 - newCenterPixel.x,
        y: CONTAINER_SIZE / 2 - newCenterPixel.y,
      }
    });
  }

  onImageSize = (width, height) => {
    this.setState({
      imageWidth: width,
      imageHeight: height,
      scale: this.calculateInitialScale(width, height),
      minScale: (CONTAINER_SIZE / 2) / Math.max(width, height) * 100,
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
      minScale
    } = this.state;

    return <Container>
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
      <SliderContainer>
        <ScaleSmallIcon label="scale-small-icon" />
        <Slider
          value={100 * scale}
          min={minScale}
          max={100}
          onChange={this.onScaleChange}
        />
        <ScaleLargeIcon label="scale-large-icon" />
      </SliderContainer>
    </Container>;
  }
}

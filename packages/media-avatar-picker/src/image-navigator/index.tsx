/* tslint:disable:variable-name */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Component} from 'react';
import {akGridSizeUnitless} from '@atlaskit/util-shared-styles';
import Button from '@atlaskit/button';
import ScaleLargeIcon from '@atlaskit/icon/glyph/media-services/scale-large';
import ScaleSmallIcon from '@atlaskit/icon/glyph/media-services/scale-small';
import Slider from '@atlaskit/field-range';
import {ImageCropper, OnLoadHandler, MaskType} from '../image-cropper';
import {Container, SliderContainer, FileInput, ImageUploader, DragZone, DragZoneImage, DragZoneText} from './styled';
import {uploadPlaceholder} from './images';

export const CONTAINER_SIZE = akGridSizeUnitless * 32;

export interface Props {
  imageSource?: string;
  onLoad?: OnLoadHandler;
  containerWidth?: number | 'auto';
  mask?: MaskType;
  preserveWidth?: boolean;
  canNavigateVertically?: boolean;
  allowZooming?: boolean;
}

export interface Dimensions {
  width: number;
  height: number;
}

export interface Position {
  x: number;
  y: number;
}

export interface State {
  imageWidth?: number;
  imageHeight?: number;
  imagePos: Position;
  imageInitPos: Position;
  cursorInitPos?: Position;
  scale: number;
  isDragging: boolean;
  minScale?: number;
  fileImageSource?: string;
  isDroppingFile: boolean;
  containerDimensions: Dimensions;
}

export class ImageNavigator extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      imageWidth: undefined,
      imagePos: {x: 0, y: 0},
      scale: 1,
      isDragging: false,
      imageInitPos: {x: 0, y: 0},
      fileImageSource: '',
      isDroppingFile: false,
      containerDimensions: {
        width: CONTAINER_SIZE,
        height: CONTAINER_SIZE
      }
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

  componentDidMount() {
    const {containerWidth} = this.props;
    const parent = ReactDOM.findDOMNode(this).parentElement;

    if (containerWidth !== 'auto' || !parent) { return; }

    const width = parent.getBoundingClientRect().width;
    this.setState({
      containerDimensions: {
        width,
        height: CONTAINER_SIZE
      }
    });
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
    const {scale: oldScale, containerDimensions, imagePos} = this.state;
    const newScale = scale / 100;
    const scaleRelation = newScale / oldScale;
    const oldCenterPixel: Position = {
      x: containerDimensions.width / 2 - imagePos.x,
      y: containerDimensions.height / 2 - imagePos.y,
    };
    const newCenterPixel: Position = {
      x: scaleRelation * oldCenterPixel.x,
      y: scaleRelation * oldCenterPixel.y,
    };

    this.setState({
      scale: newScale,
      imagePos: {
        x: containerDimensions.width / 2 - newCenterPixel.x,
        y: containerDimensions.height / 2 - newCenterPixel.y,
      }
    });
  }

  onImageSize = (width, height) => {
    const {containerDimensions} = this.state;

    this.setState({
      imageWidth: width,
      imageHeight: height,
      scale: this.calculateInitialScale(width, height),
      minScale: (containerDimensions.width / 2) / Math.max(width, height) * 100,
    });
  }

  calculateInitialScale(width: number, height: number): number {
    const {containerDimensions} = this.state;
    if (width < containerDimensions.width && height < containerDimensions.height) {
      return 1;
    } else if (width > height) {
      return containerDimensions.height / height;
    } else {
      return containerDimensions.width / width;
    }
  }

  readFile(file: File) {
    const {type} = file;

    // TODO FIL-4342: Show feedback about invalid file type
    if (type.indexOf('image/') !== 0) { return; }

    const reader = new FileReader();
    reader.onload = (e: ProgressEvent) => {
      const fileImageSource = (e.target as FileReader).result;

      this.setState({fileImageSource});
    };
    reader.readAsDataURL(file);
  }

  // Trick to have a nice <input /> appearance
  onUploadButtonClick = (e) => {
    const input = e.target.querySelector('#image-input');

    if (input) { input.click(); }
  }

  onFileChange = (e) => {
    e.stopPropagation();
    const file = e.target.files[0];

    this.readFile(file);
  }

  updateDroppingState(e: Event, state: boolean) {
    e.stopPropagation();
    e.preventDefault();
    this.setState({isDroppingFile: state});
  }

  onDragEnter = (e) => {
    this.updateDroppingState(e, true);
  }

  onDragOver = (e) => {
    this.updateDroppingState(e, true);
  }

  onDragLeave = (e) => {
    this.updateDroppingState(e, false);
  }

  onDrop = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const dt = e.dataTransfer;
    const file = dt.files[0];

    this.setState({isDroppingFile: false});
    this.readFile(file);
  }

  renderImageUploader() {
    const {isDroppingFile} = this.state;

    return (
      <ImageUploader>
        <DragZone isDroppingFile={isDroppingFile} onDragLeave={this.onDragLeave} onDragEnter={this.onDragEnter} onDragOver={this.onDragOver} onDrop={this.onDrop}>
          <DragZoneImage src={uploadPlaceholder} alt="upload image" />
          <DragZoneText>Drag and drop your photos here</DragZoneText>
        </DragZone>
        or
        <Button onClick={this.onUploadButtonClick as any}>
          Upload a photo
          <FileInput type="file" id="image-input" onChange={this.onFileChange} />
        </Button>
      </ImageUploader>
    );
  }

  renderImageCropper(dataURI: string) {
    const {
      imageWidth,
      imagePos,
      scale,
      containerDimensions
    } = this.state;
    const {mask, allowZooming} = this.props;

    return (
      <div>
        <ImageCropper
          scale={scale}
          imageSource={dataURI}
          imageWidth={imageWidth}
          containerDimensions={containerDimensions}
          mask={mask}
          top={imagePos.y}
          left={imagePos.x}
          onDragStarted={this.onDragStarted}
          onImageSize={this.onImageSize}
          onLoad={this.props.onLoad}
        />
        {allowZooming ? this.renderSlider(scale) : undefined}
      </div>
    );
  }

  private renderSlider = (scale) => {
    const {minScale} = this.state;

    return (
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
    );
  }

  // We prioritize passed image rather than the one coming from the uploader
  private get dataURI(): string | undefined {
    const {imageSource} = this.props;
    const {fileImageSource} = this.state;

    return imageSource || fileImageSource;
  }

  render() {
    const {dataURI} = this;
    const content = dataURI ? this.renderImageCropper(dataURI) : this.renderImageUploader();

    return (
      <Container>
        {content}
      </Container>
    );
  }
}

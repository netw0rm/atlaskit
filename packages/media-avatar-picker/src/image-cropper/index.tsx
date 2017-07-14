/* tslint:disable:variable-name */
import * as React from 'react';
import {Component} from 'react';
import {isImageRemote} from '@atlaskit/media-core';
import {CircularMask, Container, DragOverlay, RectMask, Image} from './styled';
import {Dimensions} from '../image-navigator';

export interface LoadParameters {
  export: () => string;
}

export type OnLoadHandler = (params: LoadParameters) => void;
export type MaskType = 'rect' | 'circular' | 'none';
export interface ImageCropperProp {
  imageSource: string;
  scale?: number; // Value from 0 to 1
  containerDimensions?: Dimensions;
  mask?: MaskType;
  top: number;
  left: number;
  imageWidth?: number;
  onDragStarted?: () => void;
  onImageSize?: (image: HTMLImageElement) => void;
  onLoad?: OnLoadHandler;
}

const defaultScale = 1;

export class ImageCropper extends Component<ImageCropperProp, {}> {
  private imageElement: HTMLImageElement;

  static defaultProps = {
    scale: defaultScale,
    onDragStarted: () => {},
    onImageSize: () => {},
  };

  componentDidMount() {
    if (this.props.onLoad) {
      this.props.onLoad({
        export: this.export
      });
    }
  }

  onDragStarted = () => this.props.onDragStarted && this.props.onDragStarted();

  onImageLoaded = (e) => {
    const imageElement = e.target;
    if (this.props.onImageSize) {
      this.props.onImageSize(imageElement);
    }
    this.imageElement = imageElement;
  }

  render() {
    const {
      top,
      left,
      imageSource
    } = this.props;
    const {containerDimensions, renderMask} = this;
    const containerStyle = {
      width: `${containerDimensions.width}px`,
      height: `${containerDimensions.height}px`
    };

    const width = this.width ? `${this.width}px` : 'auto';

    const imageStyle = {
      width,
      display: width === 'auto' ? 'none' : 'block',
      top: `${top}px`,
      left: `${left}px`,
    };
    const crossOrigin = isImageRemote(imageSource) ? 'anonymous' : undefined;

    return <Container style={containerStyle}>
      <Image crossOrigin={crossOrigin} src={imageSource} style={imageStyle} onLoad={this.onImageLoaded} />
      {renderMask()}
      <DragOverlay onMouseDown={this.onDragStarted} />
    </Container>;
  }

  private renderMask = () => {
    const {mask} = this.props;

    if (mask === 'none') { return; }
    if (mask === 'circular') { return <CircularMask />; }
    return <RectMask />;
  }

  private get width() {
    const {imageWidth, scale} = this.props;

    return imageWidth ? imageWidth * (scale || defaultScale) : 0;
  }

  private get containerDimensions() {
    const {containerDimensions} = this.props;

    return {
      width: containerDimensions ? containerDimensions.width : 200,
      height: containerDimensions ? containerDimensions.height : 200
    };
  }

  export = () : string => {
    const {top, left, scale, mask} = this.props;
    const {containerDimensions} = this;
    let imageData = '';
    const containerPadding = mask === 'none' ? 0 : 20;
    const canvas = document.createElement('canvas');
    const width = containerDimensions.width || 0;
    const height = containerDimensions.height || 0;
    const scaleWithDefault = scale || 1;
    const destinationWidth = Math.max(width - containerPadding * 2, 0);
    const destinationHeight = Math.max(height - containerPadding * 2, 0);

    canvas.width = destinationWidth;
    canvas.height = destinationHeight;

    const context = canvas.getContext('2d');

    if (context) {
      const sourceLeft = (-left + containerPadding) / scaleWithDefault;
      const sourceTop = (-top + containerPadding) / scaleWithDefault;
      const sourceWidth = destinationWidth / scaleWithDefault;
      const sourceHeight = destinationHeight / scaleWithDefault;

      context.drawImage(this.imageElement,
        sourceLeft, sourceTop, sourceWidth, sourceHeight,
        0, 0, destinationWidth, destinationHeight);
      imageData = canvas.toDataURL();
    }

    return imageData;
  }
}

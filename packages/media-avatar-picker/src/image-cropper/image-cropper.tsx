/* tslint:disable:variable-name */
import * as React from 'react';
import {Component} from 'react';
import {CircularMask, Container, DragOverlay, RectMask, Image} from './styled';

export interface ImageCropperProp {
  imageSource: string;
  scale?: number; // Value from 0 to 1
  containerSize?: number;
  isCircularMask?: boolean;
  top: number;
  left: number;
  imageWidth?: number;
  onDragStarted?: () => void;
  onImageSize?: (width: number, height: number) => void;
}

const defaultScale = 1;

export class ImageCropper extends Component<ImageCropperProp, {}> {
  static defaultProps = {
    containerSize: 200,
    isCircleMask: false,
    scale: defaultScale,
    onDragStarted: () => {},
    onImageSize: () => {},
  };

  onDragStarted = () => this.props.onDragStarted && this.props.onDragStarted();

  onImageLoaded = (e) =>
    this.props.onImageSize && this.props.onImageSize(e.target.naturalWidth, e.target.naturalHeight);

  render(){
    const {
      isCircularMask,
      containerSize,
      top,
      left,
      imageSource,
      imageWidth,
      scale
    } = this.props;

    const containerStyle = {
      width: `${containerSize}px`,
      height: `${containerSize}px`,
    };

    const width = imageWidth ? `${imageWidth * (scale || defaultScale)}px` : 'auto';

    const imageStyle = {
      width,
      display: width === 'auto' ? 'none' : 'block',
      top: `${top}px`,
      left: `${left}px`,
    };

    return <Container style={containerStyle}>
      <Image src={imageSource} style={imageStyle} onLoad={this.onImageLoaded} />
      {isCircularMask ? <CircularMask /> : <RectMask />}
      <DragOverlay onMouseDown={this.onDragStarted} />
    </Container>;
  }
}

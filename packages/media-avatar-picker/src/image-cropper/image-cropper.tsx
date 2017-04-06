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
  onImageWidth?: (width: number) => void;
}

export class ImageCropper extends Component<ImageCropperProp, {}> {
  static defaultProps = {
    containerSize: 200,
    isCircleMask: false,
    scale: 1,
    onDragStarted: () => {},
    onImageWidth: () => {},
  };

  onDragStarted = () => this.props.onDragStarted && this.props.onDragStarted();

  onImageLoaded = (e) => this.props.onImageWidth && this.props.onImageWidth(e.target.naturalWidth);

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

    const width = imageWidth ? `${imageWidth * (scale || 1)}px` : 'auto';

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

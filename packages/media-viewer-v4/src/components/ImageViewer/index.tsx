import * as React from 'react';
import {ImageViewerWrapper, Image} from './styled';
import {ViewerTools} from '../../components/ViewerTools';

export interface ImageViewerProps {
  imageURL: string;
}

export interface ImageViewerState {
  zoomLevel: number;
}

// const defaultDimensions = {width: 582, height: 54};
// const defaultColor = {red: 250, green: 61, blue: 17};
// const defaultTool = 'brush';

export class ImageViewer extends React.Component<ImageViewerProps, ImageViewerState> {

  state: ImageViewerState = {
    zoomLevel: 100
  };

  handleZoomOut = () => {
    const zoomLevel = Math.max(this.state.zoomLevel - 20, 5);
    this.setState({zoomLevel});
  }

  handleZoomIn = () => {
    const zoomLevel = this.state.zoomLevel + 20;
    this.setState({zoomLevel});
  }

  handleZoomFit = () => {
    this.setState({zoomLevel: 100});
  }

  handleError = () => {
    console.log('An error occurred whilst loading the image', this.props.imageURL);
  }

  render() {
    const {imageURL} = this.props;
    const {zoomLevel} = this.state;
    const scaleValue = zoomLevel / 100;
    const transform = `scale(${scaleValue}) translateZ(0)`;
    return (
      <ImageViewerWrapper>
        <Image onError={this.handleError} src={imageURL} style={{transform}}/>
        <ViewerTools
          onZoomOut={this.handleZoomOut}
          onZoomIn={this.handleZoomIn}
          onZoomFit={this.handleZoomFit}
          zoomLevel={zoomLevel}
          isEditing={false}
        />
      </ImageViewerWrapper>
    );
  }

}

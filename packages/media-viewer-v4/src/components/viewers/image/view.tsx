import * as React from 'react';
import {ImageViewerWrapper, Image} from './styled';
import {ViewerTools} from '../../viewerTools';
import {ViewerLoading} from '../../shared/viewerLoading';
import {ViewerError} from '../../shared/viewerError';

export interface ImageViewProps {
  imageURL?: string;
  error?: string;
  zoomLevel?: number;
  onLoadError?: () => void;
  onZoomOut?: () => void;
  onZoomIn?: () => void;
  onZoomFit?: () => void;
}

export interface ImageViewState {
}

export class ImageView extends React.Component<ImageViewProps, ImageViewState> {

  render() {
    const {imageURL, error} = this.props;

    if (error) {
      return <ViewerError error={error}/>;
    } else if (!imageURL) {
      return <ViewerLoading/>;
    } else {
        const {onLoadError, zoomLevel = 100, onZoomOut, onZoomIn, onZoomFit} = this.props;
        const scaleValue = zoomLevel / 100;
        const transform = `scale(${scaleValue}) translateZ(0)`;
        return (
        <ImageViewerWrapper>
          <Image onError={onLoadError} src={imageURL} style={{transform}}/>
          <ViewerTools
            onZoomOut={onZoomOut}
            onZoomIn={onZoomIn}
            onZoomFit={onZoomFit}
            zoomLevel={zoomLevel}
            isEditing={false}
          />
        </ImageViewerWrapper>
      );
    }
  }

}

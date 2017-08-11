import * as React from 'react';
import {ViewerTools} from '../../viewerTools';
import {ViewerLoading} from '../../shared/viewerLoading';
import {ViewerError} from '../../shared/viewerError';
import {ImageViewerWrapper, Image} from './styled';

export interface ImageViewProps {
  url?: string;
  error?: string;
  zoomLevel?: number;
  onLoadError?: () => void;
  onZoomOut?: () => void;
  onZoomIn?: () => void;
  onZoomFit?: () => void;
}

export function ImageView(props: ImageViewProps) {
  const {url, error} = props;

  if (error) {
    return <ViewerError error={error}/>;
  } else if (!url) {
    return <ViewerLoading/>;
  } else {
      const {onLoadError, zoomLevel = 100, onZoomOut, onZoomIn, onZoomFit} = props;
      const scaleValue = zoomLevel / 100;
      const transform = `scale(${scaleValue}) translateZ(0)`;
      return (
      <ImageViewerWrapper>
        <Image onError={onLoadError} src={url} style={{transform}}/>
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


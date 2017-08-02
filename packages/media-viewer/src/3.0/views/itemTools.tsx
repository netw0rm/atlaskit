import * as React from 'react';
import {Component} from 'react';
import MediaServicesZoomOutIcon from '@atlaskit/icon/glyph/media-services/zoom-out';
import MediaServicesActualSizeIcon from '@atlaskit/icon/glyph/media-services/actual-size';
import MediaServicesZoomInIcon from '@atlaskit/icon/glyph/media-services/zoom-in';
import VidFullScreenOnIcon from '@atlaskit/icon/glyph/vid-full-screen-on';
import MediaServicesAddCommentIcon from '@atlaskit/icon/glyph/media-services/add-comment';
import MediaServicesBrushIcon from '@atlaskit/icon/glyph/media-services/brush';
import {ItemToolsWrapper, UploaderDetailsWrapper, ToolsContent, ZoomWrapper} from './styled';

export interface ItemToolsProps {
  onZoomOut: any;
  onZoomIn: any;
  zoomLevel: number;
}

export interface ItemToolsState {
  
}

export class ItemTools extends Component<ItemToolsProps, ItemToolsState> {
  render() {
    const {onZoomOut, onZoomIn, zoomLevel} = this.props;

    return (
      <ItemToolsWrapper className="visible-on-hover">
        <UploaderDetailsWrapper>
          
        </UploaderDetailsWrapper>
        <ToolsContent>
          <MediaServicesZoomOutIcon label="Zoom out" onClick={onZoomOut} />
          <MediaServicesActualSizeIcon label="Actual size" />
          <MediaServicesZoomInIcon label="Zoom in" onClick={onZoomIn} />
          <VidFullScreenOnIcon label="Full size" />
          <MediaServicesAddCommentIcon label="Anotate" />
          <MediaServicesBrushIcon label="Draw" />
        </ToolsContent>
        <ZoomWrapper>
          {zoomLevel}%
        </ZoomWrapper>
      </ItemToolsWrapper>
    );
  }
}
import * as React from 'react';
import {Component} from 'react';
import MediaServicesZoomOutIcon from '@atlaskit/icon/glyph/media-services/zoom-out';
import MediaServicesActualSizeIcon from '@atlaskit/icon/glyph/media-services/actual-size';
import MediaServicesZoomInIcon from '@atlaskit/icon/glyph/media-services/zoom-in';
import VidFullScreenOnIcon from '@atlaskit/icon/glyph/vid-full-screen-on';
import MediaServicesBrushIcon from '@atlaskit/icon/glyph/media-services/brush';
import {ItemToolsWrapper, UploaderDetailsWrapper, ToolsContent, ZoomWrapper, EditorIconWrapper} from './styled';

export interface ItemToolsProps {
  onZoomOut?: any;
  onZoomIn?: any;
  onZoomFit?: any;
  onEditModeChange?: any;
  zoomLevel?: number;
  isEditing?: boolean;
}

export interface ItemToolsState {

}

export class ItemTools extends Component<ItemToolsProps, ItemToolsState> {
  render() {
    const {onZoomOut, onZoomIn, onZoomFit, zoomLevel} = this.props;
    return (
      <ItemToolsWrapper className="visible-on-hover">
        <UploaderDetailsWrapper>

        </UploaderDetailsWrapper>
        <ToolsContent>
          <MediaServicesZoomOutIcon label="Zoom out" onClick={onZoomOut} />
          <MediaServicesActualSizeIcon label="Actual size" onClick={onZoomFit} />
          <MediaServicesZoomInIcon label="Zoom in" onClick={onZoomIn} />
          <VidFullScreenOnIcon label="Full size" />
          {this.getEditorButton()}
        </ToolsContent>
        <ZoomWrapper>
          {Math.round(zoomLevel)}%
        </ZoomWrapper>
      </ItemToolsWrapper>
    );
  }

  getEditorButton = () => {
    const {onEditModeChange, isEditing} = this.props;
    if (!onEditModeChange) {
      return null;
    }
    return (
      <EditorIconWrapper isEditing={isEditing}>
        <MediaServicesBrushIcon label="Draw" onClick={() => onEditModeChange(!this.props.isEditing)} />
      </EditorIconWrapper>
    );
  }
}
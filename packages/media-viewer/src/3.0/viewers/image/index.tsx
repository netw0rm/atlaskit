import * as React from 'react';
import {Component} from 'react';
import {ImageViewerWrapper, Img} from './styled';
import {Context, FileItem} from '@atlaskit/media-core';
import {MediaEditor} from '@atlaskit/media-editor';
import {ItemTools} from '../../views/itemTools';
import {MediaIdentifier} from '../../domain';

export interface ImageViewerProps {
  identifier: MediaIdentifier;
  metadata: FileItem;
  context: Context;
}

export interface ImageViewerState {
  dataURI?: string;
  zoomLevel: number;
  isEditing: boolean;
}

const defaultDimensions = {width: 582, height: 54};
const defaultColor = {red: 250, green: 61, blue: 17};
const defaultTool = 'brush';

export class ImageViewer extends Component<ImageViewerProps, ImageViewerState> {
  state:ImageViewerState = {
    zoomLevel: 100,
    isEditing: false
  }

  fetchDataURI(metadata: FileItem) {
    const {context} = this.props;
    const {collectionName} = this.props.identifier;
    const setDataURI = dataURI => this.setState({dataURI});
    const clearDataURI = () => this.setState({dataURI: undefined});
    const dataURIService = context.getDataUriService(collectionName);

    dataURIService.fetchOriginalDataUri(metadata).then(setDataURI, clearDataURI);
  }

  componentDidMount() {
    const {metadata} = this.props;
    this.fetchDataURI(metadata);
  }

  componentWillReceiveProps(nextProps: ImageViewerProps) {
    if (nextProps.metadata.details.id === this.props.metadata.details.id) {
      return;
    }

    this.fetchDataURI(nextProps.metadata);
  }

  render() {
    const {dataURI, zoomLevel, isEditing} = this.state;
    const scaleValue = zoomLevel / 100;
    const transform = `scale(${scaleValue}) translateZ(0)`;

    return (
      <ImageViewerWrapper>
        {isEditing ? this.renderEditor() : <Img src={dataURI} style={{transform}}/>}
        <ItemTools 
          onZoomOut={this.onZoomOut}
          onZoomIn={this.onZoomIn}
          onZoomFit={this.onZoomFit}
          zoomLevel={zoomLevel}
          isEditing={isEditing}
          onEditModeChange={this.onEditModeChange}
        />
      </ImageViewerWrapper>
    );
  }

  renderEditor() {
    const {dataURI} = this.state;

    if (!dataURI) {
      return;
    }

    // TODO: Read dimensions from Image
    // TODO: Save image on change
    return (
      <MediaEditor
        imageUrl={dataURI}
        dimensions={defaultDimensions}
        backgroundColor={{red: 255, green: 255, blue: 255}}
        shapeParameters={{color: defaultColor, lineWidth: 10, addShadow: true}}
        tool={defaultTool}
        onLoad={this.onEditorLoad}
        onError={this.onEditorError}
        onShapeParametersChanged={this.onShapeParametersChanged}
      />
    );
  }

  onShapeParametersChanged() {

  }

  onEditorLoad() {

  }

  onEditorError() {

  }

  onEditModeChange = (isEditing: boolean) => {
    this.setState({isEditing});
  }

  onZoomOut = () => {
    const zoomLevel = Math.max(this.state.zoomLevel - 20, 5);
    this.setState({zoomLevel});
  }

  onZoomIn = () => {
    const zoomLevel = this.state.zoomLevel + 20;
    this.setState({zoomLevel});
  }

  onZoomFit = () => {
    this.setState({zoomLevel: 100});
  }
}
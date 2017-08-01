import * as React from 'react';
import {Component} from 'react';
import {FileItem, Context} from '@atlaskit/media-core';
import ArrowLeft from '@atlaskit/icon/glyph/arrowleft';
import ArrowRight from '@atlaskit/icon/glyph/arrowright';
import {ImageViewer} from '../viewers';
import {List} from '..';
import {ItemPreviewWrapper, ArrowLeftWrapper, ArrowRightWrapper} from './styled';

export interface ItemPreviewProps {
  metadata: FileItem;
  context: Context;
  collectionName: string;
  list?: List;
}

export interface ItemPreviewState {
  dataURI?: string;
}

export class ItemPreview extends Component<ItemPreviewProps, ItemPreviewState> {
  state:ItemPreviewState = {

  }

  componentDidMount() {
    const {metadata, context, collectionName} = this.props;
    const setDataURI = dataURI => this.setState({dataURI});
    const clearDataURI = () => this.setState({dataURI: undefined});
    const dataURIService = context.getDataUriService(collectionName);

    dataURIService.fetchOriginalDataUri(metadata).then(setDataURI, clearDataURI);
  }

  render() {
    const {canNavigate} = this;
    return (
      <ItemPreviewWrapper>
        {canNavigate ? <ArrowLeftWrapper><ArrowLeft size="large" label="navigate left" /></ArrowLeftWrapper> : null}
        {this.renderViewer()}
        {canNavigate ? <ArrowRightWrapper><ArrowRight size="large" label="navigate right" /></ArrowRightWrapper> : null}
      </ItemPreviewWrapper>
    );
  }

  renderViewer() {
    // TODO: use metadata.details.mediaType to chose the right viewer
    const {dataURI} = this.state;

    return (
      <ImageViewer dataURI={dataURI || ''}/>
    );
  }

  get canNavigate(): boolean {
    const {list} = this.props;

    return Boolean(list);
  }
}
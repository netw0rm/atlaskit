import * as React from 'react';
import { PureComponent } from 'react';
import { Context, MediaItem } from '@atlaskit/media-core';

export interface Props {
  collectionName?: string;
  mediaItem: MediaItem;
  context: Context;
}

export interface State {
  dataURI: string | undefined;
}

export class ImageViewer extends PureComponent<Props, State> {

  componentDidMount(): void {
    const setDataURI = dataURI => this.setState({dataURI});
    const clearDataURI = () => this.setState({dataURI: undefined});
    const dataURIService = this.props.context.getDataUriService(this.props.collectionName);

    dataURIService.fetchOriginalDataUri(this.props.mediaItem).then(setDataURI, clearDataURI);
  }

  render() {
    return (
      <div>
        <img width="100%" src={this.state.dataURI} />
      </div>
    );
  }
}

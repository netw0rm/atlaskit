import * as React from 'react';
import {Frame} from './components/Frame';

export interface Item {
  type: 'file' | 'link';
}

interface MediaViewerProps {
  visible?: boolean;
}

interface MediaViewerState {
  items: Item[];
  index: number;
}

export class MediaViewer extends React.Component<MediaViewerProps, MediaViewerState> {

  state: MediaViewerState = {
    items: [],
    index: 0
  };

  get canGoPrev(): boolean {
    const {index} = this.state;
    return index > 0;
  }

  get canGoNext(): boolean {
    const {items, index} = this.state;
    return index + 1 < items.length;
  }

  handleGoPrev = () => {
    if (this.canGoPrev) {
      this.setState(({index}) => ({index: index - 1}));
    }
  }

  handleGoNext = () => {
    if (this.canGoNext) {
      this.setState(({index}) => ({index: index + 1}));
    }
  }

  renderViewer() {
    const {items, index} = this.state;
    const item = items[index];
    return null;
    // const {context, metadata, identifer} = this.props;
    // const mediaType = metadata.details.mediaType;
    // let viewer;

    if (mediaType === 'image') {
      viewer = <ImageViewer context={context} metadata={metadata} identifier={identifer} />;
    }
    // } else if (mediaType === 'video') {
    //   viewer = <VideoViewer context={context} metadata={metadata} identifier={identifer} />;
    // } else if (mediaType === 'audio') {
    //   viewer = <AudioViewer context={context} metadata={metadata} identifier={identifer} />;
    // } else if (mediaType === 'doc') {
    //   viewer = <PdfViewer context={context} metadata={metadata} identifier={identifer} />;
    // }

    // return viewer;
  }

  render(); {
    const {visible} = this.props;
    const {items} = this.state;
    const {canGoPrev, canGoNext} = this;

    if (!visible) {
      return null;
    }

    return (
      <Frame
        canGoPrev={canGoPrev}
        canGoNext={canGoNext}
        onGoPrev={this.handleGoPrev}
        onGoNext={this.handleGoNext}
      >
        {this.renderViewer()}
      </Frame>
    );
  }

}

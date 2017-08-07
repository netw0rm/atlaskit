// import * as React from 'react';
import {Component} from 'react';
import {Context} from '@atlaskit/media-core';
// import {ItemPreview} from '../itemPreview';
import {MediaIdentifier} from '../../domain';
// import {FileItem, Context} from '@atlaskit/media-core';
// import {ImageViewer, VideoViewer, AudioViewer, PdfViewer} from '../viewers';
// import {MediaIdentifier} from '../domain';

// import {Wrapper} from './styled';

export interface PreloaderProps {
  context: Context;
  list: Array<MediaIdentifier>;
  selected: MediaIdentifier;
}

export interface PreloaderState {

}

export class Preloader extends Component<PreloaderProps, PreloaderState> {

  state: PreloaderState = {

  };

  get itemsToPreload(): Array<MediaIdentifier> {
    const {list, selected} = this.props;
    const index = list.indexOf(selected);

    return [list[index - 1], list[index + 1]];
  }

  render() {
    return null;
    // const {context} = this.props;
    // const previews = this.itemsToPreload
    // .filter(i => i.mediaType === 'image')
    // .map(i => (
    //   <ItemPreview
    //     context={context}
    //     identifer={i}
    //     metadata={}
    //   />
    // ));

    // return (
    //   <Wrapper>
    //     {previews}
    //   </Wrapper>
    // );
  }
}

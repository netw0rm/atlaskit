/**
 * TODO:
 *   - Specs 😅
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Rnd from 'react-rnd';
import {Context, MediaItemDetails} from '@atlaskit/media-core';

import {isLinkDetails} from '../../utils/isLinkDetails';
import {AudioWidget} from '../../utils/cardAudioView/audioWidget';
import {Wrapper as VideoWidgetWrapper, Video} from '../../utils/cardVideoView/styled';
import {VideoCardOverlay} from '../../utils/cardVideoView/videoOverlay';

import {CardDimensions} from '../../index';
import {
  // object literals
  containerForWidgetStyles,
  widgetWrapperStyles,
} from './styled';


const containerId = 'widget-container';

export interface WidgetOptions {
  dimensions?: CardDimensions;
  enableResizing?: boolean;
}

export default class Widget {
  static add(component, options: WidgetOptions = {enableResizing: true, dimensions: undefined}) {
    this.renderWidget(component, options);
  }

  static remove() {
    // Using unmountComponentAtNode instead of a native 'remove' in order to fire React hooks
    ReactDOM.unmountComponentAtNode(this.getContainer());
  }

  private static renderWidget(activeComponent, options: WidgetOptions) {
    const {dimensions, enableResizing} = options;

    const initialLocationAndDimensions = {
      x: 100,
      y: 100,
      ...dimensions
    };
    const resizingValues = Widget.resizingHash(enableResizing);
    const componentWrapper = (
      <Rnd
        default={initialLocationAndDimensions}
        style={widgetWrapperStyles}
        minWidth={240}
        minHeight={180}
        bounds="parent"
        lockAspectRatio={true}
        enableResizing={resizingValues}
      >
        {activeComponent}
      </Rnd>
    );

    Widget.remove(); // TODO: Don't remove the whole container, find a more performant way of updating it
    ReactDOM.render(componentWrapper, this.getContainer());
  }

  private static getContainer() {
    const container = document.body.querySelector(`#${containerId}`);

    if (!container) {
      return Widget.createContainerInDom(containerId);
    }

    return container;
  }

  private static createContainerInDom(containerId: string) {
    const container = window.document.createElement('div');

    container.setAttribute('id', containerId);
    Widget.addStylesToContainerForWidget(container);
    document.body.appendChild(container);

    return container;
  }

  private static addStylesToContainerForWidget(container: HTMLElement): void {
    container.style.cssText = containerForWidgetStyles;
  }

  private static resizingHash(visible?: boolean) {
    return {
      bottom: visible,
      bottomLeft: visible,
      bottomRight: visible,
      left: visible,
      right: visible,
      top: visible,
      topLeft: visible,
      topRight: visible
    };
  }
}

const removeWidget = () => {
  Widget.remove();
};

export type CreateAudioWidgetSpec = {
  audioUrl: Promise<string>;
  title?: string;
};

export type CreateVideoWidgetSpec = {
  videoUrl: Promise<string>;
  title?: string;
};

export const createWidget = (context: Context, mediaItemDetails: MediaItemDetails, collectionName: string): void => {
  if (isLinkDetails(mediaItemDetails)) {
    const linkItemDetails = mediaItemDetails;
    const {resources, title} = linkItemDetails;
    const {file} = resources || {file: undefined};

    if (!file || !file.type) {
      return;
    }

    if (file.type.indexOf('audio') === 0) {
      showAudioWidget({title, audioUrl: Promise.resolve(file.url)});
    }

    if (file.type.indexOf('video') === 0) {
      showVideoWidget({title, videoUrl: Promise.resolve(file.url)});
    }

    return;
  }

  const fileItemDetails = mediaItemDetails;
  const {id: fileId, mediaType, name} = fileItemDetails;
  if (!fileId) {
    return;
  }

  const binaryUrl = context.getFileBinary(fileId, collectionName);
  if (mediaType === 'audio') {
    showAudioWidget({audioUrl: binaryUrl, title: name});
  }

  if (mediaType === 'video') {
    showVideoWidget({videoUrl: binaryUrl, title: name});
  }
};

export const showAudioWidget = (spec: CreateAudioWidgetSpec): void => {
  const dimensions = {width: '200px', height: '150px'};

  const options = {
    dimensions,
    enableResizing: false
  };

  spec.audioUrl.then((audioSrc) => {
    Widget.add(
      <AudioWidget
        audioSrc={audioSrc}
        onClose={removeWidget}
        title={spec.title}
        dimensions={dimensions}
      />,
      options
    );
  });
};

export const showVideoWidget = (spec: CreateVideoWidgetSpec): void => {
  // TODO remove hardcoded dimensions
  const dimensions = {width: '300px', height: '300px'};

  spec.videoUrl.then((videoSrc) => {
    const widgetComponent = (
      <VideoWidgetWrapper style={{width: '100%', height: '100%'}}>
        <VideoCardOverlay
          videoName={spec.title}
          onClose={removeWidget}
        />
        <Video autoPlay={true} loop={true} src={videoSrc} preload="metadata" controls={true} />
      </VideoWidgetWrapper>
    );

    Widget.add(widgetComponent, {dimensions});
  });
};

import * as React from 'react';
import {
  CardStatus,
  CardDimensions,
  MediaIdentifier,
} from '@atlaskit/media-card';
import styled from 'styled-components';
import { akColorN30 } from '@atlaskit/util-shared-styles';

import {
  MediaItemType,
  ContextConfig,
  ContextFactory,
  Context,
  CardDelete,
  CardEventHandler,
  FileDetails,
  MediaProvider,
  MediaStateManager,
  MediaState,
  ImageResizeMode
} from '@atlaskit/media-core';

import { MediaAttributes } from '../../schema';
import { EditorView } from '../../prosemirror';
import { MediaPluginState, stateKey as mediaStateKey } from '../../plugins/media';
import { CardEventClickHandler } from '../Renderer';

export type Appearance = 'small' | 'image' | 'horizontal' | 'square';

// Maybe it's better to ask media to export these as constant because
// we do something similar in src/schema/nodes/media.tsx:82
export const MEDIA_HEIGHT = 125;
export const FILE_WIDTH = 156;
export const LINK_WIDTH = 343;

type PlaceholderProps = { dimensions?: CardDimensions };

// tslint:disable-next-line
const FilePlaceholder = styled.div`
  background: ${akColorN30};
  width: ${ ({ dimensions: { width = FILE_WIDTH} = {} }: PlaceholderProps) => width }px;
  min-height: ${ ({ dimensions: { height = MEDIA_HEIGHT} = {} }: PlaceholderProps) => height }px;
`;

// tslint:disable-next-line
const LinkPlaceholder = styled.div`
  background: ${akColorN30};
  width: ${ ({ dimensions: { width = LINK_WIDTH} = {} }: PlaceholderProps) => width }px;
  min-height: ${ ({ dimensions: { height = MEDIA_HEIGHT} = {} }: PlaceholderProps) => height }px;
`;


export interface Props extends MediaAttributes {
  mediaProvider?: Promise<MediaProvider>;
  editorView?: EditorView;
  cardDimensions?: CardDimensions;
  onClick?: CardEventClickHandler;
  onDelete?: CardEventHandler;
  resizeMode?: ImageResizeMode;
  appearance?: Appearance;
}

export interface State extends MediaState {
  mediaProvider?: MediaProvider;
  viewContext?: Context;
  linkCreateContext?: Context;
  Card?: React.ComponentClass<any>;
  CardView?: React.ComponentClass<any>;
}

/**
 * Map media state status into CardView processing status
 * Media state status is more broad than CardView API so we need to reduce it
 */
function mapMediaStatusIntoCardStatus(state: MediaState): CardStatus {
  switch (state.status) {
    case 'ready':
    case 'unknown':
    case 'unfinalized':
      return 'complete';

    case 'processing':
      return 'processing';

    case 'uploading':
      return 'uploading';

    // default case is to let TypeScript know that this function always returns a string
    case 'error':
    default:
      return 'error';
  }
}

export default class MediaComponent extends React.PureComponent<Props, State> {
  private thumbnailWm = new Map();
  private destroyed = false;

  state: State = {
    id: '',
    status: 'unknown'
  };

  constructor(props: Props) {
    super(props);
  }

  componentWillMount() {
    const { mediaProvider } = this.props;

    if (mediaProvider) {
      mediaProvider.then(this.handleMediaProvider);
    }

    require.ensure([], (require) => {
      const { Card, CardView } = require('@atlaskit/media-card');
      this.setState({ Card, CardView });
    });
  }

  public componentWillReceiveProps(nextProps) {
    const { mediaProvider } = nextProps;

    if (this.props.mediaProvider !== mediaProvider) {
      if (mediaProvider) {
        mediaProvider.then(this.handleMediaProvider);
      } else {
        this.setState({ mediaProvider });
      }
    }
  }

  public componentWillUnmount() {
    this.destroyed = true;

    const { id } = this.props;
    const { mediaProvider } = this.state;

    if (mediaProvider) {
      const { stateManager } = mediaProvider;
      if (stateManager) {
        stateManager.unsubscribe(id, this.handleMediaStateChange);
      }
    }

    const stateManager = this.getStateManagerFromEditorPlugin();
    if (stateManager) {
      stateManager.unsubscribe(id, this.handleMediaStateChange);
    }

    if (this.thumbnailWm) {
      Object.keys(this.thumbnailWm).forEach(thumbnailUrl => {
        URL.revokeObjectURL(thumbnailUrl);
        this.thumbnailWm.delete(thumbnailUrl);
      });
    }
  }

  render() {
    switch (this.props.type) {
      case 'file':
        return this.renderFile();

      case 'link':
        return this.renderLink();

      default:
        return null;
    }
  }

  private renderLoadingCard(url?: string, mediaItemType: MediaItemType = 'link') {
    const { CardView } = this.state;
    const { cardDimensions } = this.props;

    if (CardView) {
      return (
        <CardView
          metadata={{ type: mediaItemType, url, title: '' }}
          status="loading"
          mediaItemType={mediaItemType}
          dimensions={cardDimensions}
        />
      );
    }

    if (mediaItemType === 'link') {
      return <LinkPlaceholder dimensions={cardDimensions} />;
    } else if (mediaItemType === 'file') {
      return <FilePlaceholder dimensions={cardDimensions} />;
    }

    return null;
  }

  private renderLink() {
    const { mediaProvider, linkCreateContext, Card } = this.state;
    const { id, collection, cardDimensions, onDelete, appearance, ...otherProps } = this.props;
    const hasProviders = mediaProvider && linkCreateContext;

    if (!hasProviders || !Card) {
      return this.renderLoadingCard();
    }

    const identifier: MediaIdentifier = {
      mediaItemType: 'link',
      collectionName: collection,
      id,
    };

    if (id.substr(0, 10) === 'temporary:') {
      const url = id.substr(id.indexOf(':', 11) + 1);
      return this.renderLoadingCard(url);
    }

    if (onDelete) {
      (otherProps as any).actions = [CardDelete(onDelete)];
    }

    return (
      <Card
        context={linkCreateContext}
        dimensions={cardDimensions}
        identifier={identifier}
        appearance={appearance || 'horizontal'}
        resizeMode={this.resizeMode}
        {...otherProps as any}
      />
    );
  }

  private renderFile() {
    const { mediaProvider, viewContext, CardView } = this.state;
    const { id, cardDimensions } = this.props;

    if (!mediaProvider || !viewContext) {
      if (!CardView) {
        return <FilePlaceholder dimensions={cardDimensions} />;
      }

      return (
        <CardView
          status="loading"
          mediaItemType="file"
          dimensions={cardDimensions}
        />
      );
    }

    if (id.substr(0, 10) === 'temporary:') {
      return this.renderTemporaryFile();
    } else {
      return this.renderPublicFile();
    }
  }

  private renderPublicFile() {
    const { viewContext, Card } = this.state;
    const { cardDimensions, collection, id, onDelete, onClick } = this.props;
    const otherProps: any = {};

    if (onDelete) {
      otherProps.actions = [CardDelete(onDelete)];
    }

    if (onClick) {
      otherProps.onClick = onClick;
    }

    if (!Card) {
      return <FilePlaceholder dimensions={cardDimensions} />;
    }

    return (
      <Card
        context={viewContext!}
        dimensions={cardDimensions}
        identifier={{
          id,
          mediaItemType: 'file',
          collectionName: collection
        }}
        selectable={false}
        resizeMode={this.resizeMode}
        {...otherProps}
      />
    );
  }

  private renderTemporaryFile() {
    const { state } = this;
    const { thumbnail, fileName, fileSize, fileType, CardView } = state;
    const { onDelete, cardDimensions } = this.props;

    // Cache the data url for thumbnail, so it's not regenerated on each re-render (prevents flicker)
    let dataURI: string | undefined;
    if (thumbnail) {
      if (this.thumbnailWm.has(thumbnail)) {
        dataURI = this.thumbnailWm.get(thumbnail);
      } else {
        dataURI = URL.createObjectURL(thumbnail);
        this.thumbnailWm.set(thumbnail, dataURI);
      }
    }

    // Make sure that we always display progress bar when the file is uploading (prevents flicker)
    let progress = state.progress;
    if (!progress && state.status === 'uploading') {
      progress = .0;
    }

    // Construct file details object
    const fileDetails = {
      name: fileName,
      size: fileSize,
      mimeType: fileType,
      mediaType: (thumbnail || (fileType && fileType.indexOf('image/') > -1) ? 'image' : 'unknown')
    } as FileDetails;

    const otherProps: any = {};
    if (onDelete) {
      otherProps.actions = [CardDelete(onDelete)];
    }

    if (!CardView) {
      return <FilePlaceholder dimensions={cardDimensions} />;
    }

    return <CardView
      // CardViewProps
      status={mapMediaStatusIntoCardStatus(state)}
      mediaItemType="file"
      metadata={fileDetails}

      // FileCardProps
      dataURI={dataURI}
      progress={progress}

      // SharedCardProps
      {...otherProps}
    />;
  }

  private handleMediaStateChange = (mediaState: MediaState) => {
    if (this.destroyed) {
      return;
    }

    const newState = {
      ...mediaState
    };

    this.setState(newState);
  }

  private handleMediaProvider = async (mediaProvider: MediaProvider) => {
    const { id } = this.props;

    if (this.destroyed) {
      return;
    }

    /**
     * Try to get stateManager from MediaProvider first, if not, try Editor Plugin
     */
    const stateManager = mediaProvider.stateManager || this.getStateManagerFromEditorPlugin();

    this.setState({ mediaProvider });

    if (stateManager) {
      const mediaState = stateManager.getState(id);

      stateManager.subscribe(id, this.handleMediaStateChange);
      this.setState({ id, ...mediaState });
    }

    await this.setContext('viewContext', mediaProvider);
    await this.setContext('linkCreateContext', mediaProvider);
  }

  private setContext = async (contextName: string, mediaProvider: MediaProvider) => {
    let context = await mediaProvider[contextName];

    if (this.destroyed || !context) {
      return;
    }

    if ('clientId' in (context as ContextConfig)) {
      context = ContextFactory.create(context as ContextConfig);
    }

    this.setState({ [contextName as any]: context as Context });
  }

  getStateManagerFromEditorPlugin(): MediaStateManager | undefined {
    const { editorView } = this.props;
    if (!editorView) {
      return;
    }

    const pluginState = mediaStateKey.getState(editorView.state) as MediaPluginState;

    if (!pluginState) {
      return;
    }

    return pluginState.stateManager;
  }

  private get resizeMode(): ImageResizeMode {
    const { resizeMode } = this.props;

    return resizeMode || 'full-fit';
  }
}

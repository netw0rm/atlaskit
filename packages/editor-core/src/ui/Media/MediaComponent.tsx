import * as React from 'react';
import {
  Card,
  CardView,
  MediaIdentifier,
  UrlPreviewIdentifier,
} from '@atlaskit/media-card';
import {
  ContextConfig,
  ContextFactory,
  Context,
  CardClick,
  CardDelete,
  FileDetails,
  UrlPreview
} from '@atlaskit/media-core';
import { MediaPluginState } from '../../plugins/media';

import { default as MediaProvider, MediaState } from '../../media';
import { Attributes } from '../../schema/nodes/media';
import { EditorView, mediaStateKey } from '../../index';

export interface Props extends Attributes {
  mediaProvider?: Promise<MediaProvider>;
  editorView?: EditorView;
  onDelete?: () => void;
}

export interface State extends MediaState {
  mediaProvider?: MediaProvider;
  viewContext?: Context;
}

/**
 * Map media state status into CardView processing status
 * Media state status is more broad than CardView API so we need to reduce it
 */
function mapMediaStatusIntoCardStatus(state: MediaState) {
  switch (state.status) {
    case 'ready':
    case 'unknown':
      return 'complete';

    case 'processing':
    case 'unfinalized':
      return 'processing';

    case 'uploading':
      return 'loading';

    // default case is to let TypeScript know that this function always returns a string
    case 'error':
    case 'unknown':
    default:
      return 'error';
  }
}


export default class MediaComponent extends React.PureComponent<Props, State> {
  state: State = {
    id: '',
    status: 'unknown'
  };

  constructor(props: Props) {
    super(props);

    const { mediaProvider } = this.props;

    if (mediaProvider) {
      mediaProvider.then(this.handleMediaProvider);
    }
  }

  public componentWillReceiveProps(nextProps) {
    const { mediaProvider } = nextProps;

    if (this.props.mediaProvider !== mediaProvider) {
      mediaProvider.then(this.handleMediaProvider);
    }
  }

  public componentWillUnmount() {
    const { editorView, id } = this.props;

    if (!editorView) {
      return;
    }

    const pluginState = mediaStateKey.getState(editorView.state) as MediaPluginState;

    if (!pluginState) {
      return;
    }

    pluginState.stateManager.unsubscribe(id, this.handleMediaStateChange);
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

  private renderLink() {
    const { mediaProvider, viewContext } = this.state;
    const { id, collection, onDelete } = this.props;
    const url = this.getLinkUrlFromId(id);
    const onClickHandler = (item: any, event: Event) => event.preventDefault();

    if ( !mediaProvider || !viewContext ) {
      const previewDetails = {
        type: '',
        url: '',
        title: ' ... loading'
      } as UrlPreview;

      return <CardView
        // CardViewProps
        status="loading"
        mediaItemType="link"
        metadata={previewDetails}

        // SharedCardProps
        actions={[ CardClick(onClickHandler) ]}
      />;
    }

    const mediaIdentifier = {
      mediaItemType: 'link',
      id: id || '',
      collectionName: collection || ''
    } as MediaIdentifier;

    const urlPreviewIdentifier = {
      mediaItemType: 'link',
      url: url!
    } as UrlPreviewIdentifier;

    return (
      <Card
        context={viewContext}
        identifier={id ? mediaIdentifier : urlPreviewIdentifier}
        actions={[ CardDelete(onDelete!) ]}
      />
    );
  }

  private renderFile() {
    const { mediaProvider, viewContext } = this.state;
    const { id } = this.props;

    if ( !mediaProvider || !viewContext ) {
      return <CardView
        status="loading"
        mediaItemType="file"
      />;
    }

    if (id.substr(0, 10) === 'temporary:') {
      return this.renderTemporaryFile();
    } else {
      return this.renderPublicFile();
    }
  }

  private renderPublicFile() {
    const { viewContext } = this.state;
    const { id, collection, onDelete } = this.props;

    return (
      <Card
        context={viewContext!}
        identifier={{
          id,
          mediaItemType: 'file',
          collectionName: collection
        }}
        actions={[ CardDelete(onDelete!) ]}
        selectable={false}
      />
    );
  }

  private renderTemporaryFile() {
    const { state } = this;
    const { thumbnail, fileName, fileSize, fileType, progress } = state;
    const { onDelete } = this.props;

    const fileDetails = {
      name: fileName,
      size: fileSize,
      mimeType: fileType,
      mediaType: (thumbnail || (fileType && fileType.indexOf('image/') > -1) ? 'image' : 'unknown')
    } as FileDetails;

    return <CardView
      // CardViewProps
      status={mapMediaStatusIntoCardStatus(state)}
      mediaItemType="file"
      metadata={fileDetails}

      // FileCardProps
      dataURI={thumbnail && URL.createObjectURL(thumbnail)}
      progress={progress}

      // SharedCardProps
      actions={[ CardDelete(onDelete!) ]}
    />;
  }

  private handleMediaStateChange = (mediaState: MediaState) => {
    const newState = {
      ...this.state,
      ...mediaState
    };

    this.setState(newState);
  }

  private handleMediaProvider = (mediaProvider: MediaProvider) => {
    const { editorView, id } = this.props;

    if (!editorView) {
      return;
    }

    const pluginState = mediaStateKey.getState(editorView.state) as MediaPluginState;

    if (!pluginState) {
      return;
    }

    const { stateManager } = pluginState;

    stateManager.subscribe(id, this.handleMediaStateChange);
    this.setState({ ...this.state, mediaProvider });

    mediaProvider.viewContext.then((context: ContextConfig | Context) => {
      if ('clientId' in (context as ContextConfig)) {
        context = ContextFactory.create(context as ContextConfig);
      }

      this.setState({
        ...this.state,
        viewContext: context as Context
      });
    });
  }

  private getLinkUrlFromId(id: string) {
    return id.split(/^temporary:(.*?)/)[2];
  }
}

import * as React from 'react';
import {
  LinkCardGenericView,
  Card,
  FileCardView,
  MediaIdentifier,
  UrlPreviewIdentifier,
} from '@atlaskit/media-card';
import { ContextConfig, ContextFactory, Context, CardDelete } from '@atlaskit/media-core';
import { MediaPluginState } from '../../plugins/media';

import { default as MediaProvider, MediaState } from '../../media';
import { Attributes } from '../../schema/nodes/media';
import { EditorView, mediaStateKey } from '../../index';

export interface Props extends Attributes {
  mediaProvider?: Promise<MediaProvider>;
  editorView?: EditorView;
  onDelete?: () => void;
};

export interface State extends MediaState {
  mediaProvider?: MediaProvider;
  viewContext?: Context;
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

    if ( !mediaProvider || !viewContext ) {
      return <LinkCardGenericView
        title=" ... loading"
        linkUrl=""
        onClick={(event: Event) => event.preventDefault()}
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
      return <FileCardView
        loading={true}
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
    const { thumbnail, fileName, fileSize, fileType, progress} = state;
    const { onDelete } = this.props;

    return <FileCardView
      mediaName={fileName}
      mediaSize={fileSize}
      mediaType={(thumbnail || (fileType && fileType.indexOf('image/') > -1) ? 'image' : 'unknown')}
      progress={progress}
      dataURI={thumbnail && URL.createObjectURL(thumbnail)}
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

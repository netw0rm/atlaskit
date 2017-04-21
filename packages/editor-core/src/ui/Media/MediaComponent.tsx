import * as React from 'react';
import { LinkCard, LinkCardGenericView, CardView, Card } from '@atlaskit/media-card';
import { ContextConfig, ContextFactory, Context, CardDelete } from '@atlaskit/media-core';
import { MediaPluginState } from '../../plugins/media';

import { default as MediaProvider, MediaState } from '../../media';
import { Attributes } from '../../schema/nodes/media';

interface Props extends Attributes {
  mediaProvider?: Promise<MediaProvider>;
  pluginState?: MediaPluginState;
  onDelete?: () => void;
};

interface State extends MediaState {
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
    const { pluginState, id } = this.props;

    if (pluginState) {
      pluginState.stateManager.unsubscribe(id, this.handleMediaStateChange);
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

    return (
      <LinkCard
        context={viewContext}
        menuActions={[ CardDelete(onDelete!) ]}
        link={id ? { id: id!, collection: (collection ? collection : '')} : url!}
      />
    );
  }

  private renderFile() {
    const { mediaProvider, viewContext } = this.state;
    const { id } = this.props;

    if ( !mediaProvider || !viewContext ) {
      return <CardView
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
        mediaItemType="file"
        id={id}
        selectable={false}
        collectionName={collection}
        context={viewContext!}
        actions={[ CardDelete(onDelete!) ]}
      />
    );
  }

  private renderTemporaryFile() {
    const { state } = this;
    const { thumbnail, fileName, fileSize, fileType, progress} = state;
    const { onDelete } = this.props;

    return <CardView
      mediaName={fileName}
      mediaSize={fileSize}
      mediaType={(thumbnail || (fileType && fileType.indexOf('image/') > -1) ? 'image' : 'unknown')}
      progress={progress}
      dataURI={thumbnail && URL.createObjectURL(thumbnail)}
      menuActions={[ CardDelete(onDelete!) ]}
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
    const { stateManager } = this.props.pluginState!;

    stateManager.subscribe(this.props.id, this.handleMediaStateChange);

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

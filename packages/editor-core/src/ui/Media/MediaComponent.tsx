import * as React from 'react';
import * as ReactDOM from 'react-dom';
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

interface State extends MediaState{
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

    if (props.id && props.pluginState) {
      props.pluginState.subscribeForMediaStateUpdates(props.id, this.handleMediaStateChange);
    }
  }

  public componentWillMount() {
    const { mediaProvider } = this.props;

    if (mediaProvider) {
      mediaProvider.then(this.handleMediaProvider);
    }
  }

  public componentWillUnmount() {
    const { pluginState, id } = this.props;

    if (pluginState) {
      pluginState.unsubscribeFromMediaStateUpdates(id, this.handleMediaStateChange);
    }
  }

  render() {
    if (!this.props.id) {
      console.debug('unmounting MediaComponent because id property has been cleared', this);
      setTimeout(() => {
        try {
          const domNode = ReactDOM.findDOMNode(this as any);
          domNode && ReactDOM.unmountComponentAtNode(domNode);
        } catch (e){}
      }, 0);
      return null;
    }

    switch (this.props.type) {
      case 'file':
        return this.renderFile();

      case 'link':
        return this.renderLink();

      default:
        return null;
    }
  }

  private handleMediaStateChange = (mediaState: MediaState) => {
    const newState = {
      ...this.state,
      ...mediaState
    };

    console.debug('new state', newState, this);

    this.setState(newState);
  }

  private handleMediaProvider = (mediaProvider: MediaProvider) => {
    this.setState({ ...this.state, mediaProvider });

    mediaProvider.viewContext.then((contextConfig: ContextConfig) => {
      this.setState({
         ...this.state,
         viewContext: ContextFactory.create(contextConfig)
        });
    });
  }

  private renderLink() {
    const { mediaProvider, viewContext } = this.state;
    const { id, collection, url, onDelete } = this.props;

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
    const { mediaProvider } = state;
    const { thumbnailProvider } = mediaProvider!;
    const { id, onDelete } = this.props;

    const blob = thumbnailProvider && thumbnailProvider!.getThumbnail(id.substr(10));

    return <CardView
      mediaName={state.fileName}
      mediaSize={state.fileSize}
      mediaType={(blob || (state.fileType && state.fileType.indexOf('image/') > -1) ? 'image' : 'unknown')}
      progress={state.progress}
      dataURI={thumbnailProvider && blob ? URL.createObjectURL(blob) : undefined}
      menuActions={[ CardDelete(onDelete!) ]}
    />;
  }
}

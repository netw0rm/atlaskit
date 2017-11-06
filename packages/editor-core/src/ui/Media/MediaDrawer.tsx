import * as React from 'react';
import { Component } from 'react';
import styled from 'styled-components';
import { Filmstrip, FilmstripItem } from '@atlaskit/media-filmstrip';
import { LinkIdentifier, FileIdentifier, CardStatus } from '@atlaskit/media-card';
import { FileDetails, MediaStateStatus, MediaState, MediaProvider, ContextFactory, ContextConfig, Context, CardDelete, CardAction } from '@atlaskit/media-core';
import { SlimMediaPluginState } from '../../plugins/media';

export interface MediaDrawerProps {
  mediaPluginState: SlimMediaPluginState;
  mediaProvider?: Promise<MediaProvider>;
}

export interface MediaDrawerState {
  animate: boolean;
  offset: number;
  items: Identifier[];
  viewContext?: Context;
}

export type Identifier = LinkIdentifier | FileIdentifier;

// tslint:disable-next-line:variable-name
const Wrapper = styled.div`
  width: 100%;
  padding: 0 0 8px 0;
  &&& ul {
    padding: 0;
  }
`;

/**
 * Map media state status into CardView processing status
 * Media state status is more broad than CardView API so we need to reduce it
 */
function mapMediaStatusIntoCardStatus(status: MediaStateStatus): CardStatus {
  switch (status) {
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

export default class MediaDrawer extends Component<MediaDrawerProps, MediaDrawerState> {
  state: MediaDrawerState = {
    animate: false,
    offset: 0,
    items: []
  };

  public shouldComponentUpdate = (nextProps, nextState) => {
    const { mediaPluginState } = nextProps;
    const { stateManager } = mediaPluginState;
    const { items: oldItems } = this.state;
    const { items: newItems } = nextState;

    // subscribe to new items
    newItems
      .filter(newItem => !oldItems.some(oldItem => oldItem.id === newItem.id))
      .forEach(item => stateManager.subscribe(item.id, this.onItemChange))
    ;

    // unsubscribe from old items
    oldItems
      .filter(oldItem => !newItems.some(newItem => newItem.id === oldItem.id))
      .forEach(item => stateManager.unsubscribe(item.id, this.onItemChange))
    ;

    return true;
  }

  componentWillMount() {
    const { mediaPluginState, mediaProvider } = this.props;

    mediaPluginState.subscribe(() => {
      this.setState({ items: [...mediaPluginState.media] });
    });

    if (mediaProvider) {
      mediaProvider.then(this.handleMediaProvider);
    }
  }

  public componentWillReceiveProps(nextProps) {
    const { mediaProvider } = nextProps;

    if (this.props.mediaProvider !== mediaProvider) {
      if (mediaProvider) {
        mediaProvider.then(this.handleMediaProvider);
      } else {
        this.setState({ viewContext: undefined });
      }
    }
  }

  onItemChange = () => {
    this.forceUpdate();
  }

  private handleMediaProvider = async (mediaProvider?: MediaProvider) => {
    if (!mediaProvider) {
      return this.setState({ viewContext: undefined });
    }

    let viewContext = await mediaProvider.viewContext;

    if (!viewContext) {
      return;
    }

    if ('serviceHost' in (viewContext as ContextConfig)) {
      viewContext = ContextFactory.create(viewContext as ContextConfig);
    }

    this.setState({ viewContext: viewContext as Context });
  }

  /**
   * Save all childNodes ids into "mediaNodesIds"
   */
  // componentDidMount() {
  //   this.mediaNodesIds = this.getMediaNodesIds(this.props.children);
  // }

  /**
   * Update "mediaNodesIds" and notify media plugin about removed nodes
   */
  // componentWillReceiveProps(nextProps) {
  //   const newMediaNodesIds = this.getMediaNodesIds(nextProps.children);
  //   const removedNodesIds = this.mediaNodesIds.filter(id => newMediaNodesIds.indexOf(id) === -1);

  //   removedNodesIds.forEach(mediaNodeId => {
  //     this.props.mediaPluginState.cancelInFlightUpload(mediaNodeId);
  //   });

  //   this.mediaNodesIds = newMediaNodesIds;
  // }

  private handleClickDelete = (item?, event?: Event) => {
    const { mediaPluginState } = this.props;

    mediaPluginState.removeItemById(item.details.id);

    if (event) {
      event.stopPropagation();
    }
  }

  private mapItems = () => {
    const { mediaPluginState } = this.props;
    const { items, viewContext } = this.state;
    const { stateManager } = mediaPluginState;
    const collectionName = mediaPluginState.collectionFromProvider();

    const states = items.map(item => {
      const state = stateManager.getState(item.id);
      return state ? state : false;
    }).filter( (state):state is MediaState => !!state);

    return (states as MediaState[]).map(state => {
      const actions: CardAction[] = [];
      const { status } = state;

      actions.push(CardDelete(this.handleClickDelete));

      switch(status) {
        case 'error':
        case 'cancelled':
        case 'unknown':
        case 'uploading':
        case 'processing':
        case 'unfinalized':
          // Cache the data url for thumbnail, so it's not regenerated on each re-render (prevents flicker)
          const { thumbnail, fileName, fileSize, fileType } = state;
          let dataURI: string | undefined;

          if (thumbnail) {
            dataURI = thumbnail.src;
          }

          // Make sure that we always display progress bar when the file is uploading (prevents flicker)
          let progress = state.progress;
          if (!progress && state.status === 'uploading') {
            progress = .0;
          }

          // Construct file details object
          const metadata = {
            mediaItemType: 'file',
            name: fileName,
            size: fileSize,
            mimeType: fileType,
            mediaType: (thumbnail || (fileType && fileType.indexOf('image/') > -1) ? 'image' : 'unknown')
          } as FileDetails;

          return {
            key: state.id,
            progress,
            dataURI,
            metadata,
            actions,
            status: mapMediaStatusIntoCardStatus(status),
            mediaItemType: 'file'
          } as FilmstripItem;

        default:
          return {
            context: viewContext,
            actions,
            identifier: {
              mediaItemType: 'file',
              id: state.id,
              collectionName
            }
          };

      }
    }) as FilmstripItem[];
  }

  public onSort = (sortedProps: FilmstripItem[]) => {
    // NOTE: This is not ideal, as the mapping between identifiers and Card(View)Props
    //       is not bijective. In the future, we want the FilmStrip to only operate on
    //       Identifiers which will remove the need for mapping.
    const { items } = this.state;
    const { mediaPluginState } = this.props;

    const sortedItems: Identifier[] = [];
    sortedProps.forEach((cardProps: any) => {
      const identifier = cardProps.identifier
        ? cardProps.identifier.id
        : cardProps.key
      ;
      let item = items.filter(item => item.id === identifier).pop();
      if (item) {
        sortedItems.push(item);
      }
    });

    this.setState({ items: sortedItems });

    // Make sure the plugin state has the sorted array
    // TODO: can this be handled in a more elegant manner?
    if (mediaPluginState) {
      mediaPluginState.media = [...sortedItems];
    }
  }

  render() {
    const { mediaPluginState } = this.props;
    const { viewContext } = this.state;

    if (!mediaPluginState) {
      return null;
    }

    return (
      <Wrapper>
        <Filmstrip
          onSort={this.onSort}
          items={this.mapItems()}
          context={viewContext}
        />
      </Wrapper>
    );
  }

  // private getMediaNodesIds = (children: React.ReactNode): string[] => {
  //   return React.Children.map(children, (child: React.ReactElement<any>) => {
  //     return (child.props as MediaNodeProps).node.attrs.id;
  //   }) || [];
  // }
}


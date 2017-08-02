import * as React from 'react';
import {Component} from 'react';
import {Context, MediaItemType, FileItem, MediaCollection} from '@atlaskit/media-core';
import {ItemInfo, ItemPreview, Navigation} from './views';
import {MainWrapper} from './styled';

// TODO: Move common types/interfaces to "domain" folder
export type CollectionName = string;
export interface NavigationConfig {
  initialItem: MediaIdentifier;
  list?: Array<MediaIdentifier>;
  collectionName?: CollectionName;
}

export interface MediaIdentifier {
  readonly mediaItemType: MediaItemType;
  readonly id: string;
  readonly collectionName: string;
}

export interface MediaViewerProps {
  context: Context;
  navigation: NavigationConfig;
  onPreviewChanged?: (item: MediaIdentifier) => void;
}

export interface MediaViewerState {
  currentItem?: MediaIdentifier;
  metadata?: FileItem;
  error?: any;
  listItems?: Array<MediaIdentifier>;
  downloadUrl?: string; // need to fetch a new token
}

export class MediaViewer extends Component<MediaViewerProps, MediaViewerState> {
  subscription: any;
  state: MediaViewerState = {

  }

  fetchMetadata(item: MediaIdentifier) {
    const { context } = this.props;
    const {id, mediaItemType, collectionName} = item;
    const provider = context.getMediaItemProvider(id, mediaItemType, collectionName);

    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.subscription = provider.observable().subscribe({
      next: (metadata: FileItem) => {
        this.setState({ metadata });
      },
      error: (error) => {
        this.setState({error});
      }
    });
  }

  getListItems(): Promise<Array<MediaIdentifier>> {
    return new Promise((resolve, reject) => {
      const {navigation, context} = this.props;
      const collectionName = navigation.collectionName;
      if (navigation.list) {
        return resolve(navigation.list);
      }

      if (collectionName) {
        const provider = context.getMediaCollectionProvider(collectionName, 20);
        // TODO: clean subscription
        provider.observable().subscribe({
          next(collection: MediaCollection) {
            // TODO: Re-use metada provided from the collection call
            const fileItems = collection.items
              .filter(i => i.type === 'file')
              .map(i => ({
                id: i.details.id,
                collectionName,
                mediaItemType: 'file'
              } as MediaIdentifier));

            resolve(fileItems);
          },
          // error: (error: AxiosError): void => {
          //   this.setState({ collection: undefined, error, loading: false });
          // }
        });
      }
    });
  }

  componentDidMount(): void {
    const {initialItem} = this.props.navigation;
    this.fetchMetadata(initialItem);
    this.getListItems().then((listItems: Array<MediaIdentifier>) => {
      this.setState({listItems});
    });
  }

  render() {
    const {metadata, currentItem, listItems} = this.state;
    const {context, navigation} = this.props;
    const selected = currentItem || navigation.initialItem;
    const list = listItems || [];
    // TODO: deal with navigation.collectionName
    console.log(metadata);

    return (
      <MainWrapper>
        {list.length ? <Navigation
          list={list}
          selected={selected}
          onNext={this.navigate('next')}
          onPrev={this.navigate('prev')}
        /> : null}

        <ItemInfo metadata={metadata} downloadUrl={'https://media-api.atlassian.io/file/13b9fa6e-e805-4c1b-8506-c6cafcc8c1c8/binary?client=21004442-17f0-4da8-aca6-efb7d6f85b5e&collection=94f09e00-6dc7-453a-93f5-810df2665b69&dl=1&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOnsidXJuOmZpbGVzdG9yZTpjaHVuazoqIjpbImNyZWF0ZSIsInJlYWQiXSwidXJuOmZpbGVzdG9yZTpjb2xsZWN0aW9uOjk0ZjA5ZTAwLTZkYzctNDUzYS05M2Y1LTgxMGRmMjY2NWI2OSI6WyJ1cGRhdGUiLCJyZWFkIl0sInVybjpmaWxlc3RvcmU6dXBsb2FkIjpbImNyZWF0ZSJdLCJ1cm46ZmlsZXN0b3JlOnVwbG9hZDoqIjpbInJlYWQiLCJ1cGRhdGUiLCJkZWxldGUiXX0sImV4cCI6MTUwMTcxNzM5NCwiaXNzIjoiMjEwMDQ0NDItMTdmMC00ZGE4LWFjYTYtZWZiN2Q2Zjg1YjVlIiwibmJmIjoxNTAxNzEzNzk0LCJzdWIiOiI1NTcwNTc6NmFiYjcyOTAtODNlOC00N2Q0LWI4YWYtYzg1OTE4MDc2ZTQzIn0.0xKgMFjqdILSXLqflE5WvOP5p7uKO8tqotK6YP5H3UM'}/>
        {metadata ?
          <ItemPreview
            context={context}
            metadata={metadata}
            identifer={selected}
          /> : null}

      </MainWrapper>
    );
  }

  navigate = (direction) => (currentItem: MediaIdentifier) => {
    this.setState({currentItem});
    this.fetchMetadata(currentItem);
  }
}
/* tslint:disable:variable-name */
import * as React from 'react';
import { Component } from 'react';
import { Subscription } from 'rxjs/Subscription';
import { AxiosError } from 'axios';
import Button from '@atlaskit/button';
import { MediaItem, MediaCollection, MediaCollectionItem, Context, CardAction, ListAction } from '@atlaskit/media-core';

import { DEFAULT_CARD_DIMENSIONS } from '../files';
import { CardDimensions } from '../index';
import { Provider } from '../card';
import { MediaCard } from '../mediaCard';
import { InfiniteScroll } from './infiniteScroll';
import {CardListWrapper, Spinner, LoadMoreButtonContainer} from './styled';

export interface CardListProps {
  context: Context;
  collectionName: string;

  height?: number;

  cardDimensions?: CardDimensions;
  cardAppearance?: 'small' | 'image';

  pageSize?: number;

  actions?: Array<ListAction>;

  showLoadMoreButton?: boolean;

  /**
   * Infinite scrolling is only enabled when height has also been specified.
   */
  useInfiniteScroll?: boolean;

  errorComponent?: JSX.Element;
  loadingComponent?: JSX.Element;
  emptyComponent?: JSX.Element;
}

export interface CardListState {
  loading: boolean;
  subscription?: Subscription;
  hasNextPage?: boolean;
  loadNextPage?: () => void;
  collection?: MediaCollection;
  error?: AxiosError;
}

const LoadingComponent = <Spinner className="spinner" style={{ width: '100%', height: '100%' }}>loading...</Spinner>;
const EmptyComponent = <div>No items</div>;
const ErrorComponent = <div>ERROR</div>;

export class CardList extends Component<CardListProps, CardListState> {
  static defaultProps = {
    cardAppearance: 'image',
    pageSize: 10,

    useInfiniteScroll: true,

    errorComponent: ErrorComponent,
    loadingComponent: LoadingComponent,
    emptyComponent: EmptyComponent
  };

  providersByMediaItemId: {[id: string]: Provider} = {};
  private dataURIService;

  private shouldUpdateState(nextProps: CardListProps): boolean {
    return (nextProps.collectionName !== this.props.collectionName)
      || (nextProps.context !== this.props.context)
      || (nextProps.pageSize !== this.props.pageSize);
  }

  private updateState(nextProps: CardListProps): void {
    const {collectionName, context} = nextProps;
    const provider = context.getMediaCollectionProvider(nextProps.collectionName, nextProps.pageSize || 10);

    if (this.state && this.state.subscription) {
      this.state.subscription.unsubscribe();
    }

    this.dataURIService = context.getDataUriService(collectionName);

    const subscription = provider.observable().subscribe({
      next: (collection: MediaCollection): void => {
        this.providersByMediaItemId = {};
        collection.items.forEach(mediaItem => {
          this.providersByMediaItemId[mediaItem.details.id] = context.getMediaItemProvider(
            mediaItem.details.id,
            mediaItem.type,
            collectionName,
            mediaItem
          );
        });

        this.setState({
          ...this.state,
          collection,
          hasNextPage: true,
          loading: false
        });
      },
      complete: (): void => {
        this.setState({...this.state, hasNextPage: false, loading: false});
      },
      error: (error: AxiosError): void => {
        this.setState({...this.state, error, loading: false});
      }
    });

    this.setState({
      loadNextPage: () => provider.controller().loadNextPage(),
      hasNextPage: false,
      collection: undefined,
      error: undefined,
      loading: false,
      subscription
    });
  }

  state: CardListState = {
    loading: true
  };

  componentDidMount() {
    this.updateState(this.props);
  }

  componentWillReceiveProps(nextProps: CardListProps, nextContext: any): void {
    if (this.shouldUpdateState(nextProps)) {
      this.updateState(nextProps);
    }
  }

  componentWillUnmount() {
    if (this.state.subscription) {
      this.state.subscription.unsubscribe();
    }
  }

  render(): JSX.Element {
    const emptyComponent = this.props.emptyComponent || EmptyComponent;
    const loadingComponent = this.props.loadingComponent || LoadingComponent;
    const errorComponent = this.props.errorComponent || ErrorComponent;

    if (!this.state.loading) {
      if (this.state.error) {
        if (this.state.error.response && this.state.error.response.status === 404) {
          return emptyComponent;
        }

        return errorComponent;
      } else if (!this.state.collection) {
        return loadingComponent;
      } else {
        if (this.useInfiniteScroll) {
          return (
            <InfiniteScroll
              height={this.props.height}
              onThresholdReached={() => this.loadNextPage()}
            >
              <CardListWrapper className="card-list">
                {this.renderCardList()}
                {this.renderLoadMoreButton()}
              </CardListWrapper>
            </InfiniteScroll>
          );
        } else {
          return (
            <CardListWrapper className="card-list">
              {this.renderCardList()}
              {this.renderLoadMoreButton()}
            </CardListWrapper>
          );
        }
      }
    } else {
      return loadingComponent;
    }
  }

  private renderCardList(): JSX.Element {
    const cardActions: Array<CardAction> = this.props.actions ? this.props.actions.map((action: ListAction) => {
      return {
        label: action.label,
        type: action.type,
        handler: (item: MediaItem, event: Event) => {
          if (!this.state.collection) { return; }

          const fileIds = this.state.collection.items.map(cItem => ({
            id: cItem.details.id,
            mediaItemType: cItem.type
          }));
          action.handler(item, fileIds, event);
        }
      };
    }) : [];

    const cards = this.state.collection ? this.state.collection.items.map((mediaItem: MediaCollectionItem, index: number) => {
      const {cardAppearance, cardDimensions} = this.props;
      return (
        <li key={`${index}-${mediaItem.details.id}`}>
          <MediaCard
            type={mediaItem.type}
            provider={this.providersByMediaItemId[mediaItem.details.id]}
            dataURIService={this.dataURIService}

            dimensions={{
              width: this.cardWidth,
              height: cardDimensions && cardDimensions.height
            }}

            appearance={cardAppearance}
            actions={cardActions}
          />
        </li>
      );
    }) : null;

    return (
      <ul>
        {cards}
      </ul>
    );
  }

  /*
    We only want to apply default width (hardcoded value) for normal cards,
    in case of small cards we want them to grow up and use the whole parent width
   */
  private get cardWidth(): string | number | undefined {
    const {cardDimensions, cardAppearance} = this.props;
    if (cardDimensions) { return cardDimensions.width; }

    if (cardAppearance === 'image') {
      return DEFAULT_CARD_DIMENSIONS.WIDTH;
    }

    if (cardAppearance === 'small') {
      return '100%';
    }

    return undefined;
  }

  private get useInfiniteScroll(): boolean {
    return this.props.useInfiniteScroll ? true : !this.isNullOrUndefined(this.props.height);
  }

  private isNullOrUndefined(value: any): boolean {
    return (value === null) || (value === undefined);
  }

  private get showLoadMoreButton(): boolean {
    return this.state.hasNextPage && (
      (this.props.showLoadMoreButton === true) ||
      (this.isNullOrUndefined(this.props.showLoadMoreButton) && !this.useInfiniteScroll));
  }

  private renderLoadMoreButton(): JSX.Element | null {
    if (this.showLoadMoreButton && this.state.hasNextPage) {
      const title = this.state.loading ? 'Loading...' : 'Load more';
      return (
        <LoadMoreButtonContainer style={{ width: this.cardWidth }}>
          <Button
            className="load-more-button"
            onClick={this.onLoadMoreButtonClick}
          >
            {title}
          </Button>
        </LoadMoreButtonContainer>
      );
    } else {
      return null;
    }
  }

  private onLoadMoreButtonClick = () => {
    this.loadNextPage();
  }

  private loadNextPage = (): void => {
    this.setState({ ...this.state, loading: true });
    this.state.loadNextPage();
  }
}

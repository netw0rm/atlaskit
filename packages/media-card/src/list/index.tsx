/* tslint:disable:variable-name */
import * as React from 'react';
import { Component } from 'react';
import { Subscription } from 'rxjs/Subscription';
import { AxiosError } from 'axios';
import {
  MediaItem,
  MediaCollection,
  MediaCollectionItem,
  Context,
  CollectionAction,
  DataUriService
} from '@atlaskit/media-core';
import { CSSTransitionGroup } from 'react-transition-group';

import { defaultImageCardDimensions, defaultSmallCardDimensions } from '../utils';
import { CardDimensions, CardListEvent, CardEvent } from '..';
import { Provider, MediaCard, CardView } from '../root';
import { InfiniteScroll } from './infiniteScroll';
import { CardListItemWrapper, Spinner } from './styled';
import { LazyContent } from '../utils';

export interface CardListProps {
  context: Context;
  collectionName: string;

  height?: number;
  pageSize?: number;

  cardDimensions?: CardDimensions;
  cardAppearance?: 'small' | 'image';

  onCardClick?: (result: CardListEvent) => void;
  actions?: Array<CollectionAction>;

  /**
   * Infinite scrolling is only enabled when height has also been specified.
   */
  useInfiniteScroll?: boolean;
  shouldLazyLoadCards?: boolean;
  errorComponent?: JSX.Element;
  loadingComponent?: JSX.Element;
  emptyComponent?: JSX.Element;
}

export interface CardListState {
  loading: boolean;
  subscription?: Subscription;
  loadNextPage?: () => void;
  collection?: MediaCollection;
  error?: AxiosError;
}

// FIXME: these aren't "components", they're actually "elements"... we should rename these or change the signature to be a "component" e.g. () => (<Spinner.../>);. Will clean up the tests a bit too.
const LoadingComponent = <Spinner className="spinner" style={{ width: '100%', height: '100%' }}>loading...</Spinner>;
const EmptyComponent = <div>No items</div>;
const ErrorComponent = <div>ERROR</div>;

export class CardList extends Component<CardListProps, CardListState> {
  static defaultPageSize = 10;

  static defaultProps = {
    cardAppearance: 'image',
    pageSize: CardList.defaultPageSize,
    actions: [],
    useInfiniteScroll: true,
    shouldLazyLoadCards: true,
    errorComponent: ErrorComponent,
    loadingComponent: LoadingComponent,
    emptyComponent: EmptyComponent
  };

  state: CardListState = {
    loading: true
  };

  providersByMediaItemId: {[id: string]: Provider} = {};
  private dataURIService: DataUriService;

  private unsubscribe() {
    const {subscription} = this.state;
    if (subscription) {
      subscription.unsubscribe();
    }
  }

  private shouldUpdateState(nextProps: CardListProps): boolean {
    return (nextProps.collectionName !== this.props.collectionName)
      || (nextProps.context !== this.props.context)
      || (nextProps.pageSize !== this.props.pageSize);
  }

  private updateState(nextProps: CardListProps): void {
    const {collectionName, context} = nextProps;
    const pageSize = this.props.pageSize || CardList.defaultPageSize;
    const provider = context.getMediaCollectionProvider(collectionName, pageSize);

    this.unsubscribe();

    this.dataURIService = context.getDataUriService(collectionName);

    const subscription = provider.observable().subscribe({
      next: (collection: MediaCollection): void => {
        this.providersByMediaItemId = {};
        collection.items.forEach(mediaItem => {
          if (!mediaItem.details || !mediaItem.details.id) { return; }

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
          loading: false
        });
      },
      error: (error: AxiosError): void => {
        this.setState({ ...this.state, error, loading: false });
      }
    });

    this.setState({
      loadNextPage: () => provider.loadNextPage(),
      collection: undefined,
      error: undefined,
      subscription
    });
  }

  componentDidMount() {
    this.updateState(this.props);
  }

  componentWillReceiveProps(nextProps: CardListProps): void {
    if (this.shouldUpdateState(nextProps)) {
      this.updateState(nextProps);
    }
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  private handleInfiniteScrollThresholdReached = () => {
    this.loadNextPage();
  }

  render(): JSX.Element {
    const {height} = this.props;
    const {loading, error, collection} = this.state;
    const emptyComponent = this.props.emptyComponent || EmptyComponent;
    const loadingComponent = this.props.loadingComponent || LoadingComponent;
    const errorComponent = this.props.errorComponent || ErrorComponent;

    if (loading) {
      return loadingComponent;
    }

    if (error) {
      if (error.response && error.response.status === 404) {
        return emptyComponent;
      } else {
        return errorComponent;
      }
    }

    if (!collection) {
      return loadingComponent;
    }

    if (this.useInfiniteScroll) {
      return (
        <InfiniteScroll
          height={height}
          onThresholdReached={this.handleInfiniteScrollThresholdReached}
        >
          {this.renderList()}
        </InfiniteScroll>
      );
    } else {
      return this.renderList();
    }

  }

  private renderList(): JSX.Element {
    const {cardWidth, dimensions, providersByMediaItemId, dataURIService, handleCardClick, placeholder} = this;
    const { collection } = this.state;
    const {cardAppearance, shouldLazyLoadCards} = this.props;
    const actions = this.props.actions || [];
    const cardActions = (collectionItem: MediaCollectionItem) => actions
      .map(action => {
        return {
          label: action.label,
          type: action.type,
          handler: (item: MediaItem, event: Event) => {
            if (collection) {
              action.handler(collectionItem, collection, event);
            }
          }
        };
      })
    ;

    const cards = collection ? collection.items
      .map((mediaItem: MediaCollectionItem) => {
        if (!mediaItem.details || !mediaItem.details.id) {
          return null;
        }
        const {id, occurrenceKey} = mediaItem.details;
        const key = `${id}-${occurrenceKey}`;
        const cardListItem = (
          <CardListItemWrapper key={key} cardWidth={cardWidth}>
            <MediaCard
              provider={providersByMediaItemId[mediaItem.details.id]}
              dataURIService={dataURIService}

              appearance={cardAppearance}
              dimensions={dimensions}

              onClick={handleCardClick.bind(this, mediaItem)}
              actions={cardActions(mediaItem)}
            />
          </CardListItemWrapper>
        );

        return shouldLazyLoadCards ? (
          <LazyContent placeholder={placeholder} key={key} appearance={cardAppearance}>
            {cardListItem}
          </LazyContent>
        ) : cardListItem;
      }) : null
    ;

    return (
      <CSSTransitionGroup
        transitionName="card-list-item"
        transitionEnterTimeout={750}
        transitionLeave={false}
        component="div"
        className="card-list"
      >
        {cards}
      </CSSTransitionGroup>
    );
  }

  private handleCardClick(oldItem: MediaCollectionItem, cardEvent: CardEvent) {
    const {collectionName, onCardClick} = this.props;

    if (!onCardClick) {
      return;
    }

    const {event, mediaItemDetails} = cardEvent;

    // need to merge the new details with the old details (as the old details may be out of date) and we need the occurrenceKey
    const newItem: MediaCollectionItem = {
      type: oldItem.type,
      details: {
        ...oldItem.details,
        ...mediaItemDetails
      }
    } as MediaCollectionItem;

    const cardListEvent: CardListEvent = {
      event,
      collectionName,
      mediaCollectionItem: newItem
    };

    onCardClick(cardListEvent);
  }

  /*
    We only want to apply default width (hardcoded value) for normal cards,
    in case of small cards we want them to grow up and use the whole parent width
   */
  private get cardWidth(): string | number | undefined {
    const {cardDimensions, cardAppearance} = this.props;

    if (cardDimensions) {
      return cardDimensions.width;
    }

    if (cardAppearance === 'image') {
      return defaultImageCardDimensions.width;
    }

    if (cardAppearance === 'small') {
      return '100%';
    }

    return undefined;
  }

  private get cardHeight(): string | number | undefined {
    const {cardDimensions, cardAppearance} = this.props;

    if (cardDimensions && cardDimensions.height) { return cardDimensions.height; }
    if (cardAppearance === 'image') { return defaultImageCardDimensions.height; }
    if (cardAppearance === 'small') { return defaultSmallCardDimensions.height; }
  }

  private get useInfiniteScroll(): boolean {
    return this.props.useInfiniteScroll ? true : !this.isNullOrUndefined(this.props.height);
  }

  private isNullOrUndefined(value: any): boolean {
    return (value === null) || (value === undefined);
  }

  private get dimensions() {
    const {cardWidth, cardHeight} = this;
    return {
      width: cardWidth,
      height: cardHeight
    };
  }

  private get placeholder(): JSX.Element {
    const {cardWidth, dimensions} = this;
    const {cardAppearance} = this.props;

    return (
      <CardListItemWrapper cardWidth={cardWidth}>
        <CardView dimensions={dimensions} status="loading" appearance={cardAppearance} />
      </CardListItemWrapper>
    );
  }

  loadNextPage = (): void => this.state.loadNextPage && this.state.loadNextPage();
}


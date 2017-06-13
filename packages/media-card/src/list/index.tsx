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

import { DEFAULT_CARD_DIMENSIONS } from '../files';
import { CardDimensions, CardListEvent, CardEvent } from '../index';
import { Provider } from '../card';
import { MediaCard } from '../mediaCard';
import { InfiniteScroll } from './infiniteScroll';
import { CardListItemWrapper, Spinner } from './styled';

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

  errorComponent?: JSX.Element;
  loadingComponent?: JSX.Element;
  emptyComponent?: JSX.Element;
}

export interface CardListState {
  loading: boolean;
  shouldAnimate: boolean;
  collectionItemsLength: number;
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
    cardHeight: DEFAULT_CARD_DIMENSIONS.HEIGHT,
    useInfiniteScroll: true,

    errorComponent: ErrorComponent,
    loadingComponent: LoadingComponent,
    emptyComponent: EmptyComponent
  };

  state: CardListState = {
    loading: true,
    shouldAnimate: false,
    collectionItemsLength: 0
  };

  providersByMediaItemId: {[id: string]: Provider} = {};
  private dataURIService: DataUriService;

  private unsubscribe() {
    const {subscription} = this.state;
    if (subscription) {
      subscription.unsubscribe();
    }
  }

  private subscribe(nextProps: CardListProps) {
    const {collectionName, context} = nextProps;
    const pageSize = this.props.pageSize || CardList.defaultPageSize;
    const provider = context.getMediaCollectionProvider(collectionName, pageSize);

    const subscription = provider.observable().subscribe({
      next: (collection: MediaCollection): void => {
        const {collectionItemsLength} = this.state;
        const newCollectionItemsLength = collection.items.length;
        const shouldAnimate = !!collectionItemsLength && newCollectionItemsLength !== collectionItemsLength;
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
          collection,
          shouldAnimate,
          loading: false,
          collectionItemsLength: newCollectionItemsLength
        });
      },
      error: (error: AxiosError): void => {
        this.setState({ collection: undefined, error, loading: false });
      }
    });

    this.setState({subscription});
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

    // Setting the subscription after the state has been applied
    this.setState({
      loadNextPage: () => provider.loadNextPage(),
      error: undefined,
      collection: undefined,
      collectionItemsLength: 0
    }, () => this.subscribe(nextProps));
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
    const { collection, shouldAnimate } = this.state;

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
      .map((mediaItem: MediaCollectionItem, index: number) => {
        const {cardAppearance, cardDimensions} = this.props;

        if (!mediaItem.details || !mediaItem.details.id) {
          return null;
        }
        const key = `${mediaItem.details.id}-${mediaItem.details.occurrenceKey}`;
        return (
          <CardListItemWrapper key={key} shouldAnimate={shouldAnimate} cardWidth={this.cardWidth}>
            <MediaCard
              provider={this.providersByMediaItemId[mediaItem.details.id]}
              dataURIService={this.dataURIService}

              appearance={cardAppearance}
              dimensions={{
                width: this.cardWidth,
                height: cardDimensions && cardDimensions.height
              }}

              onClick={this.handleCardClick.bind(this, mediaItem)}
              actions={cardActions(mediaItem)}
            />
          </CardListItemWrapper>
        );
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

  loadNextPage = (): void => this.state.loadNextPage && this.state.loadNextPage();
}

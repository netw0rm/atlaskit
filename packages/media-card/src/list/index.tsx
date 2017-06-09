/* tslint:disable:variable-name */
import * as React from 'react';
import { Component } from 'react';
import { Subscription } from 'rxjs/Subscription';
import { AxiosError } from 'axios';
import {
  MediaItem,
  MediaCollection,
  MediaCollectionItem,
  MediaCollectionLinkItem,
  Context,
  CollectionAction,
  DataUriService
} from '@atlaskit/media-core';
import { CSSTransitionGroup } from 'react-transition-group';
import * as differenceInDays from 'date-fns/difference_in_days';

import { DEFAULT_CARD_DIMENSIONS } from '../files';
import { CardDimensions, CardListEvent, CardEvent } from '../index';
import { Provider } from '../card';
import { MediaCard } from '../mediaCard';
import { InfiniteScroll } from './infiniteScroll';
import { ListGroup } from './list-group';
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

  // Infinite scrolling is only enabled when height has also been specified.
  useInfiniteScroll?: boolean;

  // Group by recent items
  shouldGroupByDate?: boolean;

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
    cardHeight: DEFAULT_CARD_DIMENSIONS.HEIGHT,
    useInfiniteScroll: true,

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

  render() {
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

  private renderList() {
    const { shouldGroupByDate } = this.props;
    const { collection } = this.state;

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
      });

    const {cardAppearance, cardDimensions} = this.props;
    const buildCard = this.createBuildCardMethod(cardActions, cardAppearance, cardDimensions);
    if (shouldGroupByDate) {
      return this.renderGroupedList(collection, buildCard);
    }

    const items = this.addFakeTimesToItems(collection && collection.items);
    const cards = items.map(buildCard);

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

  private renderGroupedList(collection, buildCard) {
    const items = this.addFakeTimesToItems(collection && collection.items);
    const timeFrames = {
      'today': 0,
      'yesterday': 1,
      '3 days ago': 3,
      'one month ago': 30
    };

    const groups = Object.keys(timeFrames).reduce(
      (acc, key) => {
        acc[key] = [];
        return acc;
      }
    , {});

    const currentEpoch = Date.now();
    const groupedItems = items.reduce((acc, item) => {
      const itemAge = differenceInDays(currentEpoch, item.details.createdAt || currentEpoch);

      Object.keys(timeFrames).some(timeFrame => {
        if (timeFrames[timeFrame] >= itemAge) {
          acc[timeFrame].push(item);
          return true;
        }

        return false;
      });

      return acc;
    }, groups);

    const listGroups = Object.keys(groupedItems).map(title => {
      const itemsInGroup = groupedItems[title];

      return (
        <ListGroup key={title} title={title} items={itemsInGroup} buildCard={buildCard} />
      );
    });

    return <div>{listGroups}</div>;
  }

  private createBuildCardMethod = (cardActions, cardAppearance, cardDimensions?: CardDimensions) => {
    const buildCard = (mediaItem: MediaCollectionItem, index: number) => {
      if (!mediaItem.details || !mediaItem.details.id) {
        return null;
      }

      const {onCardClick: consumersOnCardClick, context, collectionName} = this.props;
      const getFileBinary = mediaItem.type === 'file' ? context.getFileBinary : undefined;
      const closure = (context, collectionName) => {
        return (id: string) => {
          return context.getFileBinary(id, collectionName);
        };
      };

      return (
        <CardListItemWrapper key={`${mediaItem.details.id}-${mediaItem.details.occurrenceKey}`} cardWidth={this.cardWidth}>
          <MediaCard
            provider={this.providersByMediaItemId[mediaItem.details.id]}
            dataURIService={this.dataURIService}

            appearance={cardAppearance}
            dimensions={{
              width: this.cardWidth,
              height: cardDimensions && cardDimensions.height
            }}

            onClick={consumersOnCardClick && this.handleCardClick.bind(this, mediaItem)}
            actions={cardActions(mediaItem)}

            getFileBinary={closure(context, collectionName)}
          />
        </CardListItemWrapper>
      );
    };

    return buildCard;
  }

  private addFakeTimesToItems(items: Array<MediaCollectionItem> | void): Array<MediaCollectionItem> {
    if (!items) {
      return [];
    }

    const sixHours = 6 * 60 * 60 * 1000;

    return items.map((item, i) => {
      return {
        type: item.type,
        details: {
          ...item.details,
          createdAt: Date.now() - (sixHours * i)
        }
      };
    }) as Array<MediaCollectionItem>;
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


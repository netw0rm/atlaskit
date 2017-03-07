/* tslint:disable:variable-name */
import * as React from 'react';
import { Component } from 'react';
import { Card, DEFAULT_CARD_DIMENSIONS  } from '..';
import { MediaItem, MediaCollection, MediaCollectionItem, Context, CardAction, ListAction } from '@atlaskit/media-core';
import { Subscription } from 'rxjs/Subscription';
import {CardListWrapper, Spinner, LoadMoreButtonContainer} from './styled';
import Button from '@atlaskit/button';
import { AxiosError } from 'axios';
import { InfiniteScroll } from './infiniteScroll';

export interface CardListProps {
  context: Context;
  collectionName: string;

  height?: number;

  cardWidth?: number;
  cardHeight?: number;
  cardType?: 'normal' | 'small';

  pageSize?: number;

  actions: Array<ListAction>;

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
  subscription: Subscription;
  hasNextPage: boolean;
  loadNextPage: () => void;
  collection?: MediaCollection;
  error?: AxiosError;
}

const LoadingComponent = <Spinner className="spinner" style={{ width: '100%', height: '100%' }}>loading...</Spinner>;
const EmptyComponent = <div>No items</div>;
const ErrorComponent = <div>ERROR</div>;

export class CardList extends Component<CardListProps, CardListState> {
  static defaultProps = {
    pageSize: 10,
    cardWidth: DEFAULT_CARD_DIMENSIONS.WIDTH,
    cardHeight: DEFAULT_CARD_DIMENSIONS.HEIGHT,
    loadingComponent: LoadingComponent,
    useInfiniteScroll: true,
    emptyComponent: EmptyComponent,
    errorComponent: ErrorComponent
  };

  private shouldUpdateState(nextProps: CardListProps): boolean {
    return (nextProps.collectionName !== this.props.collectionName)
      || (nextProps.context !== this.props.context)
      || (nextProps.pageSize !== this.props.pageSize);
  }

  private updateState(nextProps: CardListProps): void {
    const provider = nextProps.context.getMediaCollectionProvider(nextProps.collectionName, nextProps.pageSize || 10);

    if (this.state && this.state.subscription) {
      this.state.subscription.unsubscribe();
    }

    this.setState({
      loadNextPage: () => {
        return provider.controller().loadNextPage();
      },
      hasNextPage: false,
      collection: undefined,
      error: undefined,
      loading: false
    });

    this.setState({
      subscription: provider.observable().subscribe({
        next: (collection: MediaCollection) => {
          this.setState({
            collection,
            hasNextPage: true,
            loading: false
          });
        },
        complete: () => {
          this.setState({
            hasNextPage: false,
            loading: false
          });
        },
        error: (error: AxiosError) => {
          console.error(`Error: ${error}`);
          this.setState({
            error,
            loading: false
          });
        }
      })
    });
  }

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

    if (this.state) {
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
    const cardActions: Array<CardAction> = this.props.actions.map((action: ListAction) => {
      return {
        label: action.label,
        type: action.type,
        handler: (item: MediaItem, event: Event) => {
          if (!this.state.collection) { return; }

          const fileIds = this.state.collection.items.map(cItem => ({
            id: cItem.id,
            mediaItemType: cItem.mediaItemType
          }));
          action.handler(item, fileIds, event);
        }
      };
    });

    const cards = this.state.collection ? this.state.collection.items.map((item: MediaCollectionItem, index: number) => {
      return <li key={`${index}-${item.id}`}>
        <Card
          context={this.props.context}
          collectionName={this.props.collectionName}
          id={item.id}
          mediaItemType={item.mediaItemType}
          width={this.props.cardWidth}
          height={this.props.cardHeight}
          type={this.props.cardType}
          actions={cardActions}
        />
      </li>;
    }) : null;

    return (
      <ul>
        {cards}
      </ul>
    );
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
        <LoadMoreButtonContainer style={{ width: this.props.cardWidth }}>
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

  private loadNextPage(): void {
    this.setState({ loading: true });
    this.state.loadNextPage();
  }
}

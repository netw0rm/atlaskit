import * as React from 'react';
import { PureComponent } from 'react';
import styled from 'styled-components';
import Spinner from '@atlaskit/spinner';

import { defaultSortCriteria } from '../constants';
import { contentToDocument } from '../api/TaskDecisionUtils';
import { loadLatestItems } from '../api/TaskDecisionLoader';
import InfiniteScroll from './InfiniteScroll';
import ListWrapper from '../styled/ListWrapper';
import DateGroup from '../styled/DateGroup';
import DateGroupHeader from '../styled/DateGroupHeader';

import { isDateSortCriteria, toRendererContext } from '../type-helpers';
import { getFormattedDate, getStartOfDate, isSameDate } from '../util/date';

import {
  Item,
  OnUpdate,
  Query,
  RecentUpdateContext,
  RecentUpdatesListener,
  RenderDocument,
  TaskDecisionProvider
} from '../types';

import {
  isDecision,
  isTask,
  objectKeyToString,
  toObjectKey,
} from '../type-helpers';

import DecisionItem from './DecisionItem';
import ResourcedTaskItem from './ResourcedTaskItem';

export interface ContentRef {
  (ref: HTMLElement | undefined): void;
}

export interface Props {
  taskDecisionProvider: Promise<TaskDecisionProvider>;
  initialQuery: Query;
  renderDocument: RenderDocument;
  onUpdate?: OnUpdate<Item>;
  groupItems?: boolean;

  /**
   * Infinite scrolling is only enabled when height has also been specified.
   *
   * Note infinite scrolling will not work if the initial data set does not fill the container.
   *
   * It's recommend to set the limit to at least 100 in the initialQuery (this is the default) to
   * workaround this limitation.
   */
  useInfiniteScroll?: boolean;
  height?: number | string;

  emptyComponent?: JSX.Element;
  errorComponent?: JSX.Element;
}

export interface State {
  items?: Item[];
  nextQuery?: Query;
  loading: boolean;
  error: boolean;
}

interface ItemsByDate {
  date: Date;
  items: Item[];
}

// tslint:disable-next-line:variable-name
const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
  height: ${props => props.height || 'auto'}
`;

export default class ResourcedItemList extends PureComponent<Props,State> {
  private mounted: boolean;
  private recentUpdatesId: string | undefined;

  constructor(props: Props) {
    super(props);
    this.state = {
      loading: true,
      error: false,
    };
  }

  componentDidMount() {
    this.mounted = true;
    this.performInitialQuery(this.props);
  }

  componentWillUnmount() {
    this.mounted = false;
    this.unsubscribeRecentUpdates();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.initialQuery !== nextProps.initialQuery || this.props.taskDecisionProvider !== nextProps.taskDecisionProvider) {
      this.unsubscribeRecentUpdates();
      this.performInitialQuery(nextProps);
    }
  }

  private unsubscribeRecentUpdates() {
    const { recentUpdatesId } = this;
    if (recentUpdatesId) {
      this.props.taskDecisionProvider.then(provider => {
        provider.unsubscribeRecentUpdates(recentUpdatesId);
      });
    }
    this.recentUpdatesId = undefined;
  }

  private loadLatest = (recentUpdateContext: RecentUpdateContext) => {
    const { initialQuery, taskDecisionProvider } = this.props;
    const { items } = this.state;
    taskDecisionProvider.then(provider => {
      loadLatestItems(initialQuery, items || [], provider, recentUpdateContext).then(latestItems => {
        if (this.mounted) {
          this.setState({
            items: latestItems,
          });
        }
      });
    });
  }

  private performInitialQuery(props: Props) {
    const { initialQuery } = props;
    this.performQuery(initialQuery, true, {
      id: id => {
        this.recentUpdatesId = id;
      },
      recentUpdates: this.loadLatest
    });
  }

  private performQuery(query: Query, replaceAll: boolean, recentUpdatesListener?: RecentUpdatesListener) {
    const { taskDecisionProvider } = this.props;
    const items = replaceAll ? [] : this.state.items;
    this.setState({
      loading: true,
      error: false,
      items,
    });
    taskDecisionProvider.then(provider => {
      provider.getItems(query, recentUpdatesListener).then(result => {
        if (!this.mounted) {
          return;
        }
        const { items, nextQuery } = result;
        let combinedItems: Item[];
        if (replaceAll) {
          combinedItems = items;
        } else {
          combinedItems = [
            ...this.state.items || [],
            ...items,
          ];
        }

        this.setState({
          items: combinedItems,
          nextQuery,
          loading: false,
        });
        const { onUpdate } = this.props;
        if (onUpdate) {
          onUpdate(combinedItems, items);
        }
      }).catch(err => {
        if (!this.mounted) {
          return;
        }

        this.setState({
          loading: false,
          error: true
        });
      });
    });
  }

  private loadMore = () => {
    const { nextQuery } = this.state;
    if (nextQuery) {
      this.performQuery(nextQuery, false);
    }
  }

  private renderItems() {
    const { groupItems, initialQuery } = this.props;
    const { items } = this.state;

    if (!items) {
      return null;
    }

    const { sortCriteria } = initialQuery;

    if (groupItems && isDateSortCriteria(sortCriteria)) {
      return this.renderItemsGroupedByDate(items);
    }

    return this.renderItemsUngrouped(items);
  }

  private renderItemsUngrouped(items: Item[]) {
    const { renderDocument, taskDecisionProvider } = this.props;
    return (
      <ListWrapper>
        {items.map(item => {
          const objectKey = toObjectKey(item);

          if (isDecision(item)) {
            return (
              <DecisionItem key={objectKeyToString(objectKey)}>
                {renderDocument(contentToDocument(item.content), toRendererContext(objectKey))}
              </DecisionItem>
            );
          }

          if (isTask(item)) {
            return (
              <ResourcedTaskItem
                key={objectKeyToString(objectKey)}
                taskDecisionProvider={taskDecisionProvider}
                taskId={objectKey.localId}
                objectAri={objectKey.objectAri}
                containerAri={objectKey.containerAri}
              >
                {renderDocument(contentToDocument(item.content), toRendererContext(objectKey))}
              </ResourcedTaskItem>
            );
          }

          return null;
        })}
      </ListWrapper>
    );
  }

  private renderItemsGroupedByDate(items: Item[]) {
    const itemsByDate = this.groupItemsByDate(items);
    return (
      <DateGroup>
        {itemsByDate.map(({ date, items }) =>
          <li key={date.toISOString()}>
            <DateGroupHeader>{getFormattedDate(date)}</DateGroupHeader>
            {this.renderItemsUngrouped(items)}
          </li>
        )}
      </DateGroup>
    );
  }

  private groupItemsByDate(items: Item[]): ItemsByDate[] {
    const groupByField = this.props.initialQuery.sortCriteria || defaultSortCriteria;
    let lastDate;
    return items.reduce<ItemsByDate[]>((groups, item) => {
      const currentDate = getStartOfDate(item[groupByField]);
      if (isSameDate(lastDate, currentDate)) {
        const lastGroup = groups[groups.length - 1];
        lastGroup.items.push(item);
      } else {
        lastDate = currentDate;
        groups.push({
          date: currentDate,
          items: [item]
        });
      }
      return groups;
    }, []);
  }

  render() {
    const { emptyComponent, errorComponent, height, useInfiniteScroll } = this.props;
    const { error, items, loading } = this.state;

    let loadingSpinner;

    if (error && errorComponent) {
      return errorComponent || null;
    }

    if (loading) {
      let height;
      if (!items || items.length === 0) {
        height = '100%';
      }
      loadingSpinner = (
        <LoadingWrapper height={height}>
          <Spinner size="medium"/>
        </LoadingWrapper>
      );
    } else if (!items || !items.length) {
      return emptyComponent || null;
    }

    if (height && useInfiniteScroll) {
      return (
        <InfiniteScroll
          height={height}
          onThresholdReached={this.loadMore}
        >
          {this.renderItems()}
          {loadingSpinner}
        </InfiniteScroll>
      );
    }

    return (
      <div>
        {this.renderItems()}
        {loadingSpinner}
      </div>
    );
  }
}

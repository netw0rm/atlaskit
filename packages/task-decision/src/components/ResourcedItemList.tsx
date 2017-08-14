import * as React from 'react';
import { PureComponent } from 'react';
import styled from 'styled-components';
import Button from '@atlaskit/button';
import Spinner from '@atlaskit/spinner';

import { contentToDocument } from '../api/TaskDecisionUtils';
import ListWrapper from '../styled/ListWrapper';

import {
  Item,
  OnUpdate,
  Query,
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
  taskDecisionProvider: TaskDecisionProvider;
  initialQuery: Query;
  renderDocument: RenderDocument;
  onUpdate?: OnUpdate<Item>;
}

export interface State {
  items?: Item[];
  nextQuery?: Query;
  loading: boolean;
}

// tslint:disable-next-line:variable-name
const LoadingWrapper = styled.div`
  width: 100%;
  text-align: center;
  margin: 10px 0;
`;


export default class ResourcedList extends PureComponent<Props,State> {
  private mounted: boolean;

  constructor(props: Props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    const { initialQuery } = this.props;
    this.mounted = true;
    this.performQuery(initialQuery);
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  private performQuery(query: Query) {
    const { taskDecisionProvider } = this.props;
    this.setState({
      loading: true,
    });
    taskDecisionProvider.getItems(query).then(result => {
      if (!this.mounted) {
        return;
      }
      const { items, nextQuery } = result;
      const combinedItems: Item[] = [
        ...this.state.items || [],
        ...items,
      ];

      this.setState({
        items: combinedItems,
        nextQuery,
        loading: false,
      });
      const { onUpdate } = this.props;
      if (onUpdate) {
        onUpdate(combinedItems, items);
      }
    });
  }

  private loadMore = () => {
    const { nextQuery } = this.state;
    if (nextQuery) {
      this.performQuery(nextQuery);
    }
  }

  renderItems() {
    const { renderDocument, taskDecisionProvider } = this.props;
    const { items } = this.state;

    if (!items) {
      return null;
    }

    return (
      <ListWrapper>
        {items.map(item => {
          const objectKey = toObjectKey(item);

          if (isDecision(item)) {
            return (
              <DecisionItem key={objectKeyToString(objectKey)}>
                {renderDocument(contentToDocument(item.content))}
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
                {renderDocument(contentToDocument(item.content))}
              </ResourcedTaskItem>
            );
          }

          return null;
        })}
      </ListWrapper>
    );
  }

  render() {
    const { items, loading, nextQuery } = this.state;

    if (!items || !items.length) {
      return null;
    }

    let moreOption;
    let loadingSpinner;

    if (loading) {
      loadingSpinner = (
        <LoadingWrapper>
          <Spinner appearance=""/>
        </LoadingWrapper>
      );
    } else if (nextQuery) {
      moreOption = (
        <div><Button appearance="link" onClick={this.loadMore}>More...</Button></div>
      );
    }

    return (
      <div>
        {this.renderItems()}
        {moreOption}
        {loadingSpinner}
      </div>
    );
  }
}

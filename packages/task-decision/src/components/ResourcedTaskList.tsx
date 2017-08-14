import * as React from 'react';
import { PureComponent } from 'react';
import styled from 'styled-components';
import Button from '@atlaskit/button';
import Spinner from '@atlaskit/spinner';

import { Task, Query, OnUpdate, RenderDocument, TaskDecisionProvider } from '../types';
import { tasksToDocument } from '../api/TaskDecisionUtils';

export interface ContentRef {
  (ref: HTMLElement | undefined): void;
}

export interface Props {
  taskDecisionProvider: TaskDecisionProvider;
  initialQuery: Query;
  renderDocument: RenderDocument;
  onUpdate?: OnUpdate<Task>;
}

export interface State {
  tasks?: Task[];
  nextQuery?: Query;
  loading: boolean;
}

// tslint:disable-next-line:variable-name
const LoadingWrapper = styled.div`
  width: 100%;
  text-align: center;
  margin: 10px 0;
`;


export default class ResourcedTaskList extends PureComponent<Props,State> {
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
    taskDecisionProvider.getTasks(query).then(result => {
      if (!this.mounted) {
        return;
      }
      const { tasks, nextQuery } = result;
      const combinedTasks: Task[] = [
        ...this.state.tasks || [],
        ...tasks,
      ];
      this.setState({
        tasks: combinedTasks,
        nextQuery,
        loading: false,
      });
      const { onUpdate } = this.props;
      if (onUpdate) {
        onUpdate(combinedTasks, tasks);
      }
    });
  }

  private loadMore = () => {
    const { nextQuery } = this.state;
    if (nextQuery) {
      this.performQuery(nextQuery);
    }
  }

  render() {
    const { tasks, loading, nextQuery } = this.state;
    const { renderDocument } = this.props;

    if (!tasks || !tasks.length) {
      return null;
    }

    const document = tasksToDocument(tasks);
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
        {renderDocument(document)}
        {moreOption}
        {loadingSpinner}
      </div>
    );
  }
}

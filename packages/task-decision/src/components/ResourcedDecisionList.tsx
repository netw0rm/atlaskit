import * as React from 'react';
import { PureComponent } from 'react';
import styled from 'styled-components';
import Button from '@atlaskit/button';
import Spinner from '@atlaskit/spinner';

import { Decision, Query, OnUpdate, RenderDocument, TaskDecisionProvider } from '../types';
import { decisionsToDocument } from '../api/TaskDecisionUtils';

export interface ContentRef {
  (ref: HTMLElement | undefined): void;
}

export interface Props {
  taskDecisionProvider: TaskDecisionProvider;
  initialQuery: Query;
  renderDocument: RenderDocument;
  onUpdate?: OnUpdate<Decision>;
}

export interface State {
  decisions?: Decision[];
  nextQuery?: Query;
  loading: boolean;
}

// tslint:disable-next-line:variable-name
const LoadingWrapper = styled.div`
  width: 100%;
  text-align: center;
  margin: 10px 0;
`;


export default class ResourcedDecisionList extends PureComponent<Props,State> {
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
    taskDecisionProvider.getDecisions(query).then(result => {
      if (!this.mounted) {
        return;
      }
      const { decisions, nextQuery } = result;
      const combinedDecisions: Decision[] = [
        ...this.state.decisions || [],
        ...decisions,
      ];
      this.setState({
        decisions: combinedDecisions,
        nextQuery,
        loading: false,
      });
      const { onUpdate } = this.props;
      if (onUpdate) {
        onUpdate(combinedDecisions, decisions);
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
    const { decisions, loading, nextQuery } = this.state;
    const { renderDocument } = this.props;

    if (!decisions || !decisions.length) {
      return null;
    }

    const document = decisionsToDocument(decisions);
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

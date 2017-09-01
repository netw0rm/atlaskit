import { storiesOf } from '@kadira/storybook';
import * as React from 'react';
import { PureComponent } from 'react';

import { Query } from '../src/types';
import ResourcedItemList, { Props } from '../src/components/ResourcedItemList';
import { createProviders, SidebarContainer } from './story-utils';

const initialQuery: Query = {
  containerAri: 'cheese',
  limit: 100,
};

const initialQueryByLastUpdateDate: Query = {
  ...initialQuery,
  sortCriteria: 'lastUpdateDate',
};

interface WithResetState {
  query: Query;
}

class ResourcedItemListWithReset extends PureComponent<Props,WithResetState> {

  constructor(props: Props) {
    super(props);
    this.state = {
      query: props.initialQuery
    };
  }

  onResetQuery = () => {
    this.setState({
      query: {
        ...this.props.initialQuery
      }
    });
  }

  render() {
    return (
      <div>
        <div>
          <button onClick={this.onResetQuery}>Reset initial query</button>
        </div>
        <SidebarContainer>
          <ResourcedItemList
            {...this.props}
            initialQuery={this.state.query}
          />
        </SidebarContainer>
      </div>
    );
  }
}

storiesOf('<ResourcedItemList/>', module)
  .add('Simple', () => {
    const { renderDocument, taskDecisionProvider } = createProviders();

    return (
      <SidebarContainer>
        <ResourcedItemList
          renderDocument={renderDocument}
          initialQuery={initialQuery}
          taskDecisionProvider={taskDecisionProvider}
        />
      </SidebarContainer>
    );
  })
  .add('Infinite loading', () => {
    const { renderDocument, taskDecisionProvider } = createProviders({ hasMore: true });

    return (
      <SidebarContainer>
        <ResourcedItemList
          renderDocument={renderDocument}
          initialQuery={initialQuery}
          taskDecisionProvider={taskDecisionProvider}
          useInfiniteScroll={true}
          height="100%"
        />
      </SidebarContainer>
    );
  })
  .add('Infinite loading slow 500ms', () => {
    const { renderDocument, taskDecisionProvider } = createProviders({ hasMore: true, lag: 500 });

    return (
      <SidebarContainer>
        <ResourcedItemList
          renderDocument={renderDocument}
          initialQuery={initialQuery}
          taskDecisionProvider={taskDecisionProvider}
          useInfiniteScroll={true}
          height="100%"
        />
      </SidebarContainer>
    );
  })
  .add('Infinite loading slow 5000ms', () => {
    const { renderDocument, taskDecisionProvider } = createProviders({ hasMore: true, lag: 5000 });

    return (
      <SidebarContainer>
        <ResourcedItemList
          renderDocument={renderDocument}
          initialQuery={initialQuery}
          taskDecisionProvider={taskDecisionProvider}
          useInfiniteScroll={true}
          height="100%"
        />
      </SidebarContainer>
    );
  })
  .add('Infinite loading slow 500ms with reset', () => {
    const { renderDocument, taskDecisionProvider } = createProviders({ hasMore: true, lag: 500 });

    return (
      <SidebarContainer>
        <ResourcedItemListWithReset
          renderDocument={renderDocument}
          initialQuery={initialQuery}
          taskDecisionProvider={taskDecisionProvider}
          useInfiniteScroll={true}
          height="100%"
        />
      </SidebarContainer>
    );
  })
  .add('Group by last update date', () => {
    const { renderDocument, taskDecisionProvider } = createProviders();
    return (
      <SidebarContainer>
        <ResourcedItemList
          renderDocument={renderDocument}
          initialQuery={initialQueryByLastUpdateDate}
          taskDecisionProvider={taskDecisionProvider}
          groupItems={true}
        />
      </SidebarContainer>
    );
  })
  .add('Group by last update date - Infinite loading', () => {
    const { renderDocument, taskDecisionProvider } = createProviders({ hasMore: true });
    return (
      <SidebarContainer>
        <ResourcedItemList
          renderDocument={renderDocument}
          initialQuery={initialQueryByLastUpdateDate}
          taskDecisionProvider={taskDecisionProvider}
          groupItems={true}
          useInfiniteScroll={true}
          height="100%"
        />
      </SidebarContainer>
    );
  })
  .add('Group by last update date - Infinite loading slow 500ms', () => {
    const { renderDocument, taskDecisionProvider } = createProviders({ hasMore: true, lag: 500 });
    return (
      <SidebarContainer>
        <ResourcedItemList
          renderDocument={renderDocument}
          initialQuery={initialQueryByLastUpdateDate}
          taskDecisionProvider={taskDecisionProvider}
          groupItems={true}
          useInfiniteScroll={true}
          height="100%"
        />
      </SidebarContainer>
    );
  })
  .add('Group by (default) creation date', () => {
    const { renderDocument, taskDecisionProvider } = createProviders();
    return (
      <SidebarContainer>
        <ResourcedItemList
          renderDocument={renderDocument}
          initialQuery={initialQuery}
          taskDecisionProvider={taskDecisionProvider}
          groupItems={true}
        />
      </SidebarContainer>
    );
  })
  .add('Empty stage', () => {
    const { renderDocument, taskDecisionProvider } = createProviders({ empty: true });
    return (
      <SidebarContainer>
        <ResourcedItemList
          renderDocument={renderDocument}
          initialQuery={initialQuery}
          taskDecisionProvider={taskDecisionProvider}
          groupItems={true}
          emptyComponent={<div>Empty result</div>}
        />
      </SidebarContainer>
    );
  })
  .add('Error stage', () => {
    const { renderDocument, taskDecisionProvider } = createProviders({ error: true });
    return (
      <SidebarContainer>
        <ResourcedItemList
          renderDocument={renderDocument}
          initialQuery={initialQuery}
          taskDecisionProvider={taskDecisionProvider}
          groupItems={true}
          errorComponent={<div>Error result</div>}
        />
      </SidebarContainer>
    );
  });

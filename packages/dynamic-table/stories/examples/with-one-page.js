import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { action } from '@kadira/storybook';
import DynamicTable from '@atlaskit/dynamic-table';
import Button from '@atlaskit/button';
import { caption, head, rows } from './sample-data';

const Wrapper = styled.div`
  min-width: 600px;
`;

export default class extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showPagination: true,
    };
  }

  togglePagination = () => {
    this.setState({
      showPagination: !this.state.showPagination,
    });
  }

  render() {
    return (
      <Wrapper>
        <p>
          Pagination is enabled or disabled by setting or unsetting the <code>rowsPerPage</code>
          prop.
        </p>
        <Button onClick={this.togglePagination}>Toggle pagination</Button>
        <DynamicTable
          caption={caption}
          head={head}
          rows={rows.slice(0, 5)}
          rowsPerPage={this.state.showPagination ? 10 : undefined}
          defaultPage={1}
          isFixedSize
          defaultSortKey="term"
          defaultSortOrder="ASC"
          onSort={action('onSort')}
          onSetPage={action('onSetPage')}
        />
      </Wrapper>
    );
  }
}

import React, { PureComponent } from 'react';
import DynamicTable from './stateless';
import { statefulPropTypes, statefulDefaultProps } from './internal/props';

export default class AkDynamicTable extends PureComponent {
  static propTypes = statefulPropTypes

  static defaultProps = statefulDefaultProps

  state = {
    page: this.props.defaultPage,
    sortKey: this.props.defaultSortKey,
    sortOrder: this.props.defaultSortOrder,
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      page: newProps.page,
      sortKey: newProps.defaultSortKey,
      sortOrder: newProps.defaultSortOrder,
    });
  }

  onSetPage = (page) => {
    this.props.onSetPage(page);
    this.setState({ page });
  };

  onSort = ({ key, item, sortOrder }) => {
    this.props.onSort({ key, item, sortOrder });
    this.setState({ sortKey: key, sortOrder, page: 1 });
  }

  render() {
    return (
      <DynamicTable
        caption={this.props.caption}
        head={this.props.head}
        rows={this.props.rows}
        emptyView={this.props.emptyView}
        isFixedSize={this.props.isFixedSize}
        rowsPerPage={this.props.rowsPerPage}
        onSetPage={this.onSetPage}
        onSort={this.onSort}
        page={this.state.page}
        sortKey={this.state.sortKey}
        sortOrder={this.state.sortOrder}
      />
    );
  }
}

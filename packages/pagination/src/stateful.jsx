import React, { PureComponent, PropTypes } from 'react';
import Pagination from './stateless';

import {
  validateCurrent,
  validateTotal,
  i18nShape,
  defaultI18n,
} from './internal/props';

export default class AkPagination extends PureComponent {
  static propTypes = {
    defaultCurrent: validateCurrent,
    total: validateTotal,
    onSetPage: PropTypes.func,
    i18n: i18nShape,
  }

  static defaultProps = {
    defaultCurrent: 1,
    total: 1,
    onSetPage() {},
    i18n: defaultI18n,
  }

  state = {
    current: this.props.defaultCurrent,
  }

  componentWillReceiveProps({ current }) {
    if (this.state.current !== current) this.setState({ current });
  }

  onSetPage = (page) => {
    this.props.onSetPage(page);
    this.setState({ current: page });
  }

  render() {
    return (
      <Pagination
        i18n={this.props.i18n}
        onSetPage={this.onSetPage}
        total={this.props.total}
        current={this.state.current}
      />
    );
  }
}

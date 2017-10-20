// @flow
import React, { PureComponent } from 'react';
import BreadcrumbsStateless from './BreadcrumbsStateless';
import type { ChildrenType } from '../types';

type Props = {|
  children?: ChildrenType
|};

export default class Breadcrumbs extends PureComponent {
  props: Props // eslint-disable-line react/sort-comp

  state = { isExpanded: false }

  expand = () => this.setState({ isExpanded: true });

  render() {
    return (
      <BreadcrumbsStateless
        {...this.props}
        isExpanded={this.state.isExpanded}
        onExpand={this.expand}
      >
        {this.props.children}
      </BreadcrumbsStateless>
    );
  }
}

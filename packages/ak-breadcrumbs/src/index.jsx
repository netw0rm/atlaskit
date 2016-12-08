import React, { PropTypes, PureComponent } from 'react';
import Breadcrumbs, { BreadcrumbsItem } from './Breadcrumbs';

export {
  Breadcrumbs as AkBreadcrumbs,
  BreadcrumbsItem as AkBreadcrumbsItem,
};

export default class extends PureComponent {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]),
  }

  constructor() {
    super();
    this.state = {
      isExpanded: false,
    };
  }

  expand = () => this.setState({ isExpanded: true });

  render = () => (
    <Breadcrumbs
      {...this.props}
      isExpanded={this.state.isExpanded}
      onExpand={this.expand}
    >
      {this.props.children}
    </Breadcrumbs>
  );
}

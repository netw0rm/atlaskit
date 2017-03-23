import React, { PropTypes, PureComponent } from 'react';
import BreadcrumbsStateless, { BreadcrumbsItem } from './Breadcrumbs';

export {
  BreadcrumbsStateless as AkBreadcrumbs,
  BreadcrumbsItem as AkBreadcrumbsItem,
};

export default class Breadcrumbs extends PureComponent {
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

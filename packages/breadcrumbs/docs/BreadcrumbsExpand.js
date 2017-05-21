import React, { PureComponent } from 'react';
import { AkBreadcrumbs, AkBreadcrumbsItem } from '@atlaskit/breadcrumbs';

export default class AKBreadcrumbsExpand extends PureComponent {
  state = {
    isExpanded: false,
  }

  expand(e) {
    e.preventDefault();
    this.setState({ isExpanded: true });
  }

  render() {
    return (
      <AkBreadcrumbs
        maxItems={2}
        isExpanded={this.state.isExpanded}
        onExpand={e => this.expand(e)}
      >
        <AkBreadcrumbsItem
          href="/pages"
          text="Pages"
          key="Pages"
        />
        <AkBreadcrumbsItem
          href="/hidden"
          text="hidden bread crumb"
          key="hidden bread crumb"
        />
        <AkBreadcrumbsItem
          href="/pages/home"
          text="Home"
          key="Home"
        />
      </AkBreadcrumbs>
    );
  }
}

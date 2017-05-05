import React, { PureComponent } from 'react';
import { AkBreadcrumbs, AkBreadcrumbsItem } from '@atlaskit/breadcrumbs';
import AtlassianIcon from '@atlaskit/icon/glyph/atlassian';

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
        isExpanded={this.state.isExpanded}
        onExpand={e => this.expand(e)}
      >
        <AkBreadcrumbsItem
          href="/pages"
          text="Pages"
        />
        <AkBreadcrumbsItem
          href="/pages/home"
          text="Home"
        />
        <AkBreadcrumbsItem
          href="/item"
          iconBefore={<AtlassianIcon label="Test icon" />}
          text="Icon Before"
        />
        <AkBreadcrumbsItem
          href="/item"
          iconAfter={<AtlassianIcon label="Test icon" />}
          text="Icon After"
        />
      </AkBreadcrumbs>
    );
  }
}

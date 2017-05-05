import React, { PureComponent, PropTypes } from 'react';

import AkNavigation, { AkContainerTitle, AkSearchDrawer } from '@atlaskit/navigation';
import {
  AddIcon,
  ArrowLeftIcon,
  AtlassianIcon,
  QuestionCircleIcon,
  SearchIcon,
} from '@atlaskit/icon';

import nucleusLogo from './nucleus.png';

export default class BasicNavigation extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    searchDrawerContent: PropTypes.node,
    openDrawer: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      openDrawer: props.openDrawer || null,
    };
  }

  openDrawer = (name) => {
    this.setState({
      openDrawer: name,
    });
  }

  closeDrawer = () => {
    this.setState({
      openDrawer: null,
    });
  }

  render() {
    return (
      <AkNavigation
        containerAppearance="container"
        containerHeaderComponent={() => (
          <AkContainerTitle
            href="#foo"
            icon={
              <img alt="nucleus" src={nucleusLogo} />
            }
            text="Quick Search"
            subText="In a search drawer"
          />)}
        globalPrimaryItemHref=""
        globalPrimaryIcon={<AtlassianIcon label="Atlassian icon" size="large" />}
        globalCreateIcon={<AddIcon size="small" label="create" />}
        globalSearchIcon={<SearchIcon label="search" />}
        globalHelpItem={<QuestionCircleIcon label="help" />}
        drawers={[
          (<AkSearchDrawer
            backIcon={<ArrowLeftIcon size="medium" label="Back" />}
            isOpen={this.state.openDrawer === 'search'}
            key="search"
            onBackButton={this.closeDrawer}
            primaryIcon={<AtlassianIcon size="large" label="atlassian" />}
          >
            {this.props.searchDrawerContent}
          </AkSearchDrawer>),
        ]}
        onCreateDrawerOpen={() => {}}
        onSearchDrawerOpen={() => { this.openDrawer('search'); }}
        openDrawer={this.state.openDrawer}
        isCollapsible={false}
      >
        {this.props.children}
      </AkNavigation>
    );
  }
}

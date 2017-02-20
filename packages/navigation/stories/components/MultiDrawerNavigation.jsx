import React, { PureComponent } from 'react';
import { AtlassianIcon, ArrowleftIcon, DashboardIcon, SettingsIcon, IssuesIcon, ArrowrightIcon } from '@atlaskit/icon';
import { AkDrawer, AkContainerItemGroup, AkContainerItem, AkDrawerItem } from '../../src/index';
import BasicNavigation from './BasicNavigation';

export default class DrawerNavigation extends PureComponent {
  constructor(...args) {
    super(...args);
    this.state = {
      openDrawer: null,
      backIconOffset: 0,
      isOpen: true,
      width: 300,
    };
  }

  setDrawer(drawerId, event) {
    this.setState({
      backIconOffset: event ? event.currentTarget.getBoundingClientRect().top : 0,
      openDrawer: drawerId,
    });
  }

  getBackIcon = () => (
    <ArrowleftIcon label="Back icon" size="medium" />
  );

  getPrimaryIcon = () => (
    <AtlassianIcon label="Atlassian icon" size="medium" />
  );

  getSearchDrawer = () => (
    <AkDrawer
      backIcon={this.getBackIcon()}
      backIconOffset={68}
      isOpen={this.state.openDrawer === 'search'}
      isWide
      key="search"
      onBackButton={() => this.setDrawer(null)}
      primaryIcon={this.getPrimaryIcon()}
    >
      <p>Search drawer</p>
    </AkDrawer>
  );

  getCreateDrawer = () => (
    <AkDrawer
      backIcon={this.getBackIcon()}
      backIconOffset={108}
      isOpen={this.state.openDrawer === 'create'}
      isWide
      key="create"
      onBackButton={() => this.setDrawer(null)}
      primaryIcon={this.getPrimaryIcon()}
    >
      <p>Create drawer</p>
    </AkDrawer>
  );

  getQueuesDrawer = () => (
    <AkDrawer
      backIcon={this.getBackIcon()}
      backIconOffset={this.state.backIconOffset}
      isOpen={this.state.openDrawer === 'queues'}
      key="queues"
      onBackButton={() => this.setDrawer(null)}
      primaryIcon={this.getPrimaryIcon()}
    >
      <div>
        <AkContainerItemGroup>
          <AkDrawerItem
            icon={<DashboardIcon label="Blockers" />}
            text="Blockers"
          />
          <AkDrawerItem
            icon={<DashboardIcon label="Urgent SLA" />}
            text="Urgent SLA"
          />
          <AkDrawerItem
            icon={<DashboardIcon label="All open issues" />}
            text="All open issues"
          />
        </AkContainerItemGroup>
      </div>
    </AkDrawer>
  );

  getReportsDrawer = () => (
    <AkDrawer
      backIcon={this.getBackIcon()}
      backIconOffset={this.state.backIconOffset}
      isOpen={this.state.openDrawer === 'reports'}
      key="reports"
      onBackButton={() => this.setDrawer(null)}
      primaryIcon={this.getPrimaryIcon()}
    >
      <div>
        <AkContainerItemGroup title="Team">
          <AkDrawerItem text="Workload" />
          <AkDrawerItem text="SLA goals" />
          <AkDrawerItem text="Satisfaction" />
        </AkContainerItemGroup>
        <AkContainerItemGroup title="Knowledge Base">
          <AkDrawerItem text="Article usage" />
          <AkDrawerItem text="Article effectiveness" />
        </AkContainerItemGroup>
        <AkContainerItemGroup title="Custom">
          <AkDrawerItem text="Created vs Resolved" />
          <AkDrawerItem text="Time to resolution" />
          <AkDrawerItem text="SLA success rate" />
          <AkDrawerItem text="SLA met vs breached" />
          <AkDrawerItem text="Resolution by component" />
        </AkContainerItemGroup>
      </div>
    </AkDrawer>
  );

  resize(resizeState) {
    this.setState({
      isOpen: resizeState.isOpen,
      width: resizeState.width,
    });
  }

  render() {
    const queuesItemOpen = (<AkContainerItem icon={<DashboardIcon label="Queues" />} text="Queues" />);
    const queuesItemCollapsed = (<AkContainerItem
      href="#"
      icon={<ArrowrightIcon label="Queues" />}
      onClick={(e) => { this.setDrawer('queues', e); }}
      text="Queues"
    />);
    const reportsItemOpen = (<AkContainerItem icon={<SettingsIcon label="Reports" />} text="Reports" />);
    const reportsItemCollapsed = (<AkContainerItem
      href="#"
      icon={<ArrowrightIcon label="Reports" />}
      onClick={(e) => { this.setDrawer('reports', e); }}
      text="Reports"
    />);

    return (
      <BasicNavigation
        drawers={[
          this.getSearchDrawer(),
          this.getCreateDrawer(),
          this.getQueuesDrawer(),
          this.getReportsDrawer(),
        ]}
        isOpen={this.state.isOpen}
        onCreateDrawerOpen={() => this.setDrawer('create')}
        onResize={(resizeState) => { this.resize(resizeState); }}
        onSearchDrawerOpen={() => this.setDrawer('search')}
        width={this.state.width}
      >
        <div>
          {this.state.isOpen ? queuesItemOpen : queuesItemCollapsed }
          <AkContainerItem icon={<IssuesIcon label="Customers" />} text="Customers" />
          {this.state.isOpen ? reportsItemOpen : reportsItemCollapsed }
        </div>
      </BasicNavigation>
    );
  }
}

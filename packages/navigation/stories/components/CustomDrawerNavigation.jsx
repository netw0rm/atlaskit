import React, { PureComponent } from 'react';
import { AtlassianIcon, ArrowleftIcon, DashboardIcon, SettingsIcon, IssuesIcon, ArrowrightIcon, QuestionCircleIcon } from '@atlaskit/icon';
import { AkCustomDrawer, AkSearchDrawer, AkCreateDrawer, AkContainerItemGroup, AkContainerItem, AkDrawerItem, AkGlobalItem } from '../../src/index';
import BasicNavigation from './BasicNavigation';

export default class CustomDrawerNavigation extends PureComponent {
  state = {
    openDrawer: null,
    isOpen: true,
    width: 300,
  };

  setDrawer(drawerId) {
    this.setState({
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
    <AkSearchDrawer
      backIcon={this.getBackIcon()}
      isOpen={this.state.openDrawer === 'search'}
      isWide
      key="search"
      onBackButton={() => this.setDrawer(null)}
      primaryIcon={this.getPrimaryIcon()}
    >
      <p>Search drawer</p>
    </AkSearchDrawer>
  );

  getCreateDrawer = () => (
    <AkCreateDrawer
      backIcon={this.getBackIcon()}
      isOpen={this.state.openDrawer === 'create'}
      isWide
      key="create"
      onBackButton={() => this.setDrawer(null)}
      primaryIcon={this.getPrimaryIcon()}
      triggerRef={this.state.reportsTrigger}
    >
      <p>Create drawer</p>
    </AkCreateDrawer>
  );

  getQueuesDrawer = () => (
    <AkCustomDrawer
      backIcon={this.getBackIcon()}
      isOpen={this.state.openDrawer === 'queues'}
      key="queues"
      onBackButton={() => this.setDrawer(null)}
      primaryIcon={this.getPrimaryIcon()}
    >
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
    </AkCustomDrawer>
  );

  getReportsDrawer = () => (
    <AkCustomDrawer
      backIcon={this.getBackIcon()}
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
    </AkCustomDrawer>
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
      icon={<ArrowrightIcon label="Queues" />}
      onClick={() => { this.setDrawer('queues'); }}
      text="Queues"
    />);
    const reportsItemOpen = (<AkContainerItem icon={<SettingsIcon label="Reports" />} text="Reports" />);
    const reportsItemCollapsed = (<AkContainerItem
      icon={<ArrowrightIcon label="Reports" />}
      onClick={() => { this.setDrawer('reports'); }}
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
        globalHelpItem={
          <AkGlobalItem onClick={() => { this.setDrawer('reports'); }}>
            <QuestionCircleIcon label="Help icon" />
          </AkGlobalItem>
        }
      >
        <div>
          {this.state.isOpen ? queuesItemOpen : queuesItemCollapsed }
          <AkContainerItem icon={<IssuesIcon label="Customers" />} text="Collapse navigation and click one of the other two icons" />
          {this.state.isOpen ? reportsItemOpen : reportsItemCollapsed }
        </div>
      </BasicNavigation>
    );
  }
}

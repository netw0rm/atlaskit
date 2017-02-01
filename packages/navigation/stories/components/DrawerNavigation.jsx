import React, { PureComponent } from 'react';
import { DashboardIcon, ProjectsIcon, ArrowleftIcon, AtlassianIcon, EmojiPeopleIcon } from 'ak-icon';
import { AkContainerItemGroup, AkContainerItem, AkContainerHeader, AkDrawerItem } from '../../src/index';
import Drawer from '../../src/components/js/Drawer';
import nucleusLogo from '../nucleus.png';
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

  toggleDrawer(drawerId, event) {
    if (this.state.openDrawer) {
      this.setState({ openDrawer: null });
    } else {
      this.setState({
        backIconOffset: event.currentTarget.getBoundingClientRect().top,
        openDrawer: drawerId,
      });
    }
  }

  resize(resizeState) {
    this.setState({
      isOpen: resizeState.isOpen,
      width: resizeState.width,
    });
  }

  render() {
    const queuesDrawer = (
      <Drawer
        backIcon={(<ArrowleftIcon label="Back icon" size="medium" />)}
        backIconOffset={this.state.backIconOffset}
        header={(
          <AkContainerHeader
            href="#foo"
            icon={
              <img alt="nucleus" src={nucleusLogo} />
            }
            text="Queues"
          />)}
        isOpen={this.state.openDrawer === 'queues'}
        key="queues"
        onBackButton={() => this.toggleDrawer('queues')}
        primaryIcon={(<AtlassianIcon label="Atlassian icon" size="medium" />)}
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
      </Drawer>);

    const reportsDrawer = (
      <Drawer
        backIcon={(<ArrowleftIcon label="Back icon" size="medium" />)}
        backIconOffset={this.state.backIconOffset}
        header={(
          <AkContainerHeader
            href="#foo"
            icon={
              <img alt="nucleus" src={nucleusLogo} />
            }
            text="Reports"
          />)}
        isOpen={this.state.openDrawer === 'reports'}
        key="reports"
        onBackButton={() => this.toggleDrawer('reports')}
        primaryIcon={(<AtlassianIcon label="Atlassian icon" size="medium" />)}
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
      </Drawer>);

    const queuesItemOpen = (<AkContainerItem icon={<DashboardIcon label="Queues" />} text="Queues" />);
    const queuesItemCollapsed = (<AkContainerItem
      href="#"
      icon={<DashboardIcon label="Queues" />}
      onClick={(e) => { this.toggleDrawer('queues', e); }}
      text="Queues"
    />);
    const reportsItemOpen = (<AkContainerItem icon={<ProjectsIcon label="Reports" />} text="Reports" />);
    const reportsItemCollapsed = (<AkContainerItem
      href="#"
      icon={<ProjectsIcon label="Reports" />}
      onClick={(e) => { this.toggleDrawer('reports', e); }}
      text="Reports"
    />);

    return (
      <BasicNavigation
        drawerContent={[queuesDrawer, reportsDrawer]}
        isAnyDrawerOpen={this.state.openDrawer !== null}
        isOpen={this.state.isOpen}
        onResize={(resizeState) => { this.resize(resizeState); }}
        width={this.state.width}
      >
        <div>
          {this.state.isOpen ? queuesItemOpen : queuesItemCollapsed }
          <AkContainerItem icon={<EmojiPeopleIcon label="Customers" />} text="Customers" />
          {this.state.isOpen ? reportsItemOpen : reportsItemCollapsed }
        </div>
      </BasicNavigation>
    );
  }
}

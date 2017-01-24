import React, { PureComponent } from 'react';
import { DashboardIcon, ProjectsIcon, ArrowleftIcon, AtlassianIcon, EmojiPeopleIcon } from 'ak-icon';
import { AkContainerItemGroup, AkContainerItem, AkContainerHeader, AkDrawerItem } from '../../src/index';
import Drawer from '../../src/components/js/Drawer';
import DrawerTrigger from '../../src/components/js/DrawerTrigger';
import nucleusLogo from '../nucleus.png';
import BasicNavigation from './BasicNavigation';

export default class DrawerNavigation extends PureComponent {
  static defaultProps = {
  }

  constructor(...args) {
    super(...args);
    this.state = {
      openDrawer: null,
    };
  }

  toggleDrawer(drawerId) {
    if (this.state.openDrawer) {
      this.setState({ openDrawer: null });
    } else {
      this.setState({ openDrawer: drawerId });
    }
  }

  render() {
    const queuesDrawer = (
      <Drawer
        key="queues"
        backIcon={(<ArrowleftIcon label="Back icon" size="medium" />)}
        backIconPosition="create"
        header={(
          <AkContainerHeader
            href="#foo"
            text="Queues"
            icon={
              <img alt="nucleus" src={nucleusLogo} />
            }
          />)}
        isOpen={this.state.openDrawer === 'queues'}
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
        key="reports"
        backIcon={(<ArrowleftIcon label="Back icon" size="medium" />)}
        backIconPosition="create"
        header={(
          <AkContainerHeader
            href="#foo"
            text="Reports"
            icon={
              <img alt="nucleus" src={nucleusLogo} />
            }
          />)}
        isOpen={this.state.openDrawer === 'reports'}
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

    return (
      <BasicNavigation
        drawerContent={[queuesDrawer, reportsDrawer]}
        isAnyDrawerOpen={this.state.openDrawer !== null}
      >
        <div>
          <DrawerTrigger onActivate={() => this.toggleDrawer('queues')}>
            <AkContainerItem icon={<DashboardIcon label="Queues" />} text="Queues" />
          </DrawerTrigger>
          <AkContainerItem icon={<EmojiPeopleIcon label="Customers" />} text="Customers" />
          <DrawerTrigger onActivate={() => this.toggleDrawer('reports')}>
            <AkContainerItem icon={<ProjectsIcon label="Reports" />} text="Reports" />
          </DrawerTrigger>
        </div>
      </BasicNavigation>
    );
  }
}

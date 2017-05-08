import { storiesOf } from '@kadira/storybook';
import React, { PropTypes } from 'react';
import Tooltip, { Tooltip as StatelessTooltip } from '@atlaskit/tooltip';
import AkDropdownMenu from '@atlaskit/dropdown-menu';

import { DashboardIcon, SettingsIcon, TrayIcon } from '@atlaskit/icon';
import ModalDialog from '@atlaskit/modal-dialog';
import Page from '@atlaskit/page';
import Navigation, { AkNavigationItem } from '@atlaskit/navigation';

import HtmlPage from './components/HtmlPage';
import BasicNavigation from './components/BasicNavigation';
import { name } from '../package.json';
import PagedContainerNavigation from './components/nested-navigation/PagedContainerNavigation';

class ResizablePage extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
  }
  state = {
    isBannerOpen: false,
    isNavigationOpen: true,
    navigationWidth: 284,
  }

  render() {
    return (
      <Page
        isBannerOpen={this.state.isBannerOpen}
        navigationWidth={this.state.navigationWidth}
        navigation={
          <Navigation
            width={this.state.navigationWidth}
            isOpen={this.state.isNavigationOpen}
            onResize={({ width, isOpen }) => {
              this.setState({
                navigationWidth: width,
                isNavigationOpen: isOpen,
              });
            }}
          >
            Nav items in here
          </Navigation>
        }
      >
        {this.props.children}
      </Page>
    );
  }
}

storiesOf(name, module)
  .add('dropdown and tooltips in nav', () => (
    <HtmlPage>
      <BasicNavigation>
        <PagedContainerNavigation>
          <div>
            <StatelessTooltip
              description="testing tooltips needs a longish description"
              position="right"
              visible
            >
              <AkNavigationItem icon={<DashboardIcon label="Dashboard" />} text="Stateless tooltip" />
            </StatelessTooltip>
            <Tooltip
              description="testing tooltips needs a longish description"
              position="right"
            >
              <AkNavigationItem icon={<DashboardIcon label="Dashboard" />} text="Dynamic tooltip" />
            </Tooltip>
            <AkDropdownMenu
              appearance="tall"
              items={[
                {
                  heading: 'Help',
                  items: [
                    { content: 'Documentation' },
                    { content: 'Learn Git' },
                    { content: 'Keyboard shortcuts' },
                    { content: 'Bitbucket tutorials' },
                    { content: 'API' },
                    { content: 'Support' },
                  ],
                },
              ]}
              position="right bottom"
              defaultOpen
            >
              <AkNavigationItem icon={<DashboardIcon label="Dashboard" />} text="Dropdown menu on right" />
            </AkDropdownMenu>
          </div>
          <div>
            <AkNavigationItem icon={<SettingsIcon label="Settings" />} text="The xx – coexist" />
            <AkNavigationItem icon={<SettingsIcon label="Settings" />} text="Alt J – an awesome wave" />
            <AkNavigationItem icon={<SettingsIcon label="Settings" />} text="The Beatles – Sgt. Peppers Lonely Hearts Club Band" />
            <AkNavigationItem icon={<SettingsIcon label="Settings" />} text="Tame Impala – Lonerism" />
          </div>
          <div>
            <AkNavigationItem icon={<TrayIcon label="Projects" />} text="The Lord of the Rings" />
            <AkNavigationItem icon={<TrayIcon label="Projects" />} text="Marcovaldo" />
            <AkNavigationItem icon={<TrayIcon label="Projects" />} text="The Picture of Dorian Gray" />
          </div>
        </PagedContainerNavigation>
      </BasicNavigation>
    </HtmlPage>
  ))
  .add('modal dialog', () => (
    <ResizablePage>
      <p>Normal page content would be here</p>
      <ModalDialog
        footer={
          <button type="button">Create issue</button>
        }
        header={
          <span>New issue</span>
        }
        isOpen
      >
        <p>Test content</p>
      </ModalDialog>
    </ResizablePage>
  ))
  .add('Dropdown clipping', () => (
    <div>
      <div style={{ background: '#fea', overflow: 'hidden', padding: '30px', width: 300, margin: '0 auto', transform: 'translateX(0)' }}>
        <h1>The yellow box has overflow: hidden and transform: translateX(0)</h1>
        <p>
          <AkDropdownMenu
            appearance="tall"
            items={[
              {
                heading: 'Help',
                items: [
                  { content: 'Documentation' },
                  { content: 'Learn Git' },
                  { content: 'Keyboard shortcuts' },
                  { content: 'Bitbucket tutorials' },
                  { content: 'API' },
                  { content: 'Support' },
                ],
              },
              {
                heading: 'Information',
                items: [
                  { content: 'Latest features' },
                  { content: 'Blog' },
                  { content: 'Plans & pricing' },
                  { content: 'Site status' },
                  { content: 'Version info' },
                ],
              },
              {
                heading: 'Legal',
                items: [
                  { content: 'Terms of service' },
                  { content: 'Privacy policy' },
                ],
              },
            ]}
            position="right top"
            defaultOpen
          >
            Dropdown trigger
          </AkDropdownMenu>
        </p>
      </div>
    </div>
  ));

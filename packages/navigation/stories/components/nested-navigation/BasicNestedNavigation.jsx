import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left';
import DashboardIcon from '@atlaskit/icon/glyph/dashboard';
import SettingsIcon from '@atlaskit/icon/glyph/settings';
import TrayIcon from '@atlaskit/icon/glyph/tray';
import InlineDialog from '@atlaskit/inline-dialog';
import Tooltip from '@atlaskit/tooltip';

import {
  AkContainerTitle,
  AkNavigationItem,
  AkContainerNavigationNested,
} from '../../../src/index';
import nucleusLogo from '../../nucleus.png';
import BasicNavigation from '../BasicNavigation';
import HtmlPage from '../HtmlPage';

export default class BasicNestedNavigation extends PureComponent {
  static propTypes = {
    withtootips: PropTypes.bool,
  }

  static menu = [
    {
      component: <AkNavigationItem icon={<DashboardIcon label="Dashboard" />} text="Movies" />,
      childMenu: [
        { component: <AkNavigationItem icon={<DashboardIcon label="Dashboard" />} text="The Matrix" /> },
        { component: <AkNavigationItem icon={<DashboardIcon label="Dashboard" />} text="Lord of the Rings" /> },
      ],
    },
    {
      component: <AkNavigationItem icon={<SettingsIcon label="Settings" />} text="Albums" />,
      childMenu: [
        { component: <AkNavigationItem icon={<SettingsIcon label="Settings" />} text="The xx – coexist" /> },
        { component: <AkNavigationItem icon={<SettingsIcon label="Settings" />} text="Alt J – an awesome wave" /> },
        {
          component: <AkNavigationItem icon={<SettingsIcon label="Settings" />} text="More albums" />,
          childMenu: [
            { component: <AkNavigationItem icon={<SettingsIcon label="Settings" />} text="The Beatles – Sgt. Peppers Lonely Hearts Club Band" /> },
            { component: <AkNavigationItem icon={<SettingsIcon label="Settings" />} text="Tame Impala – Lonerism" /> },
          ],
        },
      ],
    },
    {
      component: <AkNavigationItem icon={<DashboardIcon label="Dashboard" />} text="Lots of children" />,
      childMenu: [
        { component: <AkNavigationItem icon={<DashboardIcon label="Dashboard" />} text="Link 1" /> },
        { component: <AkNavigationItem icon={<DashboardIcon label="Dashboard" />} text="Link 2" /> },
        { component: <AkNavigationItem icon={<DashboardIcon label="Dashboard" />} text="Link 3" /> },
        { component: <AkNavigationItem icon={<DashboardIcon label="Dashboard" />} text="Link 4" /> },
        { component: <AkNavigationItem icon={<DashboardIcon label="Dashboard" />} text="Link 5" /> },
        { component: <AkNavigationItem icon={<DashboardIcon label="Dashboard" />} text="Link 6" /> },
        { component: <AkNavigationItem icon={<DashboardIcon label="Dashboard" />} text="Link 7" /> },
        { component: <AkNavigationItem icon={<DashboardIcon label="Dashboard" />} text="Link 8" /> },
        { component: <AkNavigationItem icon={<DashboardIcon label="Dashboard" />} text="Link 9" /> },
        { component: <AkNavigationItem icon={<DashboardIcon label="Dashboard" />} text="Link 10" /> },
        { component: <AkNavigationItem icon={<DashboardIcon label="Dashboard" />} text="Link 11" /> },
        { component: <AkNavigationItem icon={<DashboardIcon label="Dashboard" />} text="Link 12" /> },
        { component: <AkNavigationItem icon={<DashboardIcon label="Dashboard" />} text="Link 13" /> },
        { component: <AkNavigationItem icon={<DashboardIcon label="Dashboard" />} text="Link 14" /> },
        { component: <AkNavigationItem icon={<DashboardIcon label="Dashboard" />} text="Link 15" /> },
        { component: <AkNavigationItem icon={<DashboardIcon label="Dashboard" />} text="Link 16" /> },
        { component: <AkNavigationItem icon={<DashboardIcon label="Dashboard" />} text="Link 17" /> },
        { component: <AkNavigationItem icon={<DashboardIcon label="Dashboard" />} text="Link 18" /> },
        { component: <AkNavigationItem icon={<DashboardIcon label="Dashboard" />} text="Link 19" /> },
        { component: <AkNavigationItem icon={<DashboardIcon label="Dashboard" />} text="Link 20" /> },
        { component: <AkNavigationItem icon={<DashboardIcon label="Dashboard" />} text="Link 21" /> },
        { component: <AkNavigationItem icon={<DashboardIcon label="Dashboard" />} text="Link 22" /> },
        { component: <AkNavigationItem icon={<DashboardIcon label="Dashboard" />} text="Link 23" /> },
        {
          component: <AkNavigationItem icon={<DashboardIcon label="Dashboard" />} text="I'm a real link" />,
          childMenu: [
            { component: <AkNavigationItem icon={<DashboardIcon label="Dashboard" />} text="Link 1" /> },
            { component: <AkNavigationItem icon={<DashboardIcon label="Dashboard" />} text="Link 2" /> },
            { component: <AkNavigationItem icon={<DashboardIcon label="Dashboard" />} text="Link 3" /> },
            { component: <AkNavigationItem icon={<DashboardIcon label="Dashboard" />} text="Link 4" /> },
            { component: <AkNavigationItem icon={<DashboardIcon label="Dashboard" />} text="Link 5" /> },
            { component: <AkNavigationItem icon={<DashboardIcon label="Dashboard" />} text="Link 6" /> },
            { component: <AkNavigationItem icon={<DashboardIcon label="Dashboard" />} text="Link 7" /> },
            { component: <AkNavigationItem icon={<DashboardIcon label="Dashboard" />} text="Link 8" /> },
            { component: <AkNavigationItem icon={<DashboardIcon label="Dashboard" />} text="Link 9" /> },
            { component: <AkNavigationItem icon={<DashboardIcon label="Dashboard" />} text="Link 10" /> },
            { component: <AkNavigationItem icon={<DashboardIcon label="Dashboard" />} text="Link 11" /> },
            { component: <AkNavigationItem icon={<DashboardIcon label="Dashboard" />} text="Link 12" /> },
            { component: <AkNavigationItem icon={<DashboardIcon label="Dashboard" />} text="Link 13" /> },
            { component: <AkNavigationItem icon={<DashboardIcon label="Dashboard" />} text="Link 14" /> },
            { component: <AkNavigationItem icon={<DashboardIcon label="Dashboard" />} text="Link 15" /> },
          ],
        },
        { component: <AkNavigationItem icon={<DashboardIcon label="Dashboard" />} text="Link 25" /> },
        { component: <AkNavigationItem icon={<DashboardIcon label="Dashboard" />} text="Link 26" /> },
        { component: <AkNavigationItem icon={<DashboardIcon label="Dashboard" />} text="Link 27" /> },
        { component: <AkNavigationItem icon={<DashboardIcon label="Dashboard" />} text="Link 28" /> },
        { component: <AkNavigationItem icon={<DashboardIcon label="Dashboard" />} text="Link 29" /> },
        { component: <AkNavigationItem icon={<DashboardIcon label="Dashboard" />} text="Link 30" /> },
      ],
    },
    { component: <AkNavigationItem icon={<TrayIcon label="Projects" />} text="Just a link" /> },
  ]

  state = {
    stack: [BasicNestedNavigation.menu],
    isHeaderInlineDialogOpen: false,
  }

  getContainerHeaderComponent = () => {
    const backButton = this.state.stack.length > 1 ? (
      <AkNavigationItem
        icon={<ArrowLeftIcon label="Back" />}
        onClick={() => this.stackPop()}
        text="Back" key="2"
      />
    ) : null;

    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return [
      <InlineDialog
        content={<div style={{ maxWidth: '200px' }}>Menu or something like the HipChat status form would go here</div>}
        isOpen={this.state.isHeaderInlineDialogOpen}
        position="bottom left"
      >
        <div
          onClick={() => {
            this.setState({ isHeaderInlineDialogOpen: !this.state.isHeaderInlineDialogOpen });
          }}
        >
          <Tooltip key="1" position="right" content="Header tooltip text">
            <AkContainerTitle
              href="#foo"
              icon={
                <img alt="nucleus" src={nucleusLogo} />
              }
              text="Atlaskit"
              subText="Is the king"
            />
          </Tooltip>
        </div>
      </InlineDialog>,
      backButton,
    ];
    /* eslint-enable jsx-a11y/no-static-element-interactions */
  };

  stackPush = (newPage) => {
    const stack = [...this.state.stack, newPage];
    this.setState({ stack });
  }

  stackPop = () => {
    if (this.state.stack.length <= 1) {
      return false;
    }

    const stack = this.state.stack.slice(0, this.state.stack.length - 1);
    return this.setState({ stack });
  }

  renderItem = (item) => {
    const onClick = item.childMenu ? (
      () => this.stackPush(item.childMenu)
    ) : (
      () => console.log(`Link item clicked: '${item.component.props.text}'`)
    );
    const key = item.component.props.text;

    return !this.props.withtootips ?
      React.cloneElement(item.component, { key, onClick }) :
      <Tooltip
        content={key}
        position="right"
      >
        {React.cloneElement(item.component, { key, onClick })}
      </Tooltip>;
  }

  renderStack = () => this.state.stack.map(page => (
    page.map(item => this.renderItem(item))
  ))

  render() {
    return (
      <HtmlPage>
        <BasicNavigation
          containerHeaderComponent={() => this.getContainerHeaderComponent()}
        >
          <AkContainerNavigationNested
            onAnimationEnd={({ traversalDirection }) => console.log(`Transition animation completed: '${traversalDirection}'`)}
            stack={this.renderStack()}
          />
        </BasicNavigation>
      </HtmlPage>
    );
  }
}

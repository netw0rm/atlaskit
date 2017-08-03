import React from 'react';
import DashboardIcon from '@atlaskit/icon/glyph/dashboard';
import SettingsIcon from '@atlaskit/icon/glyph/settings';
import PortfolioIcon from '@atlaskit/icon/glyph/portfolio';
import IssuesIcon from '@atlaskit/icon/glyph/issues';
import TrayIcon from '@atlaskit/icon/glyph/tray';
import {
  AkNavigationItem,
} from '../../src/index';

const menu = [
  {
    component: <AkNavigationItem icon={<DashboardIcon />} text="Dashboards" />,
    childMenu: [
      { component: <AkNavigationItem text="JIRA" />,
        childMenu: [
          { component: <AkNavigationItem text="JIRA Agile" /> },
          { component: <AkNavigationItem text="JIRA Cloud" /> },
          { component: <AkNavigationItem text="JIRA Capture" /> },
          { component: <AkNavigationItem text="JIRA Server" /> },
          { component: <AkNavigationItem text="JIRA Service Desk" /> },
        ],
      },
      { component: <AkNavigationItem text="Confluence" /> },
      { component: <AkNavigationItem text="HipChat" /> },
      { component: <AkNavigationItem text="Bitbucket" /> },
      { component: <AkNavigationItem text="Sourcetree" /> },
      { component: <AkNavigationItem text="Bamboo" /> },
      { component: <AkNavigationItem text="Fisheye" /> },
    ],
  },
  {
    component: <AkNavigationItem icon={<IssuesIcon />} text="Issues" />,
    childMenu: [
      { component: <AkNavigationItem text="My open issues" /> },
      { component: <AkNavigationItem text="Reported by me" /> },
      { component: <AkNavigationItem text="All issues" /> },
      { component: <AkNavigationItem text="Open issues" /> },
      { component: <AkNavigationItem text="Done issues" /> },
      { component: <AkNavigationItem text="Viewed recently" /> },
      { component: <AkNavigationItem text="Created recently" /> },
      { component: <AkNavigationItem text="Resolved recently" /> },
      { component: <AkNavigationItem text="Updated recently" /> },
    ],
  },
  {
    component: <AkNavigationItem icon={<PortfolioIcon />} text="Portfolio" />,
    childMenu: [
      { component: <AkNavigationItem text="View all plans" /> },
      { component: <AkNavigationItem text="Manage shared teams" /> },
    ],
  },
  {
    component: <AkNavigationItem icon={<TrayIcon />} text="Lots of children" />,
    childMenu: [
      { component: <AkNavigationItem icon={<TrayIcon />} text="Link 1" /> },
      { component: <AkNavigationItem icon={<TrayIcon />} text="Link 2" /> },
      { component: <AkNavigationItem icon={<TrayIcon />} text="Link 3" /> },
      { component: <AkNavigationItem icon={<TrayIcon />} text="Link 4" /> },
      { component: <AkNavigationItem icon={<TrayIcon />} text="Link 5" /> },
      { component: <AkNavigationItem icon={<TrayIcon />} text="Link 6" /> },
      { component: <AkNavigationItem icon={<TrayIcon />} text="Link 7" /> },
      { component: <AkNavigationItem icon={<TrayIcon />} text="Link 8" /> },
      { component: <AkNavigationItem icon={<TrayIcon />} text="Link 9" /> },
      { component: <AkNavigationItem icon={<TrayIcon />} text="Link 10" /> },
      { component: <AkNavigationItem icon={<TrayIcon />} text="Link 11" /> },
      { component: <AkNavigationItem icon={<TrayIcon />} text="Link 12" /> },
      { component: <AkNavigationItem icon={<TrayIcon />} text="Link 13" /> },
      { component: <AkNavigationItem icon={<TrayIcon />} text="Link 14" /> },
      { component: <AkNavigationItem icon={<TrayIcon />} text="Link 15" /> },
      { component: <AkNavigationItem icon={<TrayIcon />} text="Link 16" /> },
      { component: <AkNavigationItem icon={<TrayIcon />} text="Link 17" /> },
      { component: <AkNavigationItem icon={<TrayIcon />} text="Link 18" /> },
      { component: <AkNavigationItem icon={<TrayIcon />} text="Link 19" /> },
      { component: <AkNavigationItem icon={<TrayIcon />} text="Link 20" /> },
    ],
  },
  { component: <AkNavigationItem icon={<SettingsIcon />} text="Settings" /> },
];

export default menu;

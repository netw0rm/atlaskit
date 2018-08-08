// @flow
type ReactNode = any; // @todo: https://github.com/facebook/flow/pull/3931

export type HomeLink = {
  name: string,
  url: string,
  icon: ReactNode,
};

export type MarketplaceLink = {
  name: string,
  url: string,
  icon: ReactNode,
};

export type PeopleProfileLink = {
  name: string,
  url: string,
  icon: ReactNode,
}

export type InviteUsersLink = {
  name: string,
  url: string,
  icon: ReactNode,
}

export type Applications = Array<{
  name: string,
  url: string,
  product: string,
  label?: string,
}>;

export type SuggestedApplications = Array<{
  name: string,
  product: string,
  onClick: Function,
}>;

export type ConfigureLink = string | boolean;

export type RecentContainers = Array<{
  name: string,
  url: string,
  iconUrl: string,
  type: string,
}>;

export type LinkedApplications = {
  configureLink: ConfigureLink,
  suggested?: SuggestedApplications,
  apps: Applications,
  error: boolean,
  discoverApplicationsLink?: boolean,
};

export type Links = Array<{
  text: string,
  url: string,
  analyticsRef?: string,
}>;

export type Translations = {
  home: ReactNode,
  'site-admin'?: ReactNode,
  apps: ReactNode,
  configure: ReactNode,
  recent: ReactNode,
  'container.confluence-space': ReactNode,
  'container.jira-project': ReactNode,
  'applinks.error': ReactNode,
  'try.lozenge': ReactNode,
  'discover.applications'?: ReactNode,
};

export type DropdownOptions = {
  appearance?: 'default' | 'tall',
  isTriggerNotTabbable?: boolean,
  position?: string,
  shouldFlip?: boolean,
};

export type DropdownItem = {
  content: ReactNode,
  elemBefore?: ReactNode,
  href?: ReactNode,
  analyticEvent?: { key: string, properties?: Object },
};

export type DropdownConfig = {
  heading?: ReactNode,
  items: Array<DropdownItem>,
};

import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import akPage from 'ak-page';
import 'ak-avatar';
import 'ak-dropdown';
import React from 'react';
import Lorem from 'react-lorem-component';

import akNavigation from '../src';
import icons from './icons';
import TogglingSidebar from './TogglingSidebar';
import { name } from '../package.json';


const AkNavigation = reactify(akNavigation);
const AkPage = reactify(akPage);
const {
  CalendarIcon,
  CanvasIcon,
  PageIcon,
  PersonIcon,
  QuoteIcon,
  DashboardIcon,
  BitbucketIcon,
  HelpIcon,
  QuestionIcon,
  CreateIcon,
  SearchIcon,
  JiraIcon,
} = icons;

const containerLogo = require('url!./nucleus.png');
const userAvatar = require('url!./emma.jpg');

const sharedProps = {
  containerName: 'Nucleus',
  containerHref: 'http://example.com',
  containerLogo,
  productHref: 'http://atlassian.design',
  collapsible: true,
};

const NavigationLinks = () => <div>
  <ak-navigation-link selected>
    <CalendarIcon slot="icon" /> Calendar
  </ak-navigation-link>
  <ak-navigation-link href="http://atlassian.design" >
    <DashboardIcon slot="icon" /> Atlassian design
  </ak-navigation-link>
  <ak-navigation-link>
    <CanvasIcon slot="icon" /> Canvas
  </ak-navigation-link>
  <ak-navigation-link>
    <PageIcon slot="icon" /> Page
  </ak-navigation-link>
  <ak-navigation-link>
    <PersonIcon slot="icon" /> Person
  </ak-navigation-link>
  <ak-navigation-link>
    <QuestionIcon slot="icon" /> Question
  </ak-navigation-link>
  <ak-navigation-link>
    <QuoteIcon slot="icon" /> Quote
  </ak-navigation-link>
  <ak-navigation-link>
    <QuoteIcon slot="icon" /> Reaaaaaaaaaaaaaaaaaaaaaaaaally long
  </ak-navigation-link>
</div>;

const GlobalProfile = () => <ak-dropdown position="right bottom" slot="global-profile">
  <ak-dropdown-trigger slot="trigger">
    <ak-avatar size="small" src={userAvatar} />
  </ak-dropdown-trigger>
  <ak-dropdown-item>Online help</ak-dropdown-item>
  <ak-dropdown-item>Learn git</ak-dropdown-item>
</ak-dropdown>;

const GlobalHelp = () => <ak-dropdown position="right bottom" slot="global-help">
  <ak-dropdown-trigger slot="trigger">
    <HelpIcon />
  </ak-dropdown-trigger>
  <ak-dropdown-group heading="Bitbucket">
    <ak-dropdown-item>View profile</ak-dropdown-item>
    <ak-dropdown-item>Bitbucket settings</ak-dropdown-item>
    <ak-dropdown-item>Integration</ak-dropdown-item>
  </ak-dropdown-group>
  <ak-dropdown-group heading="Missile silo">
    <ak-dropdown-item>Launch missiles</ak-dropdown-item>
  </ak-dropdown-group>
</ak-dropdown>;

storiesOf(name, module)
  .add('empty ak-navigation', () => (
    <AkNavigation />
  ))
  .add('empty ak-navigation that is open and not collapsible', () => (
    <AkNavigation open />
  ))
  .add('with the lot', () => (
    <AkPage navigationOpen>
      <AkNavigation
        slot="navigation"
        open
        {...sharedProps}
      >
        <BitbucketIcon slot="global-home" />
        <SearchIcon slot="global-search" />
        <CreateIcon slot="global-create" />

        <GlobalProfile />
        <GlobalHelp />

        <div is slot="global-search-drawer">
          Search
        </div>
        <div is slot="global-create-drawer">
          Create
        </div>
        <NavigationLinks />

      </AkNavigation>
      <div>
        <Lorem count="30" />
      </div>
    </AkPage>
  ))
  .add('many navigation links', () => (
    <AkPage navigationOpen>
      <AkNavigation
        slot="navigation"
        open
        {...sharedProps}
      >
        <BitbucketIcon slot="global-home" />
        <SearchIcon slot="global-search" />
        <CreateIcon slot="global-create" />

        <GlobalProfile />
        <GlobalHelp />

        <div is slot="global-search-drawer">
          Search
        </div>
        <div is slot="global-create-drawer">
          Create
        </div>
        <NavigationLinks />
        <NavigationLinks />
        <NavigationLinks />
        <NavigationLinks />

      </AkNavigation>
      <div>
        <Lorem count="30" />
      </div>
    </AkPage>
  ))
  .add('with text-only links', () => (
    <AkPage navigationOpen>
      <AkNavigation
        slot="navigation"
        open
        {...sharedProps}
      >
        <ak-navigation-link selected>I am selected</ak-navigation-link>
        <ak-navigation-link>But I am not</ak-navigation-link>
        <ak-navigation-link>I will overflow because of all my </ak-navigation-link>

      </AkNavigation>
    </AkPage>
  ))
  .add('with a long container name', () => (
    <AkNavigation collapsible open containerName="Antidisestablishmentterianism" />
  ))
  .add('with a container name that spans two lines', () => (
    <AkNavigation
      collapsible
      open
      containerName="Super duper cloud purchasing experience platform team"
    />
  ))
  .add('with no container logo', () => (
    <AkPage navigationOpen>
      <AkNavigation
        slot="navigation"
        open
        containerName="Electron"
      >
        <BitbucketIcon slot="global-home" />
        <SearchIcon slot="global-search" />
        <CreateIcon slot="global-create" />
        <GlobalProfile />
        <GlobalHelp />
        <div is slot="global-search-drawer">
          Search
        </div>
        <div is slot="global-create-drawer">
          Create
        </div>
        <NavigationLinks />

      </AkNavigation>
      <div>
        <Lorem count="30" />
      </div>
    </AkPage>
  ))
  .add('with no container logo or name', () => (
    <AkPage navigationOpen>
      <AkNavigation
        slot="navigation"
        collapsible
        open
      >
        <BitbucketIcon slot="global-home" />
        <SearchIcon slot="global-search" />
        <CreateIcon slot="global-create" />
        <GlobalProfile />
        <GlobalHelp />
        <div is slot="global-search-drawer">
          Search
        </div>
        <div is slot="global-create-drawer">
          Create
        </div>
        <NavigationLinks />

      </AkNavigation>
      <div>
        <Lorem count="30" />
      </div>
    </AkPage>
  ))
  .add('that starts closed', () => (
    <AkPage>
      <AkNavigation
        slot="navigation"
        collapsible
        {...sharedProps}
      >
        <JiraIcon slot="global-home" />
        <SearchIcon slot="global-search" />
        <CreateIcon slot="global-create" />
        <NavigationLinks />
      </AkNavigation>
      <div>
        <Lorem count="30" />
      </div>
    </AkPage>
  ))
  .add('with a hidden container', () => (
    <AkPage>
      <AkNavigation
        slot="navigation"
        containerHidden
        {...sharedProps}
      >
        <JiraIcon slot="global-home" />
        <SearchIcon slot="global-search" />
        <CreateIcon slot="global-create" />
        <NavigationLinks />
      </AkNavigation>
      <div>
        The container should toggle between visible and hidden
        <Lorem count="30" />
      </div>
    </AkPage>
  ))
  .add('with a square container logo', () => (
    <AkPage>
      <AkNavigation
        slot="navigation"
        containerLogo={userAvatar}
        containerName="Your profile"
        collapsible
      >
        <NavigationLinks />
      </AkNavigation>
      <div>
        <Lorem count="30" />
      </div>
    </AkPage>
  ))
  .add('with a square container logo', () => (
    <AkPage>
      <AkNavigation
        slot="navigation"
        containerLogo={userAvatar}
        containerName="Your profile"
        collapsible
      >
        <NavigationLinks />
      </AkNavigation>
      <div>
        <Lorem count="30" />
      </div>
    </AkPage>
  ))
  .add('that toggles the open state', () => (
    <AkPage>
      <TogglingSidebar
        slot="navigation"
        propToToggle="open"
        {...sharedProps}
      >
        <JiraIcon slot="global-home" />
        <SearchIcon slot="global-search" />
        <CreateIcon slot="global-create" />
        <NavigationLinks />
      </TogglingSidebar>
      <div>
        <Lorem count="30" />
      </div>
    </AkPage>
  ))
  .add('that toggles the containerHidden state', () => (
    <AkPage>
      <TogglingSidebar
        slot="navigation"
        propToToggle="containerHidden"
        {...sharedProps}
      >
        <JiraIcon slot="global-home" />
        <SearchIcon slot="global-search" />
        <CreateIcon slot="global-create" />
        <NavigationLinks />
      </TogglingSidebar>
      <div>
        <Lorem count="30" />
      </div>
    </AkPage>
  ));

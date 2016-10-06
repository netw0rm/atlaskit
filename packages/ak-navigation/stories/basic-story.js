import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import akNavigation from '../src';
import TogglingSidebar from './TogglingSidebar';
import akPage from 'ak-page';
import 'ak-icon';
import 'ak-avatar';
import 'ak-dropdown';
import React from 'react';
import { name } from '../package.json';
import Lorem from 'react-lorem-component';

const AkNavigation = reactify(akNavigation);

const AkPage = reactify(akPage);


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
    <ak-icon slot="icon" glyph="calendar" /> Calendar
  </ak-navigation-link>
  <ak-navigation-link href="http://atlassian.design" >
    <ak-icon slot="icon" glyph="overview" /> Atlassian design
  </ak-navigation-link>
  <ak-navigation-link>
    <ak-icon slot="icon" glyph="canvas" /> Canvas
  </ak-navigation-link>
  <ak-navigation-link>
    <ak-icon slot="icon" glyph="page" /> Page
  </ak-navigation-link>
  <ak-navigation-link>
    <ak-icon slot="icon" glyph="person" /> Person
  </ak-navigation-link>
  <ak-navigation-link>
    <ak-icon slot="icon" glyph="question" /> Question
  </ak-navigation-link>
  <ak-navigation-link>
    <ak-icon slot="icon" glyph="quote" /> Quote
  </ak-navigation-link>
  <ak-navigation-link>
    <ak-icon slot="icon" glyph="quote" /> Reaaaaaaaaaaaaaaaaaaaaaaaaally long
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
    <ak-icon glyph="help" />
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
        <ak-icon slot="global-home" glyph="bitbucket" />
        <ak-icon slot="global-search" glyph="search" />
        <ak-icon slot="global-create" glyph="create" />

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
        <ak-icon slot="global-home" glyph="bitbucket" />
        <ak-icon slot="global-search" glyph="search" />
        <ak-icon slot="global-create" glyph="create" />

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
        <ak-icon slot="global-home" glyph="bitbucket" />
        <ak-icon slot="global-search" glyph="search" />
        <ak-icon slot="global-create" glyph="create" />
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
        <ak-icon slot="global-home" glyph="bitbucket" />
        <ak-icon slot="global-search" glyph="search" />
        <ak-icon slot="global-create" glyph="create" />
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
        <ak-icon slot="global-home" glyph="jira" />
        <ak-icon slot="global-search" glyph="search" />
        <ak-icon slot="global-create" glyph="create" />
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
        <ak-icon slot="global-home" glyph="jira" />
        <ak-icon slot="global-search" glyph="search" />
        <ak-icon slot="global-create" glyph="create" />
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
        <ak-icon slot="global-home" glyph="jira" />
        <ak-icon slot="global-search" glyph="search" />
        <ak-icon slot="global-create" glyph="create" />
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
        <ak-icon slot="global-home" glyph="jira" />
        <ak-icon slot="global-search" glyph="search" />
        <ak-icon slot="global-create" glyph="create" />
        <NavigationLinks />
      </TogglingSidebar>
      <div>
        <Lorem count="30" />
      </div>
    </AkPage>
  ));

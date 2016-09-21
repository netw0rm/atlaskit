import { storiesOf, action } from '@kadira/storybook';
import reactify from 'akutil-react';
import akNavigation from '../src/index';
import akPage from 'ak-page';
import 'ak-icon';
import 'ak-avatar';
import 'ak-dropdown';
import React from 'react';
import { name } from '../package.json';
import Lorem from 'react-lorem-component';

const AkNavigation = reactify(akNavigation);

const AkPage = reactify(akPage);

// TODO: move this in its own file - can potentially be re-used by ak-page as well
const TogglingSidebar = React.createClass({ // eslint-disable-line react/prefer-es6-class
  propTypes: {
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node,
    ]),
  },
  getInitialState() {
    return { open: true };
  },
  componentDidMount() {
    this.timer = setInterval(this.toggle, 3000);
  },
  componentWillUnmount() {
    window.clearInterval(this.timer);
  },
  toggle() {
    this.setState({ open: !this.state.open });
  },
  render() {
    return (<AkNavigation
      {...this.props}
      onLinkSelected={action('link selected')}
      onClose={action('close')}
      onOpen={action('open')}
      open={this.state && this.state.open}
    >
      {this.props.children}
    </AkNavigation>);
  },
});
const containerLogo = require('url!./nucleus.png');
const userAvatar = require('url!./emma.jpg');

const sharedProps = {
  containerName: 'Nucleus',
  containerHref: 'http://example.com',
  containerLogo,
  productHref: 'http://atlassian.design',
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
  <ak-dropdown-group title="Bitbucket">
    <ak-dropdown-item>View profile</ak-dropdown-item>
    <ak-dropdown-item>Bitbucket settings</ak-dropdown-item>
    <ak-dropdown-item>Integration</ak-dropdown-item>
  </ak-dropdown-group>
  <ak-dropdown-group title="Missile silo">
    <ak-dropdown-item>Launch missiles</ak-dropdown-item>
  </ak-dropdown-group>
</ak-dropdown>;

storiesOf(name, module)
  .add('empty ak-navigation', () => (
    <AkNavigation />
  ))
  .add('ak-navigation with the lot', () => (
    <AkPage navigationOpen>
      <style dangerouslySetInnerHTML={{ __html: 'body { margin: 0px }' }} />
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
  .add('ak-navigation many navigation links', () => (
    <AkPage navigationOpen>
      <style dangerouslySetInnerHTML={{ __html: 'body { margin: 0px }' }} />
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
  .add('ak-navigation with a long container name', () => (
    <AkNavigation open containerName="Antidisestablishmentterianism" />
  ))
  .add('ak-navigation with a container name that spans two lines', () => (
    <AkNavigation open containerName="Super duper cloud purchasing experience platform team" />
  ))
  .add('ak-navigation with no container logo', () => (
    <AkPage navigationOpen>
      <style dangerouslySetInnerHTML={{ __html: 'body { margin: 0px }' }} />
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
  .add('ak-navigation with no container logo or name', () => (
    <AkPage navigationOpen>
      <style dangerouslySetInnerHTML={{ __html: 'body { margin: 0px }' }} />
      <AkNavigation
        slot="navigation"
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
  .add('ak-navigation that starts closed', () => (
    <AkPage>
      <style dangerouslySetInnerHTML={{ __html: 'body { margin: 0px }' }} />
      <AkNavigation
        slot="navigation"
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
  .add('ak-navigation with a square container logo', () => (
    <AkPage>
      <style dangerouslySetInnerHTML={{ __html: 'body { margin: 0px }' }} />
      <AkNavigation
        slot="navigation"
        containerLogo={userAvatar}
        containerName="Your profile"
      >
        <NavigationLinks />
      </AkNavigation>
      <div>
        <Lorem count="30" />
      </div>
    </AkPage>
  ))
  .add('ak-navigation that toggles itself', () => (
    <AkPage>
      <style dangerouslySetInnerHTML={{ __html: 'body { margin: 0px }' }} />
      <TogglingSidebar
        slot="navigation"
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

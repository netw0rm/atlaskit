import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import akNavigation from '../src/index';
import akPage from 'ak-page';
import 'ak-icon';
const { React, ReactDOM } = window;
import { name } from '../package.json';
import Lorem from 'react-lorem-component';

const AkNavigation = reactify(akNavigation, {
  React,
  ReactDOM,
});

const AkPage = reactify(akPage, {
  React,
  ReactDOM,
});

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
    this.timer = setInterval(this.toggle, 1000);
  },
  componentWillUnmount() {
    window.clearInterval(this.timer);
  },
  toggle() {
    this.setState({ open: !this.state.open });
  },
  render() {
    return (<AkNavigation {...this.props} open={this.state && this.state.open}>
      {this.props.children}
    </AkNavigation>);
  },
});

const containerProps = {
  containerName: 'Nucleus',
  containerHref: 'http://nucleus.com',
  containerLogo: 'https://s3.amazonaws.com/uploads.hipchat.com/10804/576067/VtJT4vjBKJXG5GI/Group%204.png',
};

const NavigationLinks = () => <div>
  <ak-navigation-link selected>
    <ak-icon slot="icon" glyph="calendar" /> Calendar
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

storiesOf(name, module)
  .add('empty ak-navigation', () => (
    <AkNavigation />
  ))
  .add('ak-navigation that starts open', () => (
    <AkPage navigationOpen>
      <style dangerouslySetInnerHTML={{ __html: 'body { margin: 0px }' }} />
      <AkNavigation
        slot="navigation"
        open
        {...containerProps}
      >
        <ak-icon slot="global-home" glyph="jira" />
        <ak-icon slot="global-search" glyph="search" />
        <ak-icon slot="global-create" glyph="create" />
        <NavigationLinks />
      </AkNavigation>
      <div is slot="content">
        <Lorem count="30" />
      </div>
    </AkPage>
  ))
  .add('ak-navigation that starts closed', () => (
    <AkPage>
      <style dangerouslySetInnerHTML={{ __html: 'body { margin: 0px }' }} />
      <AkNavigation
        slot="navigation"
        {...containerProps}
      >
        <ak-icon slot="global-home" glyph="jira" />
        <ak-icon slot="global-search" glyph="search" />
        <ak-icon slot="global-create" glyph="create" />
        <NavigationLinks />
      </AkNavigation>
      <div is slot="content">
        <Lorem count="30" />
      </div>
    </AkPage>
  ))
  .add('ak-navigation that toggles itself', () => (
    <AkPage>
      <style dangerouslySetInnerHTML={{ __html: 'body { margin: 0px }' }} />
      <TogglingSidebar
        slot="navigation"
        {...containerProps}
      >
        <ak-icon slot="global-home" glyph="jira" />
        <ak-icon slot="global-search" glyph="search" />
        <ak-icon slot="global-create" glyph="create" />
        <NavigationLinks />
      </TogglingSidebar>
      <div is slot="content">
        <Lorem count="30" />
      </div>
    </AkPage>
  ));

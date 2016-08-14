import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import akNavigation from '../src/index';
import akPage from 'ak-page';
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
  getInitialState() {
    return { open: true };
  },
  componentDidMount() {
    this.timer = setInterval(this.toggle, 300);
  },
  componentWillUnmount() {
    window.clearInterval(this.timer);
  },
  toggle() {
    this.setState({ open: !this.state.open });
  },
  render() {
    return <AkNavigation open={this.state && this.state.open} />;
  },
});

function wrapInDivs(el, n) {
  let wrappedEl = el;
  for (let i = 0; i < n; i++) {
    wrappedEl =
      (<div style={{ border: '1px dashed grey', padding: '2px' }}>
        <Lorem count="1" />
        {wrappedEl}
      </div>);
  }
  return wrappedEl;
}

storiesOf(name, module)
  .add('empty ak-navigation', () => (
    <AkNavigation />
  ))
  .add('ak-navigation with no margins', () => (
    <div>
      <style dangerouslySetInnerHTML={{ __html: 'body { margin: 0px }' }} />
      <AkNavigation
        open
        containerName="Nucleus"
        containerHref="http://nucleus.com"
        containerLogo="https://s3.amazonaws.com/uploads.hipchat.com/10804/576067/VtJT4vjBKJXG5GI/Group%204.png"
      >
        <ak-icon slot="global-home" glyph="jira" />
        <ak-icon slot="global-search" glyph="search" />
        <ak-icon slot="global-create" glyph="create" />
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
      </AkNavigation>
    </div>
  ))
  .add('an ak-navigation with page reflow tested', () => (
    // Use this to add a story that has a little fps/memory gauge that allows you
    // to monitor performance whilst developing
    <AkPage>
      <style dangerouslySetInnerHTML={{ __html: 'body { margin: 0px }' }} />
      {wrapInDivs(<Lorem count="30" />, 50)}
      {wrapInDivs(<Lorem count="30" />, 50)}
      {wrapInDivs(<Lorem count="30" />, 50)}
      {wrapInDivs(<Lorem count="30" />, 50)}
      {wrapInDivs(<Lorem count="30" />, 50)}
      {wrapInDivs(<Lorem count="30" />, 50)}
      {wrapInDivs(<Lorem count="30" />, 50)}
      <div is slot="navigation">
        <TogglingSidebar />
      </div>
    </AkPage>
  ))
  .add('an ak-navigation that starts closed, inside an ak-page', () => (
    // Use this to add a story that has a little fps/memory gauge that allows you
    // to monitor performance whilst developing
    <AkPage>
      <style dangerouslySetInnerHTML={{ __html: 'body { margin: 0px }' }} />
      <Lorem count="30" />
      <div is slot="navigation">
        <AkNavigation open={false} />
      </div>
    </AkPage>
  ));

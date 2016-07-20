import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import akUtilComponentTemplate from '../src/index';
const { React, ReactDOM } = window;
import { name } from '../package.json';
import Lorem from 'react-lorem-component';

const Component = reactify(akUtilComponentTemplate, {
  React,
  ReactDOM,
});

storiesOf(name, module)
  .add('empty ak-navigation', () => (
    <Component />
  ))
  .add('ak-navigation with no margins', () => (
    <div>
      <style dangerouslySetInnerHTML={{ __html: 'body { margin: 0px }' }} />
      <Component>
        <ak-navigation-container name="Nucleus" href="http://nucleus.com" logo="https://s3.amazonaws.com/uploads.hipchat.com/10804/576067/VtJT4vjBKJXG5GI/Group%204.png">
          <ak-navigation-link selected href="/jira">Test</ak-navigation-link>
          <ak-navigation-link>Test</ak-navigation-link>
          <ak-navigation-link>Test</ak-navigation-link>
        </ak-navigation-container>
      </Component>
    </div>
  ))
  .addMonitored('an ak-navigation with page reflow tested', () => (
    // Use this to add a story that has a little fps/memory gauge that allows you
    // to monitor performance whilst developing
    <div style={{ display: 'flex' }}>
      <style dangerouslySetInnerHTML={{ __html: 'body { margin: 0px }' }} />
      <Component />
      <div>
        <Lorem count={30} />
      </div>
    </div>
  ), () => {
    // This is where the actual work is done - anything in here will be monitored by the stats
    // view and displayed, so this is where you want to do your animation work, etc.
    const x = Math.random() * 1000000;
    for (let i = 0; i < x; i++) {
      Math.random(); // burn some CPU cycles
    }
  });

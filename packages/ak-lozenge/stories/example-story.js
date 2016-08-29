import { storiesOf, action } from '@kadira/storybook';
import reactify from 'akutil-react';
import WebComponent from '../src/index';
const { React, ReactDOM } = window;
import { name } from '../package.json';
import styles from 'style!./../src/host.less';

const Component = reactify(WebComponent, {
  React,
  ReactDOM,
});

storiesOf(name, module)
  .add('a simple ak-lozenge', () => (
    <Component />
  ))
  .add('a simple ak-lozenge with a name', () => (
    <Component name="MyComponent" />
  ))
  .add('an ak-lozenge that emits an action when it is clicked', () => (
    <Component id="myComponent" onClick={action('clicking the WebComponent')} />
  ))
  .add('an ak-lozenge that removes itself when being clicked', () => {
    const removeMe = (e) => e.currentTarget.parentNode.removeChild(e.currentTarget);
    const cls = styles.akutilComponentTemplate;
    return (<Component id="myComponent" className={cls} onClick={removeMe} />);
  })
  .addMonkeyTest('a ak-lozenge with monkey testing', () => (
    // Use this to add a story that has fuzzy testing attached.
    <Component />
  ))
  .addMonitored('an ak-lozenge with monitored performance', () => (
    // Use this to add a story that has a little fps/memory gauge that allows you
    // to monitor performance whilst developing
    <Component />
  ), () => {
    // This is where the actual work is done - anything in here will be monitored by the stats
    // view and displayed, so this is where you want to do your animation work, etc.
    const x = Math.random() * 1000000;
    for (let i = 0; i < x; i++) {
      Math.random(); // burn some CPU cycles
    }
  });

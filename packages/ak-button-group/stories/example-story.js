import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import ButtonGroup from '../src/index';
const { React, ReactDOM } = window;
import { name } from '../package.json';
// import styles from 'style!./../src/host.less';
import RadioButton from '../../ak-radio-button/src/index';

const ReactButtonGroup = reactify(ButtonGroup, {
  React,
  ReactDOM,
});

const ReactRadioButton = reactify(RadioButton, {
  React,
  ReactDOM,
});

storiesOf(name, module)
  .add('ak-button-group with default width', () => (
    <ReactButtonGroup>
      <ReactRadioButton selected>One</ReactRadioButton>
      <ReactRadioButton>Two</ReactRadioButton>
      <ReactRadioButton>Three</ReactRadioButton>
    </ReactButtonGroup>
  ));
  // .add('a simple ak-button-group with a name', () => (
  //   <Component name="MyComponent" />
  // ))
  // .add('an ak-button-group that emits an action when it is clicked', () => (
  //   <Component id="myComponent" onClick={action('clicking the WebComponent')} />
  // ))
  // .add('an ak-button-group that removes itself when being clicked', () => {
  //   const removeMe = (e) => e.currentTarget.parentNode.removeChild(e.currentTarget);
  //   const cls = styles.akutilComponentTemplate;
  //   return (<Component id="myComponent" className={cls} onClick={removeMe} />);
  // })
  // .addMonkeyTest('a ak-button-group with monkey testing', () => (
  //   // Use this to add a story that has fuzzy testing attached.
  //   <Component />
  // ))
  // .addMonitored('an ak-button-group with monitored performance', () => (
  //   // Use this to add a story that has a little fps/memory gauge that allows you
  //   // to monitor performance whilst developing
  //   <Component />
  // ), () => {
  //   // This is where the actual work is done - anything in here will be monitored by the stats
  //   // view and displayed, so this is where you want to do your animation work, etc.
  //   const x = Math.random() * 1000000;
  //   for (let i = 0; i < x; i++) {
  //     Math.random(); // burn some CPU cycles
  //   }
  // });

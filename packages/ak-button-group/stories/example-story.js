import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import Button from 'ak-button';
import ButtonGroup from '../src/index';
const { React, ReactDOM } = window;
import { name } from '../package.json';
// import styles from 'style!./../src/host.less';

const ReactButtonGroup = reactify(ButtonGroup, {
  React,
  ReactDOM,
});

const ReactButton = reactify(Button, {
  React,
  ReactDOM,
});

storiesOf(name, module)
  .add('plain ak-button-group of radio buttons (none selected)', () => (
    <ReactButtonGroup>
      <ReactRadioButton>One</ReactRadioButton>
      <ReactRadioButton>Two</ReactRadioButton>
      <ReactRadioButton>Three</ReactRadioButton>
    </ReactButtonGroup>
  ))
  .add('plain ak-button-group of radio buttons (first selected)', () => (
    <ReactButtonGroup>
      <ReactRadioButton selected>One</ReactRadioButton>
      <ReactRadioButton>Two</ReactRadioButton>
      <ReactRadioButton>Three</ReactRadioButton>
    </ReactButtonGroup>
  ))
  .add('ak-button-group of radio buttons with one disabled', () => (
    <ReactButtonGroup>
      <ReactRadioButton selected>One</ReactRadioButton>
      <ReactRadioButton>Two</ReactRadioButton>
      <ReactRadioButton disabled>Three</ReactRadioButton>
    </ReactButtonGroup>
  ))
  .add('ak-button-group of radio buttons with one selected and all disabled', () => (
    <ReactButtonGroup>
      <ReactRadioButton disabled selected>One</ReactRadioButton>
      <ReactRadioButton disabled>Two</ReactRadioButton>
      <ReactRadioButton disabled>Three</ReactRadioButton>
    </ReactButtonGroup>
  ))
  .add('ak-button-group of radio buttons with an input before for focus testing', () => (
    <div>
      <input type="text" placeholder="focus here first" />
      <ReactButtonGroup>
        <ReactRadioButton>One</ReactRadioButton>
        <ReactRadioButton>Two</ReactRadioButton>
        <ReactRadioButton>Three</ReactRadioButton>
      </ReactButtonGroup>
    </div>
  ))
  .add('ak-button-group with radio buttons and an ak-button inside', () => (
    <ReactButtonGroup>
      <ReactRadioButton>One</ReactRadioButton>
      <ReactRadioButton>Two</ReactRadioButton>
      <ReactRadioButton>Three</ReactRadioButton>
      <ak-button>ak-button</ak-button>
    </ReactButtonGroup>
  ))
  .add('ak-button-group with radio buttons and a paragraph inside', () => (
    <ReactButtonGroup>
      <ReactRadioButton>One</ReactRadioButton>
      <ReactRadioButton>Two</ReactRadioButton>
      <ReactRadioButton>Three</ReactRadioButton>
      <p>Paragraph</p>
    </ReactButtonGroup>
  ))
  .add('ak-button-group that overflows the parent div', () => (
    <div style={{ border: '1px solid #AAA', width: 75 }}>
      <ReactButtonGroup>
        <ReactRadioButton>One</ReactRadioButton>
        <ReactRadioButton>Two</ReactRadioButton>
        <ReactRadioButton>Three</ReactRadioButton>
      </ReactButtonGroup>
    </div>
  ))
  .add('ak-button-group with CSS display: block', () => (
    <ReactButtonGroup style={{ border: '1px solid #AAA', display: 'block' }}>
      <ReactRadioButton>One</ReactRadioButton>
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

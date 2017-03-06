import { storiesOf, action } from '@kadira/storybook';
import React from 'react';
import styles from 'style!./story-styles.less';
import Avatar from '@atlaskit/avatar';
import { akColorN800 } from '@atlaskit/util-shared-styles';
import Button from '@atlaskit/button';

import { Trigger } from '../src';
import { name } from '../package.json';

storiesOf(`${name} - trigger`, module)
  .addCodeExampleStory('simple trigger story', () => (
    <div className={styles.storiesContainer}>
      <h2>Triggers for droplist</h2>
      <p>Can be activated via click or via pressing
        &quot;down &quot;, &quot;space &quot; and &quot;enter &quot;</p>
      <div className={styles.triggersContainer}>
        <div>
          <Trigger
            onActivate={(e) => {
              action(`trigger was activated via ${e.source}`)();
            }}
            isTabbable
            isFocused
          >Simple empty focused trigger</Trigger>
        </div>
        <div>
          <Trigger
            onActivate={(e) => {
              action(`trigger was activated via ${e.source}`)();
            }}
          ><Avatar /></Trigger>
        </div>
        <div>
          <Trigger
            onActivate={(e) => {
              action(`trigger was activated via ${e.source}`)();
            }}
          ><Button>Simple trigger with a button</Button></Trigger>
        </div>
      </div>
      <p>Unless they are disabled</p>
      <p>Which also means they are not focusable</p>
      <div className={styles.triggersContainer}>
        <div>
          <Trigger
            isDisabled
            onActivate={(e) => {
              action(`trigger was activated via ${e.source}`)();
            }}
          >Simple empty trigger</Trigger>
        </div>
        <div>
          <Trigger
            isDisabled
            onActivate={(e) => {
              action(`trigger was activated via ${e.source}`)();
            }}
          ><Avatar /></Trigger>
        </div>
        <div>
          <Trigger
            isDisabled
            onActivate={(e) => {
              action(`trigger was activated via ${e.source}`)();
            }}
          ><Button>Simple trigger with a button</Button></Trigger>
        </div>
      </div>
      <p>You can style trigger if you want - with inline styles and/or classNames</p>
      <div className={styles.triggersContainer}>
        <div>
          <Trigger
            style={{ border: '1px solid black' }}
            onActivate={(e) => {
              action(`trigger was activated via ${e.source}`)();
            }}
          >Simple empty trigger</Trigger>
        </div>
        <div>
          <Trigger
            className={styles.triggerRestyled}
            onActivate={(e) => {
              action(`trigger was activated via ${e.source}`)();
            }}
          ><Avatar /></Trigger>
        </div>
        <div>
          <Trigger
            onActivate={(e) => {
              action(`trigger was activated via ${e.source}`)();
            }}
          ><Button>Simple trigger with a button</Button></Trigger>
        </div>
      </div>
      <p>Trigger is not tabbable by default, you need to enable it
        if you are not using interactive elements inside</p>
      <div className={styles.triggersContainer}>
        <div>
          <Trigger
            isTabbable
          >Simple empty trigger</Trigger>
        </div>
        <div>
          <Trigger isTabbable><Avatar /></Trigger>
        </div>
      </div>
      <p>Trigger can also occupy the whole available space</p>
      <div className={styles.triggersContainer}>
        <Trigger
          style={{ border: `1px solid ${akColorN800}` }}
          shouldFitContainer
        >Simple wide trigger</Trigger>
      </div>
    </div>
  ));

import { storiesOf, action } from '@kadira/storybook';
import React from 'react';
import styles from 'style!./story-styles.less';
import Avatar from 'ak-avatar';

import Trigger from '../src';
import { name } from '../package.json';

storiesOf(name, module)
  .add('simple trigger story', () => (
    <div className={styles.storiesContainer}>
      <h2>Triggers for droplist</h2>
      <p>Can be activated via click or via pressing
        &quot;down &quot;, &quot;space &quot; and &quot;enter &quot;</p>
      <p>Can be tabbed through</p>
      <div className={styles.triggersContainer}>
        <div>
          <Trigger
            onActivate={(e) => {
              action(`trigger was activated via ${e.source}`)();
            }}
          >Simple empty trigger</Trigger>
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
            type="button"
          >Simple button trigger</Trigger>
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
            type="button"
          >Simple button trigger</Trigger>
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
            type="button"
          >Simple button trigger</Trigger>
        </div>
      </div>
    </div>
  ));

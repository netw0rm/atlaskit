import { storiesOf } from '@kadira/storybook';
import React from 'react';

import Component from '../src';
import { name } from '../package.json';
import styles from '../src/styles.less';

storiesOf(name, module)
  .add('edge case: a simple ak-tag (should warn that no text was given in dev)', () => (
    <Component className={styles.locals.akTag} />
  ))
  .add('edge case: a removable ak-tag (should warn that no text was given in dev)', () => (
    <Component className={styles.locals.akTag} removeButtonText="Remove me" />
  ))
  .add('edge case: special characters (must not alert)', () => (
    <Component
      className={styles.locals.akTag}
      text="<script>alert('must not alert');</script>"
    />
  ));
  // TODO : is this story valid ? unless we are doing dangerouslySetInnerHTML within ?
  /*
  .add('edge case: special characters, programmatically (must not alert)', () => {
    const attachTag = (e) => {
      if (!e) {
        return;
      }
      e.innerHTML = '';
      const tag = new Tag();
      tag.className = styles.locals.akTag;
      tag.text = '<script>alert(\'must not alert either!\');</script>';
      e.appendChild(tag);
    };

    return (<div ref={attachTag} />);
  });*/

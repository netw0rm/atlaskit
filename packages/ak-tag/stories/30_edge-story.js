import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import Tag from '../src/index';
import React from 'react';
import { name } from '../package.json';
import styles from 'style!./../src/host.less';

const Component = reactify(Tag);

storiesOf(name, module)
  .add('edge case: a simple ak-tag (should warn that no text was given in dev)', () => (
    <Component className={styles.akTag} />
  ))
  .add('edge case: a removable ak-tag (should warn that no text was given in dev)', () => (
    <Component className={styles.akTag} remove-button-text="Remove me" />
  ))
  .add('edge case: special characters (must not alert)', () => (
    <Component
      className={styles.akTag}
      text="<script>alert('must not alert');</script>"
    />
  ))
  .add('edge case: special characters, programmatically (must not alert)', () => {
    const attachTag = (e) => {
      if (!e) {
        return;
      }
      e.innerHTML = '';
      const tag = new Tag();
      tag.className = styles.akTag;
      tag.text = '<script>alert(\'must not alert either!\');</script>';
      e.appendChild(tag);
    };

    return (<div ref={attachTag}></div>);
  });

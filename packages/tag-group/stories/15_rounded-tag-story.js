import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Avatar from '@atlaskit/avatar';
import Tag from '@atlaskit/tag';

import Group from '../src';
import { name } from '../package.json';
import styles from '../src/styles.less';
import tagNames from './tagNames';

const imports = [
  ['React', 'react'],
  ['TagGroup', '@atlaskit/tag-group'],
  ['Tag', '@atlaskit/tag'],
];

storiesOf(name, module)
  .addCodeExampleStory('Rounded tags in group', () => (
    <div style={{ border: '1px solid black' }}>
      <Group className={styles.locals.akTagGroup}>
        {
          tagNames.map((sweet, i) => (
            <Tag
              appearance="rounded"
              elemBefore={<Avatar size="xsmall" />}
              href="http://www.cupcakeipsum.com/"
              key={i}
              text={sweet}
              removeButtonText="remove"
            />
          ))
        }
      </Group>
    </div>
  ), { imports });

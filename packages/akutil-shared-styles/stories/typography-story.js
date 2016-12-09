import React from 'react';
import { storiesOf } from '@kadira/storybook';

import storyStyles from 'style-loader!./typography/typography-story.less';
import { name } from '../package.json';

/* eslint-disable max-len,  */

storiesOf(name, module)
  .add('Mixin: heading sizes', () => (
    <div>
      <p>Below are a number of paragraph elements wich a custom class which has been mixed with one of the t-shirt sized heading mixins.</p>
      <p className={storyStyles.h900}>This is a {'<p>'} styled as h900</p>
      <p className={storyStyles.h800}>This is a {'<p>'} styled as h800</p>
      <p className={storyStyles.h700}>This is a {'<p>'} styled as h700</p>
      <p className={storyStyles.h600}>This is a {'<p>'} styled as h600</p>
      <p className={storyStyles.h500}>This is a {'<p>'} styled as h500</p>
      <p className={storyStyles.h400}>This is a {'<p>'} styled as h400</p>
      <p className={storyStyles.h300}>This is a {'<p>'} styled as h300</p>
      <p className={storyStyles.h200}>This is a {'<p>'} styled as h200</p>
      <p className={storyStyles.h100}>This is a {'<p>'} styled as h100</p>
    </div>
  ));

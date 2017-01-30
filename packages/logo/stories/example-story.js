import { storiesOf } from '@kadira/storybook';
import React from 'react';

import Component from '../src';
import { name } from '../package.json';

storiesOf(name, module)
    .add('simple ak-logo', () => (<Component / >));

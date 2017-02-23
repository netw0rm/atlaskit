import * as React from 'react';
import { storiesOf } from '@kadira/storybook';

import { name } from '../package.json';
import Mention from '../src/components/Mention';

const mentionData = {
  id: 'ABCD-ABCD-ABCD',
  text: '@Oscar Wallhult'
};

storiesOf(`${name}/Mention`, module)
  .add('Simple mention', () => <Mention {...mentionData} />)
  .add('Highlighted mention', () => <Mention {...mentionData} isHighlighted={true} />)
;

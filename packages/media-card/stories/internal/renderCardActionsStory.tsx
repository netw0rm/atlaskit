import * as React from 'react';
import {action} from '@kadira/storybook';
import {CardActions, CardAction} from '../../src/utils/cardActions';
import {Flex, Box} from './utils';

const deleteAction: CardAction = {type: 'delete', content: 'Delete', handler: action('Delete')};
const primaryAction: CardAction = {type: 'primary', content: 'View', handler: action('View')};
const otherActions: CardAction[] = [
  {content: 'Share', handler: action('Share')},
  {content: 'Close', handler: action('Close')}
];

export default function() {
  return (
    <Box>
      <h1>CardActions</h1>

      <pre>theme</pre>
      <Flex>

        <Box>
          <pre>dark</pre>
          <CardActions theme="dark" actions={[deleteAction]}/>
          <CardActions theme="dark" actions={[primaryAction]}/>
          <CardActions theme="dark" actions={otherActions}/>
        </Box>

        <Box theme="dark">
          <pre>light</pre>
          <CardActions theme="light" actions={[deleteAction]}/>
          <CardActions theme="light" actions={[primaryAction]}/>
          <CardActions theme="light" actions={otherActions}/>
        </Box>

      </Flex>

      <pre>compact:</pre>
      <Flex>

        <Box>
          <pre>true</pre>
          <CardActions compact={true} actions={[deleteAction]}/>
          <CardActions compact={true} actions={[primaryAction]}/>
          <CardActions compact={true} actions={otherActions}/>
        </Box>

        <Box>
          <pre>false</pre>
          <CardActions compact={false} actions={[deleteAction]}/>
          <CardActions compact={false} actions={[primaryAction]}/>
          <CardActions compact={false} actions={otherActions}/>
        </Box>

      </Flex>

      <pre>canShowDeleteButton:</pre>
      <Flex>

        <Box>
          <pre>true</pre>
          <CardActions canShowDeleteButton={true} actions={[deleteAction]}/>
          <CardActions canShowDeleteButton={true} actions={[primaryAction]}/>
          <CardActions canShowDeleteButton={true} actions={otherActions}/>
        </Box>

        <Box>
          <pre>false</pre>
          <CardActions canShowDeleteButton={false} actions={[deleteAction]}/>
          <CardActions canShowDeleteButton={false} actions={[primaryAction]}/>
          <CardActions canShowDeleteButton={false} actions={otherActions}/>
        </Box>

      </Flex>

      <pre>canShowPrimaryButton:</pre>
      <Flex>

        <Box>
          <pre>true</pre>
          <CardActions canShowPrimaryButton={true} actions={[deleteAction]}/>
          <CardActions canShowPrimaryButton={true} actions={[primaryAction]}/>
          <CardActions canShowPrimaryButton={true} actions={otherActions}/>
        </Box>

        <Box>
          <pre>false</pre>
          <CardActions canShowPrimaryButton={false} actions={[deleteAction]}/>
          <CardActions canShowPrimaryButton={false} actions={[primaryAction]}/>
          <CardActions canShowPrimaryButton={false} actions={otherActions}/>
        </Box>

      </Flex>

    </Box>
  );
}

import { action, storiesOf } from '@kadira/storybook';
import * as React from 'react';

import Editor from './editor';
import { Content } from './styles';
import { name } from '../package.json';

const CANCEL_ACTION = () => action('Cancel')();
const SAVE_ACTION = () => action('Save')();

interface Props {
}

interface State {
}

class DemoEditor extends React.PureComponent<Props, State> {
  render() {
    return (
      <Content>
        {<Editor
          onCancel={CANCEL_ACTION}
          onSave={SAVE_ACTION}
        />}
      </Content>
    );
  }
}

storiesOf(name, module)
  .add('Example editor', () => (
    <Content>
      <DemoEditor />
    </Content>
  ));

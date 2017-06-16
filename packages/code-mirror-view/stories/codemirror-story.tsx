import { action, storiesOf } from '@kadira/storybook';
import * as React from 'react';

import Editor from './editor';
import { Content } from './styles';
import { name } from '../package.json';

const CANCEL_ACTION = () => action('Cancel')();
const SAVE_ACTION = () => action('Save')();

interface Props {
  onChange: any;
}

interface State {
  jsonDocument?: string;
}

class DemoEditor extends React.PureComponent<Props, State> {
  private editorRef: Editor;

  constructor(props) {
    super(props);

    this.state = {
      jsonDocument: '{}',
    };
  }

  private handleEditorRef = (ref) => {
    this.editorRef = ref;
  }

  render() {
    return (
      <Content>
        <div style={{ padding: '5px 0'}}>
          ️️️⚠️ Atlassians, make sure you're logged into <a href="https://id.stg.internal.atlassian.com" target="_blank">staging Identity server</a>.
        </div>
        {<Editor
          onCancel={CANCEL_ACTION}
          onSave={SAVE_ACTION}
          onChange={this.props.onChange}
          isExpandedByDefault={true}
          ref={this.handleEditorRef}
        />}
      </Content>
    );
  }
}

storiesOf(name, module)
  .add('Example editor', () => (
    <Content>
      <DemoEditor
        onChange={this.fetchEditorState}
      />
    </Content>
  ));

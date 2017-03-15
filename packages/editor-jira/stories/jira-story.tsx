import { action, storiesOf } from '@kadira/storybook';
import { storyDecorator } from '@atlaskit/editor-core/dist/es5/test-helper';
import * as React from 'react';
import { PureComponent } from 'react';
import { name, version } from '../package.json';
import Editor from '../src';
import MentionResource from './mentions/mention-resource';

const CANCEL_ACTION = () => action('Cancel')();
const SAVE_ACTION = () => action('Save')();

type Props = { allowLists?: boolean, allowLinks?: boolean; mentionProvider?: any, mentionEncoder?: any };
type State = { html?: string };
class Demo extends PureComponent<Props, State> {
  state = {} as State;

  render() {
    return (
      <div>
        <Editor
          onCancel={CANCEL_ACTION}
          onChange={this.updateHTML}
          onSave={SAVE_ACTION}
          allowLists={this.props.allowLists}
          allowLinks={this.props.allowLinks}
          mentionProvider={this.props.mentionProvider}
          mentionEncoder={this.props.mentionEncoder}
        />
        <fieldset style={{ marginTop: 20 }}>
          <legend>HTML</legend>
          <pre>{this.state.html}</pre>
        </fieldset>
      </div>
    );
  }

  updateHTML = (editor: Editor) => {
    this.setState({ html: editor.value });
  }
}

storiesOf(name, module)
  .addDecorator(storyDecorator(version))
  .add('Editor', () => <Demo />)
  .add('Editor (allowLists)', () => <Demo allowLists />)
  .add('Editor (allowLinks)', () => <Demo allowLinks />)
  .add('Editor (Mentions)', () =>
    <Demo
      mentionProvider={Promise.resolve(new MentionResource())}
      mentionEncoder={(userId: string) => `/secure/ViewProfile?name=${userId}`}
    />
  )
  .add('Editor (All flags)', () =>
    <Demo
      allowLists
      allowLinks
      mentionProvider={Promise.resolve(new MentionResource())}
      mentionEncoder={(userId: string) => `/secure/ViewProfile?name=${userId}`}
    />
  );

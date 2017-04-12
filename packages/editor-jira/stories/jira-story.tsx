import { action, storiesOf } from '@kadira/storybook';
import { storyDecorator } from '@atlaskit/editor-core/dist/es5/test-helper';
import * as React from 'react';
import { PureComponent } from 'react';
import { name, version } from '../package.json';
import Editor, { Props } from '../src';
import MentionResource from './mentions/mention-resource';

const CANCEL_ACTION = () => action('Cancel')();
const SAVE_ACTION = () => action('Save')();

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
          {...this.props}
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
  .add('Editor (allowAdvancedTextFormatting)', () => <Demo allowAdvancedTextFormatting />)
  .add('Editor (allowSubSup)', () => <Demo allowSubSup />)
  .add('Editor (allowCodeBlock)', () => <Demo allowCodeBlock />)
  .add('Editor (allowBlockQuote)', () => <Demo allowBlockQuote />)
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
      allowCodeBlock
      allowAdvancedTextFormatting
      allowSubSup
      allowBlockQuote
      mentionProvider={Promise.resolve(new MentionResource())}
      mentionEncoder={(userId: string) => `/secure/ViewProfile?name=${userId}`}
    />
  );
